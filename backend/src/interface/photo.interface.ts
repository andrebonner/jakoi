export interface Photo {
  id: number;
  name: string;
  caption?: string;
  url: string;
  createdBy: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
