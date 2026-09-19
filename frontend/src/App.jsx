import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import AnalyzerPage from "./pages/AnalyzerPage";
import SavedTasks from "./pages/SavedTasks";
import "./index.css"

function App() {
  return (
    <BrowserRouter>

      <nav className="navbar">

        <Link to="/">
          ReplyWise
        </Link>

        <Link to="/saved">
          Saved Tasks
        </Link>

      </nav>

      <Routes>

        <Route
          path="/"
          element={<AnalyzerPage />}
        />

        <Route
          path="/saved"
          element={<SavedTasks />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;