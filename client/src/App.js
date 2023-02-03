import './App.css';
import CardDisplay from "./containers/CardDisplay"
import { useEffect, useState } from 'react';



function App() {

  const [object, setObject] = useState({name: "superman", strength: 99, speed: 89})

  useEffect(() => {
    // load up the database
    databaseServer()
  }, [])


  return (
    <div>
    <h1>Top Trumps MMA</h1>
    <h2>Eilidh</h2>
    <h2>Sam</h2>
    <h2>Double Fraser</h2>
    <CardDisplay object={object}/>
    </div>
  );
}

export default App;
