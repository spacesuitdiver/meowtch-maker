// ready here serves a dual purpose to wait for DOM and not to litter global namespace
$(document).ready(function () {
  var template = `
    <p>
      Main
    </p>
  `;


  $('#main').append(template);
});
