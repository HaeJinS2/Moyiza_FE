import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import CreateClubForm from "../pages/CreateClubForm";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/create-club-form" element={<CreateClubForm />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Router
