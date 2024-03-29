import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Content from "./pages/Content";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signout from "./pages/Signup";
import Header from "./pages/components/Header";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./pages/components/PrivateRoute";
import CreateListing from "./pages/CreateListing";

function App() {
  return (
   <>
    <Router>
      <Header/>
      <Routes>

        <Route path="/" element = {<Home />}/>
        <Route path="/content" element = {<Content />}/>
        <Route path="/forgot-password" element = {<ForgotPassword />}/>
        <Route path="/profile" element = {<PrivateRoute />}>
        <Route path="/profile" element = {<Profile />}/>
        </Route>
        <Route path="/sign-in" element = {<Signin />}/>
        <Route path="/sign-up" element = {<Signout />}/>
        <Route path="/create-listing" element = {<CreateListing />}/>
      
      </Routes>
    </Router>
    <ToastContainer
    position="bottom-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
    transition="bounce"
/>

   </>
  );
}

export default App;
