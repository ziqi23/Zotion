import { Route, Routes } from "react-router-dom"
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import UserHomepage from "./components/UserHomepage/UserHomepage"

function App() {

  return (
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/home" element={<UserHomepage />} />
    </Routes>
  );
}

export default App;
