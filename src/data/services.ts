import {
  Armchair,
  Bath,
  Blinds,
  Building2,
  ChefHat,
  Grid2x2,
  Hammer,
  LampDesk,
  Layers,
  LayoutPanelTop,
  Ruler,
  Sofa,
  Utensils,
  type LucideIcon,
} from 'lucide-react';
import type { ManagedImage } from '@/config/site.config.types';
import { photo } from '@/lib/images';

/**
 * ============================================================================
 * SERVICES
 * ============================================================================
 * The commercial heart of the site. Every entry is written to do three jobs:
 *
 *  1. `summary`  — what it is, in one sentence a homeowner would use.
 *  2. `features` — what is physically delivered. Removes ambiguity, which is
 *     the number one reason interior enquiries stall.
 *  3. `benefits` — why it matters to the client's life, not to the studio.
 *
 * Copy is deliberately generic-but-specific: true for any quality interior
 * studio, never vague. Replace `{{TOKENS}}` and adjust the wording per client.
 *
 * To add a service: append an object here. The services page, the home page
 * overview, the footer links, the contact form's dropdown and the Service
 * schema.org markup all update automatically.
 * ============================================================================
 */

export interface Service {
  /** URL fragment — used for `/services#slug` deep links. Keep stable. */
  slug: string;
  title: string;
  /** Two or three words shown above the title on the card. */
  category: string;
  /** One-sentence description used on cards and in schema. */
  summary: string;
  /** Two or three sentences used on the expanded service panel. */
  description: string;
  icon: LucideIcon;
  image: ManagedImage;
  /** Concrete deliverables. Aim for 5–6. */
  features: string[];
  /** Client-facing outcomes. Aim for 3–4. */
  benefits: string[];
  /** Who this is for. Renders as a small meta line. */
  idealFor: string;
  /** Typical delivery window. Placeholder token by default. */
  timeline: string;
  /** Entry price band. Placeholder token by default. */
  startingFrom: string;
  /** Featured services appear in the home-page overview grid. */
  featured?: boolean;
}

export const services: Service[] = [
  {
    slug: 'residential-interior',
    title: 'Residential Interior Design',
    category: 'Homes',
    summary:
      'End-to-end interior design for apartments, villas and independent homes — concept to handover, managed by one team.',
    description:
      'We design homes around how you actually live: where the morning light lands, where the family gathers, where things need to be put away. Every project begins with a detailed lifestyle brief and ends with a fully finished, styled home you can move straight into.',
    icon: Sofa,
    image: {
      src: photo('photo-1632829882891-5047ccc421bc'),
      alt: 'Residential interior design project by {{BUSINESS_NAME}} in {{CITY}}',
      width: 1200,
      height: 900,
      label: 'Residential',
    },
    features: [
      'Lifestyle brief and detailed site measurement',
      'Space planning with furniture layout options',
      'Photorealistic 3D visualisation of every room',
      'Material, finish and colour palette board',
      'Turnkey execution with a dedicated project manager',
      'Final styling, deep clean and handover checklist',
    ],
    benefits: [
      'One accountable partner instead of six separate vendors',
      'You approve exactly what you will get, before work begins',
      'Fixed scope and transparent pricing from day one',
    ],
    idealFor: 'Homeowners furnishing a new property or reimagining an existing one',
    timeline: '{{TIMELINE_RESIDENTIAL}}',
    startingFrom: '{{PRICE_RESIDENTIAL}}',
    featured: true,
  },
  {
    slug: 'modular-kitchen',
    title: 'Modular Kitchen Design',
    category: 'Kitchens',
    summary:
      'Ergonomic, hard-wearing modular kitchens engineered around the work triangle and the way you really cook.',
    description:
      'A kitchen is the hardest-working room in any home, and the one where poor planning is felt daily. We design around the cooking triangle, your appliance list and your storage reality — then specify hardware rated for a decade of use, not a showroom photograph.',
    icon: ChefHat,
    image: {
      src: photo('photo-1683629357963-adf2b1fa9ad9'),
      alt: 'Modular kitchen designed and installed by {{BUSINESS_NAME}}',
      width: 1200,
      height: 900,
      label: 'Kitchen',
    },
    features: [
      'Work-triangle and appliance-led layout planning',
      'Moisture-resistant carcass with a lifetime-grade core',
      'Soft-close hinges, channels and premium hardware',
      'Tall units, corner solutions and pull-out organisers',
      'Engineered stone or quartz countertop options',
      'Under-cabinet task lighting and profile lighting',
    ],
    benefits: [
      'Everything within reach — fewer steps, less daily fatigue',
      'Storage designed around your actual utensils and appliances',
      'Finishes that still look new after years of real cooking',
    ],
    idealFor: 'Families who cook daily and want storage that finally makes sense',
    timeline: '{{TIMELINE_KITCHEN}}',
    startingFrom: '{{PRICE_KITCHEN}}',
    featured: true,
  },
  {
    slug: 'living-room-design',
    title: 'Living Room Design',
    category: 'Living',
    summary:
      'Living spaces composed around a clear focal point, comfortable circulation and layered, adjustable light.',
    description:
      'The living room is where your home introduces itself. We balance seating, storage and circulation so the room works for a quiet evening and for fifteen guests — with a feature wall, a considered rug plan and lighting you can dim to suit the hour.',
    icon: Armchair,
    image: {
      src: photo('photo-1750639258774-9a714379a093'),
      alt: 'Elegant living room interior designed by {{BUSINESS_NAME}}',
      width: 1200,
      height: 900,
      label: 'Living',
    },
    features: [
      'Focal-point planning: TV wall, art wall or fireplace',
      'Bespoke media units and concealed cable management',
      'Seating layout tested for conversation and circulation',
      'Curated rug, cushion and drapery scheme',
      'Layered ambient, task and accent lighting',
      'Wall panelling, texture and finish detailing',
    ],
    benefits: [
      'A room that hosts comfortably without feeling crowded',
      'Clutter has a designated, attractive home',
      'Adjustable light that flatters the space at any hour',
    ],
    idealFor: 'Homes where the living room does double duty for family and guests',
    timeline: '{{TIMELINE_LIVING}}',
    startingFrom: '{{PRICE_LIVING}}',
    featured: true,
  },
  {
    slug: 'bedroom-design',
    title: 'Bedroom Interior Design',
    category: 'Bedrooms',
    summary:
      'Restful primary and guest bedrooms with quiet palettes, generous storage and gentle, layered lighting.',
    description:
      'Bedrooms should lower your heart rate the moment you walk in. We work with soft, low-contrast palettes, tactile textiles and light that steps down through the evening — while hiding a surprising amount of storage in plain sight.',
    icon: Bath,
    image: {
      src: photo('photo-1696762932825-2737db830bbe'),
      alt: 'Serene bedroom interior by {{BUSINESS_NAME}}',
      width: 1200,
      height: 900,
      label: 'Bedroom',
    },
    features: [
      'Bed-wall design with upholstered or panelled headboard',
      'Bedside, reading and cove lighting on separate circuits',
      'Full-height wardrobes with internal organisation',
      'Study nook or dresser integration where space allows',
      'Blackout and sheer window treatment layering',
      'Acoustic and textile softening for a quieter room',
    ],
    benefits: [
      'A genuinely restful room, not just a photogenic one',
      'Storage that keeps surfaces clear year-round',
      'Lighting that supports both reading and winding down',
    ],
    idealFor: 'Primary suites, children’s rooms and guest bedrooms',
    timeline: '{{TIMELINE_BEDROOM}}',
    startingFrom: '{{PRICE_BEDROOM}}',
    featured: true,
  },
  {
    slug: 'wardrobes-storage',
    title: 'Wardrobes & Storage',
    category: 'Storage',
    summary:
      'Floor-to-ceiling wardrobes and bespoke storage planned around what you own, not around standard module sizes.',
    description:
      'We begin by counting what actually needs to be stored — hanging lengths, folded stacks, luggage, linen, seasonal items — then design around that inventory. The result is storage that stays tidy because everything has an obvious place.',
    icon: Grid2x2,
    image: {
      src: photo('photo-1618236444721-4a8dba415c15'),
      alt: 'Custom wardrobe and storage solution by {{BUSINESS_NAME}}',
      width: 1200,
      height: 900,
      label: 'Wardrobes',
    },
    features: [
      'Sliding, hinged or walk-in wardrobe configurations',
      'Internal layout planned to a real garment inventory',
      'Soft-close mechanisms and premium profile handles',
      'Integrated mirrors, drawers and accessory trays',
      'Loft storage for luggage and seasonal items',
      'Mirror, lacquered glass, laminate or veneer shutters',
    ],
    benefits: [
      'Up to a third more usable capacity from the same footprint',
      'Rooms stay tidy because storage matches real habits',
      'Full-height design removes dust-collecting dead space',
    ],
    idealFor: 'Anyone who has outgrown standalone furniture',
    timeline: '{{TIMELINE_WARDROBE}}',
    startingFrom: '{{PRICE_WARDROBE}}',
    featured: true,
  },
  {
    slug: 'dining-room-design',
    title: 'Dining Room Design',
    category: 'Dining',
    summary:
      'Dining spaces that work for a weekday dinner and a full celebration, anchored by one confident feature.',
    description:
      'We size the table to the room and the room to your guest list, then anchor the space with a single strong gesture — a crockery unit, a mirrored wall or a sculptural pendant — so the area reads as a destination rather than a corridor.',
    icon: Utensils,
    image: {
      src: photo('photo-1696986296905-e631802befb0'),
      alt: 'Dining room interior designed by {{BUSINESS_NAME}}',
      width: 1200,
      height: 900,
      label: 'Dining',
    },
    features: [
      'Table sizing and clearance planning for real circulation',
      'Crockery unit, bar cabinet or buffet design',
      'Statement pendant lighting at the correct drop height',
      'Feature wall: panelling, mirror, texture or art',
      'Open-plan zoning that separates dining from living',
      'Durable, wipe-clean finish specification',
    ],
    benefits: [
      'Comfortable seating for everyday and for occasions',
      'Serving and storage kept exactly where they are needed',
      'A defined zone even within an open-plan floor',
    ],
    idealFor: 'Households who entertain, and open-plan homes needing definition',
    timeline: '{{TIMELINE_DINING}}',
    startingFrom: '{{PRICE_DINING}}',
  },
  {
    slug: 'false-ceiling-design',
    title: 'False Ceiling Design',
    category: 'Ceilings',
    summary:
      'Ceiling design that conceals services, carries the lighting scheme and adds architectural depth overhead.',
    description:
      'A well-designed ceiling does invisible work: it hides ducting and wiring, holds cove and spot lighting at the right depth, and quietly raises the perceived height of a room. We detail it alongside the lighting plan, never after it.',
    icon: LayoutPanelTop,
    image: {
      src: photo('photo-1720247520881-672bc136da8a'),
      alt: 'False ceiling and cove lighting detail by {{BUSINESS_NAME}}',
      width: 1200,
      height: 900,
      label: 'Ceilings',
    },
    features: [
      'Gypsum, POP and grid ceiling systems',
      'Cove, profile and recessed lighting integration',
      'Concealed air-conditioning and duct planning',
      'Peripheral, floating and coffered design options',
      'Acoustic treatment for media and study rooms',
      'Access panels for serviceable equipment',
    ],
    benefits: [
      'Wiring, ducting and hardware disappear from view',
      'Lighting sits at the correct depth, so no glare',
      'Rooms feel taller and more deliberately composed',
    ],
    idealFor: 'New interiors and full renovations with services to conceal',
    timeline: '{{TIMELINE_CEILING}}',
    startingFrom: '{{PRICE_CEILING}}',
  },
  {
    slug: 'lighting-design',
    title: 'Lighting Design',
    category: 'Lighting',
    summary:
      'A three-layer lighting plan — ambient, task and accent — with colour temperature specified room by room.',
    description:
      'Lighting is the fastest way to make an interior feel expensive, and the most commonly neglected. We build a circuit-by-circuit plan with the correct lux levels, beam angles and colour temperatures, so a room can shift from bright and functional to warm and low.',
    icon: LampDesk,
    image: {
      src: photo('photo-1653972233979-b46520fa00c7'),
      alt: 'Layered lighting scheme designed by {{BUSINESS_NAME}}',
      width: 1200,
      height: 900,
      label: 'Lighting',
    },
    features: [
      'Room-by-room lux level and circuit planning',
      'Ambient, task and accent layer specification',
      'Colour temperature and CRI selection per zone',
      'Dimming, scene control and smart integration',
      'Decorative fixture curation and sourcing',
      'Facade, landscape and balcony lighting',
    ],
    benefits: [
      'One room, several moods, controlled from a single panel',
      'No glare, no harsh shadows, no flat overhead washout',
      'Efficient fittings that cut running cost over time',
    ],
    idealFor: 'Any project where atmosphere matters as much as layout',
    timeline: '{{TIMELINE_LIGHTING}}',
    startingFrom: '{{PRICE_LIGHTING}}',
  },
  {
    slug: 'space-planning',
    title: 'Space Planning',
    category: 'Planning',
    summary:
      'Layout strategy that resolves circulation, daylight and storage before a single material is chosen.',
    description:
      'Every expensive mistake in an interior traces back to the plan. We test multiple layouts against your daily routine, daylight orientation and storage inventory, and only then move to finishes — which is why our projects rarely need mid-build changes.',
    icon: Ruler,
    image: {
      src: photo('photo-1627141440602-e9c1e5fd2fbf'),
      alt: 'Open-plan layout planned by the {{BUSINESS_NAME}} design team',
      width: 1200,
      height: 900,
      label: 'Planning',
    },
    features: [
      'Measured survey and existing-condition drawings',
      'Two to three tested layout options per space',
      'Circulation, clearance and ergonomics analysis',
      'Daylight and ventilation orientation study',
      'Storage audit against a real possessions inventory',
      'Vastu or feng shui alignment on request',
    ],
    benefits: [
      'Costly layout errors are caught on paper, not on site',
      'Every square foot earns its place',
      'A clear plan that trades and vendors can price accurately',
    ],
    idealFor: 'Under-construction properties and homes being fully reworked',
    timeline: '{{TIMELINE_PLANNING}}',
    startingFrom: '{{PRICE_PLANNING}}',
  },
  {
    slug: 'furniture-design',
    title: 'Bespoke Furniture Design',
    category: 'Furniture',
    summary:
      'Custom furniture made to your dimensions when nothing off the shelf fits the space or the brief.',
    description:
      'Awkward corners, non-standard ceiling heights and unusual proportions are where bespoke furniture pays for itself. We detail each piece, prototype the critical joints and finish it in our workshop to a specification you can inspect before installation.',
    icon: Layers,
    image: {
      src: photo('photo-1634547588713-edd93045b9f1'),
      alt: 'Bespoke furniture crafted for a {{BUSINESS_NAME}} project',
      width: 1200,
      height: 900,
      label: 'Furniture',
    },
    features: [
      'Made-to-measure sofas, beds, tables and consoles',
      'Solid wood, veneer, lacquer and upholstered finishes',
      'Workshop fabrication with quality checkpoints',
      'Fabric, leather and finish curation',
      'Hardware and mechanism specification',
      'Delivery, assembly and on-site finishing',
    ],
    benefits: [
      'Pieces that fit the room exactly, to the millimetre',
      'Materials and construction you can actually verify',
      'A distinctive interior no catalogue can replicate',
    ],
    idealFor: 'Rooms with unusual proportions or a specific design language',
    timeline: '{{TIMELINE_FURNITURE}}',
    startingFrom: '{{PRICE_FURNITURE}}',
  },
  {
    slug: 'commercial-interior',
    title: 'Commercial Interior Design',
    category: 'Commercial',
    summary:
      'Retail, hospitality and showroom interiors that hold a brand and survive heavy public footfall.',
    description:
      'Commercial interiors carry a commercial burden: they must express the brand, guide customers through a considered journey, and take years of daily wear. We design to a specification that is as durable as it is photogenic, and we build around your trading hours.',
    icon: Building2,
    image: {
      src: photo('photo-1768144092684-c1a5dd6c7aad'),
      alt: 'Commercial interior project delivered by {{BUSINESS_NAME}}',
      width: 1200,
      height: 900,
      label: 'Commercial',
    },
    features: [
      'Brand-aligned concept and material direction',
      'Customer journey and footfall flow planning',
      'Retail display, counter and storage systems',
      'Commercial-grade, high-traffic finish specification',
      'Signage, wayfinding and facade coordination',
      'Compliance, fire-safety and statutory coordination',
    ],
    benefits: [
      'An environment that reinforces the brand at every turn',
      'Finishes rated for genuine public use',
      'Phased execution that protects your trading hours',
    ],
    idealFor: 'Retail stores, cafés, clinics, salons and showrooms',
    timeline: '{{TIMELINE_COMMERCIAL}}',
    startingFrom: '{{PRICE_COMMERCIAL}}',
    featured: true,
  },
  {
    slug: 'office-interior',
    title: 'Office Interior Design',
    category: 'Workplace',
    summary:
      'Workplaces planned for focus, collaboration and acoustics — designed to help you retain good people.',
    description:
      'A workplace is a recruitment tool. We plan the balance of open desking, focus rooms and informal meeting space against how your teams actually work, and we treat acoustics and daylight as first-order requirements rather than afterthoughts.',
    icon: Blinds,
    image: {
      src: photo('photo-1699586197060-fbc6d8b20ecd'),
      alt: 'Modern office interior designed by {{BUSINESS_NAME}}',
      width: 1200,
      height: 900,
      label: 'Office',
    },
    features: [
      'Workstation density and team adjacency planning',
      'Cabins, meeting rooms and focus booths',
      'Reception and brand-experience zone design',
      'Acoustic treatment and noise-zoning strategy',
      'Ergonomic furniture and cable management',
      'Server, storage, pantry and utility planning',
    ],
    benefits: [
      'Fewer distractions, measurably better focus time',
      'A reception space that impresses clients on arrival',
      'A workplace that helps you attract and keep talent',
    ],
    idealFor: 'Growing teams, new premises and workplace refits',
    timeline: '{{TIMELINE_OFFICE}}',
    startingFrom: '{{PRICE_OFFICE}}',
  },
  {
    slug: 'home-renovation',
    title: 'Home Renovation',
    category: 'Renovation',
    summary:
      'Full-home renovation and turnkey remodelling — civil, electrical, plumbing and finishing under one contract.',
    description:
      'Renovating an occupied home is a logistics problem as much as a design one. We sequence civil, electrical, plumbing and finishing work to keep disruption contained and the timeline honest, with a single point of contact for the entire scope.',
    icon: Hammer,
    image: {
      src: photo('photo-1763485955497-f5ef5d178698'),
      alt: 'Home renovation project completed by {{BUSINESS_NAME}}',
      width: 1200,
      height: 900,
      label: 'Renovation',
    },
    features: [
      'Structural and services condition assessment',
      'Civil, electrical and plumbing under one contract',
      'Waterproofing, flooring and surface renewal',
      'Kitchen and bathroom replacement',
      'Phased scheduling for occupied homes',
      'Debris management and post-work deep clean',
    ],
    benefits: [
      'One contract and one accountable team, not six',
      'Disruption planned for and contained, room by room',
      'Hidden problems surfaced early, before they escalate',
    ],
    idealFor: 'Older homes, resale properties and post-handover apartments',
    timeline: '{{TIMELINE_RENOVATION}}',
    startingFrom: '{{PRICE_RENOVATION}}',
  },
];

/** Services surfaced in the home-page overview grid. */
export const featuredServices = services.filter((service) => service.featured);

/** Options for the contact form's "service interested in" dropdown. */
export const serviceOptions = services.map((service) => service.title);

/** Look up a single service by slug. */
export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
