import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignInPage from "./pages/SignInPage";
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/Home";
import NewQuestion from "./pages/NewQuestion";
import QuestionDetails from "./pages/QuestionDetails";
import ProfilePage from "./pages/ProfilePage";
import FriendPage from "./pages/FriendPage";
import DataStructurePage from "./pages/DataStructurePage";
import AlgorithmPage from "./pages/AlgorithmPage";
import { UserProvider } from "./context/userContext";
import { DataStructureProvider } from "./context/dataStructureContext";
import UpdateQuestionForm from "./components/new_question/UpdateQuestionForm";
import TablePage from "./pages/TablePage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <UserProvider>
        <DataStructureProvider>
          <Router>
            <Routes>
              <Route path="/" Component={Home} exact />
              <Route path="/signin" Component={SignInPage} exact />
              <Route path="/register" Component={RegisterPage} exact />
              <Route path="/table" Component={TablePage} exact />
              <Route path="/new" Component={NewQuestion} exact />
              <Route path="/question/:id" Component={QuestionDetails} exact />
              <Route path="/profile" Component={ProfilePage} exact />
              <Route path="/dashboard" Component={Dashboard} exact />
              <Route path="/algorithm" Component={AlgorithmPage} exact />
              <Route
                path="/edit-question"
                Component={UpdateQuestionForm}
                exact
              />

              <Route
                path="/data-structure"
                Component={DataStructurePage}
                exact
              />
              <Route path="/algorithm" Component={AlgorithmPage} exact />
              <Route path="/friends" Component={FriendPage} exact />
            </Routes>
          </Router>
          <ToastContainer />
        </DataStructureProvider>
      </UserProvider>
    </>
  );
}

export default App;
