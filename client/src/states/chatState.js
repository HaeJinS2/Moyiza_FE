import { atom } from 'recoil';

export const roomIdStates = atom({
    key: 'roomIdStates',
    default: [],
});

export const roomIdListStates = atom({
    key: 'roomIdListStates',
    default: [],
});

export const roomMsgStates = atom({
    key: 'roomMsgStates',
    default: [],
});

export const roomInfoStates = atom({
    key: 'roomInfoStates',
    default: [],
});

export const reloadChatStates = atom({
    key: 'reloadChatStates',
    default: false,
});
