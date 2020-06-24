import React from "react";
import "./App.css";
import PokemonSearch from "./components/pokemon-search";

function App() {
  return (
    <div className="App">
      <PokemonSearch name={"PokeApi"} numberOfPokemons={964} />
    </div>
  );
}

export default App;
