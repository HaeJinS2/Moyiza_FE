import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import CreateClubForm from "../pages/CreateClubForm";
import Club from "../pages/Club";
import CreateEventForm from "../pages/CreateEventForm";
import Detail from "../pages/Detail";
import NotFound from "../pages/NotFound";
import Event from "../pages/Event";
import Chat from "../pages/Chat";
import MyInfo from "../pages/MyInfo";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/logins" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user/profile" element={<MyInfo />} />
        <Route path="/create-club-form" element={<CreateClubForm />} />
        <Route path="/club" element={<Club />} />
        <Route path="/event" element={<Event />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create-event-form/:id" element={<CreateEventForm />}/>
        <Route path="/chat" element={<Chat />} />

        <Route path="/404" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
