export type BakeriesItemStatus = 'POSTING' | 'UNPOSTING';

export type BakeriesItemEntity = {
  bakeryId: number;
  name: string;
  createdAt: string;
  modifiedAt: string;
  status: BakeriesItemStatus;
};

export type BakeryMenuEntity = {
  name: string;
  price: number;
  image: string | null;
};

export type BakeryDetailEntity = {
  name: string;
  image: string | null;
  address: string;
  hours: string | null;
  websiteURL: string | null;
  instagramURL: string | null;
  facebookURL: string | null;
  blogURL: string | null;
  phoneNumber: string | null;
  menu: BakeryMenuEntity[];
};
