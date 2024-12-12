const gridContainerEl = document.getElementById('game-grid-container')
const gameOption = document.getElementById('game-option')
const gameGameEl = document.getElementById('game-game')
let hostAFriendBtn = document.getElementById('hostAFriendBtn')
let inviteLinkQuote = document.getElementById('inviteLinkQuote')
let startGameBtn = document.getElementById('startGameBtn')
let gameStarted = false
let itemEl;
let numItemsOpen = new Set
let cardFlips = 0

const calcultateScore = () =>{
    timeTakenEl.innerHTML = timeEl.innerHTML
    cardFilpsEl.innerHTML = cardFlips
}
const openCard = (e) =>{
    if(numItemsOpen.size < 2){
        e.target.classList.remove('hide')

        itemEl.forEach(item => {
            !item.classList.contains('hide') && !item.classList.contains('active') ?  numItemsOpen.add(item) : null
        })
    }
}
const checker = () =>{
    let openedCardsArr = []
    let activeCard = new Set
    itemEl.forEach(item => !item.classList.contains('hide') && !item.classList.contains('active') ? openedCardsArr.push(item) : null)

    if(openedCardsArr.length >= 2){
        if(openedCardsArr[0].id === openedCardsArr[1].id){
            openedCardsArr.map(item => item.classList.add('active'))
            itemEl.forEach(item => item.classList.contains('active')  ? activeCard.add(item) : null)
            activeCard.size === userChoise.length && endGame()
            openedCardsArr.length = 0
        }else{
            openedCardsArr.length = 0
        }
    }
}
const closeCards = () =>{
    if(numItemsOpen.size > 1){
        setTimeout(function(){
            itemEl.forEach(item =>{
                if(!item.classList.contains('active')){
                    item.classList.add('hide')
                    numItemsOpen.clear()
                }
            })
        },600)
    }
}

window.setCardFlips = (e) => {  
    if (numItemsOpen.size < 2) {
        itemEl.forEach(item => {
            if (!item.classList.contains('active') && item.lang === e.target.lang) {
                cardFlips++;
            }
            // document.querySelector(".count").innerHTML = cardFlips;
        });
    }
};