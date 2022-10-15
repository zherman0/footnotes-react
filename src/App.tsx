import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route /*Link*/,
} from "react-router-dom";
import "@patternfly/react-core/dist/styles/base.css";
import "./App.css";
import { NavPage } from "./navigation";
import { Locations } from "./locations";
import { Users } from "./users";
// import { Hikes } from "./hikes";

const App: React.FC = () => {
  return (
    <Router>
      <NavPage>
        <Routes>
          <Route path="/locations" element={<Locations />} />
          <Route path="/users" element={<Users />} />
          <Route path="/hikes" element={<Hikes />} />
          <Route />
        </Routes>
        <div></div>
      </NavPage>
    </Router>
  );
};
function Hikes() {
  return <h2>Hike</h2>;
}
export default App;
