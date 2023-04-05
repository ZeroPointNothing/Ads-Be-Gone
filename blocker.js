// The script to be injected into the website. This allows the ads to be pwnd.

// Common add hosting sites/phrases involving ads.
var blockerSites = [
  "tpc.googlesyndication.com/simgad/",
  "adclick.g.doubleclick.net/",
  "googleads.g.doubleclick.net",
  'ezoic',
  "google_image",
  'ad_unit',
  'google_image_div',
  'GoogleActiveViewElement',
  "amznBanners_assoc_banner",
  "google_ads"
]
var blockAds = false
const replace = 'https://github.com/ZeroPointNothing/Ads-Be-Gone/raw/main/assets/replaceimg.png'


// Whether or not to count ad and ads in the search. This tends to be more effective, but also damaging to website contents.
destructive = false
//
if (destructive) {
  blockerSites.push('ad', 'ads')
}

const checkForBlock = function(src) {
  try {
// Check if 'src' is in the list of blocked sites/key words.
  for (let i = 0; i < blockerSites.length; i++) {
    if (src.includes(blockerSites[i])) {
      // console.info(`Site matched: ${blockerSites[i]}, ${src}`)
      return true
    } else {
      // console.info(`No match: ${src} | ${blockerSites[i]}`)
    }
  }
  return false
} catch ( e ) {

}
}

const getPwnd = function() {
  // Sort through any possible ad holders and purge the ad if it is detected.
    images = document.querySelectorAll("img");
    // alert(images.length)
    for (var i = 0; i < images.length; i++) {
      if (checkForBlock(images[i].src)) {
        images[i].src = replace;
      }
    }

    images = document.querySelectorAll("iframe");
    // alert(images.length)
    for (var i = 0; i < images.length; i++) {
      if (checkForBlock(images[i].src)) {
        images[i].src = replace;
      }
    }

    images = document.querySelectorAll("a");
    // alert(images.length)
    for (var i = 0; i < images.length; i++) {
      if (checkForBlock(images[i].href)) {
        images[i].href = replace;
      }
    }
  
    // console.info('[ABG:INFO] - DIV--------')

    try {
    images = document.querySelectorAll("div");
      // alert(images.length)
      for (var i = 0; i < images.length; i++) {
        if (checkForBlock(images[i].id)) {
          //console.log(images[i])
          var element = document.getElementById(images[i].id);
          element.parentNode.removeChild(element);
        }
      }
      images = document.querySelectorAll("div");
      // alert(images.length)
      for (var i = 0; i < images.length; i++) {
        if (checkForBlock(images[i].class)) {
          var element = document.getElementById(images[i].id);
          element.parentNode.removeChild(element);
        }
      }

      images = document.querySelectorAll("gwd-google-ad");
      // console.info(images.length)
      for (var i = 0; i < images.length; i++) {
        var element = document.getElementById(images[i].id);
        element.parentNode.removeChild(element);
      }

    } catch ( e ) {
      console.info("[ABG:ERROR] - Exception occured. Ignoring.")
      console.info(e)
    }

    console.log("[ABG:WORKER] - Job Complete")
  }
  

  function checkBlockStatus() {

    if (blockAds) {
      getPwnd();
    }
  }

  
  
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // If the user toggles the blocking on, start blocking. Else, simply return.
    // This code sets the toggle.
    if (request.message === "togglestate") {
      // Toggle
      if (blockAds) {
        blockAds = false
        console.log("[ABG:INFO] - No longer Blocking Ads...")
      } else {
        blockAds = true
        console.log("[ABG:INFO] - Blocking Ads...")
      }
    }
  });

  // 
  setInterval(checkBlockStatus, 2000)
  console.info("[ABG:INFO] - Blocker Script succesfully injected! Loop started...");
  console.log(blockerSites)
  