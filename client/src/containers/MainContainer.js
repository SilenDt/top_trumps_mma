import CardDisplay from "./CardDisplay"
import { useState, useEffect } from 'react';

const MainContainer = () => {

    const [cards, setCards] = useState([])

    useEffect(() => {
        fetch('http://localhost:9000/api/cards/')
        .then(response => response.json())
        .then(data => setCards(data));
    })

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