import CardDisplay from "../components/CardDisplay"
import arrayShuffle from 'array-shuffle';
import { useState, useEffect } from 'react';
import PlayerContainer from "./PlayerContainer";
import ComputerContainer from "./ComputerContainer";

const MainContainer = () => {

    const [cards, setCards] = useState([])
    const [playerDeck, setPlayerDeck] = useState([{name:"This hasn't loaded yet", intelligence: 0, speed: 0, strength: 0}])
    const [computerDeck, setComputerDeck] = useState([])

    //Take length of player decks
    const [playerScore, setPlayerScore] = useState(0) 
    const [computerScore, setComputerScore] = useState(0)

    const [currentPlayer, setCurrentPlayer] = useState('player') //'player' or 'computer'

    const [currentPlayerCard, setCurrentPlayerCard] = useState(null)
    const [currentComputerCard, setCurrentComputerCard] = useState(null)
    
    const [chosenStat, setChosenStat] = useState(null)

    const [isPlayerCardHigher, setIsPlayerCardHigher]  = useState(null) //boolean
    const [roundWinner, setRoundWinner] = useState(null) 

    const [stateOfPlay, setStateOfPlay] = useState('loading') //'loading', 'inPlay', 'victory', 'defeat'

    // get cards from database
    useEffect(() => {
        fetch('http://localhost:9000/api/cards/')
        .then(response => response.json())
        .then(data => {
            setCards(data)
            shuffleBothDecks(data) // split the deck between two players
            
        }) 
    }, [])

    useEffect(() => {
        setPlayerScore(playerDeck.length)
        setComputerScore(computerDeck.length)
    }, [playerDeck])


    const shuffleBothDecks = (input_cards) => {
        const copyOfCards = input_cards.map((card) => card) //don't mutate the state

        const shuffledDeck = arrayShuffle(copyOfCards)

        // // debug
        // console.log(`original full deck: `)
        // console.log(copyOfCards)
        // console.log(`shuffled deck:`)
        // console.log(shuffledDeck)

        //iterate between player 1 and 2
        let playerNumber = 1 

        const newPlayerDeck = []
        const newComputerDeck = []

        shuffledDeck.forEach(card => {

            if (playerNumber === 1) {
                newPlayerDeck.push(card)
                playerNumber = 2
            } else {
                newComputerDeck.push(card)
                playerNumber = 1
            }
        })
        // update useStates with shuffled cards
        setComputerDeck(newComputerDeck)
        setPlayerDeck(newPlayerDeck)
        setCurrentPlayerCard(newPlayerDeck[0])
        setCurrentComputerCard(newComputerDeck[0])
        setPlayerScore(newPlayerDeck.length)
        setComputerScore(newComputerDeck.length)
    }
    //this is only called when its the computer's turn
    const chooseComputerOption = () => {
        let answer = Math.random()*3
        if (answer < 1) {
            setChosenStat("strength")
            return 
        } else if( answer < 2) {
            setChosenStat("speed")
            return
        } else {
            setChosenStat("intelligence")
        }
    }
    
    const cardAdjustmentOnPlayerWin = () => {
        const copyOfComputerDeck = [...computerDeck]
        const arrayOfComputerCard = copyOfComputerDeck.splice(0,1)
        const computerCard = arrayOfComputerCard[0]
        setComputerDeck(copyOfComputerDeck)
        const copyOfPlayerDeck = [...playerDeck]
        const arrayOfPlayerCard = copyOfPlayerDeck.splice(0,1)
        const playerCard = arrayOfPlayerCard[0]
        copyOfPlayerDeck.push(playerCard)
        copyOfPlayerDeck.push(computerCard)
        setPlayerDeck(copyOfPlayerDeck)
    }

    const cardAdjustmentOnPlayerLose = () => {
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
    }

    const cardAdjustmentOnPlayerDraw = () => {
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
    }

    const playGame = (stat)=> { //gameRound (?)
        //sets the stat the user chooses to play, compares cards to each other,
        //pulls the value from the stat if it meets certain conditions,
        // if the value of the players chosen stat is higher than the computers, then
        let currentPlayerValue = 0 
        let currentComputerValue = 0

        setChosenStat(stat)
        //compare cards
        console.log(stat)
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

        //reveal opponents card
        if (currentPlayerValue > currentComputerValue) {
            cardAdjustmentOnPlayerWin()
            
            if (computerDeck.length === 0) {
                setStateOfPlay("Victory")
            }
            //draw next card
            setCurrentPlayerCard(playerDeck[0])
            setCurrentComputerCard(computerDeck[0])
        
            } else if (currentPlayerValue < currentComputerValue) {
            cardAdjustmentOnPlayerLose()
            //check that there are still cards in the computer deck
            if (computerDeck.length === 0) {
                setStateOfPlay("Victory")
            }
            //draw next card
            setCurrentPlayerCard(playerDeck[0])
            setCurrentComputerCard(computerDeck[0])

            } else if (currentPlayerValue === currentComputerValue){
                cardAdjustmentOnPlayerDraw()
            }
    }

    const renderEachPlayersContainer = (user) => {
        // // debug
        // console.log("rendering cards")
        // console.log(deck)

        // return deck.map((character) => {
        //     return (<CardDisplay object={character}/>)
        // })

        // refactor to display current card only

        // if player deck dispay player card; else computer card
        if (user === "player" && currentPlayerCard) {
            return (<PlayerContainer score={playerScore} card={currentPlayerCard} gameRound={gameRound}/>)
        } else if (user ==="computer" && currentComputerCard) {
            return (<ComputerContainer score={computerScore} card={currentComputerCard}/>)
        }
    }

    return (
        <>
            <div className="player-deck">
                <h2>Computer Deck</h2>
                {renderEachPlayersContainer("computer")}
            </div>
            <div className="player-deck">
            <h2>Player Deck</h2>
                {renderEachPlayersContainer("player")}
            </div>
        </>
    )
}

export default MainContainer

// if (playerValue > computerValue) {
//     const copyOfComputerDeck = [...computerDeck]
//     const arrayOfComputerCard = copyOfComputerDeck.splice(0,1)
//     const computerCard = arrayOfComputerCard[0]
//     //playerWinsRound
//     setComputerDeck(copyOfComputerDeck)
//     const copyOfPlayerDeck = [...playerDeck]
//     const arrayOfPlayerCard = copyOfPlayerDeck.splice(0,1)
//     const playerCard = arrayOfPlayerCard[0]
//     copyOfPlayerDeck.push(playerCard)
//     copyOfPlayerDeck.push(computerCard)
//     setPlayerDeck(copyOfPlayerDeck)
    
//     if (copyOfComputerDeck.length === 0) {
//         setStateOfPlay("Victory")
//     }
//     //draw next card
//     setCurrentPlayerCard(playerDeck[0])
//     setCurrentComputerCard(computerDeck[0])

//     } else if (playerValue < computerValue) {
//     //make a copy of computer deck
//     const copyOfComputerDeck = [...computerDeck]
//     //splice out the first card
//     const arrayOfComputerCard = copyOfComputerDeck.splice(0,1)
//     const computerCard = arrayOfComputerCard[0]
//     //make a copy of playerDeck and splice out the first card
//     const copyOfPlayerDeck = [...playerDeck]
//     const arrayOfPlayerCard = copyOfPlayerDeck.splice(0,1)
//     const playerCard = arrayOfPlayerCard[0]
//     //add player's spliced card to the back of the copy of the computer deck
//     copyOfComputerDeck.push(playerCard)
//     //add computer's spliced card to the back of the copy of the computer deck
//     copyOfComputerDeck.push(computerCard)
//     //set the Player's deck to the copy of the Players Deck
//     setPlayerDeck(copyOfPlayerDeck)
//     //setComputerDeck to new copy
//     setComputerDeck(copyOfComputerDeck)
//     //check that there are still cards in the computer deck
//     if (copyOfComputerDeck.length === 0) {
//         setStateOfPlay("Victory")
//     }
//     //draw next card
//     setCurrentPlayerCard(playerDeck[0])
//     setCurrentComputerCard(computerDeck[0])
//     } else if 
//         (playerValue === computerValue){
//             const copyOfPlayerDeck = [...playerDeck]
//             const arrayOfPlayerCard = copyOfPlayerDeck.splice(0,1)
//             const playerCard = arrayOfPlayerCard[0]
//             const copyOfComputerDeck = [...computerDeck]
//             const arrayOfComputerCard = copyOfComputerDeck.splice(0,1)
//             const computerCard = arrayOfComputerCard[0]
//             copyOfPlayerDeck.push(playerCard)
//             copyOfComputerDeck.push(computerCard)
//             setCurrentPlayerCard(playerDeck[0])
//             setCurrentComputerCard(computerDeck[0])
//             setPlayerDeck(copyOfPlayerDeck)
//             //setComputerDeck to new copy 
//             setComputerDeck(copyOfComputerDeck)
//             console.log("values equal")
//     }