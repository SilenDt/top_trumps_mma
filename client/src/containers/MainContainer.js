import CardDisplay from "./CardDisplay"
import arrayShuffle from 'array-shuffle';
import { useState, useEffect } from 'react';

const MainContainer = () => {

    const [cards, setCards] = useState([])
    const [playerDeck, setPlayerDeck] = useState([{name:"This hasn't loaded yet", intelligence: 0, speed: 0, strength: 0}])
    const [computerDeck, setComputerDeck] = useState([])

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
    }



    // build HTML elements
    const renderCardDisplay = cards.map((character) => {
        return (<CardDisplay object={character}/>)
        })


    const renderCardDisplay = (deck) => {


        // // debug
        // console.log("rendering cards")
        // console.log(deck)

        return deck.map((character) => {
            return (<CardDisplay object={character}/>)
        })
    }

    return (
        <>
            <div className="player-deck">
                <h2>Computer Deck</h2>
                {renderCardDisplay(computerDeck)}
            </div>
            <div className="player-deck">
            <h2>Player Deck</h2>
                {renderCardDisplay(playerDeck)}
            </div>
        </>
    )
}

export default MainContainer