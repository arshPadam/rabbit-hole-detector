let currentTabId = null;
let tabStartTime = null;
let websiteData = [];
let lastUrl = null;
let lastTitle = null;

// Listen for tab activation
chrome.tabs.onActivated.addListener((activeInfo) => {
  if (currentTabId !== null) {
    const timeSpent = Date.now() - tabStartTime;
    
    // Push the data including the title and time spent
    websiteData.push({
      url: lastUrl,
      title: lastTitle,  // Add the title of the last visited website
      startTime: new Date(tabStartTime).toISOString(),
      endTime: new Date().toISOString(),
      timeSpent: timeSpent / 1000 // time in seconds
    });
    console.log("Activity Logged:", websiteData[websiteData.length - 1]); // Log each activity for debugging
  }

  currentTabId = activeInfo.tabId;
  tabStartTime = Date.now();
});

// Listen for tab updates to capture the title and URL
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tabId === currentTabId && changeInfo.status === 'complete') {
    lastUrl = tab.url;
    lastTitle = tab.title; // Capture the title of the page
    console.log("Tab Updated:", lastTitle, lastUrl); // Log the updated tab for debugging
  }
});

// Listen for messages from the popup or other parts of the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getWebsiteData') {
    sendResponse(websiteData);
    console.log("Sent website data:", websiteData); // Log the data being sent to popup
  }
});
