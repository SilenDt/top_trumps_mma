import StatDisplay from "../components/StatDisplay"

const CardDisplay = ({object}) => {
    return (
        <div className='card-display'>
            <img></img>
            <StatDisplay object_stat={object.name} stat_name={"Name"}></StatDisplay>   
            <StatDisplay object_stat={object.name} stat_name={"Bio"}></StatDisplay>       
            <StatDisplay object_stat={object.strength} stat_name={"Strength"}></StatDisplay>       
            <StatDisplay object_stat={object.speed} stat_name={"Speed"}></StatDisplay>       
            <StatDisplay object_stat={object.intelligence} stat_name={"Intelligence"}></StatDisplay>       
        </div>
    )
}

export default CardDisplay