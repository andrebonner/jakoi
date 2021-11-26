export interface Auth {
  id?: number;
  username: string;
  email?: string;
  password: string;
  role: number;
  createdAt?: Date;
  token?: string;
}
