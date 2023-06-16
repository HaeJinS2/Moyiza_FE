import { atom } from 'recoil';
import { v1 } from 'uuid';

export const searchState = atom({
    key: `optionState/${v1()}`,
    default: {
        searchedClubList:[],
        searchedOnedayList:[]
    }
})