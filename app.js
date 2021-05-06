

let scores, roundScore, activePlayer;

// létrehoztuk az új játék függvényt
function init() {
  // a két játékos pontszáma egy két elemű tömbben lesz tárolva
  // az első elem az első játékos pontszámam a második elem a második játékos pontszáma
  scores = [0, 0];

  // az aktuális játékos kör alatt megszerzett pontjai
  roundScore = 0;

  // mindig az első játékos kezd
  activePlayer = 0;

  // beállítjuk a kezdő értékeket a UI-on is
  document.querySelector('#score-0').textContent = 0;
  document.querySelector('#score-1').textContent = 0;

  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;

  // a játék kezdetekor a kockát eltüntetjük:
  // inline style-t adunk hozzá az img-hez...
  // document.querySelector('.dice').style.display = 'none';
  document.querySelector('#dice-1').style.display = 'none';
  document.querySelector('#dice-2').style.display = 'none';
  // a gombokat megjelenítjük
  document.querySelector('.btn-roll').style.display = 'block';
  document.querySelector('.btn-hold').style.display = 'block';

  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.add('winner');
}


// meghívjuk az új játék függvényt
init();
document.querySelector('.btn-new').addEventListener('click', init);

// ha a roll dice gombra kattint a user
document.querySelector('.btn-roll').addEventListener('click', function () {
  // generálunk egy random számot 1 és 6 között
  // let dice = Math.floor(Math.random() * 6) + 1;
  let dice1 = Math.floor(Math.random() * 6) + 1;
  let dice2 = Math.floor(Math.random() * 6) + 1;
  // az eredményt megjelenítjük a UI-on:
  // let diceDOM = document.querySelector('.dice');
  // diceDOM.style.display = 'block';
  let dice1DOM = document.querySelector('#dice-1');
  dice1DOM.style.display = 'block';
  let dice2DOM = document.querySelector('#dice-2');
  dice2DOM.style.display = 'block';
  //string concatenation, szöveg összefűzés (a két + közötti rész beillesztődik a szövegbe)
  // diceDOM.setAttribute('src', 'dice-' + dice + '.png');
  dice1DOM.setAttribute('src', 'dice-' + dice1 + '.png');
  dice2DOM.setAttribute('src', 'dice-' + dice2 + '.png');

  // ha a játékos 1-est dob, a roundScore értékét elveszti és a következő játékos jön
  if (dice1 !== 1 && dice2 !== 1) {
    // a dobott értéket kiszámoljuk majd megjelenítjük a piros dobozban...
    roundScore = roundScore + dice1 + dice2;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  } else {
    nextPlayer();
  }
});

// DRY -> do not repeat yourself...
function nextPlayer() {
  // a roundScore értéket nullázuk a UI-on is
  document.querySelector('#current-' + activePlayer).textContent = 0;
  // a következő játékos jön
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  roundScore = 0;
  // toggle: ha rajta volt a class, akkor leveszi, ha nincs name, akkor rárakja
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
}

// ha a 'HOLD' gombra nyom a játékos
document.querySelector('.btn-hold').addEventListener('click', function () {
  // a játékos megszerzi a kör alatt szerzett pontjait
  // az előző érték + a mostani
  scores[activePlayer] = scores[activePlayer] + roundScore;
  // update the UI
  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
  if (scores[activePlayer] >= 100) {
    // játék vége
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
    // document.querySelector('.dice').style.display = 'none';
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';
    document.querySelector('.btn-roll').style.display = 'none';
    document.querySelector('.btn-hold').style.display = 'none';

    // ha nincs nyertes, akkor a következő játékos jön
  } else {
    nextPlayer();
  }
});