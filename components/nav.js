// ready here serves a dual purpose to wait for DOM and not to litter global namespace
$(document).ready(function () {
  var template = `
    <nav class="navbar fixed-top navbar-dark bg-dark">
      <a class="navbar-brand" href="#">
        <img src="images/logo.gif" width="30" height="30" class="d-inline-block align-top" alt="">
        Meowtch Maker
      </a>
    </nav>
  `;

  $('#nav').append(template);
});
