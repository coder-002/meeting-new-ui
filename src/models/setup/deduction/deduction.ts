export interface IDeduction {
  id: number;
  deductTitle: string;
  description: string;
  amount: number;
  rate: number;
  isCompulsory: boolean;
}
