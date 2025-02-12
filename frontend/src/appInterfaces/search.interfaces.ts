export type Criteres = {
  ageMin: number | null;
  ageMax: number | null;
  fameMin: number | null;
  location: string | null;
  tags: string[] | null;
  photo: boolean | null;
};

export type Tags = {
  id: number;
  name: string;
};
