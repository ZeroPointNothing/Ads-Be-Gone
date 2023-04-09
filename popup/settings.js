document.addEventListener('DOMContentLoaded', function() {

  var blockByDefault = document.getElementById('blockByDefault');
  var saveButton = document.getElementById('save-button');
  
  chrome.storage.sync.get('blockByDefault', function(result) {
    if (typeof blockByDefault != "undefined") {
      blockByDefault.checked = result.blockByDefault
    }
  });


  chrome.storage.sync.get('destructiveToggle', function(result) {
    if (typeof destructiveToggle != "undefined") {
      destructiveToggle.checked = result.destructiveToggle
    }
  });

  saveButton.addEventListener('click', function() {
    // Save ABG settings.
    chrome.storage.sync.set({ "blockByDefault": blockByDefault.checked });
    chrome.storage.sync.set({ "destructiveToggle": destructiveToggle.checked })
    console.log('Settings saved');

    document.getElementById("save-alert").innerHTML = "Settings Saved!"
  });
});




  // chrome.storage.sync.set({ "firstRun": true }, function() {
  //   console.log('Settings saved');
  // });
  
  // chrome.storage.sync.get('firstRun', function(result) {
  //   alert('Value:' + result.firstRun);
  // });
  
  // chrome.storage.sync.remove('firstRun')

  // chrome.storage.sync.get('firstRun', function(result) {
  //   alert('Value:' + result.firstRun);
  // });