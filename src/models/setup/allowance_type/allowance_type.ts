export interface IAllowanceType {
  id: number;
  typeName: string;
  description: string;
  isTransportation: boolean;
  isTelephone: boolean;
  taxRate: number;
  deductionCompulsory: boolean;
}
