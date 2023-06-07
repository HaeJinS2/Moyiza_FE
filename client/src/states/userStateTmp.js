import { atom } from 'recoil';

export const userEmailState = atom({
    key: 'userEmailState',
    default: {
        userEmail: '',
        userNickName: ''
    }
})

export const userNicknameState = atom({
    key: 'userNicknameState',
    default: {
        userNickname: ''
    }
})

export const userIdState = atom({
    key: 'userIdState',
    default: '',
})

export const isLoggedInState = atom({
    key: 'isLoggedInState',
    default: false,
})
