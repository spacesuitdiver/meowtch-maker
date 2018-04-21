// ready here serves a dual purpose to wait for DOM and not to litter global namespace

var data;

function renderWebcam() {

  var camera = $('<div class="camera mb-3">');
  var video = $('<video>Video stream not available.</video>');
  camera.append(video);

  var photo = $('<img id="photo" alt="The screen capture will appear in this box.">');

  var width = 400; // We will scale the photo width to this
  var height = 0; // This will be computed based on the input stream

  var streaming = false;
  var canvas = document.createElement("canvas");

  function init() {
    // video = document.getElementById("video");
    // photo = document.getElementById("photo");
    // startbutton = document.getElementById("startbutton");

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(function(stream) {
        video[0].srcObject = stream;
        video[0].play();
      })
      .catch(function(err) {
        console.log("An error occured! " + err);
      });

    video[0].addEventListener(
      "canplay",
      function(e) {
        if (!streaming) {
          height = video[0].videoHeight / (video[0].videoWidth / width);
          video[0].setAttribute("width", width);
          video[0].setAttribute("height", height);
          canvas.setAttribute("width", width);
          canvas.setAttribute("height", height);
          streaming = true;
        }
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
    photo[0].setAttribute("src", data);
  }

  function capture() {
    var context = canvas.getContext("2d");

    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video[0], 0, 0, width, height);
      //image data
      var data = canvas.toDataURL();

      return data;

    } else {
      clearphoto();
    }
  }

  init();

  return {
    element: camera,
    capture: capture, 
  };

}
