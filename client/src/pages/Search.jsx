import { useRecoilValue } from "recoil";
import Container from "../component/Container"
import { searchState } from "../states/searchState";

function Search (){
  const searchList = useRecoilValue(searchState)
 console.log(searchList.searchedClubList)
  return(<>
<Container>
  <div className="flex">
    <div>일상속</div>
    <div>하루속</div>

  </div>
  <div className="flex bg-[#FFFDF2] w-full h-screen">

  </div>
</Container>
  </>)
}

export default Search