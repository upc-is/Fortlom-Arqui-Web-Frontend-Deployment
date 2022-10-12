import { Artist } from './artist';
export interface Publication {

      id:number
      description:string;
      image:boolean
      
      registerdate:Date;
      artist:Artist
      artistid:number
}
