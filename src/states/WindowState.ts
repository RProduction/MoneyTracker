import {
  atom, 
  useRecoilValue,
  useSetRecoilState
} from 'recoil';
import {useHistory} from 'react-router-dom';

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
  const history = useHistory();
  return (value: PageEnum) => {
    set(() => value);
    history.push(value === PageEnum.Income ? "/" : "overall");
  }
}