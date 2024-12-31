let currentTabId = null;
let tabStartTime = null;
let websiteData = [];

chrome.tabs.onActivated.addListener((activeInfo) => {
  if (currentTabId !== null) {
    const timeSpent = Date.now() - tabStartTime;
    websiteData.push({
      url: lastUrl,
      startTime: new Date(tabStartTime).toISOString(),
      endTime: new Date().toISOString(),
      timeSpent: timeSpent / 1000 // time in seconds
    });
  }

  currentTabId = activeInfo.tabId;
  tabStartTime = Date.now();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tabId === currentTabId && changeInfo.status === 'complete') {
    lastUrl = tab.url;
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getWebsiteData') {
    sendResponse(websiteData);
  }
});
