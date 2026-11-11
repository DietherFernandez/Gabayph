import { FinancialAssistanceItem } from '../types';

export const INITIAL_ASSISTANCE: FinancialAssistanceItem[] = [
  {
    id: 'ast-aics-dswd',
    title: 'Assistance to Individuals in Crisis Situations (AICS)',
    category: 'pera',
    agency: 'Department of Social Welfare and Development',
    agencyAcronym: 'DSWD',
    description: 'A social safety net providing immediate financial assistance, medical subsidies, burial support, transportation grants, and educational emergency aid to indigent families and individuals facing unforeseen crisis.',
    lastVerified: 'November 2026',
    officialUrl: 'https://www.dswd.gov.ph/aics',
    isVerified: true,
    featured: true,
    assistanceType: 'emergency_aid',
    amountOrCoverage: '₱1,000 to ₱10,000 outright cash grant; up to ₱50,000 guarantee letter for hospital bills',
    disbursementMode: 'Direct Cash Payout at DSWD Crisis Intervention Unit (CIU) or Guarantee Letter (GL)',
    targetBeneficiaries: [
      'Indigent families experiencing sudden medical emergencies or loss of breadwinner',
      'Displaced informal sector workers',
      'Families requiring burial or emergency transportation assistance'
    ],
    eligibilityCriteria: [
      'Filipino citizen currently undergoing socioeconomic distress or crisis',
      'Assessed by a licensed DSWD Social Worker through Case Study Evaluation',
      'No concurrent overlapping national cash grant for the exact same medical bill'
    ],
    requiredDocuments: [
      'Barangay Certificate of Indigency (specifying purpose: DSWD AICS)',
      'One (1) valid government photo ID of the claimant and patient',
      'For Medical: Medical Certificate / Clinical Abstract + Hospital Statement of Account or Pharmacy Prescription',
      'For Funeral: Certified Death Certificate + Funeral Contract Statement of Account',
      'For Transportation: Barangay Endorsement or Police Blotter (for stranded individuals)'
    ],
    applicationSteps: [
      'Visit the nearest DSWD Crisis Intervention Unit (CIU) or Satellite Office in your city/province.',
      'Undergo document screening and queue for Social Worker interview.',
      'Undergo intake assessment where social worker evaluates economic distress and determines grant amount.',
      'Receive official Assessment Slip and Cash Voucher or Hospital Guarantee Letter (GL).',
      'Claim cash payout at the DSWD Disbursing Officer window or present GL to accredited hospital billing.'
    ]
  },
  {
    id: 'ast-tupad-dole',
    title: 'Tulong Panghanapbuhay sa Ating Disadvantaged/Displaced Workers (TUPAD)',
    category: 'pera',
    agency: 'Department of Labor and Employment',
    agencyAcronym: 'DOLE',
    description: 'A community-based emergency employment package providing temporary wage employment for displaced, underemployed, and seasonal workers for 10 to 30 days of community work.',
    lastVerified: 'October 2026',
    officialUrl: 'https://www.dole.gov.ph',
    isVerified: true,
    featured: true,
    assistanceType: 'cash_grant',
    amountOrCoverage: 'Prevailing Regional Minimum Daily Wage (₱400 to ₱610 per day depending on region) + GSIS Accident Insurance',
    disbursementMode: 'Electronic money remittance (Palawan Express / MLhuillier) or direct bank transfer',
    targetBeneficiaries: [
      'Displaced workers due to natural calamities or business closures',
      'Underemployed informal sector workers (tricycle drivers, street vendors, farm hands)',
      'Sub-minimum wage earners not covered by regular social security'
    ],
    eligibilityCriteria: [
      'At least 18 years of age and physically capable of performing community tasks',
      'Not a registered 4Ps beneficiary (to avoid duplication of government cash grants)',
      'One beneficiary per household limit per program cycle'
    ],
    requiredDocuments: [
      'Photocopy of valid Government ID (with birthdate)',
      'Barangay Certification of displacement / informal worker status',
      'Duly filled DOLE TUPAD Application Profile form'
    ],
    applicationSteps: [
      'Inquire with your Local Government Unit (LGU) Public Employment Service Office (PESO) or Barangay Captain.',
      'Register your name during the official community profiling drive.',
      'Attend the DOLE TUPAD Orientation on occupational safety and receive your PPE (TUPAD shirt, hat, gloves).',
      'Render 10 to 30 days of designated community cleaning, agro-forestry, or repair services.',
      'Claim your full emergency wages at accredited remittance centers using the transaction code sent to your phone.'
    ]
  },
  {
    id: 'ast-4ps-dswd',
    title: 'Pantawid Pamilyang Pilipino Program (4Ps)',
    category: 'pera',
    agency: 'Department of Social Welfare and Development',
    agencyAcronym: 'DSWD',
    description: 'The national human development conditional cash transfer program investing in health, nutrition, and education of poor households with children aged 0–18 and pregnant mothers.',
    lastVerified: 'November 2026',
    officialUrl: 'https://pantawid.dswd.gov.ph',
    isVerified: true,
    featured: true,
    assistanceType: 'cash_grant',
    amountOrCoverage: 'Health grant ₱750/month + Education grant up to ₱700/child/month + Rice subsidy ₱600/month',
    disbursementMode: 'Land Bank of the Philippines (LBP) 4Ps Cash Card biometric ATM withdrawal',
    targetBeneficiaries: [
      'Identified poorest households through the National Household Targeting System for Poverty Reduction (Listahanan)'
    ],
    eligibilityCriteria: [
      'Identified as poor in the official DSWD Listahanan database',
      'Household with pregnant members or children 0 to 18 years old',
      'Commitment to fulfill conditionalities (85% school attendance, regular health center visits, monthly Family Development Sessions)'
    ],
    requiredDocuments: [
      'DSWD Household Assessment verification slip',
      'Birth certificates of all registered school-age children',
      'Land Bank 4Ps Cash Card application forms'
    ],
    applicationSteps: [
      'Beneficiaries are selected systematically through DSWD nationwide Listahanan surveys (no direct walk-in application).',
      'Community assembly validates listed household roster in the barangay.',
      'Household head attends community orientation and signs Oath of Commitment.',
      'Land Bank opens individual biometric Cash Card accounts for each mother/grantee.',
      'Bi-monthly conditional cash grants disbursed upon compliance monitoring verification.'
    ]
  },
  {
    id: 'ast-sss-calamity',
    title: 'SSS Calamity Loan Assistance Package (CLAP)',
    category: 'pera',
    agency: 'Social Security System',
    agencyAcronym: 'SSS',
    description: 'Financial loan support for active SSS members residing in provinces, cities, or municipalities officially declared under a State of Calamity by the National Disaster Risk Reduction and Management Council (NDRRMC).',
    lastVerified: 'November 2026',
    officialUrl: 'https://www.sss.gov.ph',
    isVerified: true,
    assistanceType: 'loan',
    amountOrCoverage: 'Equivalent to one (1) Monthly Salary Credit (MSC), payable in 24 equal monthly installments with low 10% annual interest',
    disbursementMode: 'Direct credit to member\'s registered UMID-ATM or PESONet-participating bank account',
    targetBeneficiaries: [
      'Employed, self-employed, voluntary, and OFW SSS members affected by natural disasters'
    ],
    eligibilityCriteria: [
      'Must have at least 36 monthly contributions, with 6 posted within the last 12 months prior to application',
      'Resident of an officially NDRRMC-declared calamity area',
      'No outstanding loans under SSS Loan Restructuring Program (LRP)'
    ],
    requiredDocuments: [
      'Barangay Certification of calamity residency (if residential address differs from SSS records)',
      'Active My.SSS member portal account with registered disbursement bank account'
    ],
    applicationSteps: [
      'Log in to My.SSS Portal (member.sss.gov.ph).',
      'Navigate to "E-Services" > "Apply for Calamity Loan".',
      'Review pre-filled contributions data and calculated maximum eligible loan amount.',
      'Confirm acceptance of terms and loan disclosure statement.',
      'Loan proceeds automatically credited to your registered bank account within 3–5 banking days.'
    ]
  },
  {
    id: 'ast-social-pension',
    title: 'Social Pension for Indigent Senior Citizens',
    category: 'pera',
    agency: 'National Commission of Senior Citizens (NCSC) / DSWD',
    agencyAcronym: 'NCSC-DSWD',
    description: 'Monthly stipend stipulated under Republic Act 11916 providing non-contributory pension to augment daily subsistence and medical needs of indigent Filipino elderly citizens.',
    lastVerified: 'November 2026',
    officialUrl: 'https://ncsc.gov.ph',
    isVerified: true,
    assistanceType: 'pension',
    amountOrCoverage: '₱1,000.00 per month (₱3,000.00 quarterly or ₱6,000.00 semi-annual cash payout)',
    disbursementMode: 'Special payout operations at Municipal/City Hall or direct home delivery for bedridden seniors',
    targetBeneficiaries: [
      'Indigent Filipino citizens aged 60 years and above'
    ],
    eligibilityCriteria: [
      'Filipino citizen at least 60 years of age',
      'Frail, sickly, or with disability',
      'No permanent source of income, pension from SSS, GSIS, PVAO, or regular financial support from relatives'
    ],
    requiredDocuments: [
      'Photocopy of OSCA Senior Citizen ID Card',
      'Certificate of Indigency from Barangay',
      'Social Pension Application Form certified by local Social Welfare Officer'
    ],
    applicationSteps: [
      'Visit your city/municipality Office for Senior Citizens Affairs (OSCA) or MSWDO.',
      'Submit the application form and documentary proof of age and economic status.',
      'Social workers conduct home visitation and validation check.',
      'Wait for inclusion in the validated Masterlist of Social Pensioners.',
      'Receive stipend during scheduled payout distributions.'
    ]
  }
];
