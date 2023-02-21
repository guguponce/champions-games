import GuessYourChampion from "./components/GuessYourChampion";
import ChampionsMemory from "./components/ChampionsMemory";
import { Route, Routes } from "react-router-dom";
import "./style/App.scss";
import Homepage from "./components/Homepage";
import TypeAllChampions from "./components/TypeAllChampions";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/guess-your-champion" element={<GuessYourChampion />} />
        <Route path="/champions-memory" element={<ChampionsMemory />} />
        <Route path="/type-champions" element={<TypeAllChampions />} />
      </Routes>
    </div>
  );
}

export default App;
