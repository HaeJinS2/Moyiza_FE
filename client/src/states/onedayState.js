import { atom } from 'recoil';
import { v1 } from 'uuid';


export const onedayOptionState = atom({
    key: `optionState/${v1()}`,
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
