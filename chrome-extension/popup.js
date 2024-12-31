document.addEventListener('DOMContentLoaded', function () {
  const websiteList = document.getElementById('websiteList').getElementsByTagName('tbody')[0];
  const downloadBtn = document.getElementById('downloadBtn');

  // Retrieve website data
  chrome.runtime.sendMessage({ action: 'getWebsiteData' }, function (data) {
    console.log("Website Data Retrieved:", data); // Log data being received
    if (data && data.length > 0) {
      data.forEach((entry) => {
        const row = websiteList.insertRow();

        // Insert the title, URL, start time, end time, and time spent into the table
        row.insertCell(0).textContent = entry.title;  // Title of the website
        row.insertCell(1).textContent = entry.url;    // URL
        row.insertCell(2).textContent = entry.startTime; // Start time
        row.insertCell(3).textContent = entry.endTime;   // End time
        row.insertCell(4).textContent = entry.timeSpent; // Time spent
      });
    }
  });

  // Download the data as CSV
  downloadBtn.addEventListener('click', function () {
    chrome.runtime.sendMessage({ action: 'getWebsiteData' }, function (data) {
      console.log("CSV Data:", data); // Log data before creating CSV
      if (data && data.length > 0) {
        const csvContent = 'Title,URL,Start Time,End Time,Time Spent (s)\n' +
          data.map(e => `${e.title},${e.url},${e.startTime},${e.endTime},${e.timeSpent}`).join('\n');

        // Create a Blob and trigger a download
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'website_data.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    });
  });
});
