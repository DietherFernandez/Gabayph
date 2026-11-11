export type CategoryType = 'trabaho' | 'serbisyo' | 'pera' | 'bayanihan' | 'aral' | 'kaligtasan';

export interface BaseItem {
  id: string;
  title: string;
  category: CategoryType;
  agency: string;
  agencyAcronym?: string;
  description: string;
  lastVerified: string;
  officialUrl?: string;
  isVerified: boolean;
  featured?: boolean;
}

export interface ServiceItem extends BaseItem {
  category: 'serbisyo';
  serviceType: 'identity' | 'civil_registry' | 'clearance' | 'business' | 'social_welfare' | 'health';
  requirements: string[];
  eligibility: string[];
  fees: string;
  processingTime: string;
  steps: string[];
  officeLocations: string[];
  onlineServiceAvailable: boolean;
  onlineServiceUrl?: string;
}

export interface JobItem extends BaseItem {
  category: 'trabaho';
  employmentType: 'full-time' | 'part-time' | 'government' | 'contractual' | 'internship';
  location: string;
  salaryRange: string;
  vacancies: number;
  qualifications: string[];
  requirements: string[];
  deadline: string;
  howToApply: string[];
  contactEmail?: string;
  sector: 'public' | 'private' | 'ngo';
}

export interface FinancialAssistanceItem extends BaseItem {
  category: 'pera';
  assistanceType: 'cash_grant' | 'loan' | 'subsidy' | 'pension' | 'emergency_aid';
  amountOrCoverage: string;
  targetBeneficiaries: string[];
  eligibilityCriteria: string[];
  requiredDocuments: string[];
  applicationSteps: string[];
  disbursementMode: string;
}

export interface BayanihanItem extends BaseItem {
  category: 'bayanihan';
  programType: 'volunteer' | 'donation' | 'community_pantry' | 'disaster_relief' | 'advocacy';
  organization: string;
  targetBeneficiaries: string;
  location: string;
  contactPerson: string;
  contactNumber: string;
  dates: string;
  requirements: string[];
  howToParticipate: string[];
  volunteersNeeded?: number;
}

export interface EducationItem extends BaseItem {
  category: 'aral';
  educationType: 'scholarship' | 'tvet' | 'subsidy' | 'free_course' | 'voucher';
  educationalLevel: 'secondary' | 'vocational' | 'tertiary' | 'post-graduate' | 'all';
  benefits: string[];
  eligibility: string[];
  requirements: string[];
  deadline: string;
  applicationSteps: string[];
}

export interface EmergencyResourceItem extends BaseItem {
  category: 'kaligtasan';
  resourceType: 'hotline' | 'evacuation' | 'disaster_guide' | 'first_aid';
  hotlineNumber?: string;
  alternateNumber?: string;
  coverage: string;
  operatingHours: string;
  address?: string;
  capacity?: string;
  actionProtocol?: string[];
  isNationalHotline?: boolean;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  sourceAgency: string;
  agencyAcronym: string;
  datePublished: string;
  urgent: boolean;
  category: CategoryType | 'general';
  affectedAreas?: string[];
  relatedLink?: string;
}

export interface UserNotification {
  id: string;
  title: string;
  message: string;
  category: CategoryType | 'system';
  date: string;
  isRead: boolean;
  actionUrl?: string;
}

export interface CitizenReport {
  id: string;
  targetId: string;
  targetTitle: string;
  reportType: 'incorrect_info' | 'outdated_link' | 'wrong_fee' | 'abuse' | 'other';
  details: string;
  reporterEmail?: string;
  submittedAt: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
}

export interface ServiceSuggestion {
  id: string;
  serviceName: string;
  agencyName: string;
  description: string;
  sourceUrl?: string;
  submittedBy?: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface VolunteerApplication {
  id: string;
  programId: string;
  programTitle: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  skills: string;
  availability: string;
  submittedAt: string;
  status: 'submitted' | 'under_review' | 'accepted';
}

export interface ContactSubmission {
  id: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  province: string;
  avatarUrl: string;
  role: 'citizen' | 'admin';
  notificationsEnabled: boolean;
  emailAlertsEnabled: boolean;
  emergencyAlertsEnabled: boolean;
  preferredCategories: CategoryType[];
}

export interface ActivityLogItem {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  entityType: string;
  entityId: string;
  status: 'success' | 'warning' | 'info';
}
