import { atom } from 'recoil';


export const onedayOptionState = atom({
    key: 'optionState',
    default: {
        optionLists: null,
        categoryLists: null,
        tagLists: null,
        genderPolicyLists: null,
    }
})

export const onedayTmpIdState = atom({
  key: 'onedayTmpIdState',
  default: null
})

export const savedOnedayDataState = atom({
  key: 'savedOnedayDataState',
  default: null
})
