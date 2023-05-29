import { useNavigate } from "react-router-dom";

import Heading from "./Heading";

const EmptyState = ({
  title = "등록된 클럽이 없어요!",
  subtitle = "클럽 개설하러가기",
  showReset = false,
  handleClubCategory
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
          <Heading center title={title} />
          {showReset && (
            <>
              {/* <button onClick={() => {}}>필터링 리셋하기</button> */}

              <button onClick={() => navigate("/create-club-form")}>
               클럽 개설하러 가기
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EmptyState;
