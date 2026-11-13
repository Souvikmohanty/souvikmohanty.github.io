import phdBeeHiveImg from '../assets/images/field_stingless_bee_hive_1794592403867.jpg';

export type SpecimenId =
  | 'maize-armyworm'
  | 'entomology-net'
  | 'stingless-bee'
  | 'mustard-blossom'
  | 'patent-monitor'
  | 'phd-crest';

export interface CasualPhoto {
  src: string;
  caption: string;
  objectPosition?: string;
}

export interface SpecimenDetail {
  id: SpecimenId;
  commonName: string;
  scientificName: string;
  category: string;
  plainLanguageNote: string;
  scienceContext: string;
  fieldFact: string;
  imageSrc?: string;
  imageAlt: string;
  imageFit?: 'cover' | 'contain';
  noteHeading?: string;
  hideResearcherBox?: boolean;
  casualPhotos?: CasualPhoto[];
  bulletPoints?: { label: string; text: string }[];
}

export interface FieldMilestone {
  id: string;
  stepNumber: string;
  eraLabel: string;
  location: string;
  institution: string;
  title: string;
  shortTitle: string;
  oneLiner: string;
  story: string;
  highlightLabel: string;
  biomeSky: string;
  isPatentStop?: boolean;
  isNowStop?: boolean;
  specimen: SpecimenDetail;
}

export type PublicationTopic =
  | 'All'
  | 'Pest Management'
  | 'Sustainable Farming';

export interface PublicationItem {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: string;
  volumeIssue: string;
  topic: Exclude<PublicationTopic, 'All'>;
  plainSummary: string;
  citationText: string;
  doiOrIdentifier: string;
  scholarUrl: string;
  researchGateUrl: string;
}

export type AbstractFormat = 'All' | 'Oral Presentation' | 'Poster Presentation';

export interface PublishedAbstractItem {
  id: string;
  presentationType: Exclude<AbstractFormat, 'All'>;
  date: string;
  conference: string;
  title: string;
  note?: string;
  citationText: string;
}

export interface AwardItem {
  id: string;
  year: string;
  title: string;
  organization: string;
  category: string;
  description: string;
}

export interface AcademicCredentialItem {
  id: string;
  kind: 'Workshop' | 'Certification';
  title: string;
  organizer: string;
  detail: string;
}

export const RESEARCHER_PROFILE = {
  name: 'Souvik Mohanty',
  role: 'PhD Researcher in Agricultural Entomology',
  affiliation: 'Central Agricultural University (CAU), Imphal',
  email: 'souvikmohanty@outlook.com',
  tagline:
    'I am Souvik, an Entomologist dedicated to studying insects, their behaviour, and their role in stabilizing modern agricultural ecosystems—centering my work on the first biological documentation of the stingless bee Tetragonula srikantanathi, bamboo hives, and crop pollination in Northeast India.',
  bioSummary:
    'From foundational agronomy in Punjab to stingless bee biology and Integrated Pest Management in Manipur, my goal is to build low-cost, pollinator-friendly agricultural solutions.',
  links: {
    googleScholar: 'https://scholar.google.com/citations?hl=en&user=-AwTda0AAAAJ',
    researchGate: 'https://www.researchgate.net/profile/Souvik-Mohanty-3',
    orcid: 'https://orcid.org/0009-0003-6958-6994',
    linkedin: 'https://in.linkedin.com/in/souvik-mohanty-7132a2198',
  },
};

export const FIELD_MILESTONES: FieldMilestone[] = [
  {
    id: 'lpu-bsc',
    stepNumber: '01',
    eraLabel: '2020–2024',
    location: 'Phagwara, Punjab',
    institution: 'Lovely Professional University (LPU)',
    title: 'B.Sc. (Hons.) Agriculture',
    shortTitle: 'LPU · B.Sc.',
    biomeSky: '#CBEBF7',
    oneLiner:
      'Studied agronomy, soil science & hands-on farming across four years in Punjab.',
    story:
      'Built core foundations in agronomy, crop protection, crop physiology, soil science, and agricultural extension in Punjab.',
    highlightLabel: 'Hands-on Agronomy & Field Foundations',
    specimen: {
      id: 'maize-armyworm',
      commonName: 'Bachelors in Agriculture (Hons)',
      scientificName: 'Learnt basic agriculture · LPU, Punjab',
      category: 'Undergraduate Field Days',
      plainLanguageNote:
        'As a B.Sc. Agriculture student, learning happens right in the mud and sun—preparing seedbeds and raised soil ridges, potting nursery saplings, harvesting wheat with a sickle, studying soil fertility and crop protection, and exploring farmer expos like Krishi Mahotsav.',
      scienceContext: '',
      fieldFact:
        'Four years of real fieldwork taught me how soil, crops, weather, and insects fit together.',
      imageSrc: './assets/aistudio/0365A402-26BD-4B53-9D43-32750DD4DB8E_1_105_c_0a2a17b5.jpeg',
      imageAlt: 'Souvik harvesting ripe wheat stalks with a sickle in the LPU experimental field',
      hideResearcherBox: true,
      casualPhotos: [
        {
          src: './assets/aistudio/85D30F21-94ED-4C88-9307-9F089A097E9A_1_105_c_1d8b07d9.jpeg',
          caption: 'Soil bed prep & tillage',
        },
        {
          src: './assets/aistudio/49F421FB-905C-4DAD-8700-2A4B9471FF33_1_105_c_fecf0ddf.jpeg',
          caption: 'Nursery polybag potting',
        },
        {
          src: './assets/aistudio/63D055CD-FE6D-4206-A67D-826D45AC747F_1_105_c_41f4f35d.jpeg',
          caption: 'Shade-house plant notes',
        },
        {
          src: './assets/aistudio/A0AEA531-7FD2-4833-8DBF-ACFB8EB22D4E_4_5005_c_cba3929d.jpeg',
          caption: 'Krishi Mahotsav expo',
        },
      ],
    },
  },
  {
    id: 'cau-msc',
    stepNumber: '02',
    eraLabel: '2024–2026',
    location: 'Imphal, Manipur',
    institution: 'Central Agricultural University (CAU)',
    title: 'M.Sc. in Agricultural Entomology',
    shortTitle: 'CAU · M.Sc.',
    biomeSky: '#C5E8F5',
    oneLiner:
      'Selected for M.Sc. in Entomology at CAU Imphal to study native pollinators & IPM.',
    story:
      'Selected for the Master’s programme in the Department of Entomology at Central Agricultural University (CAU), Imphal—guided by Dr. Th. Robindro Singh (Coordinator MTTC & VTC, Head, CAU Imphal) and Dr. Nilima Karam (Associate Professor, College of Agriculture, Kyrdemkulai, CAU Imphal).',
    highlightLabel: 'Department of Entomology · CAU Imphal',
    specimen: {
      id: 'entomology-net',
      commonName: 'M.Sc. in Agricultural Entomology',
      scientificName: 'Department of Entomology · CAU, Imphal',
      category: 'Postgraduate Masters Journey',
      plainLanguageNote:
        'Selected for the Master’s programme in the Department of Entomology at Central Agricultural University (CAU), Imphal. Under the guidance of Dr. Th. Robindro Singh (Coordinator MTTC & VTC, Head, CAU Imphal) and Dr. Nilima Karam (Associate Professor, College of Agriculture, Kyrdemkulai, CAU Imphal), I focused on insect taxonomy, microscope slide dissection, stingless bee biology, field trials, and community agricultural outreach.',
      scienceContext: '',
      fieldFact:
        'Advisors: Dr. Th. Robindro Singh (Coordinator MTTC & VTC, Head, CAU Imphal) & Dr. Nilima Karam (Associate Professor, College of Agriculture, Kyrdemkulai, CAU Imphal).',
      imageSrc: './assets/aistudio/88719ED2-099A-4DB0-A580-4E9F4925B54E_4_5005_c_427c4740.jpeg',
      imageAlt: 'College of Agriculture courtyard at Central Agricultural University, Imphal',
      hideResearcherBox: true,
      casualPhotos: [
        {
          src: './assets/aistudio/105320C0-EE28-4957-9F23-87B6F9254DA6_4_5005_c_0ab7a41d.jpeg',
          caption: 'Sampling from a bamboo hive',
          objectPosition: 'object-top',
        },
        {
          src: './assets/aistudio/4911010E-4D12-4291-BE8B-56307B4892BD_4_5005_c_549be3d9.jpeg',
          caption: 'Field plot sowing at CAU',
          objectPosition: 'object-[50%_20%]',
        },
        {
          src: './assets/aistudio/99BCEE3C-C370-4FD3-8E9C-31D8C787EE10_4_5005_c_f5347f7a.jpeg',
          caption: 'Dissection & slide mount',
        },
        {
          src: './assets/aistudio/7FED3874-D830-4184-B59F-629102E5F9AA_1_105_c_2451b332.jpeg',
          caption: 'Microscopy stain study',
        },
        {
          src: './assets/aistudio/FDB7CE97-8459-4F0A-B95D-E9FA262E1CC2_4_5005_c_3362a465.jpeg',
          caption: 'Sugnu school outreach',
        },
        {
          src: './assets/aistudio/76106FF3-8AA1-41E8-9A51-B8D84FE68ACB_1_105_c_78235dfa.jpeg',
          caption: 'Batchmates & study days',
        },
      ],
    },
  },
  {
    id: 'stingless-bee',
    stepNumber: '03',
    eraLabel: '2024–2026',
    location: 'IBDC Imphal, Kangpokpi, Riha & Thoubal',
    institution: 'Integrated Beekeeping Development Centre (IBDC)',
    title: 'Research Begins with the Stingless Bees',
    shortTitle: 'Stingless Bees',
    biomeSky: '#D1EEF7',
    oneLiner:
      'Field visits to Riha, Thoubal & Kangpokpi—installing stingless bee hives at IBDC.',
    story:
      'Entitled "Bioecology of Stingless Bee Species Tetragonula srikantanathi in Manipur Valley Conditions"—involving field visits to Riha, Thoubal, and Kangpokpi to collect colonies, procure traditional bamboo hives, and install them at the Integrated Beekeeping Development Centre (IBDC).',
    highlightLabel: 'T. srikantanathi Bioecology · IBDC',
    specimen: {
      id: 'stingless-bee',
      commonName: 'Research Begins with the Stingless Bees',
      scientificName:
        'Bioecology of Stingless Bee Species Tetragonula srikantanathi in Manipur Valley Conditions',
      category: 'Meliponiculture & Field Collection',
      plainLanguageNote:
        'My research—entitled “Bioecology of Stingless Bee Species Tetragonula srikantanathi in Manipur Valley Conditions”—began with field visits across Manipur, including Kangpokpi, Riha, and Thoubal, to scout and collect different native stingless bee species. We procured wild colonies in traditional bamboo and wooden hives, installed them at the Integrated Beekeeping Development Centre (IBDC), and studied their nest architecture, foraging behaviour, and colony biology.',
      scienceContext: '',
      fieldFact:
        'Colonies collected from Riha, Thoubal, and Kangpokpi were installed and studied at the Integrated Beekeeping Development Centre (IBDC).',
      imageSrc: './assets/aistudio/AA57C153-C50A-4017-8349-BF2C035D0C55_4_5005_c_8e90afcc.jpeg',
      imageAlt:
        'Souvik measuring a split bamboo stingless bee hive at the Integrated Beekeeping Development Centre (IBDC)',
      hideResearcherBox: true,
      casualPhotos: [
        {
          src: './assets/aistudio/777ECCC1-72F8-46B3-87A6-2CB7AAC1FBE2_4_5005_c_7c09bc33.jpeg',
          caption: 'Field survey in Kangpokpi',
        },
        {
          src: './assets/aistudio/BC714FCA-1D59-4825-82F0-4B050098841F_4_5005_c_9871e743.jpeg',
          caption: 'Procuring village hives',
        },
        {
          src: './assets/aistudio/8CAA80D1-132F-4C26-AF8D-7A137FC8EE98_4_5005_c_b3e890be.jpeg',
          caption: 'Resin entrance tunnel',
        },
        {
          src: './assets/aistudio/PHOTO-2026-07-17-21-07-25_48d2eb62.jpg',
          caption: 'Foraging on mustard bloom',
        },
      ],
    },
  },
  {
    id: 'mustard-pollination',
    stepNumber: '04',
    eraLabel: '2025–2026',
    location: 'CAU Experimental Plot, Imphal',
    institution: 'Department of Entomology, CAU',
    title: 'Working in the Rapeseed Field',
    shortTitle: 'Rapeseed Field',
    biomeSky: '#DFF3F6',
    oneLiner:
      'Prepared the rapeseed plot, watched it bloom & recorded stingless bee visits.',
    story:
      'Did the field preparation by hand, got a rich yellow bloom, and recorded stingless bee field activity to see whether and how much they loved the mustard flowers.',
    highlightLabel: 'Rapeseed Bloom & Bee Activity Log',
    specimen: {
      id: 'mustard-blossom',
      commonName: 'Working in the Rapeseed Field',
      scientificName: 'Rapeseed-Mustard Bloom · Stingless Bee Activity Study',
      category: 'Pollinator Field Trial',
      plainLanguageNote:
        'I started right from bare earth—doing all the field preparation by hand until the plot burst into a rich, healthy bloom. My goal was simple: to find out whether stingless bees actually liked mustard flowers—if not, why, and if yes, how much. Thankfully, the bees loved the blossoms, and I spent hours recording their foraging activity right in the field.',
      scienceContext: '',
      fieldFact:
        'From soil prep to full yellow bloom—recording every stingless bee visit to see how much they favoured the mustard flowers.',
      imageSrc: './assets/aistudio/FFED17BD-7385-4EAB-834C-D5473DF53D2A_4_5005_c_d8ec20e3.jpeg',
      imageAlt: 'Experimental rapeseed plot in full yellow bloom beside the department veranda',
      hideResearcherBox: true,
      casualPhotos: [
        {
          src: './assets/aistudio/A3FD8944-5387-499A-BA45-A878F2908B00_4_5005_c_e8cca400.jpeg',
          caption: 'Hand-tilling & field prep',
          objectPosition: 'object-top',
        },
        {
          src: './assets/aistudio/F752F572-E282-4227-81D3-54638B40A8EF_4_5005_c_33701703.jpeg',
          caption: 'Healthy young rapeseed rows',
        },
      ],
    },
  },
  {
    id: 'patent-milestone',
    stepNumber: '05',
    eraLabel: '21/07/2025',
    location: 'The Patent Office, India',
    institution: 'Design No. 466702-001 · Class 10-05',
    title: 'Patented Insect Monitoring & Control Device',
    shortTitle: 'Patent · 466702-001',
    biomeSky: '#E6F0E8',
    isPatentStop: true,
    oneLiner:
      'Registered Indian Design Patent 466702-001 for pollinator-safe pest monitoring.',
    story:
      'Registered a Govt. of India Design Patent (No. 466702-001) for an eco-conscious, solar-assisted Insect Monitoring & Control Device—combining visual, acoustic, and olfactory sensing with non-chemical deterrents to protect crops while preserving bees.',
    highlightLabel: 'Govt. of India Design Registered · 466702-001',
    specimen: {
      id: 'patent-monitor',
      commonName: 'Insect Monitoring & Control Device',
      scientificName: 'Design No. 466702-001 | Class 10-05 | The Patent Office, India (21/07/2025)',
      category: 'Design Registered · Govt. of India',
      plainLanguageNote:
        'An innovative, field-ready, eco-conscious pest detection and control device engineered for early and precise pest identification. Combining visual, acoustic, and olfactory sensing technologies within a rugged, portable unit, it autonomously detects pest presence using AI-based classification algorithms. Upon identification, targeted non-chemical deterrents are activated, minimizing ecological impact and preserving beneficial pollinators.',
      scienceContext: '',
      fieldFact:
        'Design Registered • Govt. of India — Design No. 466702-001 (Class 10-05), The Patent Office, India on 21/07/2025.',
      imageSrc: './assets/patent-device.png',
      imageAlt:
        'Automated electro-mechanical insect monitoring and control device patent design from Souvik Mohanty portfolio',
      imageFit: 'contain',
      noteHeading: 'Design Patent Overview',
      hideResearcherBox: true,
      bulletPoints: [
        {
          label: 'Multi-Modal Sensing',
          text: 'Autonomously analyzes insect movement, sound patterns, and emitted volatiles using AI classification.',
        },
        {
          label: 'Non-Chemical Control',
          text: 'Deploys species-specific LED light frequencies, ultrasonic waves, and pheromone-based mating disruption.',
        },
        {
          label: 'Field-Ready IPM Design',
          text: 'Weather-resistant housing with solar-assisted power supply and wireless real-time analytics for adaptive control.',
        },
      ],
    },
  },
  {
    id: 'phd-now',
    stepNumber: '06',
    eraLabel: 'Now',
    location: 'Imphal, Manipur',
    institution: 'Central Agricultural University (CAU)',
    title: 'Starting Ph.D. at CAU Imphal',
    shortTitle: 'Now · PhD CAU',
    biomeSky: '#D5EEF9',
    isNowStop: true,
    oneLiner:
      'Now starting my Ph.D. at CAU Imphal—scaling native bees & smart IPM!',
    story:
      'Here is where the trail arrives today: beginning my Ph.D. journey at Central Agricultural University, Imphal—scaling native stingless bee conservation, smart pest monitoring, and regenerative pollination ecology.',
    highlightLabel: 'Current Milestone · Ph.D. Scholar',
    specimen: {
      id: 'phd-crest',
      commonName: 'Doctoral Research Program',
      scientificName: 'Pollinator Ecology & Sustainable IPM',
      category: 'Ph.D. Research · CAU Imphal',
      plainLanguageNote:
        'My doctoral chapter connects everything along this path: documenting wild native bees, empowering farmers with low-cost bamboo hives, and advancing chemical-light crop protection.',
      scienceContext:
        'Doctoral research expanding Tetragonula bioecology, landscape pollination networks, and integrated agroecological pest management across Northeast India.',
      fieldFact:
        'Always open to interdisciplinary collaborations, specimen exchanges, and science outreach!',
      imageSrc: phdBeeHiveImg,
      imageAlt: 'Stingless bees returning to their bamboo hive in Manipur valley',
    },
  },
];

export const PUBLICATIONS: PublicationItem[] = [
  {
    id: 'pub-jer-2026',
    title:
      'Evaluation of IPM modules against Maize fall armyworm (Spodoptera frugiperda) in Northern Punjab',
    authors: 'Longkumer, I. Y., Yendrembam, K. D., & Mohanty, S.',
    journal: 'Journal of Entomological Research',
    year: '2026',
    volumeIssue: '50(1), 47–50',
    topic: 'Pest Management',
    plainSummary:
      'Co-authored evaluation of integrated pest management modules designed specifically for controlling fall armyworm infestations in maize crops within Northern Punjab conditions.',
    citationText:
      'Longkumer, I. Y., Yendrembam, K. D., & Mohanty, S. (2026). Evaluation of IPM modules against Maize fall armyworm (Spodoptera frugiperda) in Northern Punjab. Journal of Entomological Research, 50(1), 47-50. DOI: 10.65521/jer.v50.i1.2026.44',
    doiOrIdentifier: 'DOI: 10.65521/jer.v50.i1.2026.44',
    scholarUrl: 'https://scholar.google.com/citations?hl=en&user=-AwTda0AAAAJ',
    researchGateUrl:
      'https://www.researchgate.net/publication/401490219_Evaluation_of_IPM_modules_against_Maize_fall_armyworm_Spodoptera_frugiperda_in_Northern_Punjab',
  },
  {
    id: 'pub-ijra-2025',
    title: 'Regenerative agriculture: Opportunities and challenges: A review',
    authors: 'Bhardwaj, N., Wadatkar, H., Mohanty, S., Salve, R., & Patil, S.',
    journal: 'International Journal of Research in Agronomy',
    year: '2025',
    volumeIssue: '8(5), 651–656',
    topic: 'Sustainable Farming',
    plainSummary:
      'A review examining the paradigms, opportunities, and adoption barriers surrounding sustainable soil restoration and regenerative farming practices, co-authored during studies in Punjab.',
    citationText:
      'Bhardwaj, N., Wadatkar, H., Mohanty, S., Salve, R., & Patil, S. (2025). Regenerative agriculture: Opportunities and challenges: A review. International Journal of Research in Agronomy, 8(5), 651-656. DOI: 10.33545/2618060X.2025.v8.i5i.2960',
    doiOrIdentifier: 'DOI: 10.33545/2618060X.2025.v8.i5i.2960',
    scholarUrl: 'https://scholar.google.com/citations?hl=en&user=-AwTda0AAAAJ',
    researchGateUrl:
      'https://www.researchgate.net/publication/391448658_Regenerative_agriculture_Opportunities_and_challenges_A_review',
  },
  {
    id: 'pub-acta-2025',
    title:
      'Towards Sustainable Control of Fall Armyworm in Maize: An Overview of Management Practices',
    authors:
      'Talukdar, N., Kalita, B., Mohanty, S., Singh, M. S., Singh, P. N., & Bhumita, P.',
    journal: 'Acta Scientific AGRICULTURE',
    year: '2025',
    volumeIssue: '9(12)',
    topic: 'Pest Management',
    plainSummary:
      'A comprehensive review outlining biological, chemical, cultural, and mechanical management protocols aimed at sustainable control of Spodoptera frugiperda in maize crops.',
    citationText:
      'Talukdar, N., Kalita, B., Mohanty, S., Singh, M. S., Singh, P. N., & Bhumita, P. (2025). Towards Sustainable Control of Fall Armyworm in Maize: An Overview of Management Practices. Acta Scientific AGRICULTURE, 9(12). ISSN: 2581-365X',
    doiOrIdentifier: 'ISSN: 2581-365X',
    scholarUrl: 'https://scholar.google.com/citations?hl=en&user=-AwTda0AAAAJ',
    researchGateUrl: 'https://www.researchgate.net/profile/Souvik-Mohanty-3/research',
  },
];

export const PUBLISHED_ABSTRACTS: PublishedAbstractItem[] = [
  {
    id: 'abs-agri-youth-2026',
    presentationType: 'Oral Presentation',
    date: 'March 2026',
    conference: 'Agri Youth Parliament 2026',
    title:
      'Domestication of Native Stingless Bees Using Bamboo Hives: A Practical Innovation for Sustainable Beekeeping in Northeast India',
    note: 'Central Agricultural University (CAU), Imphal',
    citationText:
      'Mohanty, S. (March 2026). Domestication of Native Stingless Bees Using Bamboo Hives: A Practical Innovation for Sustainable Beekeeping in Northeast India. Oral Presentation, Agri Youth Parliament 2026, CAU Imphal.',
  },
  {
    id: 'abs-ne-agrivision-2026',
    presentationType: 'Oral Presentation',
    date: '2026',
    conference: 'NE Agrivision 2026',
    title:
      'Bamboo Hive Domestication of Stingless Bees in Riha Village, Ukhrul District',
    note: 'Theme 5: Practical Agricultural Innovations',
    citationText:
      'Mohanty, S. (2026). Bamboo Hive Domestication of Stingless Bees in Riha Village, Ukhrul District. Oral Presentation (Theme 5: Practical Agricultural Innovations), NE Agrivision 2026.',
  },
  {
    id: 'abs-ncnf-2026',
    presentationType: 'Oral Presentation',
    date: '2026',
    conference: 'National Conference on Natural Farming (NCNF 2026)',
    title:
      'Management of major Defoliators of Soybean through Intercropping with Suva (Anethum graveolens L.,) under Natural Farming Approach',
    note: 'Best Research Paper Award (Oral) · Nilima Karam & Souvik Mohanty',
    citationText:
      'Karam, N., & Mohanty, S. (2026). Management of major Defoliators of Soybean through Intercropping with Suva (Anethum graveolens L.,) under Natural Farming Approach. Oral Presentation (Best Research Paper Award), NCNF 2026: Pathways to Self-Reliant Farming and Rural Prosperity.',
  },
  {
    id: 'abs-msc-2025',
    presentationType: 'Poster Presentation',
    date: 'December 2025',
    conference: 'Manipur Science Congress 2025',
    title:
      'Integrating Biocontrol Agents with Reduced-Dose Chemical Pesticides for Safer, Sustainable Disease Management in Major Field Crops',
    citationText:
      'Mohanty, S. (December 2025). Integrating Biocontrol Agents with Reduced-Dose Chemical Pesticides for Safer, Sustainable Disease Management in Major Field Crops. Poster Presentation, Manipur Science Congress 2025.',
  },
  {
    id: 'abs-icavri-2025',
    presentationType: 'Poster Presentation',
    date: 'November 2025',
    conference: 'ICAVRI 2025 (12th International Conference)',
    title:
      'Nano-pesticides in Crop Protection: A Sustainable Strategy to Reduce Chemical Residues and Resistance',
    citationText:
      'Mohanty, S. (November 2025). Nano-pesticides in Crop Protection: A Sustainable Strategy to Reduce Chemical Residues and Resistance. Poster Presentation, 12th International Conference (ICAVRI 2025).',
  },
  {
    id: 'abs-nat-sem-2025',
    presentationType: 'Poster Presentation',
    date: '2025',
    conference: 'National Seminar on Sustainable Livelihoods in Agri-Food System',
    title:
      'Nature’s Architects: How Insect Pollinators Sustain Global Agriculture and Nutrient Cycling',
    note: 'Enhancing Rural Prosperity',
    citationText:
      'Mohanty, S. (2025). Nature’s Architects: How Insect Pollinators Sustain Global Agriculture and Nutrient Cycling. Poster Presentation, National Seminar on Sustainable Livelihoods in Agri-Food System: Enhancing Rural Prosperity.',
  },
];

export const AWARDS: AwardItem[] = [
  {
    id: 'award-best-paper',
    year: '2026',
    title: 'Best Research Paper Award (Oral)',
    organization: 'National Conference on Natural Farming (NCNF 2026)',
    category: 'Oral Presentation Honor',
    description:
      'Awarded for "Management of major Defoliators of Soybean through Intercropping with Suva (Anethum graveolens L.) under Natural Farming Approach" (Nilima Karam & Souvik Mohanty).',
  },
  {
    id: 'award-patent',
    year: '2025',
    title: 'Registered Design Patent (No. 466702-001)',
    organization: 'The Patent Office, Government of India',
    category: 'Intellectual Property',
    description:
      'Class 10-05 registered design for an eco-conscious Insect Monitoring & Control Device combining multi-modal sensing with pollinator-safe non-chemical deterrents.',
  },
  {
    id: 'award-youth-parliament',
    year: 'Mar 2026',
    title: 'Agri Youth Parliament Presenter',
    organization: 'Central Agricultural University (CAU), Imphal',
    category: 'Meliponiculture Innovation',
    description:
      'Presented stingless bee nesting architecture and low-cost split-bamboo hive domestication results for sustainable beekeeping in Northeast India.',
  },
  {
    id: 'award-agrivision',
    year: '2026',
    title: 'NE Agrivision — Practical Agricultural Innovations',
    organization: 'Riha Village, Ukhrul District Outreach',
    category: 'Field Extension',
    description:
      'Showcased community-scale bamboo hive domestication of native stingless bees in Riha Village under Theme 5: Practical Agricultural Innovations.',
  },
  {
    id: 'award-msc-congress',
    year: 'Dec 2025',
    title: 'Manipur Science Congress Presentation',
    organization: 'Manipur Science Congress',
    category: 'Biocontrol Research',
    description:
      'Presented synergistic biocontrol findings combining entomopathogens and fungal antagonists with reduced-dose chemical inputs in major field crops.',
  },
  {
    id: 'award-icavri',
    year: 'Nov 2025',
    title: '12th International Conference (ICAVRI 2025)',
    organization: 'ICAVRI & National Seminar 2025',
    category: 'International Symposium',
    description:
      'Presented nano-pesticide strategies to cut chemical residues alongside work on how insect pollinators sustain agriculture and nutrient cycling.',
  },
];

export const ACADEMIC_CREDENTIALS: AcademicCredentialItem[] = [
  {
    id: 'cred-lac',
    kind: 'Workshop',
    title: 'Two Days Master Trainer’s Programme on Scientific Method of Lac Cultivation',
    organizer: 'Organised by AINP on Lac Insect Genetic Resource',
    detail: 'Hands-on master training on scientific lac insect culture, host-tree inoculation, and resin harvesting.',
  },
  {
    id: 'cred-maize',
    kind: 'Workshop',
    title: 'Two Days Workshop on Sustainable & Climate Resilient Maize Production in NE India',
    organizer: 'Organised by AICRP Maize & CAU Imphal',
    detail: 'Focused on climate-resilient maize agronomy and regional pest management practices across Northeast India.',
  },
  {
    id: 'cred-linux',
    kind: 'Certification',
    title: 'Linux System Administration Certification',
    organizer: 'Accredited Technical Competency',
    detail: 'Shell scripting, user management, file permissions, and directory architectures supporting reproducible research computing.',
  },
];

export function generatePlainCvText(): string {
  return [
    'SOUVIK MOHANTY',
    'Ph.D. Researcher — Agricultural Entomology',
    'College of Agriculture, Central Agricultural University (CAU), Imphal, Manipur 795004, India',
    `Email: ${RESEARCHER_PROFILE.email}`,
    `ORCID: ${RESEARCHER_PROFILE.links.orcid}`,
    '',
    'ABOUT',
    RESEARCHER_PROFILE.tagline,
    '',
    'EDUCATION',
    '1. Ph.D. in Agricultural Entomology (Ongoing / Now)',
    '   Central Agricultural University (CAU), Imphal',
    '2. M.Sc. in Agricultural Entomology (2024–2026)',
    '   College of Agriculture, Central Agricultural University (CAU), Imphal',
    '   Thesis: Bioecology of Stingless Bee Species Tetragonula srikantanathi in Manipur valley conditions',
    '   Advisors: Dr. Th. Robindro Singh (Coordinator MTTC & VTC, Head, CAU Imphal) & Dr. Nilima Karam (Associate Professor, College of Agriculture, Kyrdemkulai, CAU Imphal)',
    '3. B.Sc. (Hons.) Agriculture (2020–2024)',
    '   Lovely Professional University (LPU), Phagwara, Punjab',
    '',
    'REGISTERED PATENT',
    '- Insect Monitoring & Control Device | Design No. 466702-001 | Class 10-05 | The Patent Office, Govt. of India (21/07/2025)',
    '',
    'SELECTED PUBLICATIONS',
    ...PUBLICATIONS.map((pub, idx) => `${idx + 1}. ${pub.citationText}`),
    '',
    'PUBLISHED ABSTRACTS & CONFERENCE PRESENTATIONS',
    ...PUBLISHED_ABSTRACTS.map((abs, idx) => `${idx + 1}. ${abs.citationText}`),
    '',
    'AWARDS & CONFERENCES',
    ...AWARDS.map((a) => `- [${a.year}] ${a.title} — ${a.organization}`),
    '',
    'SCIENTIFIC PROFILES',
    `ORCID: ${RESEARCHER_PROFILE.links.orcid}`,
    `Google Scholar: ${RESEARCHER_PROFILE.links.googleScholar}`,
    `ResearchGate: ${RESEARCHER_PROFILE.links.researchGate}`,
    `LinkedIn: ${RESEARCHER_PROFILE.links.linkedin}`,
  ].join('\n');
}
