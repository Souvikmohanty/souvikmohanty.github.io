export interface AlbumPhoto {
  id: string;
  src: string;
  caption: string;
  aspectClass: string;
  objectPosition: string;
  tiltClass: string;
  tapeVariant: 'amber' | 'green' | 'corners';
}

export interface AlbumSpread {
  id: string;
  spreadNumber: string;
  tabLabel: string;
  leftTitle: string;
  leftNote: string;
  rightTitle: string;
  rightNote: string;
  leftPhotos: AlbumPhoto[];
  rightPhotos: AlbumPhoto[];
}

export const COVER_PREVIEW_PHOTO = {
  src: './assets/aistudio/7433A561-E60B-4F4C-AE1B-40C7E678C89B_4_5005_c_b610720e.jpeg',
  alt: 'Department of Entomology group snapshot on album cover',
  objectPosition: 'object-[50%_72%]',
};

export const ALBUM_SPREADS: AlbumSpread[] = [
  {
    id: 'talks-conferences',
    spreadNumber: '01',
    tabLabel: '01. Talks & Field',
    leftTitle: 'Symposia & Podium Days',
    leftNote: 'From posters to stingless bee biology slides.',
    rightTitle: 'Results & Veranda Notes',
    rightNote: 'Sharing nesting habitats & reading by the hive.',
    leftPhotos: [
      {
        id: 'pb-1',
        src: './assets/aistudio/6B227D70-53D8-4EC4-8138-67AFECD968D8_1_105_c_9b01009f.jpeg',
        caption: 'Poster session · Manipur Science Congress',
        aspectClass: 'aspect-[3/4]',
        objectPosition: 'object-[50%_40%]',
        tiltClass: '-rotate-2',
        tapeVariant: 'amber',
      },
      {
        id: 'pb-2',
        src: './assets/aistudio/91464422-AD1B-4525-8D34-84C8879B07EE_1_105_c_4a196920.jpeg',
        caption: 'Introducing stingless bees onstage',
        aspectClass: 'aspect-[4/3]',
        objectPosition: 'object-[50%_58%]',
        tiltClass: 'rotate-2',
        tapeVariant: 'corners',
      },
    ],
    rightPhotos: [
      {
        id: 'pb-3',
        src: './assets/aistudio/7709B541-B1BA-4A24-87B1-5983DCB45425_1_105_c_6a61973e.jpeg',
        caption: 'Presenting bamboo & cavity nesting data',
        aspectClass: 'aspect-[4/3]',
        objectPosition: 'object-[50%_55%]',
        tiltClass: 'rotate-1',
        tapeVariant: 'green',
      },
      {
        id: 'pb-4',
        src: './assets/aistudio/2FDD7FAC-7CC7-4C9C-9A0C-37B4D77089B5_4_5005_c_aee2ad3a.jpeg',
        caption: 'Reading notes under a bamboo hive',
        aspectClass: 'aspect-[3/4]',
        objectPosition: 'object-[50%_38%]',
        tiltClass: '-rotate-2',
        tapeVariant: 'amber',
      },
    ],
  },
  {
    id: 'thesis-mentors',
    spreadNumber: '02',
    tabLabel: '02. Thesis Day',
    leftTitle: 'Hardbound M.Sc. Monograph',
    leftNote: 'Submitting the green-bound thesis at CAU.',
    rightTitle: 'Gratitude & Advisors',
    rightNote: 'Mentors who guided every step in Imphal.',
    leftPhotos: [
      {
        id: 'pb-5',
        src: './assets/aistudio/A34A215A-CAF0-4028-9659-84154ACCB7B9_4_5005_c_d6fc4430.jpeg',
        caption: 'With my guide Dr. Th. Robindro Singh',
        aspectClass: 'aspect-[3/4]',
        objectPosition: 'object-[50%_42%]',
        tiltClass: 'rotate-1',
        tapeVariant: 'corners',
      },
      {
        id: 'pb-6',
        src: './assets/aistudio/7584A52C-F26E-4053-8C47-69BCD567A6D6_1_105_c_81d4f3e8.jpeg',
        caption: 'Thesis submission day with faculty',
        aspectClass: 'aspect-[3/4]',
        objectPosition: 'object-[50%_48%]',
        tiltClass: '-rotate-2',
        tapeVariant: 'amber',
      },
    ],
    rightPhotos: [
      {
        id: 'pb-7',
        src: './assets/aistudio/666A6A8E-5771-4847-B070-B8EF86979840_4_5005_c_66f08038.jpeg',
        caption: 'Signed & sealed at the department',
        aspectClass: 'aspect-[3/4]',
        objectPosition: 'object-[50%_40%]',
        tiltClass: '-rotate-1',
        tapeVariant: 'green',
      },
      {
        id: 'pb-8',
        src: './assets/aistudio/2BA964A2-D689-488A-A624-962B7B46FBFD_4_5005_c_aea670a2.jpeg',
        caption: 'Holding the finished thesis copy',
        aspectClass: 'aspect-[3/4]',
        objectPosition: 'object-[50%_45%]',
        tiltClass: 'rotate-2',
        tapeVariant: 'corners',
      },
    ],
  },
  {
    id: 'cau-family',
    spreadNumber: '03',
    tabLabel: '03. CAU Family',
    leftTitle: 'Entomology Courtyard',
    leftNote: 'Faculty, scholars & batchmates in Imphal.',
    rightTitle: 'Sunsets & Campus Steps',
    rightNote: 'Post-field smiles and quiet evenings.',
    leftPhotos: [
      {
        id: 'pb-9',
        src: './assets/aistudio/7433A561-E60B-4F4C-AE1B-40C7E678C89B_4_5005_c_b610720e.jpeg',
        caption: 'Department of Entomology family, CAU',
        aspectClass: 'aspect-[4/3]',
        objectPosition: 'object-[50%_72%]',
        tiltClass: '-rotate-1',
        tapeVariant: 'amber',
      },
      {
        id: 'pb-10',
        src: './assets/aistudio/DE879C9B-B926-4DE8-9460-16850FA4D0BD_1_105_c_0e36d31b.jpeg',
        caption: 'Labmates outside the CAU courtyard',
        aspectClass: 'aspect-[3/4]',
        objectPosition: 'object-[50%_62%]',
        tiltClass: 'rotate-2',
        tapeVariant: 'green',
      },
    ],
    rightPhotos: [
      {
        id: 'pb-11',
        src: './assets/aistudio/5135F578-0AC9-4782-94AB-8ECD835BC75F_4_5005_c_bbb4c16e.jpeg',
        caption: 'Warm afternoon on the porch steps',
        aspectClass: 'aspect-[3/4]',
        objectPosition: 'object-[50%_65%]',
        tiltClass: 'rotate-1',
        tapeVariant: 'corners',
      },
      {
        id: 'pb-12',
        src: './assets/aistudio/0E8CBF52-6505-4400-AE18-D8A0DF5960BE_4_5005_c_5404c3d2.jpeg',
        caption: 'Golden hour field selfie with friends',
        aspectClass: 'aspect-[3/4]',
        objectPosition: 'object-[50%_55%]',
        tiltClass: '-rotate-2',
        tapeVariant: 'amber',
      },
    ],
  },
  {
    id: 'off-duty',
    spreadNumber: '04',
    tabLabel: '04. Off-Duty',
    leftTitle: 'Cafes & Hill Roads',
    leftNote: 'Writing thesis chapters & riding above the pines.',
    rightTitle: 'Music & Analog Finds',
    rightNote: 'Vinyl crates between lab weeks.',
    leftPhotos: [
      {
        id: 'pb-13',
        src: './assets/aistudio/582A83C5-CFED-4428-BD91-9BAE7956629B_4_5005_c_bff23b9a.jpeg',
        caption: 'Afternoon laptop desk at Ewakpham',
        aspectClass: 'aspect-[3/4]',
        objectPosition: 'object-[50%_62%]',
        tiltClass: '-rotate-2',
        tapeVariant: 'green',
      },
      {
        id: 'pb-14',
        src: './assets/aistudio/6AAE2B49-AC41-4340-94F5-3395E2F76237_4_5005_c_4d3dab55.jpeg',
        caption: 'Pine ridge motorbike ride over the lake',
        aspectClass: 'aspect-[4/3]',
        objectPosition: 'object-[50%_62%]',
        tiltClass: 'rotate-2',
        tapeVariant: 'corners',
      },
    ],
    rightPhotos: [
      {
        id: 'pb-15',
        src: './assets/aistudio/16DDABC0-8C98-48FD-98DE-7B83CCE46EE6_4_5005_c_01e48775.jpeg',
        caption: 'Crate digging for vintage vinyl records',
        aspectClass: 'aspect-[3/4]',
        objectPosition: 'object-[50%_60%]',
        tiltClass: '-rotate-1',
        tapeVariant: 'amber',
      },
    ],
  },
];

export const ALL_ALBUM_PHOTOS: AlbumPhoto[] = ALBUM_SPREADS.flatMap((spread) => [
  ...spread.leftPhotos,
  ...spread.rightPhotos,
]);
