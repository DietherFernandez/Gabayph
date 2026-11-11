import { EducationItem } from '../types';

export const INITIAL_EDUCATION: EducationItem[] = [
  {
    id: 'edu-dost-sei',
    title: 'DOST-SEI S&T Undergraduate Scholarships (RA 7687 & Merit)',
    category: 'aral',
    agency: 'Department of Science and Technology - Science Education Institute',
    agencyAcronym: 'DOST-SEI',
    description: 'Premier national scholarship for academically gifted graduating high school seniors pursuing priority Bachelor of Science degrees in basic sciences, engineering, and emerging technologies.',
    lastVerified: 'November 2026',
    officialUrl: 'https://www.sei.dost.gov.ph',
    isVerified: true,
    featured: true,
    educationType: 'scholarship',
    educationalLevel: 'tertiary',
    deadline: 'December 31, 2026',
    benefits: [
      'Tuition and other school fees subsidy: Up to ₱40,000.00 / academic year (for private universities)',
      'Monthly living allowance: ₱8,000.00 per month (10 months/year)',
      'Book allowance: ₱10,000.00 / academic year',
      'Thesis allowance: ₱10,000.00 + Graduation clothing allowance: ₱1,000.00',
      'Group personal accident insurance and one economy round-trip airfare (for island scholars)'
    ],
    eligibility: [
      'Natural-born Filipino citizen of good moral character',
      'Graduating Grade 12 STEM strand student (Top 5% of non-STEM strand if applicable)',
      'Must belong to socioeconomic bracket eligible for RA 7687 or demonstrate academic excellence for Merit Scholarship',
      'Must intend to enroll in DOST-SEI identified priority S&T priority undergraduate degree programs'
    ],
    requirements: [
      'Certificate of Good Moral Character from School Principal',
      'Certified True Copy of Grades for Grades 9, 10, and 11',
      'Principal\'s Certification on Applicant’s Senior High School Strand and class ranking',
      'Income Tax Return (ITR) / BIR Tax Exemption Certificate of parents / guardians',
      'PSA Birth Certificate'
    ],
    applicationSteps: [
      'Access the DOST-SEI E-Scholarship Application System at e-scholarship.sei.dost.gov.ph.',
      'Create student account and fill out personal, family, and academic profile sections.',
      'Upload high-resolution scans of all required documentary certificates and parent ITRs.',
      'Review submitted data and download Test Permit once issued.',
      'Take the nationwide DOST-SEI pen-and-paper / computerized scholarship qualifying examination.'
    ]
  },
  {
    id: 'edu-ched-tulong-dunong',
    title: 'CHED Tulong Dunong Program (TDP-TES)',
    category: 'aral',
    agency: 'Commission on Higher Education - UniFAST',
    agencyAcronym: 'CHED-UniFAST',
    description: 'Financial assistance grant intended for qualified and deserving college students enrolled in State Universities and Colleges (SUCs), Local Universities and Colleges (LUCs), or private Higher Education Institutions (HEIs).',
    lastVerified: 'November 2026',
    officialUrl: 'https://unifast.gov.ph',
    isVerified: true,
    featured: true,
    educationType: 'scholarship',
    educationalLevel: 'tertiary',
    deadline: 'January 25, 2027',
    benefits: [
      'Stipend of ₱7,500.00 per semester (₱15,000.00 per academic school year) to defray educational expenses',
      'Direct disbursement to student bank account / Land Bank payroll'
    ],
    eligibility: [
      'Filipino undergraduate student enrolled in CHED-recognized tertiary program',
      'Combined annual gross family income not exceeding ₱400,000.00',
      'General Weighted Average (GWA) of at least 80% with no failing grades in prerequisite subjects',
      'Not currently enjoying any other major national government educational grant'
    ],
    requirements: [
      'Duly accomplished CHED TDP Application Form',
      'Certificate of Matriculation / Enrollment from the college registrar',
      'Official Report Card / Transcript showing previous semester grades',
      'Proof of Income: ITR, Certificate of Tax Exemption, or Barangay Certificate of Indigency'
    ],
    applicationSteps: [
      'Inquire with your University / College Student Financial Assistance Services Office (OSAS).',
      'Fill out the institutional CHED Tulong Dunong endorsement roster.',
      'Submit required academic and financial documents to the scholarship coordinator.',
      'University submits validated roster to CHED Regional Office for UniFAST funding allocation.'
    ]
  },
  {
    id: 'edu-tesda-free-tvet',
    title: 'TESDA Universal Access to Quality Tertiary Education (Free TVET)',
    category: 'aral',
    agency: 'Technical Education and Skills Development Authority',
    agencyAcronym: 'TESDA',
    description: '100% free tuition, instructional fees, and assessment vouchers for technical-vocational courses across welding, IT, automotive, healthcare, culinary arts, and agriculture in TESDA technology institutes.',
    lastVerified: 'November 2026',
    officialUrl: 'https://www.tesda.gov.ph',
    isVerified: true,
    featured: true,
    educationType: 'tvet',
    educationalLevel: 'vocational',
    deadline: 'Rolling enrollment (Quarterly batches)',
    benefits: [
      'Free tuition and training fees for registered National Certificate (NC I, II, III, IV) qualifications',
      'Free National Competency Assessment certification exam voucher',
      'Training support allowance of ₱160.00 per training day + free uniform allowance'
    ],
    eligibility: [
      'Filipino citizen at least 15 years old and not currently enrolled in college',
      'High school graduate, ALS completer, or career changer seeking technical certifications',
      'Passes the basic TESDA trainability and aptitude screening'
    ],
    requirements: [
      'High School Diploma, Form 137, or ALS Certificate of Rating',
      'Barangay Clearance and PSA Birth Certificate',
      'Three (3) passport-size ID pictures with collar and white background',
      'Medical Certificate certifying physical fitness for technical trade'
    ],
    applicationSteps: [
      'Browse accredited technical courses on tesda.gov.ph or visit nearest TESDA District Office / Provincial Training Center.',
      'Submit registration form and identify course track (e.g., Cookery NC II, Shielded Metal Arc Welding NC II, Computer Systems Servicing NC II).',
      'Undergo profiling interview and career counseling assessment.',
      'Commence intensive hands-on workshop training.'
    ]
  },
  {
    id: 'edu-dict-digital-skills',
    title: 'DICT Free Digital Literacy, Cloud, & AI Upskilling',
    category: 'aral',
    agency: 'Department of Information and Communications Technology',
    agencyAcronym: 'DICT',
    description: 'Free self-paced and cohort-based online training tracks in cybersecurity fundamentals, cloud computing, data analytics, and digital freelance careers for Filipino youth and workers.',
    lastVerified: 'November 2026',
    officialUrl: 'https://ilc-db.dict.gov.ph',
    isVerified: true,
    educationType: 'free_course',
    educationalLevel: 'all',
    deadline: 'Open year-round',
    benefits: [
      '100% free access to verified learning pathways and laboratory cloud sandboxes',
      'DICT-verified micro-credential certificate upon passing final capstone assessment',
      'Job placement matching assistance through DICT digital careers portal'
    ],
    eligibility: [
      'Open to all Filipinos with computer and internet access (students, jobseekers, OFWs, career shifters)'
    ],
    requirements: [
      'Valid email address and active PhilSys National ID / government ID for identity verification'
    ],
    applicationSteps: [
      'Register for a learner account at ilc-db.dict.gov.ph.',
      'Choose your track: Python Programming, Cybersecurity, Web Development, or Cloud Foundations.',
      'Complete video modules, hands-on lab exercises, and quizzes at your own pace.',
      'Download your digitally verifiable Certificate of Completion.'
    ]
  }
];
