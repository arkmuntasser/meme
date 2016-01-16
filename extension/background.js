// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Returns a handler which will open a new window when activated.
 */
function getClickHandler() {

  return function(info, tab) {
    function convertImgToDataURLviaCanvas(url, callback, outputFormat){
      var img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = function(){
          var canvas = document.createElement('CANVAS');
          var ctx = canvas.getContext('2d');
          var dataURL;
          canvas.height = this.height;
          canvas.width = this.width;
          ctx.drawImage(this, 0, 0);
          dataURL = canvas.toDataURL(outputFormat);
          callback(dataURL);
          canvas = null;
      };
      img.src = url;
    }

    convertImgToDataURLviaCanvas(info.srcUrl, function(base64Img){
      var code = "var base64Img = '" + base64Img + "'; var notoggle = true;";
      chrome.tabs.executeScript(null, { code : code });
      chrome.tabs.executeScript(null, { file : "popup.js" });
    });
  };
};

/**
 * Create a context menu which will only show up for images.
 */
chrome.contextMenus.create({
  "title" : "Open image with Kirby",
  "type" : "normal",
  "contexts" : ["image"],
  "onclick" : getClickHandler()
});

chrome.browserAction.onClicked.addListener(function(tab) {
  var code = "var memeImageUrl = ''; var notoggle = false;";
  chrome.tabs.executeScript(null, { code : code });
  chrome.tabs.executeScript(null, { file : "popup.js" });
});
