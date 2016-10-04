
var Windows = function() {
    this.browser = new Image();
    this.browser.src = './images/chrome.png';

    this.canvas = document.createElement('canvas');
   this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.style.position = "fixed";
    this.canvas.style.top = '0px';
    this.canvas.style.left = '0px';
   this.ctx.globalAlpha = 0.4;
    //this.ctx.globalCompositeOperation = "difference";
   // this.ctx.globalCompositeOperation = "exclusion";
    document.body.appendChild(this.canvas);

     this.browser.onload = function(){
      
    }.bind(this);
    this.offset = 0;
    this.offsetCoords = [0, 0, window.innerWidth, window.innerHeight];
};

Windows.prototype.resize = function(){
   this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
};

Windows.prototype.getCoords = function(dir, off){
   var w = window.innerWidth - off;
  var h = w * window.innerHeight/window.innerWidth;
  var x = (window.innerWidth - w)/2 + dir[0]*50;
  var y = (window.innerHeight - h)/2 + dir[1]*50;
  return ([x, y, w, h]);
}
Windows.prototype.render = function(dir, offset){
 // this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
 // this.ctx.save();
 
 var o;
 //for(var i = 0; i < offset; i+=10){
   var o = this.getCoords(dir, offset);
   
    this.ctx.drawImage(this.browser, o[0], o[1], o[2], o[3]);
    
    this.offsetCoords = o;
//  }

 // this.offset++;
};



module.exports = Windows;