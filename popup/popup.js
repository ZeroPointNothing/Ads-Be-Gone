// alert("Hello, world!")

// Send a message to the injected blocker, telling it whether or not to preform the blocking.

var boxChecked = false

document.getElementById("pwnLoop").onclick = function() {
  if (document.getElementById("pwnLoop")) {
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
        });

      });
    
  }
}