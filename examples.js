const setStat = (stat)=> {
    setChosenStat(stat)
    console.log(`chosen: ${stat}`)

    //compare cards
    let currentPlayerValue = 0
    let currentComputerValue = 0

    if(stat == "strength") {
        currentPlayerValue = currentPlayerCard.strength
        currentComputerValue = currentComputerCard.strength
    } else if(stat == "speed") {
        currentPlayerValue = currentPlayerCard.speed
        currentComputerValue = currentComputerCard.speed
    
    } else if(stat == "intelligence") {
        currentPlayerValue = currentPlayerCard.intelligence
        currentComputerValue = currentComputerCard.intelligence
    }

    // player wins round
    if (currentPlayerValue > currentComputerValue) {
        console.log("players card is higher")
        // console.log(currentPlayerValue)
        // console.log(currentComputerValue)

        
        //make a copy of computer deck
        const copyOfComputerDeck = [...computerDeck]
        // console.log("this is the computers new deck")
        // console.log(copyOfComputerDeck)
        //splice out the first card
        const arrayOfComputerCard = copyOfComputerDeck.splice(0,1)
        const computerCard = arrayOfComputerCard[0]
        //setComputerDeck to new copy
        setComputerDeck(copyOfComputerDeck)
        //make a copy of playerDeck and splice out the first card
        const copyOfPlayerDeck = [...playerDeck]
        const arrayOfPlayerCard = copyOfPlayerDeck.splice(0,1)
        const playerCard = arrayOfPlayerCard[0]
        // console.log(playerCard)
        // console.log("playerCard")
        //add player's spliced card to the back of the copy of the player deck
        copyOfPlayerDeck.push(playerCard)
        //add computer's spliced card to the back of the copy of the player deck
        copyOfPlayerDeck.push(computerCard)
        //set the Player's deck to the copy of the Players Deck
        setPlayerDeck(copyOfPlayerDeck)
        //check that there are still cards in the computer deck
        if (copyOfComputerDeck.length === 0) {
            setStateOfPlay("victory")
        }
        setCurrentPlayer('player')
        //draw next card
        setCurrentPlayerCard(copyOfPlayerDeck[0])
        setCurrentComputerCard(copyOfComputerDeck[0])
        setRoundWinner("player")

    // computer wins the round
    } else if (currentPlayerValue < currentComputerValue) {
        console.log("computers card is higher")
        //make a copy of computer deck
        const copyOfComputerDeck = [...computerDeck]
        //splice out the first card
        const arrayOfComputerCard = copyOfComputerDeck.splice(0,1)
        const computerCard = arrayOfComputerCard[0]
        //make a copy of playerDeck and splice out the first card
        const copyOfPlayerDeck = [...playerDeck]
        const arrayOfPlayerCard = copyOfPlayerDeck.splice(0,1)
        const playerCard = arrayOfPlayerCard[0]
        //add player's spliced card to the back of the copy of the computer deck
        copyOfComputerDeck.push(playerCard)
        //add computer's spliced card to the back of the copy of the computer deck
        copyOfComputerDeck.push(computerCard)
        //set the Player's deck to the copy of the Players Deck
        setPlayerDeck(copyOfPlayerDeck)
        //setComputerDeck to new copy
        setComputerDeck(copyOfComputerDeck)
        //check that there are still cards in the computer deck
        if (copyOfPlayerDeck.length === 0) {
            setStateOfPlay("defeat")
        }

        //draw next card
        setCurrentPlayerCard(copyOfPlayerDeck[0])
        setCurrentComputerCard(copyOfComputerDeck[0])
        setRoundWinner("computer")

        // computer wins so gets a turn
        // 'computer-again' required to register change in useEffect and continue computers turn
        if (currentPlayer === 'computer') {
            setCurrentPlayer('computer_again')
            console.log(`currentPlayer set to computer_again`)
        } else {
            setCurrentPlayer('computer')
            console.log(`currentPlayer set to computer`)
        }
    
    // cards are equal!
    } else if (currentPlayerValue === currentComputerValue){
        console.log("### draw ###")
        const copyOfPlayerDeck = [...playerDeck]
        const arrayOfPlayerCard = copyOfPlayerDeck.splice(0,1)
        const playerCard = arrayOfPlayerCard[0]
        const copyOfComputerDeck = [...computerDeck]
        const arrayOfComputerCard = copyOfComputerDeck.splice(0,1)
        const computerCard = arrayOfComputerCard[0]
        copyOfPlayerDeck.push(playerCard)
        copyOfComputerDeck.push(computerCard)
        setCurrentPlayerCard(playerDeck[0])
        setCurrentComputerCard(computerDeck[0])
        setPlayerDeck(copyOfPlayerDeck)
        //setComputerDeck to new copy 
        setComputerDeck(copyOfComputerDeck)
        console.log("values equal")
        setRoundWinner("draw")

        // if already computers turn when equal, carry on:
        // iterate between the two computer-turn useStates (to activate useEffect)
        if (currentPlayer === 'computer') {
            setCurrentPlayer('computer_again')
        } else if (currentPlayer === 'computer_again') {
            setCurrentPlayer('computer')
        }

    }
}