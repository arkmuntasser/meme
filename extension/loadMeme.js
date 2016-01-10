console.log("loaded Meme");

var html = '' +
'<link rel="stylesheet" type="text/css" href="https://raw.githubusercontent.com/arkmuntasser/meme/master/extension/css/style.css" />' +
'<div class="memeMakerExtension">' +
  '<div class="container">' +
    '<div class="canvas-wrapper">' +
      '<div class="canvas back-panel"></div>' +
      '<canvas class="canvas canvas-background wide" id="canvas-background" width="1024" height="512"></canvas>' +
      '<canvas class="canvas canvas-overlay wide" id="canvas-overlay" width="1024" height="512"></canvas>' +
      '<canvas class="canvas canvas-text wide" id="canvas-text" width="1024" height="512"></canvas>' +
      '<canvas class="canvas canvas-logo wide" id="canvas-logo" width="1024" height="512"></canvas>' +
      '<canvas class="canvas canvas-buffer wide" id="canvas-buffer" width="1024" height="512"></canvas>' +
      '<textarea class="textarea textarea-top textarea-left" id="mememaker-textarea">Hello, world!</textarea>' +
      '<input class="input-image" type="file" name="img" id="mememaker-input-image" />' +
    '</div>' +
    '<div class="controls-wrapper">' +
      '<ul class="controls controls-left">' +
        '<li class="control" id="mememaker-upload"><img src="https://raw.githubusercontent.com/arkmuntasser/meme/master/extension/assets/background-64.png" alt="background"></li>' +
        '<li class="control control-overlay control-overlay-none" id="mememaker-overlay"><img src="https://raw.githubusercontent.com/arkmuntasser/meme/master/extension/assets/overlay-64.png" alt="overlay"></li>' +
        '<li class="control" id="mememaker-align"><img src="https://raw.githubusercontent.com/arkmuntasser/meme/master/extension/assets/align-64.png" alt="align"></li>' +
        '<li class="control" id="mememaker-position"><img src="https://raw.githubusercontent.com/arkmuntasser/meme/master/extension/assets/position-64.png" alt="align"></li>' +
      '</ul>' +
      '<ul class="controls controls-right">' +
        '<li class="control"><a href="#" id="mememaker-download">Download</a></li>' +
      '</ul>' +
      '<div class="clear"></div>' +
    '</div>' +
  '</div>' +
'</div>';

var str2DOMElement = function(html) {
    var frame = document.createElement('iframe');
    frame.style.display = 'none';
    document.body.appendChild(frame);
    frame.contentDocument.open();
    frame.contentDocument.write(html);
    frame.contentDocument.close();
    var el = frame.contentDocument.body.firstChild;
    document.body.removeChild(frame);
    return el;
}

var el = str2DOMElement(html);

document.body.appendChild(el);

chrome.tabs.executeScript(null, { file : "canvas.js" });
chrome.tabs.executeScript(null, { file : "main.js" });
