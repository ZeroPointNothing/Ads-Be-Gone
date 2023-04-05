document.addEventListener('DOMContentLoaded', function() {

  var blockByDefault = document.getElementById('blockByDefault');
  var saveButton = document.getElementById('save-button');
  
  chrome.storage.sync.get('blockByDefault', function(result) {
    if (typeof blockByDefault != "undefined") {
      blockByDefault.checked = result.blockByDefault
    }
  });

  saveButton.addEventListener('click', function() {
    // Save ABG settings.
    chrome.storage.sync.set({ "blockByDefault": blockByDefault.checked });
    console.log('Settings saved');
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