export type UserDataType = {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  birthdate: string;
  age: number;
  gender: string | null;
  orientation: string | null;
  region: string | null;
  county: string | null;
  town: string | null;
  tall: number;
  biography: string | null;
  fame: number;
  photo1: string | null;
  photo2: string | null;
  photo3: string | null;
  photo4: string | null;
  photo5: string | null;
  tags: string[] | null;
  connected: boolean;
  lastConnection: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UserHeaderType = {
  id: number;
  username: string;
  region: string | null;
  county: string | null;
  town: string | null;
  fame: number;
  photo1: string | null;
  lastConnection: string | null;
};
