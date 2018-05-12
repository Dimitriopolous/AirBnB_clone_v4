let amenityCheck = {};
$(() => {
  $('input[type=checkbox]').click(function () {
    if (this.checked) {
      amenityCheck[this.dataset.id] = this.dataset.name;
    } else {
      delete amenityCheck[this.dataset.id];
    }
    $('.amenities h4').text(Object.values(amenityCheck).join(', '));
  });
});
