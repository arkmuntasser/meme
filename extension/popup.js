if(memeImageUrl !== "") {
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

  memeImageUrl = memeImageUrl.replace("http:", "");
  memeImageUrl = memeImageUrl.replace("https:", "");

  convertImgToDataURLviaCanvas(memeImageUrl, function(base64Img){
    console.log
    c.changBackgroundImage(base64Img);
  });
}

document.getElementById('memeMakerExtension').classList.toggle("hide");
