// ready here serves a dual purpose to wait for DOM and not to litter global namespace
$(document).ready(function () {
  var template = `
    <div class="header text-center">
      <img src="images/logo.gif" alt="" class="logo">
      <h1>Meowtch Maker!</h1>
      <p>Find your prrrrfect match.</p>
      <button id="ready-button" class="btn btn-primary">Ready?</button>
    </div>
  `;

  $('#header').append(template);
});
