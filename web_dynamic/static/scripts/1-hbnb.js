$(document) () => {
  let checks = {};
  $('input[type=checkbox]').click(
    function (){
      if (this.checked) {
        let id = this.dataset.id;
        checks[id] = this.dataset.name;
      } else {
        delete checks[this.dataset.id];
      }
    });
  $('.amenities h4').text(Object.values(checks))
}