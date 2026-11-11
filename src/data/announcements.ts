import { AnnouncementItem } from '../types';

export const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'anc-dti-price-freeze',
    title: 'Automatic Price Freeze Imposed on Basic Commodities in Typhoon-Hit Areas',
    summary: 'The Department of Trade and Industry reminds commercial retailers that automatic 60-day price freezes take effect immediately across all LGUs declared under a State of Calamity.',
    content: 'Pursuant to Republic Act No. 7581 (Price Act) as amended by RA 10623, prices of basic necessities are automatically frozen at their prevailing prices for 60 days unless sooner lifted. Basic goods covered include canned fish, locally manufactured instant noodles, bottled water, bread, salt, processed milk, and laundry soap. Violators face fines up to ₱1,000,000 and imprisonment up to 10 years.',
    sourceAgency: 'Department of Trade and Industry - Fair Trade Enforcement Bureau',
    agencyAcronym: 'DTI-FTEB',
    datePublished: 'November 9, 2026',
    urgent: true,
    category: 'pera',
    affectedAreas: ['Region II (Cagayan Valley)', 'Region III (Central Luzon)', 'CAR (Cordillera)'],
    relatedLink: 'https://dti.gov.ph'
  },
  {
    id: 'anc-dost-application-deadline',
    title: 'DOST-SEI Extends S&T Undergraduate Scholarship Application Window',
    summary: 'Graduating Grade 12 students nationwide have until December 31, 2026 to submit their digital application documents for the 2027 S&T scholarship qualifying exams.',
    content: 'The DOST Science Education Institute announced the extension of the online portal submission deadline to accommodate senior high school applicants from provincial schools undergoing academic calendar adjustments. Applicants are advised to ensure high-resolution scans of Certificate of Good Moral Character and official Form 137 are uploaded.',
    sourceAgency: 'Department of Science and Technology - SEI',
    agencyAcronym: 'DOST-SEI',
    datePublished: 'November 7, 2026',
    urgent: false,
    category: 'aral',
    relatedLink: 'https://sei.dost.gov.ph'
  },
  {
    id: 'anc-lto-10yr-license',
    title: 'LTO Reminder: 10-Year Validity Driver’s Licenses Available via LTMS Portal',
    summary: 'Motorists with no traffic demerit points can renew their driver’s license with 10-year validity through accredited DLRO branches with completed CDE exam verification.',
    content: 'Under Republic Act 10930, holders of driver’s licenses who have not committed any violation of traffic laws and ordinances during their 5-year period are eligible to apply for a 10-year validity card upon renewal. The free 25-item Comprehensive Driver’s Education (CDE) online validation test must be completed on the Land Transportation Management System (LTMS).',
    sourceAgency: 'Land Transportation Office',
    agencyAcronym: 'LTO',
    datePublished: 'November 5, 2026',
    urgent: false,
    category: 'serbisyo',
    relatedLink: 'https://portal.lto.gov.ph'
  },
  {
    id: 'anc-dfa-passport-slots',
    title: 'DFA Consular Offices Open Additional Saturday Passport Appointment Slots',
    summary: 'Selected consular offices in Metro Manila, Metro Cebu, and Metro Davao will open weekend appointment slots for working citizens throughout November and December 2026.',
    content: 'The Department of Foreign Affairs Office of Consular Affairs (DFA-OCA) announced the availability of courtesy lane slots and weekend Saturday operations for applicants requiring immediate overseas employment processing, student visa compliance, and senior citizens accompanied by immediate family members.',
    sourceAgency: 'Department of Foreign Affairs',
    agencyAcronym: 'DFA',
    datePublished: 'November 2, 2026',
    urgent: false,
    category: 'serbisyo',
    affectedAreas: ['NCR', 'Central Visayas', 'Davao Region'],
    relatedLink: 'https://passport.gov.ph'
  },
  {
    id: 'anc-doh-dengue-alert',
    title: 'DOH Intensifies 4S Strategy Against Dengue and Waterborne Illnesses',
    summary: 'Health authorities urge households and local barangay councils to sustain anti-dengue search-and-destroy cleanup operations as monsoon rains continue.',
    content: 'The Department of Health reiterates the 4S strategy: Search and destroy mosquito breeding grounds; Self-protection measures (wearing light-colored long sleeves, repellent); Seek early medical consultation for high fevers lasting over 2 days; and Say yes to fogging only in hotspot outbreak zones.',
    sourceAgency: 'Department of Health',
    agencyAcronym: 'DOH',
    datePublished: 'October 28, 2026',
    urgent: true,
    category: 'kaligtasan',
    relatedLink: 'https://doh.gov.ph'
  }
];
