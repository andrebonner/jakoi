export interface Photo {
  id: number;
  name: string;
  caption: string;
  url: string;
  createdBy: number;
  createdAt?: Date;
  upatedAt?: Date;
  deletedAt?: Date;
}
