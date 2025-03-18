import "./App.css";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import LogIn from "./pages/Auth/LogIn";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expences from "./pages/Dashboard/Expences";

function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expences" element={<Expences />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;

const Root = () => {
  // check if the token exists in the local storage

  const isAuthenticated = !!localStorage.getItem("token");

  // redirect to the dashboard if authenticated or otherwise  login
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="login" />
  );
};
