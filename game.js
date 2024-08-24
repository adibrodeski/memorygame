document.addEventListener('DOMContentLoaded', function() {
    tryagain();
  });
  
  const gridContainer = document.querySelector(".grid-container");
  const duplicatedCards = [];
  // cards
  let firstCard, secondCard;
  let lockBoard = false;
  let score = 0;
  // Timer
  let timerInterval;
  let seconds = 0;
  let minutes = 0;
  let hours = 0;
  
  // Get the username, cardPairs value from the URL
  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
  
  const username = getParameterByName('username');
  const cardPairs = getParameterByName('cardPairs');
  let numCards = (cardPairs)
  
  document.getElementById('welcomeMessage').innerText = 'Welcome, ' + username + '!';
  document.getElementById('cardPairsMessage').innerText = 'You have chosen ' + cardPairs + ' cards';
  
  const cards = [
    {
        "image": "images/1.png",
        "name": "holiday-1"
    },
    {
        "image": "images/2.png",
        "name": "holiday-2"
    }
    ,
    {
        "image": "images/3.png",
        "name": "holiday-3"
    },
    {
        "image": "images/4.png",
        "name": "holiday-4"
    },
    {
        "image": "images/5.png",
        "name": "holiday-5"
    },
    {
        "image": "images/6.png",
        "name": "holiday-6"
    },
    {
        "image": "images/7.png",
        "name": "holiday-7"
    },
    {
        "image": "images/8.png",
        "name": "holiday-8"
    },
    {
        "image": "images/9.png",
        "name": "holiday-9"
    },
    {
        "image": "images/10.png",
        "name": "holiday-10"
    },
    {
        "image": "images/11.png",
        "name": "holiday-11"
    },
    {
        "image": "images/12.png",
        "name": "holiday-12"
    },
    {
        "image": "images/13.png",
        "name": "holiday-13"
    },
    {
        "image": "images/14.png",
        "name": "holiday-14"
    },
    {
        "image": "images/15.png",
        "name": "holiday-15"
    },
    {
        "image": "images/16.png",
        "name": "holiday-16"
    },
    {
        "image": "images/17.png",
        "name": "holiday-17"
    },
    {
        "image": "images/18.png",
        "name": "holiday-18"
    },
    {
        "image": "images/19.png",
        "name": "holiday-19"
    },
    {
        "image": "images/20.png",
        "name": "holiday-20"
    },
    {
        "image": "images/21.png",
        "name": "holiday-21"
    },
    {
        "image": "images/22.png",
        "name": "holiday-22"
    },
    {
        "image": "images/23.png",
        "name": "holiday-23"
    },
    {
        "image": "images/24.png",
        "name": "holiday-24"
    },
    {
        "image": "images/25.png",
        "name": "holiday-25"
    },
    {
        "image": "images/26.png",
        "name": "holiday-26"
    },
    {
        "image": "images/27.png",
        "name": "holiday-27"
    },
    {
        "image": "images/28.png",
        "name": "holiday-28"
    },
    {
        "image": "images/29.png",
        "name": "holiday-29"
    },
    {
        "image": "images/30.png",
        "name": "holiday-30"
    }
  ];
  
  function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function generateCards() {
    for (let i = 0; i < cardPairs; i++) {
      duplicatedCards.push(cards[i])
      duplicatedCards.push(cards[i])
    }
    shuffleCards(duplicatedCards);
    for (let card of duplicatedCards) {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.setAttribute("data-name", card.name);
      cardElement.innerHTML = `
        <div class="front">
          <img class="front-image" src=${card.image} />
        </div>
        <div class="back"></div>
      `;
      gridContainer.appendChild(cardElement);
      cardElement.addEventListener("click", flipCard);
    }
  }
  
  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
  
    this.classList.add("flipped");
  
    if (!firstCard) {
      firstCard = this;
      return;
    }
  
    secondCard = this;
    score++;
    document.querySelector(".score").textContent = score;
    lockBoard = true;
    checkForMatch();
  }
  
  function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();
  }
  
  function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
  
    resetBoard();
    
    numCards--;
    if (numCards == 0) {
      const formattedTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
      setTimeout(function() {
        goodgame(username, score, formattedTime);
    }, 1000);
    }
  }
  
  function unflipCards() {
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetBoard();
    }, 1000);
  }
  
  function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
  }
  
  function tryagain() {
    resetBoard();
    shuffleCards(cards);
    score = 0;
    duplicatedCards.length = 0;
    document.querySelector(".score").textContent = score;
    gridContainer.innerHTML = "";
    generateCards();
    stopTimer();
    startTimer();
  }
   // Timer functions
  function startTimer() {
      timerInterval = setInterval(updateTimer, 1000);
  }
  
  function stopTimer() {
    clearInterval(timerInterval);
    seconds = 0;
    minutes = 0;
    hours = 0;
    updateTimer();
  }
  
  function updateTimer() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    const formattedTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
    document.getElementById("timer").innerText = formattedTime;
  }
  
  function pad(num) {
      return (num < 10) ? ("0" + num) : num;
  }
  
  function goodgame(username, score, time){
    const baseUrl = 'goodgame.html';
  
    const encodedUsername = encodeURIComponent(username);
    const encodedScore = encodeURIComponent(score);
    const encodedTime = encodeURIComponent(time);
    const encodedcardPairs = encodeURIComponent(cardPairs);
  
    const fullUrl = `${baseUrl}?username=${encodedUsername}&score=${encodedScore}&time=${encodedTime}&cardPairs=${encodedcardPairs}`;
    window.location.href = fullUrl;
  }

  
