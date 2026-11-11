import { BayanihanItem } from '../types';

export const INITIAL_BAYANIHAN: BayanihanItem[] = [
  {
    id: 'byh-redcross-blood',
    title: 'Philippine Red Cross Blood Drive & Volunteer Responder',
    category: 'bayanihan',
    agency: 'Philippine Red Cross - National Blood Services',
    agencyAcronym: 'PRC-NBS',
    description: 'Join thousands of volunteer blood donors and community first responders in maintaining safe, adequate blood reserve inventory for public hospitals and trauma care nationwide.',
    lastVerified: 'November 2026',
    officialUrl: 'https://redcross.org.ph/give-blood',
    isVerified: true,
    featured: true,
    programType: 'volunteer',
    organization: 'Philippine Red Cross',
    targetBeneficiaries: 'Dengue patients, surgical patients, leukemia cases, and trauma victims in public hospitals',
    location: 'PRC National Headquarters (Mandaluyong) & Chapters nationwide',
    contactPerson: 'Director for Volunteer Services',
    contactNumber: '(02) 8790-2300 loc. 917',
    dates: 'Ongoing daily operations (Monday to Sunday, 8:00 AM – 5:00 PM)',
    volunteersNeeded: 150,
    requirements: [
      'Age between 16 to 65 years old (16–17 requires written parental consent)',
      'Weigh at least 110 lbs (50 kg)',
      'Hemoglobin level minimum 12.5 g/dL (tested free on-site)',
      'At least 6 to 8 hours of sleep prior to donation date',
      'No alcohol intake 24 hours prior to donation'
    ],
    howToParticipate: [
      'Sign up via the GabayPH Volunteer registration form or PRC official website.',
      'Undergo medical screening, blood pressure check, and mini-physical examination on-site.',
      'Spend 10 to 15 minutes in actual blood donation process under certified phlebotomists.',
      'Rest in the observation lounge and receive complimentary snacks and Red Cross Donor card.'
    ]
  },
  {
    id: 'byh-brigada-eskwela',
    title: 'Brigada Eskwela: National Schools Maintenance Program',
    category: 'bayanihan',
    agency: 'Department of Education - External Partnerships Service',
    agencyAcronym: 'DepEd-EPS',
    description: 'An annual bayanihan initiative that mobilizes parents, alumni, civic groups, and private companies to volunteer time, skills, and materials to clean, repair, and prepare public school facilities.',
    lastVerified: 'November 2026',
    officialUrl: 'https://www.deped.gov.ph',
    isVerified: true,
    featured: true,
    programType: 'volunteer',
    organization: 'DepEd Public Schools Network',
    targetBeneficiaries: 'Over 20 million public elementary and high school learners across 47,000 public schools',
    location: 'Public elementary and secondary schools across all school divisions',
    contactPerson: 'School Principal & Brigada Eskwela Coordinator',
    contactNumber: '(02) 8638-8642',
    dates: 'Pre-school year mobilization and ongoing weekend maintenance drives',
    volunteersNeeded: 500,
    requirements: [
      'Anyone willing to contribute manual labor, technical repair skills, or educational materials',
      'Minors must be accompanied by teachers or parents',
      'Comfortable work attire suitable for painting, carpentry, or gardening'
    ],
    howToParticipate: [
      'Register with your neighborhood public school\'s Brigada Eskwela coordinator.',
      'Select preferred task group: Classroom Painting, Electrical/Carpentry repair, Green Gardening, or Health & Sanitation.',
      'Render volunteer hours on designated campaign weekends.',
      'Receive official Certificate of Appreciation and Community Service Hours Credit.'
    ]
  },
  {
    id: 'byh-community-pantry',
    title: 'Bayanihan Food Network & Community Pantry Logistics',
    category: 'bayanihan',
    agency: 'Philippine Civil Society & Bayanihan Coalition',
    agencyAcronym: 'BC-NGO',
    description: 'Community-led food rescue and mutual aid network inspired by "Magbigay ayon sa kakayahan, kumuha batay sa pangangailangan". Distributes surplus fresh vegetables and staples to vulnerable families.',
    lastVerified: 'November 2026',
    officialUrl: 'https://bayanihanfood.ph',
    isVerified: true,
    featured: true,
    programType: 'community_pantry',
    organization: 'Bayanihan Food Alliance Philippines',
    targetBeneficiaries: 'Underprivileged urban poor communities, tricycle drivers, and daily wage earners',
    location: 'Community hubs in Quezon City, Marikina, Manila, Cavite, and Laguna',
    contactPerson: 'Ana Patricia Non & Community Leads',
    contactNumber: '0917-123-4567',
    dates: 'Every Tuesday, Thursday, and Saturday morning (6:30 AM – 10:30 AM)',
    volunteersNeeded: 40,
    requirements: [
      'Passionate about community food security and zero food-waste advocacy',
      'Able to assist in sorting, bagging fresh produce, and organizing queuing lines',
      'Observes courteous and empathetic communication with community members'
    ],
    howToParticipate: [
      'Submit volunteer intake form on GabayPH.',
      'Select morning shift for food sorting or afternoon shift for donation repackaging.',
      'Coordinate with area coordinators for pickup/delivery points.'
    ]
  },
  {
    id: 'byh-pawikan-coastal',
    title: 'Manila Bay & Coastal Marine Conservation Volunteer Drive',
    category: 'bayanihan',
    agency: 'Department of Environment and Natural Resources',
    agencyAcronym: 'DENR-BMB',
    description: 'Community-driven coastal cleanup, mangrove seedling planting, and microplastic monitoring protecting marine ecosystems along the Luzon coastline.',
    lastVerified: 'October 2026',
    officialUrl: 'https://bmb.denr.gov.ph',
    isVerified: true,
    programType: 'volunteer',
    organization: 'DENR Biodiversity Management Bureau & Marine Advocates',
    targetBeneficiaries: 'Marine ecosystems, coastal fishing communities, and wildlife sanctuaries',
    location: 'Las Piñas-Parañaque Critical Habitat (LPPCHEA) and Cavite coastline',
    contactPerson: 'Coastal Resource Management Coordinator',
    contactNumber: '(02) 8924-6031',
    dates: 'First and third Saturdays of every month (6:00 AM – 9:30 AM)',
    volunteersNeeded: 80,
    requirements: [
      'Sturdy closed shoes or boots for coastal shoreline walking',
      'Reusable water bottle and sun protection (hat/rashguard)',
      'Willingness to conduct data recording of collected recyclable plastics'
    ],
    howToParticipate: [
      'Register online to reserve cleanup slots.',
      'Arrive at designated assembly point for safety briefing and gloves distribution.',
      'Help segregate waste into biodegradable, recyclable, and hazardous marine debris.'
    ]
  }
];
