import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignInPage from "./pages/SignInPage";
import RegisterPage from "./pages/RegisterPage";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" exact />
            <Route path="/signin" Component={SignInPage} exact />
            <Route path="/register" Component={RegisterPage} exact />
          </Routes>
        </Router>
        <ToastContainer />
      </Provider>
    </>
  );
}

export default App;
