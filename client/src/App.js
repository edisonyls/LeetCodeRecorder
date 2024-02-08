import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact />
          <Route path="/signin" Component={SignInPage} exact />
          <Route path="/register" Component={RegisterPage} exact />
        </Routes>
      </Router>
    </>
  );
}

export default App;
