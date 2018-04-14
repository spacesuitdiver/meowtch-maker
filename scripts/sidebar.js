// ready here serves a dual purpose to wait for DOM and not to litter global namespace
$(document).ready(function () {
  var template = `
    <h2>
      Sidebar
    </h2>
  `;

  $('#sidebar').append(template);
});
