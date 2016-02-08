var Canvas = function(overwrite) {
  this.backgroundCanvas = document.getElementById('canvas-background');
  this.backgroundCtx = this.backgroundCanvas.getContext('2d');
  this.backgroundCmdId = 0;

  this.overlayCanvas = document.getElementById('canvas-overlay');
  this.overlayCtx = this.overlayCanvas.getContext('2d');
  this.overlayCmdId = 1;

  this.textCanvas = document.getElementById('canvas-text');
  this.textCtx = this.textCanvas.getContext('2d');
  this.textCmdId = 2;

  this.logoCanvas = document.getElementById('canvas-logo');
  this.logoCtx = this.logoCanvas.getContext('2d');
  this.logoCmdId = 3;

  this.bufferCanvas = document.getElementById('canvas-buffer');
  this.bufferCtx = this.bufferCanvas.getContext('2d');
  this.bufferCmdId = 4;

  this.memoryCanvas = document.createElement('canvas');
  this.memoryCtx = this.memoryCanvas.getContext('2d');
  this.memoryCmdId = 5;

  this.canvasArray = [
    this.backgroundCanvas,
    this.overlayCanvas,
    this.textCanvas,
    this.logoCanvas,
    this.bufferCanvas,
    this.memoryCanvas
  ];

  this.ctxArray = [
    this.backgroundCtx,
    this.overlayCtx,
    this.textCtx,
    this.logoCtx,
    this.bufferCtx,
    this.memoryCtx
  ];

  this.settings = {
    backgroundImage : '',
    height : 512,
    logoImage : '',
    opacity : 0.5,
    order : ['background', 'overlay', 'text', 'logo'],
    overlayColor : 'transparent',
    position : 'top',
    font : "bold 52px Arial",
    text : 'Hello, world!',
    textAlign : 'left',
    width : 1024
  };

  $.extend(this.settings, overwrite);

  this._updateCanvas(0);
};

Canvas.prototype._cloneCanvas = function() {
  this.memoryCanvas.width = this.settings.width;
  this.memoryCanvas.height = this.settings.height;

  for(var i = 0; i < this.canvasArray.length - 2; i++){
    this.memoryCtx.drawImage(this.canvasArray[i], 0, 0);
  }

  this.bufferCtx.drawImage(this.memoryCanvas, 0, 0);
};

Canvas.prototype._clearCanvas = function(startingCmdId) {
  var self = this;

  for(var i = startingCmdId; i < this.ctxArray.length; i++) {
    this.ctxArray[i].globalAlpha = 1;
    this.ctxArray[i].clearRect(0, 0, self.settings.width, self.settings.height);
    this.ctxArray[i].fillStyle = '#ffffff';
    this.ctxArray[i].font = '' + self.settings.font + ', sans-serif';
  }

  this._wrapText(35, 82, 974, 58);
}

Canvas.prototype._updateCanvas = function(startingCmdId) {
  var self = this;

  self._clearCanvas(startingCmdId);
  switch (startingCmdId) {
    case 0:
      self._drawBackgroundImage();
      break;
    case 1:
      self._drawOverlay();
      break;
    case 2:
      self._drawText();
      break;
    case 3:
      self._drawLogoImage();
      break;
  }
};

// helpers
Canvas.prototype._drawBackgroundImage = function() {
  var self = this;
  if(typeof self.settings.backgroundImage !== undefined && self.settings.backgroundImage !== '') {
    var img = new Image();
    img.src = self.settings.backgroundImage;
    img.onload = function() {
      self._drawImageProp(img, 0, 0, self.settings.width, self.settings.height);
    }
  } else {
    self._drawOverlay();
  }
};

Canvas.prototype._drawLogoImage = function() {
  var self = this;
  if(typeof self.settings.logoImage !== undefined && self.settings.logoImage !== '') {
    var img = new Image();
    img.src = self.settings.logoImage;
    img.onload = function() {
      var x = self.settings.width - 50 - img.width;
      var y = self.settings.height - 40 - img.height;

      self.logoCtx.drawImage(img, x, y, img.width, img.height);
    }
  }

  self._cloneCanvas();
};

Canvas.prototype._drawOverlay = function() {
  var self = this;
  var color = this.settings.overlayColor;

  if(typeof color !== undefined && color !== '') {
    this.overlayCtx.globalAlpha = this.settings.opacity;
    this.overlayCtx.beginPath();
    this.overlayCtx.rect(0, 0, this.settings.width, this.settings.height);
    this.overlayCtx.fillStyle = this.settings.overlayColor;
    this.overlayCtx.fill();
    this.overlayCtx.globalAlpha = 1;
  }

  self._drawText();
};

Canvas.prototype._drawText = function() {
  var text = this.settings.text;

  this.textCtx.fillStyle = '#ffffff';
  this.textCtx.font = '' + this.settings.font;
  this._wrapText(35, 82, this.settings.width - 50, 58);
};

Canvas.prototype._drawImageProp = function(img, x, y, w, h, offsetX, offsetY) {
  var self = this;
  if (arguments.length === 1) {
    x = y = 0;
    w = this.backgroundCtx.canvas.width;
    h = this.backgroundCtx.canvas.height;
  }

  // default offset is center
  offsetX = typeof offsetX === 'number' ? offsetX : 0.5;
  offsetY = typeof offsetY === 'number' ? offsetY : 0.5;

  // keep bounds [0.0, 1.0]
  if (offsetX < 0) offsetX = 0;
  if (offsetY < 0) offsetY = 0;
  if (offsetX > 1) offsetX = 1;
  if (offsetY > 1) offsetY = 1;

  var iw = img.width,
      ih = img.height,
      r = Math.min(w / iw, h / ih),
      nw = iw * r,   // new prop. width
      nh = ih * r,   // new prop. height
      cx, cy, cw, ch, ar = 1;

  // decide which gap to fill
  if (nw < w) ar = w / nw;
  if (nh < h) ar = h / nh;
  nw *= ar;
  nh *= ar;

  // calc source rectangle
  cw = iw / (nw / w);
  ch = ih / (nh / h);

  cx = (iw - cw) * offsetX;
  cy = (ih - ch) * offsetY;

  // make sure source rectangle is valid
  if (cx < 0) cx = 0;
  if (cy < 0) cy = 0;
  if (cw > iw) cw = iw;
  if (ch > ih) ch = ih;

  // fill image in dest. rectangle
  this.backgroundCtx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
  self._drawOverlay();
};

Canvas.prototype._wrapText = function(x, y, maxWidth, lineHeight) {
  var self = this;
  var words = this.settings.text.toUpperCase().split(' ');
  var line = '';

  if(this.settings.textAlign == 'right') {
    x = this.settings.width - 35;
  } else if(this.settings.textAlign == 'center') {
    x = this.settings.width / 2;
  }
  this.textCtx.textAlign = this.settings.textAlign;

  if(this.settings.position == 'middle') {
    y = this.settings.height / 2;
  } else if(this.settings.position == 'bottom') {
    y = this.settings.height - 100;
  }

  for(var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = this.textCtx.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {

        this.textCtx.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      }
      else {
        line = testLine;
      }
  }

  this.textCtx.fillText(line, x, y);
  self._drawLogoImage();
};

// Misc
Canvas.prototype.getDataUrl = function() {
  return this.bufferCanvas.toDataURL('image/png');
};

Canvas.prototype.changeRatio = function(ratio) {
  this.settings.width = 1024;
  this.settings.height = 512;

  if(ratio === 'square') {
    this.settings.width = 600;
    this.settings.height = 600;
  }

  for(var i = 0; i < this.canvasArray.length; i++) {
    this.canvasArray[i].width = this.settings.width;
    this.canvasArray[i].height = this.settings.height;
  }

  this._updateCanvas(0);
};

// Text
Canvas.prototype.changeFont = function(font) {
  this.settings.font = font;

  this._updateCanvas(this.textCmdId);
};

Canvas.prototype.changeText = function(text) {
  this.settings.text = text;

  this._updateCanvas(this.textCmdId);
};

Canvas.prototype.changeTextAlignment = function(alignment) {
  this.settings.textAlign = alignment;

  this._updateCanvas(this.textCmdId);
};

Canvas.prototype.changeTextPosition = function(position) {
  this.settings.position = position;

  this._updateCanvas(this.textCmdId);
};

// Images
Canvas.prototype.changeBackgroundImage = function(imgstr) {
  this.settings.backgroundImage = imgstr;

  this._updateCanvas(this.backgroundCmdId);
};

Canvas.prototype.changeLogoImage = function(imgstr) {
  this.settings.logoImage = imgstr;

  this._updateCanvas(this.logoCmdId);
};

// Overlays
Canvas.prototype.changeOverlayOpacity = function(opacity) {
  this.settings.opacity = opacity

  this._updateCanvas(this.overlayCmdId);
};

Canvas.prototype.changeOverlayColor = function(color) {
  this.settings.overlayColor = color;

  this._updateCanvas(this.overlayCmdId);
};
