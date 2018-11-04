(function () {

  const artistText = document.querySelectorAll('.sidebar__info span');

  Array.prototype.map.call(artistText, (text) => {
    console.log(text.innerHTML.length)
    while(text.innerHTML.length > 10) {
      return text.innerHTML.replace(/\W*\s(\S)*$/, '...');
    }
  
  });

})();