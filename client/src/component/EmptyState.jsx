// import CreateClub from "../pages/CreateClub";

import { useNavigate } from "react-router-dom";
import Heading from "./Heading";

const EmptyState = ({
  page,
  subtitle = "일상속 개설하러가기",
  showReset = false,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col justify-center items-center ">
        <div className="h-[300px] flex flex-col gap-2 justify-center items-center">
          {page === "club" && (
            <>
              <Heading center title="등록된 일상속이 없어요!" />
              <button onClick={() => navigate("/create-feed")}>
                일상속 개설하러 가기
              </button>
            </>
          )}
          {page === "event" && (
            <>
              <Heading center title="등록된 이벤트가 없어요." />
              <div>클럽 관리자에게 이벤트 생성을 문의해주세요!</div>
            </>
          )}
          {page === "oneday" && (
            <>
              <Heading center title="등록된 하루속이 없어요!" />
              <button onClick={() => navigate("/create-feed")}>
                하루속 개설하러 가기
              </button>
            </>
          )}
          {page === "detail" && (
            <>
              <Heading center title="등록된 이벤트가 없어요." />
              <div>클럽 관리자에게 이벤트 생성을 문의해주세요!</div>
            </>
          )}

          {page === "review" && (
            <>
              <Heading center title="등록된 후기가 없어요." />
              <div>이벤트에 참여 후 후기를 작성해주세요!</div>
            </>
          )}
          {showReset && <>{/* <CreateClub /> */}</>}
        </div>
      </div>
    </>
  );
};

export default EmptyState;
