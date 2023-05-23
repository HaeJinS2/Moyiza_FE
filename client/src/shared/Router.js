import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import CreateClubForm from "../pages/CreateClubForm";
import Club from "../pages/Club";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/create-club-form" element={<CreateClubForm />}/>
        <Route path="/club" element={<Club />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Router
