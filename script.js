const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();
let ticketPrice = +movieSelect.value;


//save selected movie index and price
//ローカルに映画番号と価格を保存する　ファンクを定義
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}



//update seat count and price total on the bottom
//選択した席を数えて下の文に価格と一緒に表示する　ファンクを定義
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    console.log(selectedSeats);


    //ローカルに選択した席の番号を保存する
    const seatsIndex = [...selectedSeats].map(function (seat){
        return [...seats].indexOf(seat);
    });
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex)) //arrayだとだめだからJSONをやるらしい


    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}



//get data from localstorage and populate the UI
//ローカルに保存したデータをもとに選択を画面に表示する　ファンクを定義
function populateUI(){
    
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')); //JSONからarrayに戻してローカルから取得
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex != null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }

}



//movie select event
//映画を選択したときに起こることを設定
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})


container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
    }

    updateSelectedCount();
})


//ページがリロードするたびにこれを実行
updateSelectedCount()