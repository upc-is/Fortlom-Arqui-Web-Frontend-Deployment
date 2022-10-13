import { Person } from "./Person";

export interface Report {
      id:number;

      description:string

      userMain:Person;


      userReported:Person;
}
