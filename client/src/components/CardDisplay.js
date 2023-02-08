import StatDisplay from "./StatDisplay"

const CardDisplay = ({card, setStat, hiddenStats=false, stopClicking=false}) => {

    const handleSetStat = (evt) => {
        evt.persist(); //stops bug requiring 2x clicks on fresh page
        setStat(evt.target.value)
        
    }

    // hiddenStats when computers turn
    if(hiddenStats) {
        return (
            <div className='card-display'>
                <img src={card.url} className="character-image"></img>
                <StatDisplay object_stat={card.name} stat_name={"Name"}></StatDisplay>   
                <StatDisplay object_stat={card.name} stat_name={"Bio"}></StatDisplay> 
                <button value="strength">Strength:_________ ??</button>
                <button value="speed">Speed:_________ ??</button>
                <button value="intelligence">Intelligence:_________ ??</button>  
            </div>
        )
    } else if (stopClicking===true) {
        return (
            <div className='card-display'>
                <img src={card.url} className="character-image"></img>
                <StatDisplay object_stat={card.name} stat_name={"Name"}></StatDisplay>   
                <StatDisplay object_stat={card.name} stat_name={"Bio"}></StatDisplay>     
                <button>Strength:_________{card.strength}</button>
                <button>Speed:_________{card.speed}</button>
                <button>Intelligence:_________{card.intelligence}</button>
            </div>
        )
    } else {
        return (
            <div className='card-display'>
                <img src={card.url} className="character-image"></img>
                <StatDisplay object_stat={card.name} stat_name={"Name"}></StatDisplay>   
                <StatDisplay object_stat={card.name} stat_name={"Bio"}></StatDisplay>     
                <button onClick={handleSetStat} value="strength">Strength:_________{card.strength}</button>
                <button onClick={handleSetStat} value="speed">Speed:_________{card.speed}</button>
                <button onClick={handleSetStat} value="intelligence">Intelligence:_________{card.intelligence}</button>
            </div>
        )
    }
}

export default CardDisplay