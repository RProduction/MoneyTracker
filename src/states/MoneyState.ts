import {
  atom,
  selector, 
  useRecoilValue,
  useSetRecoilState
} from 'recoil';
import {generate} from 'shortid';
import PouchDB from 'pouchdb';

import { Money } from "../models/Money";

// money state

const money = atom<Money[]>({
  key: 'moneyAtom',
  default: []
});

// money list selector
export interface MoneyList {
  date: string;
  value: Money[];
}
const moneyList = selector({
  key: 'moneyListSelector',
  get: ({get}) => {
    const value = get(money);
    let newVal: MoneyList[] = [];

    // process money into nested form
    // maintain into map using date as key
    // only month and year
    let rawVal: Map<string, Money[]> = new Map();
    for(let val of value) {
      const rawDate = val.date.split("/");
      const dateTemp = `${rawDate[1]}/${rawDate[2]}`;
      let prev = rawVal.get(dateTemp);
      if(!prev) prev = [];
      rawVal.set(dateTemp, [...prev, val])
    }

    // convert map into array
    // and sort using date
    rawVal.forEach((value, key) => {
      newVal.push({
        date: key,
        value: value.sort((a, b) => {
          const rawA = parseInt(a.date.split("/")[0]);
          const rawB = parseInt(b.date.split("/")[0]);
          return rawB - rawA;
        })
      });
    })
    newVal.sort((a, b) => {
      const rawA = a.date.split("/");
      const rawB = b.date.split("/");
      if(rawA[1] !== rawB[1]){
        return parseInt(rawB[1]) - parseInt(rawA[1]);
      }else{
        return parseInt(rawB[0]) - parseInt(rawA[0]);
      };
    });

    return newVal;
  }
})

const moneyOverall = selector({
  key: 'moneyOverallSelector',
  get: ({get}) => {
    const value = get(money);
    let newVal: MoneyList[] = [];

    // process money into nested form
    // maintain into map using date as key
    let rawVal: Map<string, Money[]> = new Map();
    for(let val of value) {
      let prev = rawVal.get(val.date);
      if(!prev) prev = [];
      rawVal.set(val.date, [...prev, val])
    }

    // convert map into array
    // and sort using date
    rawVal.forEach((value, key) => {
      newVal.push({
        date: key,
        value: value
      });
    })
    newVal = newVal.sort((a, b) => {
      const rawA = a.date.split("/");
      const rawB = b.date.split("/");
      const dateA = new Date(parseInt(rawA[2]), parseInt(rawA[1]), parseInt(rawA[0]));
      const dateB = new Date(parseInt(rawB[2]), parseInt(rawB[1]), parseInt(rawB[0]));
      return dateA.getTime() - dateB.getTime();
    });
    
    // combine value in the same day
    let rawValue: Money[] = newVal.map(value => {
      return value.value.reduce((prev, cur) => {
        const tempPrev = prev.type === 'increase' ? prev.value : -prev.value;
        const tempCur = cur.type === 'increase' ? cur.value : -cur.value;
        const res = tempPrev + tempCur;

        return {
          _id: "",
          date: prev.date,
          value: Math.abs(res),
          type: res >= 0 ? 'increase' : 'decrease'
        };
      });
    });

    // compute income for each data inserted in each day
    let newValue: Money[] = [];
    for(let i=0; i < rawValue.length; i++) {
      let tempMoney: Money = {
        _id: "",
        date: rawValue[i].date,
        value: 0,
        type: "increase"
      };
      for(let j=0; j <= i; j++) {
        const tempPrev = tempMoney.type === 'increase' ? tempMoney.value : -tempMoney.value;
        const tempCur = rawValue[j].type === 'increase' ? rawValue[j].value : -rawValue[j].value;
        const res = tempPrev + tempCur;

        tempMoney.value = res;
        tempMoney.type = res >= 0 ? 'increase' : 'decrease';
      }
      newValue.push(tempMoney);
    }
    console.log(newValue);

    return newValue;
  }
})

const income = selector({
  key: 'incomeSelector',
  get: ({get}) => {
    const value = get(moneyOverall);
    return value[value.length-1].type === "increase" ? value[value.length-1].value : 0 ;
  }
})

// getter and setter
export const initMoney = () => {
  const setMoney = useSetRecoilState(money);
  return async() => {
    const db = new PouchDB("db");
    const res = await db.allDocs<Money>({include_docs: true});
    db.close();

    setMoney((val) => res.rows.map(value => ({
      _id: value.doc ? value.doc._id : "",
      date: value.doc ? value.doc.date : "",
      type: value.doc ? value.doc.type : "increase",
      value: value.doc ? value.doc.value : 0,
    })));
  }
}

export const getMoneyList = () => {
  return useRecoilValue(moneyList);
}

export const setMoneyList = () => {
  const setMoney = useSetRecoilState(money);
  return (value: Money) => {
    value._id = generate();
    const db = new PouchDB("db");
    db.put(value);
    db.close();
    setMoney((val) => [...val, value]);
  }
}

export const deleteMoneyList = () => {
  const setMoney = useSetRecoilState(money);
  return async (id: string) => {
    const db = new PouchDB("db");
    const money = await db.get<Money>(id);
    db.remove(money);
    db.close();

    setMoney((val) => val.filter((value) => value._id !== id));
  }
}

export const getMoneyOverall = () => {
  return useRecoilValue(moneyOverall);
}

export const getIncome = () => {
  return useRecoilValue(income);
}