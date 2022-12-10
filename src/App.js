import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import JobList from "./pages/JobList";
import "./index.css";
import { JobDetail } from "./pages/JobDetail";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<JobList />} />
          <Route path="/:id" element={<JobDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
