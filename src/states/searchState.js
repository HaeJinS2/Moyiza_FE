import { atom } from 'recoil';


export const searchState = atom({
    key: 'optionState',
    default: {
        searchedClubList:[],
        searchedOnedayList:[]
    }
})