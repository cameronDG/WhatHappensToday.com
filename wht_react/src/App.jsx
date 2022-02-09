import React from "react";
import "./App.css";
import WhtRecaps from "./components/WhtRecaps";
import { Route, Routes } from "react-router-dom";
import Nothing from "./components/Nothing";
import SiteNav from "./components/SiteNav";
//import AlreadyKnow from "./components/AlreadyKnow";
import "bootstrap-icons/font/bootstrap-icons.css";
import DoolRecap from "./components/DoolRecap";
import GetDate from "./components/GetDate";
import AlreadyKnowV2 from "./components/AlreadyKnowV2";

const App = () => {
  const date = GetDate();
  return (
    <div className="App">
      <header className="p-2">
        <SiteNav />
      </header>

      <main role="main">
        <div className="container">
          <Routes>
            <Route path="/" element={<WhtRecaps date={date} />} />
            <Route path="/nothing" element={<Nothing />} />
            <Route
              path="/alreadyknow"
              element={<AlreadyKnowV2 date={date} />}
            />
            <Route path="/secondopinion" element={<DoolRecap date={date} />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default App;
