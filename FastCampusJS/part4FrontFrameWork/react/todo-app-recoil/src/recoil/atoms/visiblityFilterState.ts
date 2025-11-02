import { atom } from 'recoil';
import { createLocalStorageEffect } from './todoState.ts';

export const visibillityFilterState = atom<string>({
  key: 'visibillityFilterState',
  default: 'ALL',
  effects: [createLocalStorageEffect('vf', 'ALL')],
});
