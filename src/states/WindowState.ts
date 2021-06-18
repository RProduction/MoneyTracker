import {
  atom, 
  useRecoilValue,
  useSetRecoilState
} from 'recoil';

// page state
export enum PageEnum {
  Income, Overall
}

const page = atom<PageEnum>({
  key: 'pageAtom',
  default: PageEnum.Income
});

export const getPage = () => {
  const value = useRecoilValue(page);

  return value === PageEnum.Income ? 0 : 1;
}

export const setPage = () => {
  const set = useSetRecoilState<PageEnum>(page);
  return (value: PageEnum) => {
    set(() => value);
  }
}