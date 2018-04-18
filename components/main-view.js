// ready here serves a dual purpose to wait for DOM and not to litter global namespace
$(document).ready(function () {

  var template = $('<div class="view main-view text-center">');
  template.append('<img src="images/logo.gif" alt="" class="logo">');
  template.append('<h1 class="text-light">Meowtch Maker!</h1>');
  template.append('<p class="text-light">Find your prrrrfect match.</p>');

  var readyButton = $('<button id="ready-button" class="btn btn-primary">Ready?</button>');
  template.append(readyButton);

  readyButton.click(function() {
    window.location.hash = '/capture';
  });

  function init() {
    route();
    $('#main-view-outlet').append(template);
  }

  function route() {
    $(window).bind('hashchange', route);

    if (!window.location.hash) {
      template.fadeIn();
    } else {
      template.hide();
    }
  };

  init();  

});

