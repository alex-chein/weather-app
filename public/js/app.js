const form = document.querySelector('form');
const message1 = document.querySelector('#message1');
const message2 = document.querySelector('#message2');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const address = this.search.value.trim();
    message2.textContent = '';

    if(!address) return message1.textContent = 'Please provide a location.';

    message1.textContent = 'Loading...';

    fetch(`/weather?address=${address}`)
        .then((res) => res.json())
        .then(({ error, location, forecast } = { error: 'Server error. Please try again later.' }) => {
            if(error) return message1.textContent = error;

            message1.textContent = location;
            message2.textContent = forecast;
            this.search.value =  '';
        })
        .catch((err) => console.log(err));
});