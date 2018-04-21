// ready here serves a dual purpose to wait for DOM and not to litter global namespace
$(document).ready(function () {
  var viewOutlet = $('#capture-view-outlet');

  function render() {
    var webcamComponent = renderWebcam();

    var viewElement = $(`<div class="view capture-view">`);

    var captureElement = $(`<div class="container text-center my-5">`);
    captureElement.append(webcamComponent.element);
    captureElement.append(`<h1 class="text-light">Say Cheese!</h1>`);
    captureElement.append(`<p class="text-light">And let's find your pal.</p>`);

    var captureButtonElement = $('<button class="btn-lg btn-primary mt-3">Cachink!</button>');
    captureButtonElement.click(function() {
      var base64Image = webcamComponent.onCapture();
      userCardImageElement.attr('src' , base64Image);
    });
    captureElement.append(captureButtonElement);

    var comparisonElement = $('<div class="container my-5">'); 
    var comparisonRowElement = $('<div class="row justify-content-around">');
    comparisonElement.append(comparisonRowElement);

    var userCardElement = $('<div class="card mx-2">');
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
    userCardElement = userCardElement.wrap('<div class="col-sm-5 mb-5">').parent();

    var matchCardElement = $('<div class="card mx-2">');
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
    matchCardElement = matchCardElement.wrap('<div class="col-sm-5 mb-5">').parent();

    comparisonRowElement.append(userCardElement, matchCardElement);

    viewElement.append(captureElement, comparisonElement);

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
