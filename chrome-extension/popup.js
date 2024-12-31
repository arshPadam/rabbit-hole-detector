document.addEventListener('DOMContentLoaded', function () {
  const websiteList = document.getElementById('websiteList').getElementsByTagName('tbody')[0];
  const downloadBtn = document.getElementById('downloadBtn');

  chrome.runtime.sendMessage({ action: 'getWebsiteData' }, function (data) {
    data.forEach((entry) => {
      const row = websiteList.insertRow();
      row.insertCell(0).textContent = entry.url;
      row.insertCell(1).textContent = entry.startTime;
      row.insertCell(2).textContent = entry.endTime;
      row.insertCell(3).textContent = entry.timeSpent;
    });
  });

  downloadBtn.addEventListener('click', function () {
    chrome.runtime.sendMessage({ action: 'getWebsiteData' }, function (data) {
      const csvContent = 'URL,Start Time,End Time,Time Spent (s)\n' + data.map(e => `${e.url},${e.startTime},${e.endTime},${e.timeSpent}`).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'website_data.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  });
});
