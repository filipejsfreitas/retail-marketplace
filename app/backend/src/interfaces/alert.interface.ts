export interface Alert {
  _id: string;
  user_id: string;
  date: Date;
  message: string;
  dismissed: boolean;
}
