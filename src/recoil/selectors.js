// selectors.js
import { selector } from 'recoil';
import { authState } from './authState';

export const isAuthenticatedState = selector({
  key: 'isAuthenticatedState',
  get: ({ get }) => {
    const auth = get(authState);
    return auth.isAuthenticated;
  },
});

export const userEmailState = selector({
  key: 'userEmailState',
  get: ({ get }) => {
    const auth = get(authState);
    return auth.userEmail;
  },
});
