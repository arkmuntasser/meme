var Canvas = function(overwrite) {
  this.canvas = document.getElementById('canvas');
  this.context = this.canvas.getContext('2d');

  this.bufferCanvas = document.getElementById('canvas-buffer');
  this.bufferContext = this.bufferCanvas.getContext('2d');

  this.stack = {
    'background' : false,
    'overlay' : false,
    'text' : true,
    'logo' : false
  };
  this.hold = false;
  this.loop = 0;

  this.settings = {
    backgroundImage : '',
    height : 512,
    logoImage : '',
    opacity : 0.5,
    order : ['background', 'overlay', 'text', 'logo'],
    overlayColor : 'transparent',
    position : 'top',
    text : 'Hello, world!',
    textAlign : 'left',
    width : 1024
  };

  $.extend(this.settings, overwrite);

  this._clearCanvas();
  this._cloneCanvas();
};

Canvas.prototype._cloneCanvas = function() {
  this.bufferCanvas.width = this.settings.width;
  this.bufferCanvas.height = this.settings.height;

  this.bufferContext.drawImage(this.canvas, 0, 0);
};

Canvas.prototype._clearCanvas = function() {
  this.context.globalAlpha = 1;
  this.context.beginPath();
  this.context.rect(0, 0, this.settings.width, this.settings.height);
  this.context.fillStyle = '#ccc';
  this.context.fill();
  this.context.fillStyle = '#ffffff';
  this.context.font = 'bold 52px Helvetica Neue, Helvetica, Arial, sans-serif';
  this._wrapText(35, 82, 974, 58);
}

Canvas.prototype.updateCanvas = function() {
  var self = this;
  var count = self._getTransformationCount();
  var tracker = -1;
  self.loop = 0;

  self._clearCanvas();
  var renderer = window.setInterval(function() {
    tracker++;

    if(!self.hold && self.loop < count) {
      self.hold = true;

      if(self.settings.order[self.loop] !== undefined && self.stack[self.settings.order[self.loop]]) {
        tracker = 0;

        switch (self.settings.order[self.loop]) {
          case 'background':
            self._drawBackgroundImage();
            break;
          case 'overlay':
            self._drawOverlay();
            break;
          case 'text':
            self._drawText();
            break;
          case 'logo':
            self._drawLogoImage();
            break;
          default:
            self._clearCanvas();
        }
      }

      self.loop++;
    }

    if(self.loop >= count) {
      window.clearInterval(renderer);
      self._cloneCanvas();
    }

    self.hold = tracker >= 5 ? false : true;
  }, 10);
};

Canvas.prototype._getTransformationCount = function() {
  var self = this;
  var count = 0;

  for(key in self.stack) {
    if(key) {
      count++;
    }
  }

  return count;
};

// helpers
Canvas.prototype._drawBackgroundImage = function() {
  var self = this;
  if(typeof self.settings.backgroundImage !== undefined && self.settings.backgroundImage !== '') {
    var img = new Image();
    img.src = self.settings.backgroundImage;
    img.onload = function() {
      self._drawImageProp(img, 0, 0, self.settings.width, self.settings.height);

      self.hold = false;
    }
  } else {
    self.hold = false;
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

      self.context.drawImage(img, x, y, img.width, img.height);

      self.hold = false;
      self._cloneCanvas();
    }
  } else {
    self.hold = false;
  }
};

Canvas.prototype._drawOverlay = function() {
  var color = this.settings.overlayColor;

  if(typeof color !== undefined && color !== '') {
    this.context.globalAlpha = this.settings.opacity;
    this.context.beginPath();
    this.context.rect(0, 0, this.settings.width, this.settings.height);
    this.context.fillStyle = this.settings.overlayColor;
    this.context.fill();
    this.context.globalAlpha = 1;
  }

  this.hold = false;
};

Canvas.prototype._drawText = function() {
  var text = this.settings.text;

  this.context.fillStyle = '#ffffff';
  this._wrapText(35, 82, this.settings.width - 50, 58);

  this.hold = false;
};

Canvas.prototype._drawImageProp = function(img, x, y, w, h, offsetX, offsetY) {
  if (arguments.length === 1) {
    x = y = 0;
    w = this.context.canvas.width;
    h = this.context.canvas.height;
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
  this.context.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
};

Canvas.prototype._wrapText = function(x, y, maxWidth, lineHeight) {
  var words = this.settings.text.toUpperCase().split(' ');
  var line = '';

  if(this.settings.textAlign == 'right') {
    x = this.settings.width - 35;
  } else if(this.settings.textAlign == 'center') {
    x = this.settings.width / 2;
  }
  this.context.textAlign = this.settings.textAlign;

  if(this.settings.position == 'middle') {
    y = this.settings.height / 2;
  } else if(this.settings.position == 'bottom') {
    y = this.settings.height - 100;
  }

  for(var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = this.context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {

        this.context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      }
      else {
        line = testLine;
      }
  }

  this.context.fillText(line, x, y);
};

// Misc
Canvas.prototype.getDataUrl = function() {
  return this.canvas.toDataURL('image/png');
};

Canvas.prototype.changRatio = function(ratio) {
  this.settings.width = 1024;
  this.settings.height = 512;

  if(ratio === 'square') {
    this.settings.width = 600;
    this.settings.height = 600;
  }

  this.canvas.width = this.settings.width;
  this.canvas.height = this.settings.height;

  this.updateCanvas();
  this._cloneCanvas();
};

// Text
Canvas.prototype.changText = function(text) {
  this.settings.text = text;

  this.updateCanvas();
};

Canvas.prototype.changeTextAlignment = function(alignment) {
  this.settings.textAlign = alignment;

  this.updateCanvas();
};

Canvas.prototype.changeTextPosition = function(position) {
  this.settings.position = position;

  this.updateCanvas();
};

// Images
Canvas.prototype.changBackgroundImage = function(imgstr) {
  this.settings.backgroundImage = imgstr;
  this.stack['background'] = true;

  this.updateCanvas();
};

Canvas.prototype.changLogoImage = function(imgstr) {
  this.settings.logoImage = imgstr;
  this.stack['logo'] = true;

  this.updateCanvas();
};

// Overlays
Canvas.prototype.changeOverlayOpacity = function(opacity) {
  this.settings.opacity = opacity

  this.updateCanvas();
};

Canvas.prototype.changOverlayColor = function(color) {
  this.settings.overlayColor = color;
  this.stack['overlay'] = true;

  this.updateCanvas();
};
