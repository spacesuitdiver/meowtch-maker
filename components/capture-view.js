// ready here serves a dual purpose to wait for DOM and not to litter global namespace
$(document).ready(function () {
  var viewOutlet = $('#capture-view-outlet');

  function render() {
    var webcamComponent = renderWebcam();

    var viewElement = $(`<div class="view capture-view text-center">`);
    viewElement.append(webcamComponent.element);
    viewElement.append(`<h1 class="text-light">Take Your Photo</h1>`);
    viewElement.append(`<p class="text-light">Let's find you some matches!</p>`);

    var captureButtonElement = $('<button class="btn btn-primary">Cachink!</button>');
    captureButtonElement.click(function() {
      var base64Image = webcamComponent.onCapture();
      userCardImageElement.attr('src' , base64Image);
    });
    viewElement.append(captureButtonElement);

    var comparisonElement = $('<div class="container mt-5">'); 
    var comparisonRowElement = $('<div class="row justify-content-around">');
    comparisonElement.append(comparisonRowElement);

    var userCardElement = $('<div class="card mx-2 col-md-4 p-0">');
    var userCardImageElement = $('<img class="card-img-top">');
    var userCardBodyElement = $(`
      <div class="card-body">
        <h5 class"card-title">You!</h5>
        <div class="card-text">
          <ul>
            <li>Age: 54</li>
            <li>Weight: 200lbs</li>
          </ul>
        </div>
    `);
    userCardElement.append(userCardImageElement, userCardBodyElement);

    var matchCardElement = $('<div class="card mx-2 col-md-4 p-0">');
    var matchCardImageElement = $('<img class="card-img-top">');
    var matchCardBodyElement = $(`
      <div class="card-body">
        <h5 class"card-title">Fido</h5>
        <div class="card-text">
          <ul>
            <li>Age: 54</li>
            <li>Weight: 200lbs</li>
          </ul>
        </div>
    `);
    matchCardElement.append(matchCardImageElement, matchCardBodyElement);

    comparisonRowElement.append(userCardElement, matchCardElement);

    viewElement.append(comparisonElement);

    viewOutlet.append(viewElement);
  }

  // an easy "global" way to handle navigation state across views
  function route() {
    $(window).bind('hashchange', route);

    if (window.location.hash === '#/capture') {
      viewOutlet.children('.view').fadeIn();
    } else {
      viewOutlet.children('.view').hide();
    }
  };

  function init() {
    render();
    route();
  };

  init();

});
