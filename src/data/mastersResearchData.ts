import type { CasualPhoto } from './portfolioData';

export interface ResearchMetric {
  label: string;
  value: string;
  sublabel?: string;
}

export interface MastersChapter {
  id: 'biology' | 'nesting' | 'foraging';
  stepNumber: string;
  badge: string;
  title: string;
  subtitle: string;
  summary: string;
  methodNote: string;
  metrics: ResearchMetric[];
  highlights: string[];
  photos?: CasualPhoto[];
}

export const THESIS_METADATA = {
  sectionHeading: 'Understanding my Masters Research',
  thesisTitle:
    'Bioecology of Stingless Bee Species Tetragonula srikantanathi (Viraktamath and Thangjam) in Manipur Valley Conditions',
  degree: 'Master of Science (Agriculture) in Entomology',
  department: 'Department of Entomology, College of Agriculture',
  university: 'Central Agricultural University (CAU), Iroisemba, Imphal 795004',
  registrationNo: 'CAU-24-M-A-COA-MAN-46',
  period: 'November 2025 – April 2026',
  site: 'Integrated Beekeeping and Development Centre (IBDC), CoA, CAU Imphal',
  speciesOrigin:
    'Colonies in traditional bamboo log hives procured from Riha village, Ukhrul (acclimatised 4+ weeks); species identity confirmed via non-destructive water traps & male genital morphology with Dr. R. Thangjam.',
};

export const MASTERS_CHAPTERS: MastersChapter[] = [
  {
    id: 'biology',
    stepNumber: '01',
    badge: 'OBJECTIVE I · DEVELOPMENT',
    title: 'Biology of Tetragonula srikantanathi',
    subtitle: 'Egg → Larva → Pupa inside bamboo log hives (47.28 ± 2.45 days)',
    summary:
      'Tracked 50 freshly oviposited worker brood cells across five traditional bamboo colonies (10 marked cells per hive) from Day 0 egg laying to adult eclosion.',
    methodNote:
      'Hives were gently opened during the 11:00–12:00 h midday foraging window when in-nest worker density is lowest, and uncapped cells were inspected non-destructively using a Dino-Lite USB digital microscope before resealing their cerumen caps.',
    metrics: [
      { label: 'Egg Stage', value: '5.12 ± 0.77 d', sublabel: 'Smooth, translucent cream' },
      { label: 'Larval Stage', value: '15.88 ± 1.19 d', sublabel: 'Apodous, C-shaped, creamy white' },
      { label: 'Pupal Stage', value: '26.28 ± 0.93 d', sublabel: 'Exarate, temp-sensitive' },
      { label: 'Total Brood Cycle', value: '47.28 ± 2.45 d', sublabel: 'Range: 45.40 – 49.50 days' },
    ],
    highlights: [
      'Pupal development accounted for over half of the total cycle (~55.6%), making it the longest and most temperature-sensitive phase in Manipur’s winter climate.',
      'Mass-provisioned cells followed the holometabolous sequence cleanly across all five hives (Hive 3 fastest at 45.40 ± 1.07 d; Hive 4 at 49.50 ± 2.12 d).',
    ],
  },
  {
    id: 'nesting',
    stepNumber: '02',
    badge: 'OBJECTIVE II · ARCHITECTURE',
    title: 'Nesting Architecture in Bamboo Hives',
    subtitle: '5-zone longitudinal layout, suspended single-cell combs & protective resin shields',
    summary:
      'Sectionally dissected four colonised bamboo log hives using a measuring scale and precision vernier calliper (± 0.01 mm) to map both external entrances and internal nest geometry.',
    methodNote:
      'Unlike cluster-building congeners, T. srikantanathi builds distinctive horizontally suspended, single-cell-thick brood combs neatly organised along the tubular bamboo internode.',
    metrics: [
      { label: 'Occupied / Total Nest', value: '31.18 / 39.80 cm', sublabel: 'Cavity Ø 9.05 ± 1.81 cm' },
      { label: 'Brood Cell Size', value: '2.74 × 3.25 mm', sublabel: 'Horizontal single-cell combs' },
      { label: 'Honey & Pollen Pots', value: '~6.94 – 7.29 mm', sublabel: '2–3× larger than brood cells' },
      { label: 'Central Brood Zone', value: '9.85 ± 3.38 cm', sublabel: 'Largest of 5 longitudinal zones' },
    ],
    highlights: [
      'Consistent 5-zone anterior-to-posterior blueprint: Anterior Resin/Wax (4.05 cm) → Anterior Food (4.83 cm) → Central Brood (9.85 cm) → Posterior Food (6.10 cm) → Posterior Resin/Wax (3.70 cm).',
      'Three hives featured coarse brown oval entrances, while Hive 3 built a yellowish cylindrical entrance tunnel (2.8 cm); all colonies retained protective batumen seals and brood-wrapping involucrum sheets.',
    ],
  },
  {
    id: 'foraging',
    stepNumber: '03',
    badge: 'OBJECTIVE III · POLLINATION',
    title: 'Foraging Activity on Rapeseed',
    subtitle: 'Diurnal flight rhythms, visitation speed & Pollination Efficiency Index (Var. TS-38)',
    summary:
      'Recorded daily foraging rhythms throughout February 2026 on a rapeseed plot (Brassica napus var. TS-38) adjacent to IBDC across morning (07:00–09:00 h), midday (11:00–13:00 h), and afternoon (14:00–16:00 h) slots.',
    methodNote:
      'Loose pollen grains carried on bee bodies (excluding hind-leg corbicular loads) were washed in distilled water, stained with acetocarmine, and counted on a haemocytometer to compute weekly Pollination Efficiency Index (PEI = loose pollen × relative abundance).',
    metrics: [
      { label: 'Midday Peak Flights', value: '33.68 out / 24.64 in', sublabel: 'Bees per 2 min (11:00–13:00 h)' },
      { label: 'Peak Foraging Rate', value: '14.6 ± 3.4 fl/min', sublabel: 'Up to 17.9 fl/min in Week 3' },
      { label: 'Midday Floral Speed', value: '3.1 ± 0.2 s/fl', sublabel: 'vs. 6.4 s/fl in cool morning' },
      { label: 'Peak PEI (Week 3)', value: '492.91', sublabel: '44.81 RA × 11.00 loose pollen' },
    ],
    highlights: [
      'Foraging rate and floral handling speed moved inversely—cooler mornings saw slower visits (6.4 s/flower), while warm midday hours triggered rapid, efficient pollination (3.1 s/flower).',
      'Relative abundance (44.81 bees/2 min) and Pollination Efficiency Index (492.91) both peaked during Week 3 full bloom (15–21 Feb), proving T. srikantanathi is a dependable native pollinator of rapeseed.',
    ],
  },
];

export const DEVELOPMENT_BARS = [
  { stage: 'Egg', days: 5.12, pct: 10.8, color: '#F2B705', note: '5.12 ± 0.77 d' },
  { stage: 'Larva', days: 15.88, pct: 33.6, color: '#E59A00', note: '15.88 ± 1.19 d' },
  { stage: 'Pupa', days: 26.28, pct: 55.6, color: '#2E7D32', note: '26.28 ± 0.93 d' },
];

export const NEST_ZONES = [
  { zone: 'Ant. Resin', lengthCm: 4.05, pct: 14.2, color: '#5D4037', textLight: true },
  { zone: 'Ant. Food', lengthCm: 4.83, pct: 16.9, color: '#F2B705', textLight: false },
  { zone: 'Central Brood', lengthCm: 9.85, pct: 34.5, color: '#2E7D32', textLight: true },
  { zone: 'Post. Food', lengthCm: 6.1, pct: 21.4, color: '#E59A00', textLight: false },
  { zone: 'Post. Resin', lengthCm: 3.7, pct: 13.0, color: '#5D4037', textLight: true },
];

export const FORAGING_SLOTS = [
  { slot: '07:00–09:00 h', outgoing: 9.5, incoming: 5.39, rate: 4.4, speed: 6.4 },
  { slot: '11:00–13:00 h', outgoing: 33.68, incoming: 24.64, rate: 14.6, speed: 3.1 },
  { slot: '14:00–16:00 h', outgoing: 16.82, incoming: 20.5, rate: 7.0, speed: 5.1 },
];

export const WEEKLY_PEI = [
  { week: 'Wk 1', dates: 'Feb 01–07', ra: 27.33, pollen: 11.33, pei: 309.74 },
  { week: 'Wk 2', dates: 'Feb 08–14', ra: 35.05, pollen: 11.67, pei: 408.92 },
  { week: 'Wk 3', dates: 'Feb 15–21', ra: 44.81, pollen: 11.0, pei: 492.91 },
  { week: 'Wk 4', dates: 'Feb 22–28', ra: 40.19, pollen: 5.0, pei: 200.95 },
];
