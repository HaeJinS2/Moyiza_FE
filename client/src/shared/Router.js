import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import CreateClubForm from "../pages/CreateClubForm";
import Club from "../pages/Club";
import CreateEventForm from "../pages/CreateEventForm";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/logins" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/create-club-form" element={<CreateClubForm />}/>
        <Route path="/club" element={<Club />}/>
        <Route path="/create-event-form" element={<CreateEventForm />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Router
