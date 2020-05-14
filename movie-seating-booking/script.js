const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const restSelection = document.getElementById("reset");
let ticketPrice = +movieSelect.value;

populateUI();

//SAVE SELECTED MOVIE INDEX AND PRICE:
function setMovieData(index, price) {
    localStorage.setItem('selectedMovieIndex', index)
    localStorage.setItem('selectedMoviePrice', price)
};

//UPDATE TOTAL COUNT
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map(seat => {
      return [...seats].indexOf(seat)
  })

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}
//SEAT CLICK EVENT
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
  }

  updateSelectedCount();
});

//GET DATA FROM LOCAL STORAGE AND POPULATE UI

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
};

//MOVIE SELECT EVENT
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

//RESET EVENT
restSelection.addEventListener("click", e => {
    seats.forEach(element => {
        if (element.classList.contains('selected')) {
            element.classList.remove('selected')
        }
    })
    
    updateSelectedCount()
});

// INITIAL COUNT AND TOTAL SET
updateSelectedCount()
