export interface IDesignation {
  id: number;
  designationCode: string;
  designationName: string;
  isActive: boolean;
  rank: number;
}
export type IPostDesignation = Omit<IDesignation, "id">;