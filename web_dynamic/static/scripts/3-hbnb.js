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
  dataType: 'json'
})
  .done(function (data) {
    data.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    data.forEach((place) => {
      const article = $(document.createElement('article'));
      const h2 = $(document.createElement('h2').text(place.name));
      article.append(h2);
      const priceDiv = $(document.createElement('div')).addClass('price_by_night');
      const price = $(document.createElement('p')).text(`$${place.price_by_night}`);
      priceDiv.append(price);
      article.append(priceDiv);
      const infoDiv = $(document.createElement('div')).addClass('information');
      const guestDiv = $(document.createElement('div')).addClass('max_guest');
      const guestImg = $(document.createElement('div')).addClass('guest_image');
      const guest = $(document.createElement('p')).text(`${place.max_guest} Guests`);
      guestDiv.append(guestImg);
      guestDiv.append(guest);
      infoDiv.append(guestDiv);
      const numRoomsDiv = $(document.createElement('div')).addClass('number_rooms');
      const roomImg = $(document.createElement('div')).addClass('bed_image');
      const room = $(document.createElement('p')).text(`${place.number_rooms} Rooms`);
      numRoomsDiv.append(roomImg);
      numRoomsDiv.append(room);
      infoDiv.append(numRoomsDiv);
      const bathroomsDiv = $(document.createElement('div')).addClass('number_bathrooms');
      const bathroomImg = $(document.createElement('div')).addClass('bathroom_image');
      const bathroom = $(document.createElement('p')).text(`${place.number_bathrooms} Bathrooms`);
      bathroomsDiv.append(bathroomImg);
      bathroomsDiv.append(bathroom);
      infoDiv.append(bathroomsDiv);
      article.append(infoDiv);
      const descriptionDiv = $(document.createElement('div')).addClass('description');
      const description = $(document.createElement('p')).html(place.description);
      descriptionDiv.append(description);
      article.append(descriptionDiv);
      $('section.places').append(article);
    });
  });
