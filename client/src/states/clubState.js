import { atom } from 'recoil';


export const optionState = atom({
    key: 'optionState',
    default: {
        optionLists: null,
        categoryLists: null,
        tagLists: null,
        genderPolicyLists: null,
    }
})

export const tempIdState = atom({
    key: 'tempIdState',
    default: null,
});

export const clubState = atom({
    key: 'clubState', 
    default: {
        // tempId: null,
        // category: null,
        // tag: '',
        // title: '',
        // content: '',
        // policy: null,
        // restriction: null,
    }, 
});


export const latestClubState = atom({
    key: 'latestClubState',
    default: null,
});

export const isLoadingState = atom({
    key: 'isLoadingState',
    default: false,
});