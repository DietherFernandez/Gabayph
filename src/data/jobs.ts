import { JobItem } from '../types';

export const INITIAL_JOBS: JobItem[] = [
  {
    id: 'job-admin-deped',
    title: 'Administrative Officer II (Human Resource Management Officer I)',
    category: 'trabaho',
    agency: 'Department of Education - Division of City Schools',
    agencyAcronym: 'DepEd',
    description: 'Responsible for personnel administration, leave computation, service records management, and plantila updates in the school division office.',
    lastVerified: 'November 2026',
    officialUrl: 'https://csc.gov.ph/career',
    isVerified: true,
    featured: true,
    employmentType: 'government',
    location: 'Quezon City, Metro Manila',
    salaryRange: '₱27,000 – ₱30,000 / month (Salary Grade 11)',
    vacancies: 4,
    deadline: 'December 15, 2026',
    sector: 'public',
    qualifications: [
      'Bachelor’s Degree in Public Administration, Human Resource Management, Psychology, or relevant field',
      'Career Service (Professional) / Second Level Eligibility (CSC Passer)',
      'None required experience (Fresh graduates with civil service eligibility welcome)',
      'None required training hours'
    ],
    requirements: [
      'Duly accomplished CSC Form 212 (Personal Data Sheet) with Work Experience Sheet',
      'Authenticated Certificate of Civil Service Eligibility / PRC License',
      'Authenticated Transcript of Records (TOR)',
      'Latest Performance Rating (if currently in government service)',
      'NBI Clearance and Medical Certificate'
    ],
    howToApply: [
      'Download and accomplish the standard CSC Personal Data Sheet (Form 212 Revised 2017).',
      'Collate required authenticated credentials into a PDF folder.',
      'Submit application packet to the DepEd Division Office Personnel Selection Board or upload via the CSC Job Portal.',
      'Qualified applicants will receive written notice for behavioral interview and written examination.'
    ],
    contactEmail: 'hrmo.depedqc@deped.gov.ph'
  },
  {
    id: 'job-nurse-pgh',
    title: 'Staff Nurse II (Inpatient Acute Care)',
    category: 'trabaho',
    agency: 'Philippine General Hospital (UP-PGH)',
    agencyAcronym: 'UP-PGH',
    description: 'Provides direct high-acuity nursing care, medication administration, and patient advocacy in the country\'s premier tertiary state referral hospital.',
    lastVerified: 'November 2026',
    officialUrl: 'https://www.pgh.gov.ph',
    isVerified: true,
    featured: true,
    employmentType: 'government',
    location: 'Taft Avenue, Ermita, Manila',
    salaryRange: '₱36,619 – ₱40,000 / month (Salary Grade 15 + Hazard Pay & PhilHealth Share)',
    vacancies: 12,
    deadline: 'December 30, 2026',
    sector: 'public',
    qualifications: [
      'Bachelor of Science in Nursing (BSN)',
      'Valid Registered Nurse (RN) License issued by the Professional Regulation Commission (PRC)',
      'At least 1 year clinical hospital experience preferred, but board passers with completed internship accepted',
      'Basic Life Support (BLS) and Advanced Cardiac Life Support (ACLS) certification'
    ],
    requirements: [
      'Personal Data Sheet (CSC Form 212)',
      'Photocopy of valid PRC RN ID Card and Board Rating Certificate',
      'Official Transcript of Records and Diploma',
      'Valid BLS/ACLS training certificates',
      'Certificate of Good Moral Character from Nursing School / previous employer'
    ],
    howToApply: [
      'Submit complete application binder at the PGH Human Resource Development Division, 2nd Floor, Administration Building.',
      'Attend the initial orientation and nursing clinical aptitude evaluation.',
      'Pass medical examination at the UP-PGH Health Service.'
    ],
    contactEmail: 'hrd.uppgh@up.edu.ph'
  },
  {
    id: 'job-tech-dict',
    title: 'Junior Full-Stack Web Developer (eGovPH Project)',
    category: 'trabaho',
    agency: 'Department of Information and Communications Technology',
    agencyAcronym: 'DICT',
    description: 'Build and maintain national digital public infrastructure, API integrations, and mobile-responsive citizen service portals under the Philippine Government E-Governance initiative.',
    lastVerified: 'November 2026',
    officialUrl: 'https://dict.gov.ph/careers',
    isVerified: true,
    featured: true,
    employmentType: 'contractual',
    location: 'Diliman, Quezon City (Hybrid / Remote options)',
    salaryRange: '₱45,000 – ₱58,000 / month (Contract of Service)',
    vacancies: 6,
    deadline: 'January 10, 2027',
    sector: 'public',
    qualifications: [
      'Bachelor\'s Degree in Computer Science, Information Technology, Computer Engineering, or equivalent experience',
      'Proficiency in modern TypeScript, React, Node.js, and relational databases (PostgreSQL)',
      'Familiarity with RESTful APIs, Git workflows, and government cybersecurity standards',
      'Demonstrated portfolio or GitHub repositories showcasing functional web applications'
    ],
    requirements: [
      'Updated Curriculum Vitae (CV) with GitHub / portfolio links',
      'Diploma or Certificate of Graduation',
      'Two (2) professional references',
      'Valid Government-issued ID'
    ],
    howToApply: [
      'Send CV and portfolio link with subject [APP-FULLSTACK-DICT] to careers@dict.gov.ph.',
      'Shortlisted applicants will complete a take-home coding challenge (48 hours).',
      'Technical panel interview conducted via Zoom.'
    ],
    contactEmail: 'careers@dict.gov.ph'
  },
  {
    id: 'job-agri-da',
    title: 'Agricultural Technologist (Rice & High-Value Crops)',
    category: 'trabaho',
    agency: 'Department of Agriculture - Regional Field Office',
    agencyAcronym: 'DA-RFO',
    description: 'Conducts farmer field schools, technology demonstration on climate-resilient farming techniques, distribution of hybrid seeds, and farm data reporting in municipal agrarian communities.',
    lastVerified: 'October 2026',
    officialUrl: 'https://www.da.gov.ph',
    isVerified: true,
    employmentType: 'government',
    location: 'San Fernando, Pampanga (Field Assignments)',
    salaryRange: '₱25,000 – ₱28,000 / month (Salary Grade 10)',
    vacancies: 5,
    deadline: 'December 20, 2026',
    sector: 'public',
    qualifications: [
      'Bachelor\'s Degree in Agriculture, Agribusiness, Agricultural Engineering, or related field',
      'Licensed Agriculturist (PRC) or CS Sub-Professional / Professional Eligibility',
      'Willingness to conduct regular community immersion and field farm visits'
    ],
    requirements: [
      'CSC Form 212 with passport size ID photo',
      'Authenticated PRC Board Certificate for Agriculturists',
      'Transcript of Records',
      'Barangay Clearance & Police Clearance'
    ],
    howToApply: [
      'Address formal letter of intent to the DA Regional Executive Director.',
      'Submit application bundle through the DA Regional Personnel Division.',
      'Participate in on-site field skills evaluation.'
    ],
    contactEmail: 'rfo3.personnel@da.gov.ph'
  },
  {
    id: 'job-redcross-logistics',
    title: 'Emergency Logistics & Disaster Relief Officer',
    category: 'trabaho',
    agency: 'Philippine Red Cross - Disaster Management Services',
    agencyAcronym: 'PRC-DMS',
    description: 'Manages warehouse inventory of emergency food packs, water purification kits, and shelter assistance units; coordinates dispatch logistics during national calamities and rescue deployments.',
    lastVerified: 'November 2026',
    officialUrl: 'https://redcross.org.ph/careers',
    isVerified: true,
    employmentType: 'full-time',
    location: 'Mandaluyong City, Metro Manila',
    salaryRange: '₱30,000 – ₱38,000 / month + Life & Health Benefits',
    vacancies: 3,
    deadline: 'January 15, 2027',
    sector: 'ngo',
    qualifications: [
      'Graduate of Supply Chain Management, Industrial Engineering, Business, or Social Sciences',
      'At least 2 years demonstrated experience in humanitarian logistics or fleet management',
      'Knowledge of Sphere humanitarian standards and warehouse safety protocols'
    ],
    requirements: [
      'Comprehensive Resume with character references',
      'Certificates of prior disaster response or warehouse management training',
      'Driver\'s License with light truck endorsement is an advantage'
    ],
    howToApply: [
      'Apply online through redcross.org.ph/careers or submit resume directly to logistics.hr@redcross.org.ph.',
      'Panel interview and warehouse simulation exercise.'
    ],
    contactEmail: 'logistics.hr@redcross.org.ph'
  }
];
