document.addEventListener("DOMContentLoaded", function() {
  var toBlock = Boolean

  document.getElementById("blockPages").addEventListener("click", () => {
    toBlock = true

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {msgToContent: true}, function(response) {
          chrome.storage.sync.set({ toBlock });
      });
    });
    
    var bedTime = document.getElementById("bedTime").value;
    var wakeUpTime = document.getElementById("wakeUpTime").value;
    document.getElementById("bedTimeDiv").innerHTML = `<p> Your answer have been recorded </p> <h5> Bed Time: ${bedTime[1]}${bedTime[2]} : ${bedTime[3]}${bedTime[4]} <h5>`;
    document.getElementById("wakeUpTimeDiv").innerHTML = `<h5> Wake Up: ${wakeUpTime[1]}${wakeUpTime[2]} : ${wakeUpTime[3]}${wakeUpTime[4]}</h5>`;
    document.getElementById("blcokPagesDiv").innerHTML = `<h1>Submitted</h1>`;

    var timeControl = []
    timeControl.push(parseInt(bedTime[1] + bedTime[2]));
    timeControl.push(parseInt(bedTime[3]+bedTime[4]));
    chrome.storage.sync.set({ timeControl });
    alert("Wait until BedTime");
  });

  document.getElementById("unblockPage").addEventListener("click", () => {
    toBlock = false
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {msgToContent: false}, function(response) {
          chrome.storage.sync.set({ toBlock });
        });
    });   
  });
});
