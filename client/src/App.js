import './App.css';
import CardDisplay from "./containers/CardDisplay"

import { useState, useEffect } from 'react';


function App() {

  const [cards, setCards] = useState([])

  useEffect(() => {
    fetch('http://localhost:9000/api/cards/')
      .then(response => response.json())
      .then(data => setCards(data));
  })

  const renderCardDisplay = cards.map((character) => {
      return (<CardDisplay object={character}/>)
    })

  useEffect(() => {
    // load up the database
    databaseServer()
  }, [])


  return (
    <div>
      
    {renderCardDisplay}
    </div>
  );
}

export default App;
