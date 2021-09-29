import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import AnimeList from "./components/AnimeList";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/anime-List/:id" component={AnimeList} />
      </Switch>
    </div>
  );
};

export default App;
