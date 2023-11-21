import { Partner } from "src/app/partners/model/partner";

export interface Dependent {
  _id: string;
  name: string;
  birthDate: string;
  sex: string;
  status: string;
  partner: Partner;
}
