import { atom } from 'recoil';


export const optionState = atom({
    key: 'optionState',
    default: {
        optionList: null,
    }
})

export const tempIdState = atom({
    key: 'tempIdState',
    default: null,
});

export const clubState = atom({
    key: 'clubState', 
    default: {
        tempId: null,
        category: null,
        tag: null,
        title: null,
        content: null,
        restriction: null,
    }, 
});