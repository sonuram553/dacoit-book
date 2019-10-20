export class User {
  constructor(
    public _id: string,
    public name: string,
    public age: number,
    public date: Date,
    public location: string,
    public description: string,
    public birthMark: string,
    public gender: string,
    public photo: string
  ) {}
}

export interface Admin {
  _id: string;
  users: string[];
}
