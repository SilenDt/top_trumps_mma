

// return a number 1-3
function chooseOption(card) {

    // if v high stat choose this
    if (card.strength > 85) {
        console.log(`~~~ intelligent choice: ${card.strength} picking strength`)
        return 0
    } else if (card.speed > 85) {
        console.log(`~~~ intelligent choice: ${card.speed} picking speed`)
        return 1
    } else if (card.intelligence > 85) {
        console.log(`~~~ intelligent choice: ${card.intelligence} picking intelligence`)
        return 2
    }

    // else pick random number
    let randNumber = Math.random()*3
    if (randNumber < 1) {
        return 0
    } else if( randNumber < 2) {
        return 1
    } else {
        return 2
    }
}

export default chooseOption

