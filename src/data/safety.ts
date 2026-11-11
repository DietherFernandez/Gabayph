import { EmergencyResourceItem } from '../types';

export const INITIAL_SAFETY: EmergencyResourceItem[] = [
  {
    id: 'safe-911',
    title: 'Emergency 911 National Hotline',
    category: 'kaligtasan',
    agency: 'Emergency 911 National Call Center (DILG / PNP / BFP)',
    agencyAcronym: 'E-911',
    description: 'The primary nationwide emergency telephone number in the Philippines connecting citizens immediately to local police, fire protection, emergency medical services, and search-and-rescue teams 24 hours a day.',
    lastVerified: 'November 2026',
    officialUrl: 'https://dilg.gov.ph',
    isVerified: true,
    featured: true,
    resourceType: 'hotline',
    hotlineNumber: '911',
    isNationalHotline: true,
    coverage: 'Nationwide coverage (All regions, provinces, and cities in the Philippines)',
    operatingHours: '24 Hours / 7 Days a week (Toll-free across landlines and telecommunication carriers)',
    actionProtocol: [
      'Stay calm and clearly state your current exact location (Barangay, Street name, landmark, and city).',
      'Briefly describe the emergency: Medical, Fire, Crime in progress, or Rescue required.',
      'State how many persons are injured, endangered, or involved.',
      'Stay on the line until dispatcher confirms response units are en route.',
      'Do NOT make prank calls (punishable under Presidential Decree 1727 and Republic Act 10175).'
    ]
  },
  {
    id: 'safe-redcross-143',
    title: 'Philippine Red Cross Emergency Hotline 143',
    category: 'kaligtasan',
    agency: 'Philippine Red Cross Operations Center',
    agencyAcronym: 'PRC-143',
    description: 'Dedicated humanitarian hotline for ambulance dispatch, blood bank requests, disaster rescue, psychosocial first aid, and emergency evacuation coordination.',
    lastVerified: 'November 2026',
    officialUrl: 'https://redcross.org.ph',
    isVerified: true,
    featured: true,
    resourceType: 'hotline',
    hotlineNumber: '143',
    alternateNumber: '(02) 8790-2300',
    isNationalHotline: true,
    coverage: 'Nationwide coverage through 104 PRC chapters across the archipelago',
    operatingHours: '24 Hours / 7 Days a week',
    actionProtocol: [
      'Call 143 from any mobile or landline phone.',
      'For emergency blood needs: Have the patient\'s hospital name, doctor\'s requisition slip, and blood type ready.',
      'For ambulance transport: Inform the coordinator if patient is intubated, cardiac, or infectious.'
    ]
  },
  {
    id: 'safe-8888',
    title: 'Citizens\' Complaint Hotline 8888',
    category: 'kaligtasan',
    agency: 'Office of the President - Citizens\' Complaint Center',
    agencyAcronym: 'OP-8888',
    description: 'National public service hotline to report government corruption, red tape, slow public service delivery, grievance against government officials, and community safety hazards.',
    lastVerified: 'November 2026',
    officialUrl: 'https://8888.gov.ph',
    isVerified: true,
    featured: true,
    resourceType: 'hotline',
    hotlineNumber: '8888',
    isNationalHotline: true,
    coverage: 'Nationwide public agency oversight',
    operatingHours: '24 Hours / 7 Days a week (Calls and SMS to 8888)',
    actionProtocol: [
      'State the government agency, office branch, and employee concerned.',
      'Provide dates, incident details, and reference ticket numbers if applicable.',
      'Receive a 10-digit tracking reference code to monitor administrative resolution within 72 hours.'
    ]
  },
  {
    id: 'safe-ndrrmc',
    title: 'NDRRMC Disaster Monitoring Operations Center',
    category: 'kaligtasan',
    agency: 'National Disaster Risk Reduction and Management Council',
    agencyAcronym: 'NDRRMC',
    description: 'Apex national disaster monitoring authority providing emergency alerts on typhoons, storm surges, volcanic eruptions, tsunamis, and coordinating inter-agency rescue deployments.',
    lastVerified: 'November 2026',
    officialUrl: 'https://ndrrmc.gov.ph',
    isVerified: true,
    featured: true,
    resourceType: 'hotline',
    hotlineNumber: '(02) 8911-5061',
    alternateNumber: '(02) 8912-2665',
    isNationalHotline: true,
    coverage: 'National and Regional DRRM Operations Centers',
    operatingHours: '24/7 National Operations Monitoring',
    actionProtocol: [
      'Monitor nationwide emergency broadcast text alerts (Free Mobile Disaster Alerts RA 10639).',
      'Follow official NDRRMC Situational Reports for dam discharge warnings and pre-emptive evacuations.'
    ]
  },
  {
    id: 'safe-mental-health-1553',
    title: 'DOH National Center for Mental Health Crisis Hotline 1553',
    category: 'kaligtasan',
    agency: 'Department of Health - National Center for Mental Health',
    agencyAcronym: 'DOH-NCMH',
    description: 'Confidential, toll-free 24/7 mental health crisis hotline providing compassionate psychological support, suicide intervention, and referral to mental health psychiatric facilities.',
    lastVerified: 'November 2026',
    officialUrl: 'https://ncmh.gov.ph',
    isVerified: true,
    resourceType: 'hotline',
    hotlineNumber: '1553',
    alternateNumber: '0917-899-8727',
    isNationalHotline: true,
    coverage: 'Nationwide (Toll-free landline to landline across Luzon, Visayas, and Mindanao)',
    operatingHours: '24 Hours / 7 Days a week, 365 Days a year',
    actionProtocol: [
      'Free, safe, and confidential space with licensed psychologists and trained crisis counselors.',
      'No judgment, available in Tagalog, English, Cebuano, and Ilocano.'
    ]
  },
  {
    id: 'safe-bfp-fire',
    title: 'Bureau of Fire Protection (BFP) National Operations',
    category: 'kaligtasan',
    agency: 'Bureau of Fire Protection - Department of the Interior and Local Government',
    agencyAcronym: 'BFP',
    description: 'National firefighting and rescue emergency dispatch authority for structural fires, vehicular extrication, chemical spills, and search-and-rescue.',
    lastVerified: 'November 2026',
    officialUrl: 'https://bfp.gov.ph',
    isVerified: true,
    resourceType: 'hotline',
    hotlineNumber: '(02) 8426-0219',
    alternateNumber: '(02) 8426-0246',
    coverage: 'All City and Municipal Fire Stations nationwide',
    operatingHours: '24/7 Fire Alarm Dispatch',
    actionProtocol: [
      'Evacuate immediately without gathering material belongings.',
      'Shout "SUNOG!" to alert neighbors.',
      'Close doors behind you to retard fire spread.',
      'Call emergency numbers from outside the burning premises.'
    ]
  },
  {
    id: 'safe-iacat-1343',
    title: 'Actionline Against Human Trafficking 1343',
    category: 'kaligtasan',
    agency: 'Inter-Agency Council Against Trafficking - Department of Justice',
    agencyAcronym: 'DOJ-IACAT',
    description: 'Official 24/7 emergency hotline for reporting suspected illegal recruitment, human trafficking, online sexual abuse and exploitation of children (OSAEC), and mail-order bride schemes.',
    lastVerified: 'November 2026',
    officialUrl: 'https://iacat.gov.ph',
    isVerified: true,
    resourceType: 'hotline',
    hotlineNumber: '1343',
    alternateNumber: '(02) 8527-3467',
    isNationalHotline: true,
    coverage: 'Nationwide & International repatriation monitoring',
    operatingHours: '24/7 Confidential Reporting Center'
  },
  {
    id: 'safe-pagasa-weather',
    title: 'PAGASA Severe Weather & Flood Forecasting',
    category: 'kaligtasan',
    agency: 'Philippine Atmospheric, Geophysical and Astronomical Services Administration',
    agencyAcronym: 'DOST-PAGASA',
    description: 'Authoritative national meteorological alerts for tropical cyclones, heavy rainfall advisories, thunderstorm warnings, gale warnings, and river basin flood forecasting.',
    lastVerified: 'November 2026',
    officialUrl: 'https://bagong.pagasa.dost.gov.ph',
    isVerified: true,
    resourceType: 'disaster_guide',
    hotlineNumber: '(02) 8927-1331',
    coverage: 'Philippine Area of Responsibility (PAR)',
    operatingHours: '24/7 Weather Tracking Services',
    actionProtocol: [
      'Signal No. 1: 39–61 km/h winds, pre-disaster risk assessment, inspect houses and clean drainage.',
      'Signal No. 2: 62–88 km/h winds, prepare emergency kits, secure roofs, evacuate low-lying shores.',
      'Signal No. 3: 89–117 km/h winds, mandatory suspension of travel, relocate to concrete evacuation shelters.',
      'Signal No. 4 & 5: Extreme life-threatening winds >118 km/h, total stay inside fortified structural refuges.'
    ]
  },
  {
    id: 'safe-phivolcs-seismic',
    title: 'PHIVOLCS Earthquake & Volcanic Hazards',
    category: 'kaligtasan',
    agency: 'Philippine Institute of Volcanology and Seismology',
    agencyAcronym: 'DOST-PHIVOLCS',
    description: 'National monitoring agency for seismic activity, active volcanoes (Taal, Mayon, Kanlaon, Pinatubo, Bulusan), earthquake epicenters, faultlines, and Pacific Tsunami advisories.',
    lastVerified: 'November 2026',
    officialUrl: 'https://www.phivolcs.dost.gov.ph',
    isVerified: true,
    resourceType: 'disaster_guide',
    hotlineNumber: '(02) 8426-1468',
    coverage: 'Nationwide Seismological Observatories',
    operatingHours: '24/7 Real-Time Seismological Surveillance',
    actionProtocol: [
      'During Earthquake: DUCK, COVER, and HOLD under a sturdy table. Do not run outside while ground is shaking.',
      'After Shaking: Check for gas leaks and electrical hazards. Evacuate calmly to open designated muster areas.',
      'Coastal Areas: If violent shaking occurs or sea recedes, run immediately to higher ground (Tsunami Warning).'
    ]
  },
  {
    id: 'safe-firstaid-cpr',
    title: 'Essential First Aid & Life Support Reference Guide',
    category: 'kaligtasan',
    agency: 'GabayPH Public Safety & Health Team in accordance with PRC standards',
    agencyAcronym: 'PRC-STANDARDS',
    description: 'Step-by-step verified reference procedures for bystander cardiopulmonary resuscitation (CPR), severe bleeding control, heat stroke first aid, and Heimlich maneuver for choking.',
    lastVerified: 'November 2026',
    officialUrl: 'https://redcross.org.ph/first-aid',
    isVerified: true,
    resourceType: 'first_aid',
    coverage: 'Everyday citizen first responder knowledge',
    operatingHours: 'Reference Information Guide',
    actionProtocol: [
      'Adult CPR: Check responsiveness. Call 911 or 143. Place hands in center of chest, push hard and fast (100–120 beats per minute, rhythm of "Stayin\' Alive") at least 2 inches deep.',
      'Choking (Heimlich): Stand behind person, wrap arms around waist, make fist above navel, thrust inward and upward rapidly.',
      'Severe Bleeding: Apply firm, direct pressure over the wound using sterile gauze or clean cloth. Elevate if possible. Do not remove soaked gauze; layer more on top.',
      'Heat Exhaustion: Move person to air-conditioned or shaded area. Loosen tight clothing. Apply cool damp towels to neck, armpits, and groin. Provide sips of cool water if conscious.'
    ]
  }
];

export interface EvacuationCenterMock {
  id: string;
  name: string;
  lgu: string;
  province: string;
  address: string;
  capacityPersons: number;
  currentStatus: 'standby' | 'active_evacuation' | 'full';
  amenities: string[];
  contactNumber: string;
  sampleNotice: string;
}

export const SAMPLE_EVACUATION_CENTERS: EvacuationCenterMock[] = [
  {
    id: 'evac-marikina-sports',
    name: 'Marikina Sports Center Multi-Purpose Disaster Shelter',
    lgu: 'Marikina City',
    province: 'Metro Manila',
    address: 'Sumulong Highway, Sto. Niño, Marikina City',
    capacityPersons: 3500,
    currentStatus: 'standby',
    amenities: ['Modular Family Tents', 'Separate Male/Female Shower Facilities', 'Potable Water Filtration Unit', 'Breastfeeding Station', '24/7 Medical Clinic'],
    contactNumber: '(02) 8646-2436 (Marikina Rescue 161)',
    sampleNotice: 'Sample Municipal Evacuation Center listing for demonstration purposes.'
  },
  {
    id: 'evac-albay-evac-center',
    name: 'Legazpi City Astrodome Regional Evacuation Center',
    lgu: 'Legazpi City',
    province: 'Albay',
    address: 'F. Imperial Street, Bitano, Legazpi City',
    capacityPersons: 2800,
    currentStatus: 'standby',
    amenities: ['Typhoon & Volcanic Ash Resilient Roof', 'Child-Friendly Activity Space', 'Standby Diesel Generator', 'Emergency Food Distribution Center'],
    contactNumber: '(052) 742-1234 (Legazpi CDRRMO)',
    sampleNotice: 'Sample Provincial Evacuation Center listing for demonstration purposes.'
  },
  {
    id: 'evac-cebu-mandahue',
    name: 'Mandaue City Comprehensive Disaster Evacuation Facility',
    lgu: 'Mandaue City',
    province: 'Cebu',
    address: 'Plaridel Street, Barangay Paknaan, Mandaue City',
    capacityPersons: 2000,
    currentStatus: 'standby',
    amenities: ['Community Kitchen', 'PWD Ramps & Accessible Toilets', 'Psychosocial Support Desk', 'Free Wi-Fi Emergency Hotspot'],
    contactNumber: '(032) 345-0000 (Mandaue CDRRMO)',
    sampleNotice: 'Sample Provincial Evacuation Center listing for demonstration purposes.'
  }
];
