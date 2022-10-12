import { Publication } from './publication';
import { Person } from "./Person";

export interface Comment {
      id:number;

      commentdescription:string;

      registerdate:Date;

      userAccount:Person;

      publication:Publication;
}
