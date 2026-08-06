import type { ManagedImage } from '@/config/site.config.types';
import { photo } from '@/lib/images';

/**
 * ============================================================================
 * PROJECTS
 * ============================================================================
 * Portfolio entries. Interior design is bought with the eyes, so this is the
 * single most persuasive data set on the site — but photographs alone do not
 * close a sale. Every project therefore also carries the four facts a serious
 * prospect is silently looking for:
 *
 *   area  ·  duration  ·  budget band  ·  scope
 *
 * Publishing those turns browsing into qualifying: by the time someone hits
 * "Enquire", they have already priced themselves in.
 *
 * `span` controls how the card sits in the masonry grid. Vary it across the
 * list — an even grid of identical tiles is the fastest way to look generic.
 * ============================================================================
 */

export type ProjectSpan = 'tall' | 'wide' | 'standard';

export interface Project {
  slug: string;
  /** Project name. Keep evocative rather than literal. */
  name: string;
  /** Primary discipline — drives the gallery filter chips. */
  category: string;
  /** Property type shown as card metadata. */
  type: string;
  /** Location. Uses `{{CITY}}` so it follows the config. */
  location: string;
  /** Built-up area, e.g. "2,150 sq ft". Placeholder token by default. */
  area: string;
  /** Delivery time, e.g. "14 weeks". Placeholder token by default. */
  duration: string;
  /** Budget band, deliberately a range rather than a figure. */
  budget: string;
  /** Year of completion. */
  year: string;
  /** Two to three sentences on the design intent and the problem solved. */
  description: string;
  /** Scope delivered — reads as a proof list. */
  scope: string[];
  image: ManagedImage;
  /** Masonry footprint. */
  span: ProjectSpan;
  /** Featured projects appear in the home-page portfolio preview. */
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: 'quiet-light-residence',
    name: 'The Quiet Light Residence',
    category: 'Residential',
    type: '4 BHK Apartment',
    location: '{{CITY}}',
    area: '{{PROJECT_1_AREA}}',
    duration: '{{PROJECT_1_DURATION}}',
    budget: '{{PROJECT_1_BUDGET}}',
    year: '{{PROJECT_1_YEAR}}',
    description:
      'A family apartment reworked around daylight. We removed two non-structural partitions to let the western light reach the dining table, then kept the palette to three warm neutrals so the changing light does all the decorating.',
    scope: ['Space planning', 'Full turnkey execution', 'Custom joinery', 'Lighting design'],
    image: {
      src: photo('photo-1691745034385-d5376238a97c'),
      alt: 'Sunlit living corner with dried grasses, cane seating and a warm neutral palette',
      width: 1200,
      height: 1600,
      label: 'Project 01',
    },
    span: 'tall',
    featured: true,
  },
  {
    slug: 'brass-and-oak-kitchen',
    name: 'Brass & Oak Kitchen',
    category: 'Modular Kitchen',
    type: 'Kitchen Renovation',
    location: '{{CITY}}',
    area: '{{PROJECT_2_AREA}}',
    duration: '{{PROJECT_2_DURATION}}',
    budget: '{{PROJECT_2_BUDGET}}',
    year: '{{PROJECT_2_YEAR}}',
    description:
      'A narrow galley kitchen rebuilt as a genuine working space. Full-height storage on one wall freed the opposite run entirely for preparation, and warm brass hardware against oak keeps a small room from feeling clinical.',
    scope: ['Modular units', 'Quartz countertop', 'Profile lighting', 'Appliance integration'],
    image: {
      src: photo('photo-1748183781742-a2473d27a763'),
      alt: 'Modular kitchen with light oak cabinetry, stone worktop and integrated appliances',
      width: 1200,
      height: 900,
      label: 'Project 02',
    },
    span: 'standard',
    featured: true,
  },
  {
    slug: 'garden-villa',
    name: 'Garden Court Villa',
    category: 'Residential',
    type: 'Independent Villa',
    location: '{{CITY}}',
    area: '{{PROJECT_3_AREA}}',
    duration: '{{PROJECT_3_DURATION}}',
    budget: '{{PROJECT_3_BUDGET}}',
    year: '{{PROJECT_3_YEAR}}',
    description:
      'Three floors unified by a single material language: lime-washed walls, honed stone and a continuous oak thread. The double-height entrance was recomposed around a sculptural stair that now reads as the house’s centrepiece.',
    scope: ['Full home interiors', 'Bespoke furniture', 'Landscape coordination', 'Art curation'],
    image: {
      src: photo('photo-1600210491892-03d54c0aaf87'),
      alt: 'Villa living room with a sculptural armchair beside a stone fireplace',
      width: 1200,
      height: 1600,
      label: 'Project 03',
    },
    span: 'tall',
    featured: true,
  },
  {
    slug: 'atelier-workspace',
    name: 'Atelier Workspace',
    category: 'Office',
    type: 'Corporate Office',
    location: '{{CITY}}',
    area: '{{PROJECT_4_AREA}}',
    duration: '{{PROJECT_4_DURATION}}',
    budget: '{{PROJECT_4_BUDGET}}',
    year: '{{PROJECT_4_YEAR}}',
    description:
      'A workplace planned around acoustic zoning rather than desk count. Focus rooms line the noisy façade, open desking sits in the calm core, and a fluted-oak reception gives clients a clear first impression of the brand.',
    scope: ['Workplace strategy', 'Acoustic treatment', 'Reception design', 'Furniture supply'],
    image: {
      src: photo('photo-1730128459616-4ee4c3b84ed8'),
      alt: 'Studio reception with a solid stone desk and soft indirect lighting',
      width: 1600,
      height: 1000,
      label: 'Project 04',
    },
    span: 'wide',
    featured: true,
  },
  {
    slug: 'linen-bedroom-suite',
    name: 'Linen Bedroom Suite',
    category: 'Bedroom',
    type: 'Primary Suite',
    location: '{{CITY}}',
    area: '{{PROJECT_5_AREA}}',
    duration: '{{PROJECT_5_DURATION}}',
    budget: '{{PROJECT_5_BUDGET}}',
    year: '{{PROJECT_5_YEAR}}',
    description:
      'A primary suite designed to be as quiet as possible: a full-width upholstered headboard, layered sheers, and every light source on a dimmer. Wardrobes run floor to ceiling and disappear into the wall plane.',
    scope: ['Bedroom design', 'Wardrobe systems', 'Soft furnishing', 'Lighting'],
    image: {
      src: photo('photo-1757344454333-cc666252e596'),
      alt: 'Calm bedroom with timber headboard wall, linen textiles and warm lighting',
      width: 1200,
      height: 900,
      label: 'Project 05',
    },
    span: 'standard',
    featured: true,
  },
  {
    slug: 'terracotta-cafe',
    name: 'Terracotta Café',
    category: 'Commercial',
    type: 'Café & Bakery',
    location: '{{CITY}}',
    area: '{{PROJECT_6_AREA}}',
    duration: '{{PROJECT_6_DURATION}}',
    budget: '{{PROJECT_6_BUDGET}}',
    year: '{{PROJECT_6_YEAR}}',
    description:
      'A forty-cover café built for a photograph and for a Saturday rush in equal measure. Terracotta, lime plaster and cane sit on a commercial-grade substrate rated for heavy footfall and daily cleaning.',
    scope: ['Concept design', 'Counter and display', 'Seating layout', 'Signage coordination'],
    image: {
      src: photo('photo-1642647916129-3909c75c0267'),
      alt: 'Cafe interior with a tan leather banquette, plaster walls and marble detailing',
      width: 1200,
      height: 1600,
      label: 'Project 06',
    },
    span: 'tall',
  },
  {
    slug: 'monochrome-apartment',
    name: 'Monochrome Apartment',
    category: 'Residential',
    type: '3 BHK Apartment',
    location: '{{CITY}}',
    area: '{{PROJECT_7_AREA}}',
    duration: '{{PROJECT_7_DURATION}}',
    budget: '{{PROJECT_7_BUDGET}}',
    year: '{{PROJECT_7_YEAR}}',
    description:
      'A disciplined greyscale scheme warmed by texture rather than colour — bouclé, brushed steel, ribbed glass and a single walnut thread. Proof that restraint reads as expensive when the detailing is right.',
    scope: ['Interior design', 'Custom joinery', 'Material curation', 'Styling'],
    image: {
      src: photo('photo-1671197244266-73129c97c096'),
      alt: 'Apartment kitchen and living space in a restrained monochrome palette',
      width: 1200,
      height: 900,
      label: 'Project 07',
    },
    span: 'standard',
  },
  {
    slug: 'heritage-restoration',
    name: 'Heritage Home Restoration',
    category: 'Renovation',
    type: 'Full Home Renovation',
    location: '{{CITY}}',
    area: '{{PROJECT_8_AREA}}',
    duration: '{{PROJECT_8_DURATION}}',
    budget: '{{PROJECT_8_BUDGET}}',
    year: '{{PROJECT_8_YEAR}}',
    description:
      'An older home brought up to contemporary standards without erasing its character. Original mosaic flooring was restored in place while the services, kitchen and bathrooms were rebuilt entirely behind the scenes.',
    scope: ['Structural assessment', 'Civil and services', 'Restoration', 'Turnkey interiors'],
    image: {
      src: photo('photo-1675325152993-b3a5fa7f0356'),
      alt: 'Restored open-plan living space with a timber ceiling and floor-to-ceiling glazing',
      width: 1600,
      height: 1000,
      label: 'Project 08',
    },
    span: 'wide',
  },
  {
    slug: 'walnut-study',
    name: 'The Walnut Study',
    category: 'Furniture',
    type: 'Home Office',
    location: '{{CITY}}',
    area: '{{PROJECT_9_AREA}}',
    duration: '{{PROJECT_9_DURATION}}',
    budget: '{{PROJECT_9_BUDGET}}',
    year: '{{PROJECT_9_YEAR}}',
    description:
      'A home study built entirely from bespoke pieces: a floating walnut desk, a full-height library wall and concealed cable routing. Designed for long working days and for appearing on video calls.',
    scope: ['Bespoke furniture', 'Library joinery', 'Task lighting', 'Acoustic panelling'],
    image: {
      src: photo('photo-1593589279419-7da07fd2148d'),
      alt: 'Home study with a full-height oak library wall and a soft reading chair',
      width: 1200,
      height: 900,
      label: 'Project 09',
    },
    span: 'standard',
  },
  {
    slug: 'coastal-penthouse',
    name: 'Coastal Penthouse',
    category: 'Residential',
    type: 'Penthouse',
    location: '{{CITY}}',
    area: '{{PROJECT_10_AREA}}',
    duration: '{{PROJECT_10_DURATION}}',
    budget: '{{PROJECT_10_BUDGET}}',
    year: '{{PROJECT_10_YEAR}}',
    description:
      'Every decision here defers to the view. A low, horizontal furniture plan, a pale salt-and-sand palette and full-height sheers keep the eye moving toward the windows rather than around the room.',
    scope: ['Interior design', 'Terrace styling', 'Custom seating', 'Smart lighting'],
    image: {
      src: photo('photo-1649083048770-82e8ffd80431'),
      alt: 'Penthouse living space in a pale palette with floor-to-ceiling glazing',
      width: 1200,
      height: 1600,
      label: 'Project 10',
    },
    span: 'tall',
  },
  {
    slug: 'boutique-retail',
    name: 'Boutique Retail Flagship',
    category: 'Commercial',
    type: 'Retail Store',
    location: '{{CITY}}',
    area: '{{PROJECT_11_AREA}}',
    duration: '{{PROJECT_11_DURATION}}',
    budget: '{{PROJECT_11_BUDGET}}',
    year: '{{PROJECT_11_YEAR}}',
    description:
      'A flagship planned as a deliberate route rather than a room. Display plinths step down in height toward the rear, drawing customers past the full collection to a fitting area finished like a private dressing room.',
    scope: ['Retail concept', 'Display systems', 'Accent lighting', 'Facade coordination'],
    image: {
      src: photo('photo-1665815844395-06f64f44b5e3'),
      alt: 'Boutique retail interior with a vaulted ceiling, oak flooring and a single display rail',
      width: 1200,
      height: 900,
      label: 'Project 11',
    },
    span: 'standard',
  },
  {
    slug: 'family-townhouse',
    name: 'Family Townhouse',
    category: 'Residential',
    type: 'Duplex Home',
    location: '{{CITY}}',
    area: '{{PROJECT_12_AREA}}',
    duration: '{{PROJECT_12_DURATION}}',
    budget: '{{PROJECT_12_BUDGET}}',
    year: '{{PROJECT_12_YEAR}}',
    description:
      'A duplex for a family of five, planned around durability. Performance fabrics, rounded joinery edges and a generous mudroom at the entrance mean the house looks composed even on an ordinary weekday.',
    scope: ['Full home interiors', 'Children’s rooms', 'Storage planning', 'Turnkey execution'],
    image: {
      src: photo('photo-1633505899118-4ca6bd143043'),
      alt: 'Family living and dining space with durable finishes and generous storage',
      width: 1600,
      height: 1000,
      label: 'Project 12',
    },
    span: 'wide',
  },
];

/** Unique category list for the gallery filter chips, with "All" prepended. */
export const projectCategories = [
  'All',
  ...Array.from(new Set(projects.map((project) => project.category))),
];

/** Projects shown in the home-page portfolio preview. */
export const featuredProjects = projects.filter((project) => project.featured);
