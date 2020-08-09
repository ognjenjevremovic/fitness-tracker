import { BaseModel } from './base.model';


export interface Meal extends BaseModel {
  readonly name: string;
  readonly ingredients: string[];
}
