export interface IApiTokenData {
  userId: string;
  userRoleId: string;
  expiryDate: Date;
  lastAccess: Date;
}

export default interface UpdateData {
  name: string;
  phone: string;
  userId: number;
  profile: any;
}
