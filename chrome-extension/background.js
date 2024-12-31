chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
      console.log(`Tab updated: ${tab.url}`);
    }
  });
  
  chrome.history.onVisited.addListener((result) => {
    chrome.storage.local.get(["activity"], (data) => {
      let activity = data.activity || [];
      activity.push(result.url);
      chrome.storage.local.set({ activity });
    });
  });
  