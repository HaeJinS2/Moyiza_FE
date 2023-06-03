import { useEffect, useRef } from "react";
import { BiSearch } from "react-icons/bi";

const SearchBar = ({ handleSearchInput, search, page }) => {
  // const [onSearch, setOnSearch] = useState(false);
  const inputRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        // setOnSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="border-[1px] flex border-orange-500 w-[480px] h-[60px] items-center rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="w-full flex justify-between pr-6 pl-6 font-sans">
        <input
          onChange={handleSearchInput}
          value={search}
          ref={inputRef}
          placeholder="어떤 모임을 가져볼까요?"
          className="w-full"
        />
        <div className="p-2 rounded-full text-orange-500">
          <BiSearch size={24} />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
