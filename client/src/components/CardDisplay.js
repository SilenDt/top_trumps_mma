import StatDisplay from "./StatDisplay"

const CardDisplay = ({card, setStat}) => {

    const handleSetStat = (evt) => {
        setStat(evt.target.value)
    }

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

export default CardDisplay