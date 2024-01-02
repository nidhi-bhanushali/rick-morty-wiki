import React, { Suspense, createContext, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
const CharacterPage = React.lazy(() =>
  import("../src/pages/Characters/CharacterPage")
);
const Characters = React.lazy(() => import("../src/pages/Characters"));
export const episodesContext = createContext({});
function App() {
  const [episodes, setAllEpisodes] = useState([]);
  console.log(episodes);
  return (
    <Suspense>
      <episodesContext.Provider value={{ episodes, setAllEpisodes }}>
        <Routes>
          <Route path="/" element={<Characters />}></Route>
          <Route path="/character/:id" element={<CharacterPage />}></Route>
        </Routes>
      </episodesContext.Provider>
    </Suspense>
  );
}

export default App;
