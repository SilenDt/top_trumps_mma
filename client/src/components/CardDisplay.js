import StatDisplay from "./StatDisplay"

const CardDisplay = ({card, setStat, hiddenStats=false, stopClicking=false}) => {

    const handleSetStat = (evt) => {
        evt.persist(); //stops bug requiring 2x clicks on fresh page
        setStat(evt.target.value)
        
    }

    // hide computer stats when computers turn (hiddenStats is false)
    if(hiddenStats) {
        return (
            <div className='card-display'>
                <div className="image-wrapper"><img src={card.url} className="character-image"></img></div>
                <StatDisplay object_stat={card.name} stat_name={"Name"} header={true}></StatDisplay>   
                <StatDisplay object_stat={card.bio} stat_name={"Bio"}></StatDisplay> 
                <button value="strength"><span>Strength:</span>_________ <span>??</span></button>
                <button value="speed"><span>Speed:</span>_________ <span>??</span></button>
                <button value="intelligence"><span>Intelligence:</span>_________ <span>??</span></button>  
            </div>
        )
    } else if (stopClicking===true) {
        return (
            <div className='card-display'>
                <div className="image-wrapper"><img src={card.url} className="character-image"></img></div>
                <StatDisplay object_stat={card.name} stat_name={"Name"}></StatDisplay>   
                <StatDisplay object_stat={card.bio} stat_name={"Bio"}></StatDisplay>     
                <button>Strength:_________{card.strength}</button>
                <button>Speed:_________{card.speed}</button>
                <button>Intelligence:_________{card.intelligence}</button>
            </div>
        )
    } else {
        return (
            <div className='card-display'>
                <div className="image-wrapper"><img src={card.url} className="character-image"></img></div>
                <StatDisplay object_stat={card.name} stat_name={"Name"} header={true}></StatDisplay>   
                <StatDisplay object_stat={card.bio} stat_name={"Bio"}></StatDisplay>     
                <button onClick={handleSetStat} value="strength"><span>Strength:</span>_________<span>{card.strength}</span></button>
                <button onClick={handleSetStat} value="speed"><span>Speed:</span>_________<span>{card.speed}</span></button>
                <button onClick={handleSetStat} value="intelligence"><span>Intelligence:</span>_________<span>{card.intelligence}</span></button>
            </div>
        )
    }
}

export default CardDisplay