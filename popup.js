document.addEventListener("DOMContentLoaded", function() {

  document.getElementById("blockPages").addEventListener("click", () => {
    var toBlock = true
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {msgToContent: true}, function(response) {
        chrome.storage.sync.set({ toBlock });
      });
     });
    sendTimeInfoToContent();
  });

  chrome.storage.sync.get(["toBlock"], ({toBlock}) => {
    if (toBlock === true) {
      var bedTime = document.getElementById("bedTime").value;
      var wakeUpTime = document.getElementById("wakeUpTime").value;
      document.getElementById("bedTimeDiv").innerHTML = `<p class="cont-text" style="font-size: 24px"> Your answer have been recorded </p><p class="cont-text" style="font-size: 18px"> Bed Time: ${bedTime[1]}${bedTime[2]} : ${bedTime[3]}${bedTime[4]} <p>`;
      document.getElementById("wakeUpTimeDiv").innerHTML = `<p class="cont-text" style="font-size: 18px"> Wake Up: ${wakeUpTime[1]}${wakeUpTime[2]} : ${wakeUpTime[3]}${wakeUpTime[4]}</p>`;
      document.getElementById("blcokPagesDiv").innerHTML = `<h1>Submitted</h1>`;
      toBlock = false
      chrome.storage.sync.set({ toBlock })
    }
  });

  function sendTimeInfoToContent() {
    var bedTime = document.getElementById("bedTime").value;
    var wakeUpTime = document.getElementById("wakeUpTime").value;
    document.getElementById("bedTimeDiv").innerHTML = `<p class="cont-text" style="font-size: 24px"> Your answer have been recorded </p><p class="cont-text" style="font-size: 18px"> Bed Time: ${bedTime[1]}${bedTime[2]} : ${bedTime[3]}${bedTime[4]} <p>`;
    document.getElementById("wakeUpTimeDiv").innerHTML = `<p class="cont-text" style="font-size: 18px"> Wake Up: ${wakeUpTime[1]}${wakeUpTime[2]} : ${wakeUpTime[3]}${wakeUpTime[4]}</p>`;
    document.getElementById("blcokPagesDiv").innerHTML = `<h1>Submitted</h1>`;

    var timeControl = []
    timeControl.push(parseInt(bedTime[1] + bedTime[2]));
    timeControl.push(parseInt(bedTime[3]+bedTime[4]));
    timeControl.push(parseInt(wakeUpTime[1] + wakeUpTime[2]));
    timeControl.push(parseInt(wakeUpTime[3]+wakeUpTime[4]));
    chrome.storage.sync.set({ timeControl });
    alert("Wait until BedTime");
  }
});