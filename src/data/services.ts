import { ServiceItem } from '../types';

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-philsys',
    title: 'Philippine National ID (PhilSys) Registration',
    category: 'serbisyo',
    serviceType: 'identity',
    agency: 'Philippine Statistics Authority',
    agencyAcronym: 'PSA',
    description: 'The Philippine Identification System (PhilSys) serves as the single official government identification card for all Filipino citizens and resident aliens nationwide, streamlining public and private transactions.',
    lastVerified: 'November 2026',
    officialUrl: 'https://philsys.gov.ph',
    isVerified: true,
    featured: true,
    fees: 'FREE for initial registration and PhilID card issuance',
    processingTime: 'Step 2 biometrics: 15–20 minutes; Physical card delivery: 3–6 weeks depending on postal delivery zone',
    requirements: [
      'Original copy of PSA-issued Certificate of Live Birth',
      'One (1) valid government-issued photo ID (e.g., Passport, Driver\'s License, UMID, Postal ID, Voter\'s ID)',
      'Barangay Certificate of Residency with photo (if primary ID is unavailable)',
      'Supporting documents: Marriage Certificate (for married female requesting maiden name update)'
    ],
    eligibility: [
      'Filipino citizens of all ages (including infants)',
      'Resident aliens holding valid Alien Certificate of Registration (ACR)'
    ],
    steps: [
      'Complete online pre-registration at register.philsys.gov.ph or proceed directly to an accredited PhilSys registration center.',
      'Present original documentary requirements to the registration officer.',
      'Undergo biometric capture (front photograph, full 10-fingerprint scan, and iris scan).',
      'Review printed transaction slip for spelling accuracy and keep the tracking number.',
      'Track PhilID postal delivery or download the digital ePhilID via national-id.gov.ph.'
    ],
    officeLocations: [
      'PSA Central Office, East Avenue, Diliman, Quezon City',
      'SM City Malls & Robinsons Malls PhilSys Registration Hubs nationwide',
      'Municipal and Provincial PSA Field Offices across all 82 provinces'
    ],
    onlineServiceAvailable: true,
    onlineServiceUrl: 'https://national-id.gov.ph'
  },
  {
    id: 'srv-dfa-passport',
    title: 'DFA e-Passport Application & Renewal',
    category: 'serbisyo',
    serviceType: 'identity',
    agency: 'Department of Foreign Affairs',
    agencyAcronym: 'DFA',
    description: 'Official biometric passport application and renewal service for international travel, valid for 10 years for adult applicants aged 18 and above.',
    lastVerified: 'November 2026',
    officialUrl: 'https://passport.gov.ph',
    isVerified: true,
    featured: true,
    fees: 'Regular Processing: ₱950.00 (12 working days); Expedited Processing: ₱1,200.00 (6 working days); Courier delivery fee: ₱150.00',
    processingTime: 'Consular interview: 30–45 mins; Passport production & delivery: 6–12 working days',
    requirements: [
      'Confirmed online appointment booking slip',
      'Original PSA-authenticated Birth Certificate on Security Paper (SECPA)',
      'For renewal: Current e-Passport and photocopy of data page',
      'One (1) valid government-issued ID with one photocopy',
      'Personal appearance in decent business or smart casual attire (no colored contact lenses, facial piercings, or heavy jewelry)'
    ],
    eligibility: [
      'All bona fide Filipino citizens',
      'Minors accompanied by parent or legal guardian'
    ],
    steps: [
      'Book an appointment online via passport.gov.ph at your preferred Consular Office.',
      'Pay the non-refundable processing fee through accredited payment centers within 24 hours.',
      'Arrive 15–30 minutes prior to scheduled time with printed documents and receipts.',
      'Undergo document verification, encoding, and digital biometric capture.',
      'Receive claim stub and choose courier delivery or pick-up at the consular site.'
    ],
    officeLocations: [
      'DFA Aseana, Macapagal Blvd, Parañaque City',
      'DFA NCR Central, Robinsons Galleria, Quezon City',
      'DFA NCR East, SM Megamall, Mandaluyong City',
      'DFA Regional Consular Offices in Cebu, Davao, Baguio, Iloilo, Cagayan de Oro'
    ],
    onlineServiceAvailable: true,
    onlineServiceUrl: 'https://passport.gov.ph'
  },
  {
    id: 'srv-nbi-clearance',
    title: 'NBI Clearance Online Application & Renewal',
    category: 'serbisyo',
    serviceType: 'clearance',
    agency: 'National Bureau of Investigation',
    agencyAcronym: 'NBI',
    description: 'National clearance certifying whether an individual has any pending criminal records in the Philippines. Required for local employment, overseas travel, licensing, and civil service appointments.',
    lastVerified: 'November 2026',
    officialUrl: 'https://clearance.nbi.gov.ph',
    isVerified: true,
    featured: true,
    fees: 'Clearance fee: ₱130.00 + E-payment convenience fee ₱25.00; Optional Doorstep Delivery: ₱200–₱350',
    processingTime: 'Same day release for "NO HIT"; 5–10 working days verification for "WITH HIT" records',
    requirements: [
      'Two (2) valid government-issued IDs (e.g., PhilID, UMID, Passport, PRC, Driver\'s License, Postal ID)',
      'Printed NBI Online Reference Number and payment receipt',
      'Old NBI Clearance copy or card number (for quick renewal)'
    ],
    eligibility: [
      'Filipino citizens and foreign nationals seeking police/criminal background certification'
    ],
    steps: [
      'Register or log in at clearance.nbi.gov.ph.',
      'Fill in personal information and select branch and appointment date.',
      'Select payment channel (GCash, Maya, 7-Eleven, Bayad Center) and pay the clearance fee.',
      'Visit the chosen NBI clearance center on the appointed date for biometric capture and photograph.',
      'If status is "NO HIT", claim your printed clearance immediately; if "WITH HIT", return on scheduled clearance date.'
    ],
    officeLocations: [
      'NBI Main Office, UN Avenue, Ermita, Manila',
      'NBI Clearance Center, United Nations Ave, Manila',
      'SM Malls, Robinsons Malls, and Araneta Center clearance kiosks nationwide'
    ],
    onlineServiceAvailable: true,
    onlineServiceUrl: 'https://clearance.nbi.gov.ph'
  },
  {
    id: 'srv-sss-umid',
    title: 'SSS Member Registration & Benefits Portal',
    category: 'serbisyo',
    serviceType: 'social_welfare',
    agency: 'Social Security System',
    agencyAcronym: 'SSS',
    description: 'Social security protection for private sector employees, self-employed professionals, and OFWs covering sickness, maternity, disability, retirement, unemployment, and death benefits.',
    lastVerified: 'October 2026',
    officialUrl: 'https://www.sss.gov.ph',
    isVerified: true,
    fees: 'Free member registration; Monthly contributions based on current SSS Contribution Schedule',
    processingTime: 'Online registration: Immediate SS Number generation; Benefit claims: 5–15 working days',
    requirements: [
      'Birth Certificate issued by PSA',
      'Valid photo ID (PhilID, Driver\'s License, Passport)',
      'For employed: SSS Form E-1 or online generated SS Number slip endorsed by employer'
    ],
    eligibility: [
      'Private sector employees, self-employed, voluntary members, OFWs, and non-working spouses'
    ],
    steps: [
      'Visit member.sss.gov.ph and click "Apply for an SS Number Online".',
      'Complete Phase 1 and Phase 2 information forms with valid email.',
      'Upload required identification documents.',
      'Activate your My.SSS online account via link received in your inbox.',
      'Submit generated SS number to your employer or link to online contribution payment.'
    ],
    officeLocations: [
      'SSS Main Building, East Avenue, Diliman, Quezon City',
      'Branch offices in all major cities and municipalities nationwide'
    ],
    onlineServiceAvailable: true,
    onlineServiceUrl: 'https://member.sss.gov.ph'
  },
  {
    id: 'srv-philhealth-mdr',
    title: 'PhilHealth Registration & Member Data Record (MDR)',
    category: 'serbisyo',
    serviceType: 'health',
    agency: 'Philippine Health Insurance Corporation',
    agencyAcronym: 'PhilHealth',
    description: 'National health insurance coverage providing financial risk protection and subsidies for hospitalizations, outpatient consultations, and catastrophic illnesses through accredited medical providers.',
    lastVerified: 'November 2026',
    officialUrl: 'https://www.philhealth.gov.ph',
    isVerified: true,
    fees: 'Free Member Data Record issuance; Direct contributor premiums set at 5% monthly salary',
    processingTime: 'Online registration: 10–15 minutes; In-branch MDR printout: 15–30 minutes',
    requirements: [
      'Duly accomplished PhilHealth Member Registration Form (PMRF)',
      'Two (2) 1x1 recent ID pictures',
      'PSA Birth Certificate or any valid government-issued ID',
      'Marriage Certificate (if registering spouse as dependent)'
    ],
    eligibility: [
      'All Filipino citizens automatically covered under the Universal Health Care (UHC) Act'
    ],
    steps: [
      'Access memberinquiry.philhealth.gov.ph or visit any Local Health Insurance Office (LHIO).',
      'Submit the PMRF form along with supporting proof of identity.',
      'Receive your 12-digit PhilHealth Identification Number (PIN).',
      'Download your official Member Data Record (MDR) via the member portal for hospital admission claims.'
    ],
    officeLocations: [
      'PhilHealth Head Office, Citystate Centre, 709 Shaw Blvd, Pasig City',
      'LHIO and Express Centers in SM and Robinsons Malls nationwide'
    ],
    onlineServiceAvailable: true,
    onlineServiceUrl: 'https://memberinquiry.philhealth.gov.ph'
  },
  {
    id: 'srv-lto-license',
    title: 'LTO Driver’s License Application & Renewal',
    category: 'serbisyo',
    serviceType: 'identity',
    agency: 'Land Transportation Office',
    agencyAcronym: 'LTO',
    description: 'Issuance and renewal of Student Permit, Non-Professional, and Professional Driver\'s Licenses through the Land Transportation Management System (LTMS).',
    lastVerified: 'November 2026',
    officialUrl: 'https://portal.lto.gov.ph',
    isVerified: true,
    fees: 'Student Permit: ₱250; Non-Prof License: ₱585; Medical Exam: ₱400–₱500; Practical Driving Exam: ₱1,000–₱2,500',
    processingTime: 'Renewal at DLRO: 30–60 minutes; New Application: 1 working day (including tests)',
    requirements: [
      'Completed online Comprehensive Driver\'s Education (CDE) Certificate with 80%+ passing score',
      'LTO-accredited online medical clinic certificate',
      'Existing Driver\'s License card (for renewal)',
      'For new license: Student Permit held for at least 1 month + Practical Driving Course (PDC) certificate'
    ],
    eligibility: [
      'At least 16 years old for Student Permit; At least 17 years old for Non-Professional Driver\'s License'
    ],
    steps: [
      'Log into portal.lto.gov.ph and pass the free online CDE validation exam.',
      'Obtain an electronic medical certificate from an LTO-accredited clinic.',
      'Book an appointment or walk in at your nearest LTO Licensing Center or DLRO.',
      'Submit documents, undergo biometric verification, and pay licensing fees.',
      'Take written/practical exam (if applying new) or claim your 5-year/10-year physical license card.'
    ],
    officeLocations: [
      'LTO Central Office, East Avenue, Quezon City',
      'Driver\'s License Renewal Offices (DLRO) in major commercial shopping centers nationwide'
    ],
    onlineServiceAvailable: true,
    onlineServiceUrl: 'https://portal.lto.gov.ph'
  },
  {
    id: 'srv-psa-birth-cert',
    title: 'PSA Birth, Marriage, & Death Certificate Online (PSA Serbilis)',
    category: 'serbisyo',
    serviceType: 'civil_registry',
    agency: 'Philippine Statistics Authority',
    agencyAcronym: 'PSA',
    description: 'Official online ordering and nationwide delivery portal for certified true copies of Birth Certificates, Marriage Certificates, Death Certificates, and Certificate of No Marriage (CENOMAR) printed on security paper.',
    lastVerified: 'November 2026',
    officialUrl: 'https://psaserbilis.com.ph',
    isVerified: true,
    fees: 'Birth/Marriage/Death Certificate: ₱330.00 per copy; CENOMAR: ₱430.00 per copy (Includes courier delivery & tax)',
    processingTime: 'Metro Manila delivery: 3–5 working days; Provincial areas: 6–8 working days',
    requirements: [
      'Complete details: Full name at birth, date and place of birth, father\'s name, mother\'s maiden name',
      'Relationship to document owner and valid ID upon delivery receipt',
      'For authorized representatives: Signed authorization letter and valid government ID'
    ],
    eligibility: [
      'Document owner, parent, direct descendant, legal guardian, or authorized representative under Philippine civil privacy laws'
    ],
    steps: [
      'Visit psaserbilis.com.ph or psahs.gov.ph and click "Order Now".',
      'Accept data privacy terms and fill in document requester and subject details.',
      'Verify delivery address and contact information.',
      'Pay online via Credit Card, GCash, Maya, or OTC bank payment.',
      'Wait for nationwide door-to-door delivery by authorized courier.'
    ],
    officeLocations: [
      'PSA CRS Outlets (Centris Walk Quezon City, Pasig, Muntinlupa, Cebu, Davao, etc.)'
    ],
    onlineServiceAvailable: true,
    onlineServiceUrl: 'https://psaserbilis.com.ph'
  },
  {
    id: 'srv-dti-bnrs',
    title: 'DTI Business Name Registration System (BNRS)',
    category: 'serbisyo',
    serviceType: 'business',
    agency: 'Department of Trade and Industry',
    agencyAcronym: 'DTI',
    description: 'Register and secure legal sole proprietorship trade names in the Philippines quickly and fully online, required for Mayor\'s Business Permits and BIR business registration.',
    lastVerified: 'November 2026',
    officialUrl: 'https://bnrs.dti.gov.ph',
    isVerified: true,
    fees: 'Barangay scope: ₱200; City/Municipality: ₱500; Regional: ₱1,000; National: ₱2,000 + ₱30 Documentary Stamp',
    processingTime: '8 to 15 minutes complete online process with instant certificate generation',
    requirements: [
      'Applicant must be a Filipino citizen aged 18 or above',
      'One (1) valid government photo ID',
      'Proposed business names adhering to DTI naming guidelines (no generic words or offensive terms)'
    ],
    eligibility: [
      'Sole proprietors and individual entrepreneurs in the Philippines'
    ],
    steps: [
      'Go to bnrs.dti.gov.ph and select "Register New Business Name".',
      'Specify territorial scope (Barangay, City/Town, Regional, or National).',
      'Enter proposed name keywords and verify availability in real-time.',
      'Fill in owner contact details and residential address.',
      'Pay online via GCash, Maya, or Debit Card and immediately download your 5-year official Certificate of Registration.'
    ],
    officeLocations: [
      'DTI Head Office, 361 Sen. Gil J. Puyat Ave, Makati City',
      'Negosyo Centers located in city and municipal halls across the Philippines'
    ],
    onlineServiceAvailable: true,
    onlineServiceUrl: 'https://bnrs.dti.gov.ph'
  },
  {
    id: 'srv-pagibig-membership',
    title: 'Pag-IBIG Fund Member Registration & Virtual Pag-IBIG (MID)',
    category: 'serbisyo',
    serviceType: 'identity',
    agency: 'Home Development Mutual Fund',
    agencyAcronym: 'Pag-IBIG',
    description: 'Online membership registration to secure a permanent Pag-IBIG Member ID (MID) Number, access provident savings (Regular and MP2), housing loans, and Multi-Purpose emergency loans.',
    lastVerified: 'November 2026',
    officialUrl: 'https://www.pagibigfundservices.com',
    isVerified: true,
    featured: true,
    fees: 'FREE registration and MID generation (Mandatory monthly savings: ₱200/month)',
    processingTime: 'Instant online tracking slip; Permanent MID assigned within 2 to 3 business days via SMS',
    requirements: [
      'One (1) valid primary government ID (PhilSys ID, Passport, Driver\'s License, or SSS UMID)',
      'PSA-issued Birth Certificate details',
      'Employer Tax Identification Number (TIN) or business trade name if employed'
    ],
    eligibility: [
      'Mandatory for all private and government employees, self-employed individuals earning at least ₱1,000/month, and OFWs',
      'Voluntary for non-working spouses, students aged 18 and above, and freelancers'
    ],
    steps: [
      'Navigate to the Pag-IBIG Online Services portal and click "Membership Registration".',
      'Fill out the electronic Member\'s Data Form (e-MDF) with accurate personal, family, and employment details.',
      'Submit the form and save the Registration Tracking Number (RTN).',
      'Receive your permanent 12-digit Pag-IBIG MID number via SMS after verification.',
      'Activate your Virtual Pag-IBIG account for 24/7 online balance inquiries and loan applications.'
    ],
    officeLocations: [
      'Pag-IBIG Fund Corporate Headquarters, Petron MegaPlaza, Sen. Gil Puyat Ave, Makati City',
      'Pag-IBIG Member Services Branches (MSB) in cities and provincial capitals nationwide'
    ],
    onlineServiceAvailable: true,
    onlineServiceUrl: 'https://www.pagibigfundservices.com/virtualpagibig'
  }
];
