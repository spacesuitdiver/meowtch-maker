// ready here serves a dual purpose to wait for DOM and not to litter global namespace
$(document).ready(function () {
  var viewOutlet = $('#main-view-outlet');

  function render() {
    var template = $('<div class="view main-view text-center">');
    template.append('<img src="images/logo.gif" alt="" class="logo mb-3">');
    template.append('<h1 class="text-light">Meowtch Maker</h1>');
    template.append('<p class="text-light">Find your prrrrfect pet.</p>');

    var readyButton = $('<button id="ready-button" class="btn-lg btn-primary mt-3">Ready?</button>');
    template.append(readyButton);

    readyButton.click(function() {
      window.location.hash = '/capture';
    });

    viewOutlet.append(template);
  }

  // an easy "global" way to handle navigation state across views
  function route() {
    $(window).bind('hashchange', route);

    if (!window.location.hash) {
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

