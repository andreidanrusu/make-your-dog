import { DogEntry } from "../dog-entry";

export class DogsService {
  dogs: DogEntry[] = [{name:"dog",image:""}];

  addDog(name:string, image:string) {
    this.dogs.push({name, image});
  }
}