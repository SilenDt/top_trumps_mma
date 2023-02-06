import CardDisplay from "./CardDisplay"
import arrayShuffle from 'array-shuffle';
import { useState, useEffect } from 'react';

const MainContainer = () => {

    const [cards, setCards] = useState([])
    const [playerDeck, setPlayerDeck] = useState([])
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

        console.log(`original full deck: `)
        console.log(copyOfCards)
        console.log(`shuffled deck:`)
        console.log(shuffledDeck)

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
    }










    // copied
    //   const shuffleDeckForBothPlayers = () => {
    //     let copyOfCards = cards.map((cardInDeck) => cardInDeck)
    //     const shuffledDeck = copyOfCards.sort(() => Math.random() - 0.5)
    //     let playerAssignment = 0
    //     let dealtCards = [[], []]
    //     shuffledDeck.forEach((card) => {
    //       let playerNumber = playerAssignment % 2
    //       dealtCards[playerNumber].push(card)
    //       playerAssignment += 1
    //     })
    //     return dealtCards
    //   }



// copied
    //   const setupGame = () => {
    //     const dealtCards = shuffleDeckForBothPlayers() 
    //     console.log(dealtCards)
    //     const player1Deck = [...dealtCards[0]]
    //     const player2Deck = [...dealtCards[1]]
    //     selectCards(player1Deck, player2Deck)
    //     setWinner(null)
    //   }






    const renderCardDisplay = cards.map((character) => {
        return (<CardDisplay object={character}/>)
        })

    // useEffect(() => {
    //   // load up the database
    //     databaseServer()
    // }, [])


    return (
        <>
            {renderCardDisplay}
        </>
    )
}

export default MainContainer