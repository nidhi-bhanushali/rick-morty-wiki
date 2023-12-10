import React, { Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
const CharacterPage = React.lazy(() =>
  import("../src/pages/Characters/CharacterPage")
);
const Characters = React.lazy(() => import("../src/pages/Characters"));

function App() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<Characters />}></Route>
        <Route path="/character/:id" element={<CharacterPage />}></Route>
      </Routes>
    </Suspense>
  );
}

export default App;
