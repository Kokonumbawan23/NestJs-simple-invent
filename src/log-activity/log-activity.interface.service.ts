import { Barang, Tipe, User } from '@prisma/client';

export abstract class LogActivityService {
  abstract findAll(): Promise<object>;
  abstract createUserAddLog(user: User, obyek: Tipe | Barang): Promise<object>;
  abstract createUserUpdateLog(user: User, obyek: Tipe | Barang): Promise<object>;
  abstract createUserReadLog(user: User, obyek: Tipe | Barang): Promise<object>;
  abstract createUserDeleteLog(user: User, id: number): Promise<object>;
  abstract deleteLog(id: number): Promise<object>;
}
