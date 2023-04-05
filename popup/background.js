chrome.runtime.onInstalled.addListener(() => {
    // Create a context menu item
    chrome.contextMenus.create({
      id: "abgsettings",
      title: "Ads, Be Gone! Settings",
      contexts: ["page"],
    });
  
    // Add a listener for when the context menu item is clicked
    chrome.contextMenus.onClicked.addListener((info, tab) => {
      if (info.menuItemId === "abgsettings") {
        chrome.tabs.create({ url: chrome.runtime.getURL("popup/settings.html") });
      }
    });
  });
  