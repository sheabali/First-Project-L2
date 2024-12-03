export type TUser = {
  id: string;
  password: string;
  needPasswordChange: string;
  role: string;
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};

export type NewUser = {
  password: string;
  role: string;
  id: string;
};
