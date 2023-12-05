import { Customer } from "src/app/customers/model/customer";
import { Item } from "src/app/items/model/item";

export interface LocationModel {
  _id: string;
  item: Item;
  customer: Customer;
  worth: string;
  fine: string;
  estimatedDevolutionDate: string;
  devolutionDate: string;
  locationDate: string;
  paid: string;
}
