$.get(('http://0.0.0.0:5001/api/v1/status/'), function (data) {
  if (data.status === 'OK') {
    $('#api_status').addClass('available');
  }
});

let checks = {};
$(() => {
  $('input[type=checkbox]').click(function () {
    if (this.checked) {
      checks[this.dataset.id] = this.dataset.name;
    } else {
      delete checks[this.dataset.id];
    }
    $('.amenities h4').text(Object.values(checks).join(', '));
  });
});
