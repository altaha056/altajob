import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import JobList from "./pages/JobList";
import "./index.css";

function App() {
  return (
    <div>
      <h2>Find Your Dream Job </h2>
      <Router>
        <Routes>
          <Route path="/job" element={<JobList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
