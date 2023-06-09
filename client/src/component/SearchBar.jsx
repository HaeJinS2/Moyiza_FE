import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { getAPI } from "../axios";
import { searchState } from "../states/searchState";

const SearchBar = () => {
  const navigate = useNavigate()
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
    getAPI(`/club/search?q=${search}`)
      .then((res) => {
        console.log(res.data.content);
        setSearchList({ ...searchList, searchedClubList: res.data.content });
        setSearch("")
        navigate('/search')
      })
      .catch((err) => console.log(err));
  };

  console.log(search)
  return (
    <div className="border-[1px] flex border-orange-500 w-[480px] h-[50px] items-center rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="w-full flex justify-between pr-6 pl-6 font-sans">
        <input
          onChange={handleSearchInput}
          onKeyPress={handleSearch}
          value={search}
          placeholder="어떤 모임을 가져볼까요?"
          className="w-full focus:outline-none"
        />
        <div
          className="p-2 rounded-full text-orange-500"
          onClick={handleSearch}
        >
          <BiSearch size={24} />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
