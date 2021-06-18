export interface Money {
  value: number;
  date: string;
  type: "increase" | "decrease";
}