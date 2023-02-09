import CardDisplay from "../components/CardDisplay"
import arrayShuffle from 'array-shuffle';
import { useState, useEffect } from 'react';
import PlayerContainer from "./PlayerContainer";
import ComputerContainer from "./ComputerContainer";
import GameInfoDisplay from "../components/GameInfoDisplay";
import chooseStatWisely from "../components/helpers/ComputerLogic";

const MainContainer = () => {

    const [cards, setCards] = useState([])
    const [playerDeck, setPlayerDeck] = useState([{name:"This hasn't loaded yet", intelligence: 0, speed: 0, strength: 0}])
    const [computerDeck, setComputerDeck] = useState([])

    //Take length of player decks
    const [playerScore, setPlayerScore] = useState(0) 
    const [computerScore, setComputerScore] = useState(0)

    const [currentPlayer, setCurrentPlayer] = useState('player') //'player' or 'computer', 'computer_again'

    const [currentPlayerCard, setCurrentPlayerCard] = useState(null)
    const [currentComputerCard, setCurrentComputerCard] = useState(null)
    
    const [chosenStat, setChosenStat] = useState(null)

    const [isPlayerCardHigher, setIsPlayerCardHigher]  = useState(null) //boolean
    let roundwinners = ['first round', 'player', 'computer']
    let [roundWinner, setRoundWinner] = useState(roundwinners[0]) 
    

    const [stateOfPlay, setStateOfPlay] = useState('loading') //'loading', 'inPlay', 'victory', 'defeat'

    // for production
    // get cards from database
    useEffect(() => {
        fetch('http://localhost:9000/api/cards/')
        .then(response => response.json())
        .then(data => {
            setCards(data)
            shuffleBothDecks(data) // split the deck between two players
            setStateOfPlay('inPlay')
        }) 
    }, [])

    // // for testing
    // useEffect(() => {
    //     fetch('http://localhost:9000/api/small-cards/')
    //     .then(response => response.json())
    //     .then(data => {
    //         setCards(data)
    //         shuffleBothDecks(data) // split the deck between two players
    //         setStateOfPlay('inPlay')
    //     }) 
    // }, [])

    // keep scores updated
    useEffect(() => {
        setPlayerScore(playerDeck.length)
        setComputerScore(computerDeck.length)
    }, [playerDeck])

    // when it's computers turn, invoke setStat
    useEffect(() => {
        if (currentPlayer !== 'player'){
            // console.log(`useEffect: currentPlayer = ${currentPlayer}`)
            console.log("computer is choosing...")
            let smartChoice = chooseStatWisely(currentComputerCard)
            let computersChoice = makeComputerChoose(smartChoice)
            setTimeout(playGame, 1700, computersChoice)
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
    const makeComputerChoose = (chosen_option) => {
        if (chosen_option < 1) {
            setChosenStat("strength")
            return "strength"
        } else if( chosen_option < 2) {
            setChosenStat("speed")
            return "speed"
        } else {
            setChosenStat("intelligence")
            return "intelligence"
        }
    }

    //  ###################################################################################### //
    // 
    const sendTopCardsTo = (whoWon) => {
        const copyOfComputerDeck = [...computerDeck]
        const copyOfPlayerDeck = [...playerDeck]
        if (!whoWon) {
            copyOfPlayerDeck.push(copyOfPlayerDeck.shift())
            copyOfComputerDeck.push(copyOfComputerDeck.shift())
        } else if (whoWon === "player") {
            console.log("giving cards to player")
            copyOfPlayerDeck.push(copyOfComputerDeck.shift())
            copyOfPlayerDeck.push(copyOfPlayerDeck.shift())            
        } else {
            console.log("giving cards to computer")
            copyOfComputerDeck.push(copyOfPlayerDeck.shift())
            copyOfComputerDeck.push(copyOfComputerDeck.shift())            
        }
        console.log(`sendTopCardsTo: setting player & computer decks`)
        setPlayerDeck(copyOfPlayerDeck)
        setComputerDeck(copyOfComputerDeck)

        //draw next card
        console.log("drawing new cards")
        setCurrentPlayerCard(copyOfPlayerDeck[0])
        setCurrentComputerCard(copyOfComputerDeck[0])
        console.log(`sendTopCardsTo: next player card is: ${copyOfPlayerDeck[0].name}`)
        console.log(`sendTopCardsTo: next computer card is: ${copyOfComputerDeck[0].name}`)
        // setting to local copy avoids bug where on page-refresh first round fails to draw new card
    }

    const playGame = (stat)=> { 

        let currentPlayerValue = 0 
        let currentComputerValue = 0

        //get values from cards
        console.log(`playGame received stat: ${stat}`)
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

        //player wins
        if (currentPlayerValue > currentComputerValue) {
            console.log("~~~ player wins round!")

            // check the computer still has cards
            if (computerDeck.length <= 1) { 
                setStateOfPlay("victory") 
            } else {

                sendTopCardsTo('player')
                setRoundWinner("player")
                
                // if was computers go - switch to player
                if (currentPlayer !== 'player') { setCurrentPlayer('player') }
            }

        // computer wins
        } else if (currentPlayerValue < currentComputerValue) {
            console.log("~~~ computer wins round!")
            
            // check player still has cards
            if (playerDeck.length <= 1) { 
                setStateOfPlay("defeat")
                setCurrentPlayer('player') //maybe unnecessary
            } else {
                sendTopCardsTo('computer')
                console.log(`debugging - round winner is ${roundWinner}`)
                setRoundWinner("computer")

                if (currentPlayer === 'computer') {
                    setCurrentPlayer('computer_again') 
                } else { 
                    setCurrentPlayer('computer')
                }
            }
        // draw
        } else if (currentPlayerValue === currentComputerValue){
            console.log("~~~ draw this round!")

                sendTopCardsTo(false) //puts top cards to bottom of deck
                setRoundWinner("draw")
                
            // if already computers turn, carry on:
            if (currentPlayer === 'computer') {
                setCurrentPlayer('computer_again')
            } else if (currentPlayer === 'computer_again') {
                setCurrentPlayer('computer')
            }
        }
    }

    //  ###################################################################################### //

    // load differnet html depending on stateOfPlay
    //'loading', 'inPlay', 'victory', 'defeat'
    const renderEachPlayersContainer = (user) => {
        
        // when playing - show cards
        if (stateOfPlay==='inPlay'){

            // only render once current player card is loaded
            // if player deck dispay player card; else computer card
            if (user === "player" && currentPlayerCard) {

                return (<PlayerContainer score={playerScore} card={currentPlayerCard} setStat={playGame} currentPlayer={currentPlayer}/>)

            }
            else if (user ==="computer" || currentComputerCard) {
                return (<ComputerContainer score={computerScore} card={currentComputerCard} currentPlayer={currentPlayer}/>)
            }

        // when defeat:
        // only show next to player deck
        } else if (stateOfPlay==='defeat' && user==='player'){
            return (
                <div className="score-box"> You lost </div>
            )
        // when 'victory'
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
                {renderEachPlayersContainer("computer")}
            </div>
            <div className="game-info"> 
            <GameInfoDisplay currentPlayer={currentPlayer} roundWinner={roundWinner}/>
            </div>
            <div className="player-deck">
                {renderEachPlayersContainer("player")}
            </div>
        </>
    )
}

export default MainContainer