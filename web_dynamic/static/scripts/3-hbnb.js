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

$.ajax({
  type: 'POST',
  url: 'http://0.0.0.0:5001/api/v1/places_search/',
  contentType: 'application/json',
  data: '{}',
  dataType: 'json'
})
  .done(function (data) {
    data.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    data.forEach(function (place) {
      let info = ` 
        <article>
          <div class="title">
            <h2>${place.name}</h2>
            <div class="price_by_night">
              ${place.price_by_night}
            </div>
          </div>
          <div class="information">
            <div class="max_guest">
              <i class="fa fa-users fa-3x" aria-hidden="true"></i>
              <br />
              ${place.max_guest} Guests
            </div>
            <div class="number_rooms">
              <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
              <br />
              ${place.number_rooms} Bedrooms
            </div>
            <div class="number_bathrooms">
              <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
              <br />
              ${place.number_bathrooms} Bathroom
            </div>
          </div>
          <div class="description">
            ${place.description}
          </div>
      </article>
      `;
      $('section.places').append(info);
    });
  });
