import { Actor } from "src/app/actors/model/actor";
import { Class } from "src/app/classes/model/class";
import { Director } from "src/app/directors/model/director";

export interface Movie {
  _id: string;
  name: string;
  year: string;
  synopsis: string;
  category: string;
  director: Director;
  c: Class;
  cast: Actor[];
}
