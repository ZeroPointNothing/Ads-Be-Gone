// The script to be injected into the website. This allows the ads to be pwnd.

// Common add hosting sites/phrases involving ads.
var blockerSites = [
  "tpc.googlesyndication.com/simgad/",
  "adclick.g.doubleclick.net/",
  "googleads.g.doubleclick.net",
  'https://s0.2mdn.net/simgad/',
  "https://static.pc-adroute",
  "adroute",
  "https://img.gsspat.jp",
  'ezoic',
  "google_image",
  'ad_unit',
  'google_image_div',
  'GoogleActiveViewElement',
  "amznBanners_assoc_banner",
  "google_ads",
  "gnpbad_",
]

// LOAD SETTINGS -- START
chrome.storage.sync.get('blockByDefault', function (result) {
  blockAds = result.blockByDefault
});

chrome.storage.sync.get('destructiveToggle', function (result) {
  destructive = result.destructiveToggle
  // Whether or not to count ad and ads in the search. This tends to be more effective, but also damaging to website contents.
  if (destructive) {
    blockerSites.push('ad', 'ads')
  }
  console.log(blockerSites)
});

// LOAD SETTINGS -- END


const replace = 'https://github.com/ZeroPointNothing/Ads-Be-Gone/raw/main/assets/replaceimg.png'




const checkForBlock = function (src) {
  try {
    // Check if 'src' matches any blocked sites/keywords.
    for (let i = 0; i < blockerSites.length; i++) {
      const regex = new RegExp(blockerSites[i]);
      if (regex.test(src)) {
        // console.info(`Site matched: ${blockerSites[i]}, ${src}`)
        return true;
      } else {
        // console.info(`No match: ${src} | ${blockerSites[i]}`)
      }
    }
    return false;
  } catch (e) {
    // Handle any exceptions if necessary
  }
};


const getPwnd = function () {
  // Sort through any possible ad holders and purge the ad if it is detected.
  images = document.querySelectorAll("img");
  // alert(images.length)
  for (var i = 0; i < images.length; i++) {
    if (checkForBlock(images[i].src)) {
      images[i].src = replace;
    }
  }

  // For pesky ads, use another method that simply hides the ad instead of modifying content.
  const ads = document.querySelectorAll('iframe');
  ads.forEach(ad => {
    // Hide the ad by setting its display property to "none"
    if (checkForBlock(ad.id)) {
      ad.style.display = 'none';
    }
  });


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

  } catch (e) {
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



chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  //console.log(`message recieved. ${request.message}`)
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
    sendResponse({ message: "200" })
  }

  if (request.message === "stateIcon") {
    //console.log("blocker.js recieved request for blockAds state.")
    sendResponse({ message: blockAds })
  }
});

setInterval(checkBlockStatus, 2000)
console.info("[ABG:INFO] - Blocker Script succesfully injected! Loop started...");

