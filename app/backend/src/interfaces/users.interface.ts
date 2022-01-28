export interface User {
  _id: string;
  email: string;
  password: string;
  invalidTokens: [string];
}
