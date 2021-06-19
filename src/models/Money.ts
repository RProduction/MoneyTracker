export interface Money {
  _id: string;
  value: number;
  date: string;
  type: "increase" | "decrease";
}