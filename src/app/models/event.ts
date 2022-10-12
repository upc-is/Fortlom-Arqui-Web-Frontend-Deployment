import { Artist } from './artist';
export interface Event {
      id:number
      name:string
      description:string
      registerdate:Date
      ticketLink:string
      artist:Artist

      likes:number;
}
