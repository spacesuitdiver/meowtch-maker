// ready here serves a dual purpose to wait for DOM and not to litter global namespace
$(document).ready(function() {
  var template = `
  <h3>sayy cheese!</h3>
  <div class="camera">
    <video id="video">Video stream not available.</video>
    <button id="startbutton">Take photo</button>
  </div>
  <div class="output">
    <img id="photo" alt="The screen capture will appear in this box.">
  </div>
  `;

  $("#webcam").append(template);

  var width = 320; // We will scale the photo width to this
  var height = 0; // This will be computed based on the input stream

  var streaming = false;

  var video = null;
  var canvas = null;
  var photo = null;
  var startbutton = null;

  function startup() {
    video = document.getElementById("video");
    canvas = document.createElement("canvas");
    photo = document.getElementById("photo");
    startbutton = document.getElementById("startbutton");
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(function(stream) {
        video.srcObject = stream;
        video.play();
      })
      .catch(function(err) {
        console.log("An error occured! " + err);
      });
    video.addEventListener(
      "canplay",
      function(e) {
        if (e.target && e.target.id === "video") {
          if (!streaming) {
            height = video.videoHeight / (video.videoWidth / width);
            video.setAttribute("width", width);
            video.setAttribute("height", height);
            canvas.setAttribute("width", width);
            canvas.setAttribute("height", height);
            streaming = true;
          }
        }
      },
      false
    );
    startbutton.addEventListener(
      "click",
      function(ev) {
        takepicture();
        ev.preventDefault();
      },
      false
    );
    clearphoto();
  }

  function clearphoto() {
    var context = canvas.getContext("2d");
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL("image/png");
    photo.setAttribute("src", data);
  }

  function takepicture() {
    var context = canvas.getContext("2d");
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      var data = canvas.toDataURL("image/png");
      photo.setAttribute("src", data);
    } else {
      clearphoto();
    }
  }

  startup();
});
