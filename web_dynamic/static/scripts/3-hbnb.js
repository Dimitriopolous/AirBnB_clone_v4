$.get(('http://0.0.0.0:5001/api/v1/status/'), function (data, status) {
  if (status === 200) {
    $('DIV#api_status').addClass('available');
  } else {
    $('DIV#api_status').removeClass('available');
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

$.ajax({
  type: 'POST',
  url: 'http://0.0.0.0:5001/api/v1/places_search/',
  contentType: 'application/json',
  data: '{}',
  dataType: 'json',
  success: function (data) {
    $('section.places').append(
      $('<article>')
    );
  }
});
