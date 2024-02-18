import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Content from "./pages/Content";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signout from "./pages/Signout";
import Header from "./pages/components/Header";

function App() {
  return (
   <>
    <Router>
      <Header/>
      <Routes>

        <Route path="/" element = {<Home />}/>
        <Route path="/content" element = {<Content />}/>
        <Route path="/forgot-password" element = {<ForgotPassword />}/>
        <Route path="/profile" element = {<Profile />}/>
        <Route path="/sign-in" element = {<Signin />}/>
        <Route path="/sign-out" element = {<Signout />}/>
      
      </Routes>
    </Router>
   </>
  );
}

export default App;
