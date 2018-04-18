// ready here serves a dual purpose to wait for DOM and not to litter global namespace
$(document).ready(function () {
  var template = $('<div class="view capture-view text-center" style="display: none">');
  template.append('<img src="images/logo.gif" alt="" class="logo">');
  template.append('<h1 class="text-light">Meowtch Maker!</h1>');
  template.append('<p class="text-light">Find your prrrrfect match.</p>');

  var captureButton = $('<button class="btn btn-primary">Cachink!</button>');
  template.append(captureButton);

  $('#capture-view-outlet').append(template);

  function init() {
    route();
    $('#main-view-outlet').append(template);
  }

  function route() {
    $(window).bind('hashchange', route);

    if (window.location.hash === '#/capture') {
      template.fadeIn();
    } else {
      template.hide();
    }
  };

  init(); 
});
