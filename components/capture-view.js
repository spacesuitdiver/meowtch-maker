// ready here serves a dual purpose to wait for DOM and not to litter global namespace
$(document).ready(function () {
  var viewOutlet = $('#capture-view-outlet');

  function render() {
    var template = $('<div class="view capture-view text-center">');
    template.append('<img src="images/logo.gif" alt="" class="logo">');
    template.append('<h1 class="text-light">Meowtch Maker!</h1>');
    template.append('<p class="text-light">Find your prrrrfect match.</p>');

    var captureButton = $('<button class="btn btn-primary">Cachink!</button>');
    template.append(captureButton);

    viewOutlet.append(template);
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
