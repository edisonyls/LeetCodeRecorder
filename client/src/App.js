import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignInPage from "./pages/SignInPage";
import RegisterPage from "./pages/RegisterPage";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import NewQuestion from "./pages/NewQuestion";
import QuestionDetails from "./pages/QuestionDetails";
import Profile from "./pages/ProfilePage";
import AlgorithmBank from "./pages/AlgorithmBank";
import FriendPage from "./pages/FriendPage";
import { UserProvider } from "./context/userContext";

function App() {
  return (
    <>
      <Provider store={store}>
        <UserProvider>
          <Router>
            <Routes>
              <Route path="/" Component={Home} exact />
              <Route path="/signin" Component={SignInPage} exact />
              <Route path="/register" Component={RegisterPage} exact />
              <Route path="/dashboard" Component={Dashboard} exact />
              <Route path="/new" Component={NewQuestion} exact />
              <Route path="/question/:id" Component={QuestionDetails} exact />
              <Route path="profile" Component={Profile} exact />
              <Route path="algorithm" Component={AlgorithmBank} exact />
              <Route path="friends" Component={FriendPage} exact />
            </Routes>
          </Router>
          <ToastContainer />
        </UserProvider>
      </Provider>
    </>
  );
}

export default App;
