document.addEventListener('DOMContentLoaded', () => {

    const cardArray = [
        // 6 pairs of cards
        { name: 'apple', color: 'red' }, { name: 'apple', color: 'red' },
        { name: 'car', color: 'blue' }, { name: 'car', color: 'blue' },
        { name: 'tree', color: 'green' }, { name: 'tree', color: 'green' },
        { name: 'sun', color: 'yellow' }, { name: 'sun', color: 'yellow' },
        { name: 'orange', color: 'orange' }, { name: 'orange', color: 'orange' },
        { name: 'heart', color: 'pink' }, { name: 'heart', color: 'pink' }
    ];

    const grid = document.querySelector('.memory-game');
    const restartButton = document.getElementById('restartButton');
    var cardsChosen = [];
    var cardsChosenId = [];
    var cardsWon = [];

    function createBoard() {
        cardArray.sort(() => 0.5 - Math.random());
        for (let i = 0; i < cardArray.length; i++) {
            let card = document.createElement('div');
            card.classList.add('memory-card');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }

    function flipCard() {
        var cardId = this.getAttribute('data-id');
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.style.backgroundColor = cardArray[cardId].color;
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    function checkForMatch() {
        var cards = document.querySelectorAll('.memory-card');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];

        if (cardsChosen[0] === cardsChosen[1] && optionOneId != optionTwoId) {
            alert('You found a match');
            cards[optionOneId].style.visibility = 'hidden';
            cards[optionTwoId].style.visibility = 'hidden';
            cardsWon.push(cardsChosen);
        } else {
            cards[optionOneId].style.backgroundColor = '#fff';
            cards[optionTwoId].style.backgroundColor = '#fff';
        }

        cardsChosen = [];
        cardsChosenId = [];

        if (cardsWon.length === cardArray.length/2) {
            restartButton.style.display = 'block';
        }
    }

    restartButton.addEventListener('click', () => {
        while (grid.firstChild) {
            grid.removeChild(grid.lastChild);
        }
        cardsWon = [];
        createBoard();
        restartButton.style.display = 'none';
    });

    createBoard();
});
