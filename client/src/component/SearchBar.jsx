import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import swal from "sweetalert";
import { getAPI } from "../axios";
import { searchState } from "../states/searchState";

const SearchBar = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [searchList, setSearchList] = useRecoilState(searchState);
  const [search, setSearch] = useState("");
  // const inputRef = useRef(null);
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (inputRef.current && !inputRef.current.contains(event.target)) {
  //       // setOnSearch(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    if (e.type === "keypress" && e.key !== "Enter") return;
    if (search.trim().length === 0){
      return swal('검색어를 입력해주세요!')
    }
    Promise.all([
      getAPI(`/oneday/search?q=${search}`).then((res) => {
        setSearchList((prev) => ({
          ...prev,
          searchedOnedayList: res.data.content,
        }));
      }),

      getAPI(`/club/search?q=${search}`).then((res) => {
        setSearchList((prev) => ({
          ...prev,
          searchedClubList: res.data.content,
        }));
        setSearch("");
      }),
    ])
      .then(() => {
        navigate("/search");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="border-[1px] flex border-[#FF7F1D] w-[480px] h-[40px] items-center rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="w-full flex justify-between pr-6 pl-6 font-sans">
        <input
          onChange={handleSearchInput}
          onKeyPress={handleSearch}
          value={search}
          placeholder="어떤 모임을 가져볼까요?"
          className="w-full focus:outline-none"
        />
        <div
          className=" rounded-full text-[#FF7F1D]"
          onClick={handleSearch}
        >
          <BiSearch size={24} />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
