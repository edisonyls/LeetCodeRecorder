import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInPage from "./pages/SignInPage";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact />
          <Route path="/signin" Component={SignInPage} exact />
        </Routes>
      </Router>
    </>
  );
}

export default App;
