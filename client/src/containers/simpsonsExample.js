import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import ErrorPage from './Containers/ErrorPage';
import GamePageComputer from './Containers/GamePageComputer';
import Rules from "./Containers/Rules";
import Title from "./Containers/Title";
import ViewCardsPage from "./Containers/ViewCardsPage";
import "./css/Master.css";
import TopTrumpsService from "./services/TopTrumpsService";


function App() {
  // cards in deck
  const [cards, setCards] = useState([])
  const [player1DeckState, setPlayer1DeckState] = useState()
  const [player2DeckState, setPlayer2DeckState] = useState()

  // card in hand
  const [player1Card, setPlayer1Card] = useState()
  const [player2Card, setPlayer2Card] = useState()

//  track which players turn
  const [controllingPlayer, setControllingPlayer] = useState(1)

//   remember user choice
  const [selectedCategory, setSelectedCategory] = useState()

// compare user vs computer
  const [cardComparison, setCardComparison] = useState(null)
  const [winner, setWinner] = useState(null)

  //   scores
  const [player1Score, setPlayer1Score] = useState(0)
  const [player2Score, setPlayer2Score] = useState(0)

//   ???
  const [gameVsComputer, setGameVsComputer] = useState(false)
  const [search, setSearch] = useState('')

//   get the cards once (from API)
  useEffect(() => {
    TopTrumpsService.getTopTrumps().then((cards) => setCards(cards))
  }, [])

// 
  useEffect(() => {
    setupGame()
  }, [cards])


  // Delete a single card from a deck
  const deleteCardFromDeck = (deck, playerNumber) => {
    const copyOfPlayerDeck = deck.map((cardInDeck) => cardInDeck)
    copyOfPlayerDeck.splice(0, 1)
    if (playerNumber === 1) {
      setPlayer1DeckState(copyOfPlayerDeck)
    } else {
      setPlayer2DeckState(copyOfPlayerDeck)
    }
  }


  const selectCards = (player1Deck, player2Deck) => {
    setPlayer1Card(player1Deck[0])
    deleteCardFromDeck(player1Deck, 1)
    setPlayer2Card(player2Deck[0])
    deleteCardFromDeck(player2Deck, 2)
  }

  const setupGame = () => {
    let copyOfCards = cards.map((cardInDeck) => cardInDeck)
    const shuffledDeck = copyOfCards.sort(() => Math.random() - 0.5)
    let playerAssignment = 0
    let dealerCards = [[], []]
    shuffledDeck.forEach((card) => {
      let playerNumber = playerAssignment % 2
      dealerCards[playerNumber].push(card)
      playerAssignment += 1
    })
    const player1Deck = [...dealerCards[0]]
    const player2Deck = [...dealerCards[1]]
    selectCards(player1Deck, player2Deck)
    setWinner(null)
  }

  const playGameRound = (attribute) => {
    const player1Deck = player1DeckState.map((card) => card)
    const player2Deck = player2DeckState.map((card) => card)
    if (controllingPlayer === 1) {
      if (player1Card[attribute] > player2Card[attribute]) {
        player1Deck.push(...[player1Card, player2Card])
      } else {
        // eslint-disable-next-line no-unused-expressions, no-sequences
        player2Deck.push(...[player1Card, player2Card]), setControllingPlayer(2)
      }
    }
    if (controllingPlayer === 2) {
      if (player2Card[attribute] > player1Card[attribute]) {
        player2Deck.push(...[player2Card, player1Card])
      } else {
        // eslint-disable-next-line no-unused-expressions, no-sequences
        player1Deck.push(...[player2Card, player1Card]), setControllingPlayer(1)
      }
    }
    if (player1Deck.length === 0) {
      setPlayer2Score(player2Score + 1)
      return setWinner(2)
    } else if (player2Deck.length === 0) {
      setPlayer1Score(player1Score + 1)
      return setWinner(1)
    } else {
      selectCards(player1Deck, player2Deck)
    }
  }

  const addNewCard = (card) => {
    TopTrumpsService.addTopTrump(card).then((newCard) =>
      setCards([...cards, newCard])
    )
  }

  const deleteCardFromCards = idtoDelete => {
    TopTrumpsService.deleteTopTrump(idtoDelete).then(() => {
        setCards(cards.filter(card => card._id !== idtoDelete))
    })
  }

  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Title cards={cards} gameVsComputer={gameVsComputer} setGameVsComputer={setGameVsComputer} />} />
          <Route
            path='/cards'
            element={
              <ViewCardsPage
                cards={cards}
                addNewCard={addNewCard}
                deleteCardFromCards={deleteCardFromCards}
                search={search}
                setSearch={setSearch}
              />
            }
          />
          <Route
            path='/play'
            element={
              <GamePageComputer
                cards={cards}
                playGameRound={playGameRound}
                player1Card={player1Card}
                player2Card={player2Card}
                winner={winner}
                controllingPlayer={controllingPlayer}
                setWinner={setWinner}
                setupGame={setupGame}
                player1Score={player1Score}
                player2Score={player2Score}
                player1DeckState={player1DeckState}
                player2DeckState={player2DeckState}
                cardComparison={cardComparison}
                setCardComparison={setCardComparison}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                gameVsComputer={gameVsComputer}
              />
            }
          />
          <Route path='/rules' element={<Rules />} />
          <Route path="*" element={< ErrorPage />} /> 
        </Routes>
      </Router>
    </>
  )
}

export default App