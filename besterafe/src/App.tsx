import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ItemList from "./components/listingComponent";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ItemList />
      </header>
    </div>
  );
}

export default App;
