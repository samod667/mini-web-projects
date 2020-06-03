const userInput = document.getElementById('filter-input');
const names = [...document.querySelectorAll('.collection-item')];
const headers = [...document.querySelectorAll('.collection-header')];
const newContactBtn = document.getElementById('contact-form');

//Add event listener
userInput.addEventListener('keyup', filterName);
newContactBtn.addEventListener('submit', e => {
    e.preventDefault();
    addNewContact();
})

//Filter function
function filterName(){
    const value = this.value.toUpperCase();
    names.forEach(name => {
       if (name.textContent.toUpperCase().includes(value)){
          name.style.display = '';
       } else {
           name.style.display = 'none';
       }
    });
}

function addNewContact() {
    //Add the new contact to the ul list
    const newContact = userInput.value;
    console.log(newContact)
    //display contact on UI
    const markup = `
        <li class="collection-item">
                <a href="#">${newContact}</a>
            </li>
    `
    headers.forEach(letter => {
        if (newContact.charAt(0).toUpperCase() === letter.innerText) {
            letter.insertAdjacentHTML("afterend", markup)
        } else {
            const newHeader = `
                <li class="collection-header"><h5>${newContact.charAt(0).toUpperCase()}</h5></li>
            `
            document.getElementById('names').insertAdjacentHTML('beforeend', newHeader);
            // headers.sort()
        }
    })
    //clear search form
    userInput.value = '';
}

