import React, { useState } from 'react';
import { BaseItem, CategoryType, AnnouncementItem, ServiceItem, JobItem, FinancialAssistanceItem, EducationItem, BayanihanItem, EmergencyResourceItem } from '../../types';
import { MockStorage } from '../../data/mockStorage';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../common/Modal';
import { TextInput, Textarea } from '../common/Input';
import { IOSSelect } from '../common/IOSSelect';

export type AdminRecordCategory = CategoryType | 'announcements';

interface AdminRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  initialCategory?: AdminRecordCategory;
  initialItem?: BaseItem | AnnouncementItem | null;
}

interface RecordFormInnerProps {
  initialCategory: AdminRecordCategory;
  initialItem: BaseItem | AnnouncementItem | null;
  onClose: () => void;
  onSaved: () => void;
}

const RecordFormInner: React.FC<RecordFormInnerProps> = ({
  initialCategory,
  initialItem,
  onClose,
  onSaved
}) => {
  const { showToast } = useToast();

  const [category, setCategory] = useState<AdminRecordCategory>(() => {
    if (initialItem) {
      if ('agency' in initialItem) return initialItem.category;
      return 'announcements';
    }
    return initialCategory;
  });

  const [title, setTitle] = useState(() => initialItem?.title || '');
  const [agency, setAgency] = useState(() => {
    if (initialItem) {
      if ('agency' in initialItem) return initialItem.agency || '';
      if ('sourceAgency' in initialItem) return initialItem.sourceAgency || '';
    }
    return 'Department of Public Works and Highways';
  });
  const [agencyAcronym, setAgencyAcronym] = useState(() => {
    if (initialItem) {
      if ('agencyAcronym' in initialItem) return initialItem.agencyAcronym || '';
    }
    return 'DPWH';
  });
  const [description, setDescription] = useState(() => {
    if (initialItem) {
      if ('description' in initialItem) return initialItem.description || '';
      if ('content' in initialItem) return initialItem.content || '';
    }
    return '';
  });
  const [officialUrl, setOfficialUrl] = useState(() => {
    if (initialItem) {
      if ('officialUrl' in initialItem) return initialItem.officialUrl || 'https://gov.ph';
      if ('relatedLink' in initialItem) return initialItem.relatedLink || 'https://gov.ph';
    }
    return 'https://gov.ph';
  });

  // Category specific fields
  const [fees, setFees] = useState(() => {
    if (initialItem && 'fees' in initialItem) return (initialItem as ServiceItem).fees || 'Free (₱0.00)';
    return 'Free (₱0.00)';
  });
  const [processingTime, setProcessingTime] = useState(() => {
    if (initialItem && 'processingTime' in initialItem) return (initialItem as ServiceItem).processingTime || '1 to 3 working days';
    return '3 to 5 working days';
  });
  const [salaryRange, setSalaryRange] = useState(() => {
    if (initialItem && 'salaryRange' in initialItem) return (initialItem as JobItem).salaryRange || '₱35,000 - ₱48,000 / month';
    return '₱32,000 - ₱45,000 / month (SG-14)';
  });
  const [location, setLocation] = useState(() => {
    if (initialItem && 'location' in initialItem) return (initialItem as any).location || 'Metro Manila';
    return 'Metro Manila';
  });
  const [vacancies, setVacancies] = useState(() => {
    if (initialItem && 'vacancies' in initialItem) return String((initialItem as JobItem).vacancies || '1');
    return '2';
  });
  const [deadline, setDeadline] = useState(() => {
    if (initialItem && 'deadline' in initialItem) return (initialItem as any).deadline || 'December 31, 2026';
    return 'December 31, 2026';
  });
  const [amountOrCoverage, setAmountOrCoverage] = useState(() => {
    if (initialItem && 'amountOrCoverage' in initialItem) return (initialItem as FinancialAssistanceItem).amountOrCoverage || '₱10,000';
    return 'Up to ₱10,000 assistance';
  });
  const [disbursementMode, setDisbursementMode] = useState(() => {
    if (initialItem && 'disbursementMode' in initialItem) return (initialItem as FinancialAssistanceItem).disbursementMode || 'Cash Payout';
    return 'Direct bank transfer or payout center';
  });
  const [educationLevel, setEducationLevel] = useState(() => {
    if (initialItem && 'educationalLevel' in initialItem) return (initialItem as EducationItem).educationalLevel || 'tertiary';
    return 'tertiary';
  });
  const [volunteersNeeded, setVolunteersNeeded] = useState(() => {
    if (initialItem && 'volunteersNeeded' in initialItem) return String((initialItem as BayanihanItem).volunteersNeeded || '20');
    return '20';
  });
  const [hotlineNumber, setHotlineNumber] = useState(() => {
    if (initialItem && 'hotlineNumber' in initialItem) return (initialItem as EmergencyResourceItem).hotlineNumber || '911';
    return '911';
  });
  const [operatingHours, setOperatingHours] = useState(() => {
    if (initialItem && 'operatingHours' in initialItem) return (initialItem as EmergencyResourceItem).operatingHours || '24/7 round-the-clock';
    return '24/7 round-the-clock';
  });
  const [isUrgent, setIsUrgent] = useState(() => {
    if (initialItem && 'urgent' in initialItem) return (initialItem as AnnouncementItem).urgent || false;
    return false;
  });
  const [affectedAreas, setAffectedAreas] = useState(() => {
    if (initialItem && 'affectedAreas' in initialItem) return ((initialItem as AnnouncementItem).affectedAreas || []).join(', ');
    return 'Nationwide';
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Please provide a record title.', 'error');
      return;
    }
    if (!agency.trim()) {
      showToast('Please specify the responsible government agency.', 'error');
      return;
    }

    if (category === 'announcements') {
      const bulletinItem: AnnouncementItem = {
        id: initialItem ? initialItem.id : `anc-${Date.now()}`,
        title,
        summary: description.slice(0, 140) + '...',
        content: description,
        sourceAgency: agency,
        agencyAcronym: agencyAcronym || 'GOV',
        datePublished: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        urgent: isUrgent,
        category: 'general',
        affectedAreas: affectedAreas.split(',').map(s => s.trim()).filter(Boolean),
        relatedLink: officialUrl
      };

      if (initialItem) {
        MockStorage.updateItem(bulletinItem);
        showToast(`Updated public bulletin: ${title}`, 'success');
      } else {
        MockStorage.addItem(bulletinItem);
        showToast(`Published public bulletin: ${title}`, 'success');
      }
    } else {
      const base: BaseItem = {
        id: initialItem ? initialItem.id : `mock-${category}-${Date.now()}`,
        title,
        category,
        agency,
        agencyAcronym: agencyAcronym || 'GOV',
        description,
        lastVerified: 'November 2026',
        officialUrl: officialUrl || 'https://gov.ph',
        isVerified: true
      };

      if (category === 'serbisyo') {
        const item: ServiceItem = {
          ...base,
          category: 'serbisyo',
          serviceType: 'identity',
          requirements: ['Valid Philippine Government ID', 'Barangay Clearance or Proof of Address', 'Birth Certificate (if required)'],
          eligibility: ['All Filipino citizens of legal age', 'Resident of local municipality'],
          fees,
          processingTime,
          steps: ['Submit online application or visit designated office.', 'Present required supporting documents for verification.', 'Claim document or receipt upon completion.'],
          officeLocations: ['Regional & Provincial Field Offices Nationwide'],
          onlineServiceAvailable: true,
          onlineServiceUrl: officialUrl
        };
        if (initialItem) MockStorage.updateItem(item);
        else MockStorage.addItem(item);
      } else if (category === 'trabaho') {
        const item: JobItem = {
          ...base,
          category: 'trabaho',
          employmentType: 'government',
          location,
          salaryRange,
          vacancies: parseInt(vacancies, 10) || 1,
          qualifications: ["Bachelor's Degree relevant to the job", 'Career Service (Professional) / Second Level Eligibility'],
          requirements: ['Updated Personal Data Sheet (CS Form No. 212)', 'Transcript of Records', 'Certificate of Eligibility'],
          deadline,
          howToApply: ['Submit credentials via official government agency careers portal.', 'Undergo examination and panel interview.'],
          sector: 'public'
        };
        if (initialItem) MockStorage.updateItem(item);
        else MockStorage.addItem(item);
      } else if (category === 'pera') {
        const item: FinancialAssistanceItem = {
          ...base,
          category: 'pera',
          assistanceType: 'emergency_aid',
          amountOrCoverage,
          targetBeneficiaries: ['Indigent families', 'Displaced workers', 'Vulnerable sectors'],
          eligibilityCriteria: ['Certificate of Indigency from local Barangay', 'Valid Government Issued ID'],
          requiredDocuments: ['Barangay Indigency Certificate', 'Social Case Study or Assessment'],
          applicationSteps: ['Intake interview at local social welfare office.', 'Assessment and payout release.'],
          disbursementMode
        };
        if (initialItem) MockStorage.updateItem(item);
        else MockStorage.addItem(item);
      } else if (category === 'aral') {
        const item: EducationItem = {
          ...base,
          category: 'aral',
          educationType: 'scholarship',
          educationalLevel: educationLevel as any,
          benefits: ['Full tuition subsidy', 'Monthly living allowance', 'Book allowance'],
          eligibility: ['Filipino citizen', 'Natural-born Filipino of good moral character', 'Academic honors or qualified exam score'],
          requirements: ['Form 137 / 138 report card', 'Income tax return of parents'],
          deadline,
          applicationSteps: ['Submit online scholarship portal application.', 'Take qualifying examination.']
        };
        if (initialItem) MockStorage.updateItem(item);
        else MockStorage.addItem(item);
      } else if (category === 'bayanihan') {
        const item: BayanihanItem = {
          ...base,
          category: 'bayanihan',
          programType: 'volunteer',
          organization: agency,
          targetBeneficiaries: 'Underprivileged community members and relief recipients',
          location,
          contactPerson: 'Volunteer Coordination Desk',
          contactNumber: '0917-888-2026',
          dates: 'Saturdays and Sundays',
          requirements: ['At least 18 years old or with parental consent', 'Commitment to community service'],
          howToParticipate: ['Sign up via volunteer application form.', 'Attend orientation briefing.'],
          volunteersNeeded: parseInt(volunteersNeeded, 10) || 10
        };
        if (initialItem) MockStorage.updateItem(item);
        else MockStorage.addItem(item);
      } else if (category === 'kaligtasan') {
        const item: EmergencyResourceItem = {
          ...base,
          category: 'kaligtasan',
          resourceType: 'hotline',
          hotlineNumber,
          alternateNumber: '117',
          coverage: 'Nationwide 24/7',
          operatingHours,
          isNationalHotline: true
        };
        if (initialItem) MockStorage.updateItem(item);
        else MockStorage.addItem(item);
      }

      if (initialItem) {
        showToast(`Updated record: ${title}`, 'success');
      } else {
        showToast(`Created record: ${title}`, 'success');
      }
    }

    onSaved();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-[13px]">
      {/* Category Picker */}
      <IOSSelect
        label="Record Category"
        disabled={!!initialItem}
        value={category}
        onChange={val => setCategory(val as AdminRecordCategory)}
        size="md"
        options={[
          { value: 'serbisyo', label: 'Public Services (Serbisyo)' },
          { value: 'trabaho', label: 'Careers & Jobs (Trabaho)' },
          { value: 'pera', label: 'Financial Assistance (Pera)' },
          { value: 'aral', label: 'Education & TVET (Aral)' },
          { value: 'bayanihan', label: 'Community Programs (Bayanihan)' },
          { value: 'kaligtasan', label: 'Safety & Hotlines (Kaligtasan)' },
          { value: 'announcements', label: 'Public Bulletins & Advisories' },
        ]}
      />

      {/* Title */}
      <TextInput
        label="Title of Record or Service"
        required
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="e.g. PhilHealth Member Registration, DOST-SEI Scholarship..."
      />

      {/* Agency and Acronym */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2">
          <TextInput
            label="Responsible Government Agency / Entity"
            required
            value={agency}
            onChange={e => setAgency(e.target.value)}
            placeholder="e.g. Department of Social Welfare and Development"
          />
        </div>
        <div>
          <TextInput
            label="Agency Acronym"
            value={agencyAcronym}
            onChange={e => setAgencyAcronym(e.target.value)}
            placeholder="e.g. DSWD"
          />
        </div>
      </div>

      {/* Description / Content */}
      <Textarea
        label="Description / Citizen's Charter Summary"
        required
        rows={3}
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Key service objectives, who can apply, and citizen instructions..."
      />

      {/* Category-Specific Form Fields Inset Group */}
      {category === 'serbisyo' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-[12px] bg-black/[0.02] dark:bg-white/[0.03] border border-[rgba(60,60,67,0.12)] dark:border-[rgba(84,84,88,0.3)]">
          <TextInput
            label="Processing Fees"
            value={fees}
            onChange={e => setFees(e.target.value)}
            placeholder="Free or ₱100.00"
          />
          <TextInput
            label="Processing Time"
            value={processingTime}
            onChange={e => setProcessingTime(e.target.value)}
            placeholder="1 to 3 working days"
          />
        </div>
      )}

      {category === 'trabaho' && (
        <div className="space-y-3 p-3.5 rounded-[12px] bg-black/[0.02] dark:bg-white/[0.03] border border-[rgba(60,60,67,0.12)] dark:border-[rgba(84,84,88,0.3)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <TextInput
              label="Salary Range / Schedule"
              value={salaryRange}
              onChange={e => setSalaryRange(e.target.value)}
              placeholder="₱30,000 - ₱45,000 / month"
            />
            <TextInput
              label="Application Deadline"
              value={deadline}
              onChange={e => setDeadline(e.target.value)}
              placeholder="December 31, 2026"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <TextInput
              label="Duty Station / Location"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="Quezon City, Metro Manila"
            />
            <TextInput
              label="Available Vacancies"
              type="number"
              value={vacancies}
              onChange={e => setVacancies(e.target.value)}
              placeholder="1"
            />
          </div>
        </div>
      )}

      {category === 'pera' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-[12px] bg-black/[0.02] dark:bg-white/[0.03] border border-[rgba(60,60,67,0.12)] dark:border-[rgba(84,84,88,0.3)]">
          <TextInput
            label="Amount or Coverage"
            value={amountOrCoverage}
            onChange={e => setAmountOrCoverage(e.target.value)}
            placeholder="₱5,000 - ₱10,000 outright grant"
          />
          <TextInput
            label="Disbursement Mode"
            value={disbursementMode}
            onChange={e => setDisbursementMode(e.target.value)}
            placeholder="Landbank / ATM or Cash Payout"
          />
        </div>
      )}

      {category === 'aral' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-[12px] bg-black/[0.02] dark:bg-white/[0.03] border border-[rgba(60,60,67,0.12)] dark:border-[rgba(84,84,88,0.3)]">
          <TextInput
            label="Academic Level"
            value={educationLevel}
            onChange={e => setEducationLevel(e.target.value as any)}
            placeholder="tertiary, vocational, secondary"
          />
          <TextInput
            label="Application Deadline"
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
            placeholder="December 15, 2026"
          />
        </div>
      )}

      {category === 'bayanihan' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-[12px] bg-black/[0.02] dark:bg-white/[0.03] border border-[rgba(60,60,67,0.12)] dark:border-[rgba(84,84,88,0.3)]">
          <TextInput
            label="Volunteer Target Count"
            type="number"
            value={volunteersNeeded}
            onChange={e => setVolunteersNeeded(e.target.value)}
            placeholder="20"
          />
          <TextInput
            label="Program Location"
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="Metro Manila"
          />
        </div>
      )}

      {category === 'kaligtasan' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-[12px] bg-black/[0.02] dark:bg-white/[0.03] border border-[rgba(60,60,67,0.12)] dark:border-[rgba(84,84,88,0.3)]">
          <TextInput
            label="Emergency Hotline Number"
            value={hotlineNumber}
            onChange={e => setHotlineNumber(e.target.value)}
            placeholder="911"
          />
          <TextInput
            label="Operating Hours"
            value={operatingHours}
            onChange={e => setOperatingHours(e.target.value)}
            placeholder="24/7 round-the-clock"
          />
        </div>
      )}

      {category === 'announcements' && (
        <div className="space-y-3 p-3.5 rounded-[12px] bg-[rgba(255,149,0,0.06)] dark:bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)]">
          <TextInput
            label="Affected Geographical Areas"
            value={affectedAreas}
            onChange={e => setAffectedAreas(e.target.value)}
            placeholder="e.g. NCR, Region III, Region IV-A"
          />
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isUrgent}
              onChange={e => setIsUrgent(e.target.checked)}
              className="rounded accent-[#FF3B30] h-4 w-4 cursor-pointer"
            />
            <span className="font-semibold text-[13px] text-[#FF3B30]">
              Mark as URGENT Advisory (Public Safety / Emergency Priority)
            </span>
          </label>
        </div>
      )}

      {/* Official URL */}
      <TextInput
        label="Official Agency Portal / Source URL"
        type="url"
        value={officialUrl}
        onChange={e => setOfficialUrl(e.target.value)}
        placeholder="https://..."
      />

      {/* Modal Actions */}
      <div className="flex items-center justify-end gap-2 pt-3 border-t border-[rgba(60,60,67,0.1)] dark:border-[rgba(84,84,88,0.3)]">
        <button
          type="button"
          onClick={onClose}
          className="h-9 px-4 rounded-[10px] bg-[rgba(118,118,128,0.12)] dark:bg-[rgba(118,118,128,0.24)] hover:bg-[rgba(118,118,128,0.2)] text-black dark:text-white text-[13px] font-medium transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="h-9 px-4 rounded-[10px] bg-[#007AFF] hover:bg-blue-600 active:scale-[0.98] text-white text-[13px] font-semibold shadow-2xs transition-all cursor-pointer"
        >
          {initialItem ? 'Save Changes' : 'Publish Record'}
        </button>
      </div>
    </form>
  );
};

export const AdminRecordModal: React.FC<AdminRecordModalProps> = ({
  isOpen,
  onClose,
  onSaved,
  initialCategory = 'serbisyo',
  initialItem = null
}) => {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialItem ? `Edit Administrative Record` : `Create New Administrative Record`}
      maxWidth="lg"
    >
      <RecordFormInner
        key={initialItem ? initialItem.id : `new-${initialCategory}`}
        initialCategory={initialCategory}
        initialItem={initialItem}
        onClose={onClose}
        onSaved={onSaved}
      />
    </Modal>
  );
};
