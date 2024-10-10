//for upload code 
document.addEventListener('DOMContentLoaded', function() {
    const h2Elements = document.querySelectorAll('.maindiv h2');
    const linkContainer = document.getElementById('links-container');
    linkContainer.addEventListener('click', function(event) {
    if (event.target.tagName === 'A') {
      event.preventDefault();
      const currentURL = event.target.getAttribute('href');
      h2Elements.forEach(h2Element => {
        h2Element.addEventListener('click', function(event) {
          event.preventDefault();
          const h2Value = h2Element.textContent;
          const h2Element_a = h2Element.querySelector('a');
          h2Element_a.style.color = "#f2f2f2" ;
          let storedValue = h2Value;
     if(currentURL == event.target.getAttribute('href')){
      updatePage(storedValue, currentURL);
     }
    });});};});
    function updatePage(page, currentURL) {
     if (currentURL) {
        const url = new URL(currentURL);
        url.searchParams.set('Manish_search', page);
        window.location.href = url.toString();
       };
    };
});