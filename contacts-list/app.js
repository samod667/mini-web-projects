const userInput = document.getElementById('filter-input');
const names = [...document.querySelectorAll('.collection-item')];
const headers = [...document.querySelectorAll('.collection-header')];
const newContactBtn = document.getElementById('contact-form');
const btn = document.getElementById('new-contact-btn');

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
            letter.insertAdjacentHTML("afterend", markup);
        }
    });

    //clear search form
    userInput.value = '';
    // newContactBtn.reset()

    //Refresh UI

}

