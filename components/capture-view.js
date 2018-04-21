// ready here serves a dual purpose to wait for DOM and not to litter global namespace
$(document).ready(function () {
  var viewOutlet = $('#capture-view-outlet');
  var viewElement = $(`<div class="view capture-view">`);
  var webcamComponent = renderWebcam();

  function render() {
    renderCapture().appendTo(viewElement);

    return viewElement;
  }

  function renderCapture() {
    var captureElement = $(`<div class="container text-center my-5">`);
    captureElement.append(webcamComponent.element);
    captureElement.append(`<h1 class="text-light">Say Cheese!</h1>`);
    captureElement.append(`<p class="text-light">And let's find your pal.</p>`);

    renderCaptureButton().appendTo(captureElement);

    return captureElement;
  }

  function renderCaptureButton() {
    var captureButtonElement = $('<button class="btn-lg btn-primary mt-3">Cachink!</button>');
    captureButtonElement.click(function () {
      var base64ImageFromWebcam = webcamComponent.capture();

      getRandomPet('cat')
      .then(function(randomPetResponse) {
        comparePetImageToHumanBase64(randomPetResponse.image, base64ImageFromWebcam)
        .then(function(compareResponse) {
          var human = {
            name: 'You!',
            image: base64ImageFromWebcam,
            age: compareResponse.human.age,
            gender: compareResponse.human.gender,
            // emotion: compareResponse.human.emotion,
          }

          var pet = {
            name: randomPetResponse.name,
            image: randomPetResponse.image,
            age: randomPetResponse.age,
            gender: randomPetResponse.gender,
            // emotion: compareResponse.pet.emotion,
          }

          $('#comparison').remove();
          renderComparison(human, pet).appendTo(viewElement);

        });
      })
     .catch(function (error) {
        alert('oh noes something broke! just try again, the cats behind the counter will fix.');
        console.error(error);
     });
    });

    return captureButtonElement;
  }

  function renderComparison(human, pet) {
    // comparison cards
    var comparisonElement = $('<div id="comparison" class="container my-5">'); 
    var comparisonRowElement = $('<div class="row justify-content-around">');
    comparisonRowElement.appendTo(comparisonElement);

    renderCard(human).appendTo(comparisonRowElement); 
    renderCard(pet).appendTo(comparisonRowElement); 

    resultRowElement = $(`
      <div class="row justify-center">
        <marquee class="text-light"><h2>${matchAnalysis(human, pet)}</h2></marquee>
      </div>
    `);
    resultRowElement.appendTo(comparisonElement);

    return comparisonElement;
  }

  function renderCard(data) {
    var cardElement = $(`
      <div class="col-sm-5 mb-5">
        <div class="card mx-2">
          <img class="card-img-top" src="${data.image}">
          <div class="card-body">
            <h5 class"card-title">${data.name}</h5>
            <div class="card-text">
              <ul>
                <li>Age: ${data.age}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `);

    return cardElement;
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
    render().appendTo(viewOutlet);
    route();
  };

  init();

});
