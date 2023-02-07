
const GameInfoDisplay = ({currentPlayer, roundWinner, cardsInDeck}) => {
    
    const showWhosTurn = (currentPlayer) => {
        let whosTurnInfo = ""
        if (currentPlayer === "computer_again") {
            currentPlayer = "computer"
        }
        
        if (currentPlayer === "player") {
            whosTurnInfo = `${currentPlayer}: It's your turn, pick a stat on your card!`
        } else {
            whosTurnInfo = `${currentPlayer}: It's the computers turn, watch out he's fierce!`
        }
        return whosTurnInfo
    }
    const showLastRoundWinner = (roundWinner) => {
        let roundWinnerInfo = ""
        if (roundWinner === 'first round') {
            roundWinnerInfo = (
                `first round, fight!`
            )
        }  else if (roundWinner === 'player') {
            roundWinnerInfo = (
                `the last round was won by the ${roundWinner}!`
            )
        } else if (roundWinner === 'computer') {
            roundWinnerInfo = (
                `the last round was won by the ${roundWinner}!`
            )
        } else if (roundWinner === 'draw') {
            roundWinnerInfo = (
            `the last round was a ${roundWinner}`
            )
        }
        return roundWinnerInfo
    }
    return (
        <div>
        <h4>Turn</h4>
        {showWhosTurn(currentPlayer)}
        <h4>Last round</h4>
        {showLastRoundWinner(roundWinner)}
        <h4>Cards in deck</h4>
        {cardsInDeck}
        </div>
    )
}

export default GameInfoDisplay