require('webrtc-adapter');

var Camera = function() {
    this.video = document.createElement('video');
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

     try {
        navigator.getUserMedia({video:true}, function(stream){
          console.log("got stream!")
          this.video.srcObject = stream;
          this.video.play();
          this.canvas.width = 512;
          this.canvas.height = 512;

       //  document.body.appendChild(this.canvas);
         // document.body.appendChild(this.video);
          
        }.bind(this), 
          function(e){
          console.log("ERROR GETTING MEDIA", e)

        });
    //trace("Requested access to local media");
    } catch (e) {
      console.log("getUserMedia error " + e);
    //trace_e(e, "getUserMedia error");
    }
    
};

Camera.prototype.update = function(){
    this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
};



module.exports = Camera;