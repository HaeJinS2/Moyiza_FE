import CreateClub from "../pages/CreateClub";

import Heading from "./Heading";

const EmptyState = ({
  title = "등록된 클럽이 없어요!",
  subtitle = "클럽 개설하러가기",
  showReset = false,
}) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
          <Heading center title={title} />
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
