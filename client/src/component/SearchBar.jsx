import { BiSearch } from "react-icons/bi"

const SearchBar = () => {
  return (
    <div className="border-[1px] w-3/5 self-center py-2 my-4 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="flex flex-row items-center justify-between ">
      <div className="hidden sm:block text-sm font-semibold border-l-[1px] flex-1 text-center">
          내 주변 원데이
        </div>
        <div className="hidden sm:block text-sm font-semibold border-l-[1px] flex-1 text-center">
          인기 클럽
        </div>
        <div className="hidden sm:block text-sm font-semibold border-x-[1px] flex-1 text-center">
          오늘 생성된 클럽
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row  items-center gap-3">
          <div className="hidden sm:block ">검색</div>
          <div className="p-2 bg-rose-400 rounded-full text-white">
            <BiSearch size={18}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchBar