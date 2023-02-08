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
    const [roundWinner, setRoundWinner] = useState("first round") 

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

    // 
    const sendTopCardsTo = (whoWon) => {
        const copyOfComputerDeck = [...computerDeck]
        const copyOfPlayerDeck = [...playerDeck]
        console.log(`This is who won ${whoWon}`)
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
        setPlayerDeck(copyOfPlayerDeck)
        setComputerDeck(copyOfComputerDeck)
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

        //player wins
        if (currentPlayerValue > currentComputerValue) {
            sendTopCardsTo('player')

            if (computerDeck.length === 0) {
                setStateOfPlay("victory")
            }
            //draw next card
            setCurrentPlayerCard(playerDeck[0])
            setCurrentComputerCard(computerDeck[0])


        // computer wins
        } else if (currentPlayerValue < currentComputerValue) {
                sendTopCardsTo('computer')
            //check that there are still cards in the computer deck
            if (playerDeck.length === 0) {
                setStateOfPlay("victory")
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

        // draw
        } else if (currentPlayerValue === currentComputerValue){
                sendTopCardsTo(false)
            }
            setCurrentPlayerCard(playerDeck[0])
            setCurrentComputerCard(computerDeck[0])

    }

    // load differnet html depending on stateOfPlay
    //'loading', 'inPlay', 'victory', 'defeat'
    const renderEachPlayersContainer = (user) => {
        
        // when playing - show cards
        if (stateOfPlay==='inPlay'){

            // only render once current player card is loaded
            // if player deck dispay player card; else computer card
            if (user === "player" && currentPlayerCard) {
                return (<PlayerContainer score={playerScore} card={currentPlayerCard} setStat={playGame}/>)
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
                <h2>Computer</h2>
                {renderEachPlayersContainer("computer")}
            </div>
            <div className="game-info"> 
            <h2>Game Info</h2>
            <GameInfoDisplay currentPlayer={currentPlayer} roundWinner={roundWinner}/>
            </div>
            <div className="player-deck">
            <h2>Player</h2>
                {renderEachPlayersContainer("player")}
            </div>
        </>
    )
}

export default MainContainer