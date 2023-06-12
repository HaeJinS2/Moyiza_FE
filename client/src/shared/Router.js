import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import CreateClubForm from "../pages/CreateClubForm";
import Club from "../pages/Club";
import CreateEventForm from "../pages/CreateEventForm";
import Detail from "../pages/Detail";
// import NotFound from "../pages/NotFound";
import Oneday from "../pages/Oneday";
import Chat from "../pages/Chat";
import MyInfoClub from "../pages/MyInfoClub";
import CreateFeed from "../pages/CreateFeed";
import Navbar from "../component/Navbar";
import ChatWindow from "../component/ChatWindow";
import { useRecoilValue } from "recoil";
import { roomIdStates } from "../states/chatState";
import CreateOnedayForm from "../pages/CreateOnedayForm";
import MyInfoOneday from "../pages/MyInfoOneday";
import OnedayDetail from "../pages/OnedayDetail";
import Search from "../pages/Search";
import SignUpSocial from "../pages/SignUpSocial";

const Router = () => {
  const roomIdState = useRecoilValue(roomIdStates);
  console.log(roomIdState)
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/social/signup" element={<SignUpSocial />} />
          <Route path="/user/mypage" element={<MyInfoClub />} />
          <Route path="/user/mypage/oneday" element={<MyInfoOneday />} />
          <Route path="/create-club-form" element={<CreateClubForm />} />
          <Route path="/club" element={<Club />} />
          <Route path="/oneday" element={<Oneday />} />
          <Route path="/club/:id" element={<Detail />} />
          <Route path="/create-event-form/:id" element={<CreateEventForm />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/create-feed" element={<CreateFeed />} />
          <Route path="/create-oneday-form" element={<CreateOnedayForm />} />
          <Route path="/oneday/:id" element={<OnedayDetail />} />
          <Route path="/search" element={<Search />} />


          {/* <Route path="/404" element={<NotFound />} /> */}
        </Routes>
        {roomIdState ?
          roomIdState.map((item, index) =>
            <ChatWindow style={{ right: `${index * 370}px` }} key={index} roomIdState={item} />)
          : null}
        {/* <ChatWindow /> */}
      </BrowserRouter>
    </>
  );
};

export default Router;
