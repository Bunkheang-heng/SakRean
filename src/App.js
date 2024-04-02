import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AboutMe from "./pages/AboutMe";
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
import ManageCourses from "./pages/ManageCourses";
import Footer from "./pages/components/Footer";
import CourseList from "./pages/components/CourseList";

function App() {
  return (
   <>
    <Router>
      <Header/>
      <Routes>

        <Route path="/aboutMe" element = {<AboutMe />}/>
        <Route path="/content" element = {<Content />}/>
        <Route path="/profile" element = {<PrivateRoute />}>
        <Route path="/profile" element = {<Profile />}/>
        </Route>
        <Route path="/sign-in" element = {<Signin />}/>
        <Route path="/create-listing" element = {<CreateListing />}/>
        <Route path="/updatecourse" element = {<ManageCourses />}/>
        <Route path="/courselist" element = {<CourseList />}/>
      
      </Routes>
      <Footer />
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
