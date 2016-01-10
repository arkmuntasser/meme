// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Returns a handler which will open a new window when activated.
 */
function getClickHandler() {

  return function(info, tab) {
    var code = "var memeImageUrl = '" + info.srcUrl + "';";
    chrome.tabs.executeScript(null, { code : code });
    chrome.tabs.executeScript(null, { file : "popup.js" });
  };
};

/**
 * Create a context menu which will only show up for images.
 */
chrome.contextMenus.create({
  "title" : "Get image info",
  "type" : "normal",
  "contexts" : ["image"],
  "onclick" : getClickHandler()
});

chrome.browserAction.onClicked.addListener(function(tab) {
  var code = "var memeImageUrl = '';";
  chrome.tabs.executeScript(null, { code : code });
  chrome.tabs.executeScript(null, { file : "popup.js" });
});
