export type BakeryStatus = 'POSTING' | 'UNPOSTING';

export type BakeriesItemEntity = {
  bakeryId: number;
  name: string;
  createdAt: string;
  modifiedAt: string;
  status: BakeryStatus;
};

export type BakeryMenuEntity = {
  productId: number;
  productType: string;
  productName: string;
  price: number;
  image: string | null;
};

export type BakeryDetailBaseEntity = {
  name: string;
  image: string | null;
  address: string;
  latitude: number;
  longitude: number;
  hours: string | null;
  websiteURL: string | null;
  instagramURL: string | null;
  facebookURL: string | null;
  blogURL: string | null;
  phoneNumber: string | null;
};

export type BakeryDetailEntity = BakeryDetailBaseEntity & {
  facilityInfoList: string[]; // PARKING...
  productList: BakeryMenuEntity[];
  status: BakeryStatus;
};
