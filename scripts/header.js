// ready here serves a dual purpose to wait for DOM and not to litter global namespace
$(document).ready(function () {
  var template = `
    <h1>Welcome to Meowtch Maker!</h1>
  `;

  $('#header').append(template);
});
