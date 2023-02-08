
const GameInfoDisplay = ({currentPlayer, roundWinner}) => {
    
    const showWhosTurn = (currentPlayer) => {
        let whosTurnInfo = ""
        if (currentPlayer === "computer_again") {
            currentPlayer = "computer"
        }
        
        if (currentPlayer === "player") {
            whosTurnInfo = (<div className="label-player">your turn</div>)
        } else {
            whosTurnInfo = (<div className="label-computer">computers turn</div>)
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
                `${roundWinner} wins!`
            )
        } else if (roundWinner === 'computer') {
            roundWinnerInfo = (
                `${roundWinner} wins!`
            )
        } else if (roundWinner === 'draw') {
            roundWinnerInfo = (
            `${roundWinner}.....`
            )
        }
        return (<div className="label-last-turn">{roundWinnerInfo}</div>)
    }
    return (
        <div className="game-info-container">
        {showWhosTurn(currentPlayer)}
        <h2>Game Info</h2>
        {showLastRoundWinner(roundWinner)}
        </div>
    )
}

export default GameInfoDisplay