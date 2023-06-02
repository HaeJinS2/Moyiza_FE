import CreateClub from "../pages/CreateClub";

import Heading from "./Heading";

const EmptyState = ({
  page,
  subtitle = "클럽 개설하러가기",
  showReset = false,
}) => {
  console.log(page)
  return (
    <>
      <div className="flex flex-col justify-center items-center ">
        <div className="h-[500px] flex flex-col gap-2 justify-center items-center">
          {
            (page === "club" ? (
              <Heading center title="등록된 클럽이 없어요!" />
            ) : (
              <Heading center title="등록된 이벤트가 없어요!" />
            ))
          }
          {showReset && (
            <>
              <CreateClub />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EmptyState;
