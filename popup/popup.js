
// SETTINGS -- START

// chrome.storage.sync.remove('firstRun')
// chrome.storage.sync.remove('blockByDefault')
// alert("cleared")

chrome.storage.sync.get('firstRun', function(result) {
  // If firstRun is not true or doesn't exist (the user just installed the extension), set all settings to default.
  if (!result.firstRun) {
    // Default Settings
    chrome.storage.sync.set({ "blockByDefault": false });
    
    
    chrome.storage.sync.set({ "firstRun": true})
    console.log('Default Settings saved');
    alert("Default Settings have been applied. You can change them by right clicking and selected the 'Ads's Be Gone! Settings' option. Please refresh any pages to allow ABG to function.")
    chrome.tabs.reload({ bypassCache: true });
  }
});


// SETTINGS -- END

// Send a message to the injected blocker, telling it whether or not to preform the blocking.

var boxChecked = false

document.getElementById("pwnLoop").onclick = function() {
  if (document.getElementById("pwnLoop")) {
    getStateIcons()
    // // Toggle
    // if (boxChecked) {
    //   boxChecked = false
    // } else {
    //   boxChecked = true
    // }


    // Inform the blocker whether or not it should be active.
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {message: "togglestate"}, function(response) {
            if (chrome.runtime.lastError) {
              // Ignore this specific error as it isn't a real one.
              if (chrome.runtime.lastError.message == "The message port closed before a response was received.") {
                return
              }
                // Ignore the "Could not establish connection" error.
                console.info("blocker.js was not properly injected. Aborting.");
                alert(`Something happened, preventing ABG from running. (${chrome.runtime.lastError.message})`)
            }
            // If blocker.js responds succesfully, update the prompt.
            try {
              if (response.message === "200") {
                getStateIcons()
              }
            } catch ( e ) {
              return
            }

          });

      });
    
  }
}

function getStateIcons() {
  // Get the state of blocker.js and inform the user if the blocker is online or not.
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {message: "stateIcon"}, function(response) {
        if (chrome.runtime.lastError) {
          // Ignore this specific error as it isn't a real one.
          if (chrome.runtime.lastError.message == "The message port closed before a response was received.") {
            return
          }
            // Ignore the "Could not establish connection" error.
            console.info("blocker.js was not properly injected. Aborting.");
            return
        }
        
        if (response.message === true) {
          document.getElementById("title").innerHTML = "Ads, Be Gone! [ACTIVE]"
        } else {
          document.getElementById("title").innerHTML = "Ads, Be Gone! [INACTIVE]"
        }
    });
  });
}

// Get the state of blocker.js when the user opens the prompt.
getStateIcons()