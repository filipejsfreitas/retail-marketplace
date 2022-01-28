export interface Client {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  favoriteProducts: [string];
  phoneNumber: string;
  //birthDate: Date;
}
