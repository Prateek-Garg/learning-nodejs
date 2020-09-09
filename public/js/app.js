
const eform = document.querySelector('form');
const search = document.querySelector('input');

eform.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        // if(data.body.error) {
        //     console.log(error)
        // } else {
            console.log(data)
        // }
    })
})
})