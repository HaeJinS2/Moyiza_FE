import { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";

const SearchBar = ({ handleSearchInput, search, page }) => {
  const [onSearch, setOnSearch] = useState(false);
  const inputRef = useRef(null);
  console.log(page);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setOnSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="border-[1px] w-2/5 self-center py-2 my-4 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
      {onSearch ? (
        <>
          <div className="w-full flex justify-between pr-2 pl-6">
            <input
              onChange={handleSearchInput}
              value={search}
              ref={inputRef}
              placeholder="검색"
              className="w-full"
            />
            <div className="p-2 bg-rose-400 rounded-full text-white">
              <BiSearch size={18} />
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-row items-center justify-between ">
          {
            (page === "club" ? (
              <>
                <div className="hidden sm:block text-sm font-semibold border-l-[1px] flex-1 text-center">
                  인기 클럽
                </div>
                <div className="hidden sm:block text-sm font-semibold border-x-[1px] flex-1 text-center">
                  오늘 생성된 클럽
                </div>
              </>
            ) : (
              <>
                <div className="hidden sm:block text-sm font-semibold border-l-[1px] flex-1 text-center">
                  인기 이벤트
                </div>
                <div className="hidden sm:block text-sm font-semibold border-x-[1px] flex-1 text-center">
                  내 주변 이벤트
                </div>
              </>
            ))
          }

          <div
            onClick={() => setOnSearch(true)}
            className="text-sm pl-6 pr-2 text-gray-600 flex flex-row  items-center gap-3"
          >
            <div className="hidden sm:block ">검색</div>
            <div className="p-2 bg-rose-400 rounded-full text-white">
              <BiSearch size={18} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
