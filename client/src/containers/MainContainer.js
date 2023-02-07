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

    // for production
    // // get cards from database
    // useEffect(() => {
    //     fetch('http://localhost:9000/api/cards/')
    //     .then(response => response.json())
    //     .then(data => {
    //         setCards(data)
    //         shuffleBothDecks(data) // split the deck between two players
    //         setStateOfPlay('inPlay')
    //     }) 
    // }, [])

    // for testing
    useEffect(() => {
        fetch('http://localhost:9000/api/small-cards/')
        .then(response => response.json())
        .then(data => {
            setCards(data)
            shuffleBothDecks(data) // split the deck between two players
            setStateOfPlay('inPlay')
        }) 
    }, [])

    useEffect(() => {
        setPlayerScore(playerDeck.length)
        setComputerScore(computerDeck.length)
    }, [playerDeck])

    // when computers turn setStat
    useEffect(() => {
        if (currentPlayer === 'computer'){
            console.log("computer is choosing...")
            let computerOption = chooseComputerOption()
            setTimeout(setStat, 1700, computerOption)
        }
        if (currentPlayer === 'computer_again') {
            console.log("computers second turn")
            let computerOption = chooseComputerOption()
            setTimeout(setStat, 2000, computerOption)
        }
    }, [currentPlayer])


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
            return "strength"
        } else if( answer < 2) {
            setChosenStat("speed")
            return "speed"
        } else {
            setChosenStat("intelligence")
            return "intelligence"
        }
    }

    const setStat = (stat)=> {
        setChosenStat(stat)
        console.log(stat)

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
        console.log(currentPlayerValue)
        console.log(currentComputerValue)
            //reveal opponents card
        
        //make a copy of computer deck
        const copyOfComputerDeck = [...computerDeck]
        console.log("this is the computers new deck")
        console.log(copyOfComputerDeck)
        //splice out the first card
        const arrayOfComputerCard = copyOfComputerDeck.splice(0,1)
        const computerCard = arrayOfComputerCard[0]
        //setComputerDeck to new copy
        setComputerDeck(copyOfComputerDeck)
        //make a copy of playerDeck and splice out the first card
        const copyOfPlayerDeck = [...playerDeck]
        const arrayOfPlayerCard = copyOfPlayerDeck.splice(0,1)
        const playerCard = arrayOfPlayerCard[0]
        console.log(playerCard)
        console.log("playerCard")
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
        setCurrentPlayerCard(playerDeck[0])
        setCurrentComputerCard(computerDeck[0])

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
        setCurrentPlayerCard(playerDeck[0])
        setCurrentComputerCard(computerDeck[0])

        // computer wins so gets a turn
        if (currentPlayer === 'computer') {
            setCurrentPlayer('computer_again')
        } else {
            setCurrentPlayer('computer')
        }
        // cards are equal!
        } else if 
            (currentPlayerValue === currentComputerValue){
                console.log("draw")
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
        return true
    }

    //'loading', 'inPlay', 'victory', 'defeat'
    // load differnet html depending on stateOfPlay
    const renderEachPlayersContainer = (user) => {
        
        // when playing - show cards
        if (stateOfPlay==='inPlay'){

            // only render once current player card is loaded
            // if player deck dispay player card; else computer card
            if (user === "player" && currentPlayerCard) {
                return (<PlayerContainer score={playerScore} card={currentPlayerCard} setStat={setStat}/>)
            }
            else if (user ==="computer" && currentComputerCard) {
                return (<ComputerContainer score={computerScore} card={currentComputerCard}/>)
            }

        // when defeat show defeat screen
        // only show next to player deck
        } else if (stateOfPlay==='defeat' && user==='player'){
            return (
                <div className="score-box"> You lost </div>
            )
        // when 'victory' show victory screen
        // only show next to player deck
        } else if (stateOfPlay==='victory' && user==='player') {
            return (
                <div className="score-box">You won!</div>
            )
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