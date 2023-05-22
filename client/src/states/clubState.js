import { atom } from 'recoil';

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