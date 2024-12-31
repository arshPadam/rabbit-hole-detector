document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["activity"], (data) => {
    let activityLog = data.activity || [];
    document.getElementById("activity-log").innerText = activityLog.join("\n");
  });

  // Handle file download
  document.getElementById("download-button").addEventListener("click", () => {
    chrome.storage.local.get(["activity"], (data) => {
      let activityLog = data.activity || [];
      let blob = new Blob([activityLog.join("\n")], { type: "text/plain" });
      let url = URL.createObjectURL(blob);

      let a = document.createElement("a");
      a.href = url;
      a.download = "activity_log.txt";  // File name
      a.click();
      URL.revokeObjectURL(url);  // Clean up
    });
  });
});
