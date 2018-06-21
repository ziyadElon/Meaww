// Prefer camera resolution nearest to 1280x720.
var constraints = { audio: true, video: true }; 

var mediaRecorder;
var video = document.querySelector('video');
var stopBtn = document.querySelector('#stop-button');
const startBtn = document.querySelector('#start-rec');
var camBtn = document.querySelector('#camera-button');
const vidOverlay = document.querySelector('#video-overlay');
const newRecBtn = document.querySelector('#new-rec');

//Turn webcam and mic on
camBtn.onclick = function(){

  navigator.mediaDevices.getUserMedia(constraints)
  .then(function(mediaStream) {
    video.srcObject = mediaStream;
    video.play();
    video.controls = false;
    mediaRecorder = new MediaRecorder(mediaStream);
    //mediaRecorder.start();
    console.log(mediaRecorder.state);
    startBtn.className = "btn";
    stopBtn.className = "btn";
    camBtn.className = "hidden";
    //start recording
    startBtn.onclick = function(){
      mediaRecorder.start();
      vidOverlay.style.display = "block"; 
        video.play();
        startBtn.className = "hidden";  
        //video.onpause = stopRecording();
        stopBtn.onclick = function(){
            let tracks = mediaStream.getTracks();  // if only one media track
            tracks.forEach(function(track){
              track.stop();
            });
            mediaRecorder.stop();
            vidOverlay.style.display = "none";
            stopBtn.style.display = "none";
            newRecBtn.className = "btn";
            console.log(mediaRecorder.state);
            video.controls = true;
        };
        mediaRecorder.ondataavailable = function(e) {
          chunks.push(e.data); 
        }    
        mediaRecorder.onstop = function(e) {
          //console.log("data available after MediaRecorder.stop() called.");
          var blob = new Blob(chunks);
          console.log(blob.size);
          var videoURL = window.URL.createObjectURL(blob);
          //audio.src = videoURL;
          video.srcObject = null;
          video.src = videoURL;
          console.log("recorder stopped");
        }
      //};
    }
    /*
    video.onpause = function(){
      mediaRecorder.pause();  
    }
    */
  })
  .catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.
camBtn.children[0].className= "fa fa-eye";
} 

/*
var camOffBtn = document.querySelector('#camera-turn-off');
camOffBtn.onclick = function(){
  let tracks = mediaStream.getTracks();  // if only one media track
  tracks.forEach(function(track){
    track.stop();
  });
  this.id="camera-button";
}
*/
var chunks = [];

newRecBtn.onclick = function() {
  window.location.reload();
}

