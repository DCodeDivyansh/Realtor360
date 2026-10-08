import type {
  ContactItem,
  LeadSourceItem,
  ListingItem,
  MetricItem,
  PipelineItem,
  ReminderItem,
  SalesPersonDealItem,
  ScheduleItem,
  StageDealItem,
} from '../types/dashboard'

export const METRIC_CARDS: MetricItem[] = [
  {
    id: 'active-listing',
    title: 'Active Listing',
    value: '23',
    change: '-12%',
    isPositive: false,
    icon: 'listing',
  },
  {
    id: 'active-leads',
    title: 'Active Leads',
    value: '120',
    change: '+12%',
    isPositive: true,
    icon: 'leads',
  },
  {
    id: 'total-closed',
    title: 'Total Closed',
    value: '42',
    change: '+12%',
    isPositive: true,
    icon: 'closed',
  },
  {
    id: 'total-revenue',
    title: 'Total Revenue',
    value: 'Rs.22Cr.',
    change: '+12%',
    isPositive: true,
    icon: 'revenue',
  },
]

export const LEAD_SOURCE_DATA: LeadSourceItem[] = [
  {
    name: 'Inbound Call',
    count: 9,
    percentage: 37.87,
    color: '#F4EED2', // Pale cream
  },
  {
    name: 'Reference',
    count: 1,
    percentage: 30.6,
    color: '#C99B30', // Deep gold
  },
  {
    name: 'Facebook',
    count: 1,
    percentage: 6.78,
    color: '#D7B158', // Medium gold
  },
  {
    name: 'Website',
    count: 10,
    percentage: 24.83,
    color: '#E3C985', // Warm light gold
  },
]

export const STAGES_DATA: StageDealItem[] = [
  { stage: 'Interested', angelPlaza: 2.8, angelGarden: 2.7, none: 2.5 },
  { stage: 'Site Visit Done', angelPlaza: 3.8, angelGarden: 3.2, none: 3.0 },
  { stage: 'Unit Shortlisted', angelPlaza: 3.5, angelGarden: 3.0, none: 1.5 },
  { stage: 'Contracts Signed', angelPlaza: 3.8, angelGarden: 3.2, none: 3.0 },
  { stage: 'Offer Initiated', angelPlaza: 3.2, angelGarden: 2.8, none: 2.5 },
  { stage: 'Offer Accepted', angelPlaza: 3.8, angelGarden: 3.2, none: 3.0 },
]

export const SALES_PEOPLE_DATA: SalesPersonDealItem[] = [
  { person: 'Owner 1', angelPlaza: 5.2, angelGarden: 6.3, none: 6.3 },
  { person: 'Owner 2', angelPlaza: 2.2, angelGarden: 5.0, none: 5.6 },
]

export const PIPELINE_DATA: PipelineItem[] = [
  { name: 'None', count: 14 },
  { name: 'Angel Plaza', count: 3 },
  { name: 'Angel Garden', count: 1 },
]

// Professional avatar photos
export const AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
]

export const LISTINGS_DATA: ListingItem[] = [
  {
    id: 'listing-1',
    title: 'Maplewood House',
    type: 'House',
    units: 12,
    price: 'Rs.85L',
    activeLeads: 35,
    avatars: [AVATARS[0], AVATARS[1]],
    views: 125,
    status: '8/12 Occupied',
    statusType: 'occupied',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: 'listing-2',
    title: 'Serenity Villa',
    type: 'Villa',
    units: 9300,
    price: 'Rs.2.8Cr',
    activeLeads: 40,
    avatars: [AVATARS[1], AVATARS[2]],
    views: 930,
    status: 'Available',
    statusType: 'available',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: 'listing-3',
    title: 'Rosehill Cottage',
    type: 'House',
    units: 25,
    price: 'Rs.1.1Cr',
    activeLeads: 15,
    avatars: [AVATARS[2], AVATARS[3]],
    views: 355,
    status: 'Available',
    statusType: 'available',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: 'listing-4',
    title: 'Skyline Edge',
    type: 'Apartment',
    units: 17,
    price: 'Rs.75L',
    activeLeads: 11,
    avatars: [AVATARS[3], AVATARS[0]],
    views: 425,
    status: 'Sold Out',
    statusType: 'sold-out',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=120&auto=format&fit=crop&q=80',
  },
]

export const CONTACTS_DATA: ContactItem[] = [
  {
    id: 'c-1',
    name: 'John Doe',
    location: 'New York',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    phone: '+1 234 567 8901',
  },
  {
    id: 'c-2',
    name: 'Jessica Chen',
    location: 'California, LA',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
    phone: '+1 310 555 0192',
  },
  {
    id: 'c-3',
    name: 'Evan Chris',
    location: 'New York',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
    phone: '+1 212 555 0144',
  },
  {
    id: 'c-4',
    name: 'Jack B.',
    location: 'Ohio, Columbus',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    phone: '+1 614 555 0188',
  },
  {
    id: 'c-5',
    name: 'Emily Paris',
    location: 'California, LA',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    phone: '+1 323 555 0173',
  },
]

export const REMINDERS_DATA: ReminderItem[] = [
  {
    id: 'rem-1',
    title: 'Follow-Ups',
    subtitle: '15 leads need to be followed up.',
    isHighlighted: true,
    leadAvatars: [AVATARS[0], AVATARS[1], AVATARS[2], AVATARS[3]],
    leadsCountBadge: '+11',
  },
  {
    id: 'rem-2',
    title: 'Submit Final Offer- Villa Deal',
    subtitle: 'Finalize and send offer documents.',
  },
  {
    id: 'rem-3',
    title: 'Review Contract with Legal',
    subtitle: 'Ensure attorney reviews apartment deal contract today.',
  },
  {
    id: 'rem-4',
    title: 'Call Jessica Chen – Follow-up',
    subtitle: 'Discuss her feedback after site visit to Angel Plaza.',
  },
]

export const SCHEDULE_DATA: ScheduleItem[] = [
  {
    id: 'sch-1',
    title: 'Visit Client- Angel Plaza',
    subtitle: 'Sector 45, Gurugram, Haryana',
    color: 'teal',
  },
  {
    id: 'sch-2',
    title: 'Visit Client – Site Walkthrough',
    subtitle: 'Whitefield Road, Bengaluru, Karnataka',
    color: 'teal',
  },
  {
    id: 'sch-3',
    title: 'Follow Up – Jessica Chen',
    subtitle: 'jessica.chen@email.com',
    color: 'rose',
  },
  {
    id: 'sch-4',
    title: 'Follow Up – Roger Bouchard',
    subtitle: 'roger.bouchard@clientmail.com',
    color: 'rose',
  },
  {
    id: 'sch-5',
    title: 'Submit Final Offer – Villa Deal',
    subtitle: 'Finalize and send offer documents.',
    color: 'amber',
  },
  {
    id: 'sch-6',
    title: 'Submit Internal Review – Apartment PricingFinal Offer – Villa Deal',
    subtitle: 'Update CRM with latest market rates.',
    color: 'amber',
  },
]
