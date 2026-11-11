import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { MockStorage } from '../../data/mockStorage';
import { Modal } from '../common/Modal';
import { TextInput, Textarea, Select } from '../common/Input';
import { Button } from '../common/Button';

/* 1. REPORT INCORRECT INFORMATION MODAL */
export const ReportModal: React.FC = () => {
  const { reportModalItem, closeReportModal } = useApp();
  const { showToast } = useToast();

  const [reportType, setReportType] = useState<'wrong_fee' | 'outdated_link' | 'incorrect_info' | 'abuse' | 'other'>('incorrect_info');
  const [details, setDetails] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!reportModalItem) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.trim()) {
      setError('Please provide details regarding the incorrect information.');
      return;
    }
    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      MockStorage.submitReport({
        targetId: reportModalItem.id,
        targetTitle: reportModalItem.title,
        reportType,
        details,
        reporterEmail: email || undefined
      });
      showToast('Thank you for your report! Our moderation team will review this promptly.', 'success');
      setDetails('');
      setEmail('');
      closeReportModal();
    }, 500);
  };

  return (
    <Modal
      isOpen={Boolean(reportModalItem)}
      onClose={closeReportModal}
      title="Report Incorrect Information"
      subtitle={`Regarding: ${reportModalItem.title}`}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <Select
          label="Issue Category"
          required
          value={reportType}
          onChange={e => setReportType(e.target.value as any)}
          options={[
            { value: 'incorrect_info', label: 'Incorrect requirements or application steps' },
            { value: 'wrong_fee', label: 'Incorrect fee schedule or costs' },
            { value: 'outdated_link', label: 'Broken or outdated official agency link' },
            { value: 'abuse', label: 'Incorrect office location or obsolete information' },
            { value: 'other', label: 'Other feedback or factual correction' }
          ]}
        />

        <Textarea
          label="Correction Details"
          required
          rows={4}
          value={details}
          onChange={e => setDetails(e.target.value)}
          placeholder="Describe what information is inaccurate and provide the verified details..."
          error={error}
        />

        <TextInput
          label="Your Email (Optional for follow-up)"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="citizen@example.com"
          helperText="Used only to update you regarding the verification status of your report."
        />

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-ios-lightBorder dark:border-ios-darkBorder">
          <Button type="button" variant="secondary" onClick={closeReportModal}>
            Cancel
          </Button>
          <Button type="submit" variant="destructive" loading={loading}>
            Submit Report
          </Button>
        </div>
      </form>
    </Modal>
  );
};

/* 2. SUGGEST A GOVERNMENT SERVICE MODAL */
export const SuggestServiceModal: React.FC = () => {
  const { isSuggestModalOpen, closeSuggestModal } = useApp();
  const { showToast } = useToast();

  const [serviceName, setServiceName] = useState('');
  const [agencyName, setAgencyName] = useState('');
  const [description, setDescription] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!serviceName.trim()) errs.serviceName = 'Please enter the service or program name.';
    if (!agencyName.trim()) errs.agencyName = 'Please enter the responsible government agency.';
    if (!description.trim()) errs.description = 'Please provide a brief description of the service.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      MockStorage.submitSuggestion({
        serviceName,
        agencyName,
        description,
        sourceUrl: sourceUrl || undefined
      });
      showToast('Your suggestion has been submitted successfully!', 'success');
      setServiceName('');
      setAgencyName('');
      setDescription('');
      setSourceUrl('');
      closeSuggestModal();
    }, 500);
  };

  return (
    <Modal
      isOpen={isSuggestModalOpen}
      onClose={closeSuggestModal}
      title="Suggest a Public Service"
      subtitle="Help GabayPH expand the national government services directory"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <TextInput
          label="Service or Program Name"
          required
          value={serviceName}
          onChange={e => setServiceName(e.target.value)}
          placeholder="e.g. Solo Parent ID, Certificate of Indigency, etc."
          error={errors.serviceName}
        />

        <TextInput
          label="Government Agency or Local Government Office"
          required
          value={agencyName}
          onChange={e => setAgencyName(e.target.value)}
          placeholder="e.g. DSWD, Quezon City LGU, BIR, etc."
          error={errors.agencyName}
        />

        <Textarea
          label="Brief Service Overview"
          required
          rows={3}
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Who qualifies for this program and what assistance or service does it provide?"
          error={errors.description}
        />

        <TextInput
          label="Official Link or Citizen's Charter URL (Optional)"
          type="url"
          value={sourceUrl}
          onChange={e => setSourceUrl(e.target.value)}
          placeholder="https://..."
          helperText="Assists our editorial team in verifying requirements and procedures."
        />

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-ios-lightBorder dark:border-ios-darkBorder">
          <Button type="button" variant="secondary" onClick={closeSuggestModal}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={loading}>
            Submit Suggestion
          </Button>
        </div>
      </form>
    </Modal>
  );
};

/* 3. VOLUNTEER REGISTRATION MODAL */
export const VolunteerModal: React.FC = () => {
  const { volunteerProgramModal, closeVolunteerModal, user } = useApp();
  const { showToast } = useToast();

  const [fullName, setFullName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [city, setCity] = useState(user.city || '');
  const [skills, setSkills] = useState('');
  const [availability, setAvailability] = useState('Weekends (Saturday / Sunday)');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!volunteerProgramModal) return null;

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required.';
    if (!email.trim()) errs.email = 'Email address is required.';
    if (!phone.trim()) errs.phone = 'Contact number is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      MockStorage.submitVolunteerApp({
        programId: volunteerProgramModal.id,
        programTitle: volunteerProgramModal.title,
        fullName,
        email,
        phone,
        city,
        skills,
        availability
      });
      showToast('Thank you for your bayanihan spirit! Your registration has been received.', 'success');
      closeVolunteerModal();
    }, 600);
  };

  return (
    <Modal
      isOpen={Boolean(volunteerProgramModal)}
      onClose={closeVolunteerModal}
      title="Register as a Volunteer"
      subtitle={volunteerProgramModal.title}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        <TextInput
          label="Full Name"
          required
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          placeholder="First and Last Name"
          error={errors.fullName}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <TextInput
            label="Email Address"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="citizen@example.com"
            error={errors.email}
          />
          <TextInput
            label="Mobile Number"
            required
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="0917-xxx-xxxx"
            error={errors.phone}
          />
        </div>

        <TextInput
          label="City / Municipality"
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="e.g. Quezon City, Cebu City"
        />

        <Select
          label="Volunteer Availability"
          value={availability}
          onChange={e => setAvailability(e.target.value)}
          options={[
            { value: 'Weekends (Saturday / Sunday)', label: 'Weekends (Saturday / Sunday)' },
            { value: 'Weekdays (Monday – Friday)', label: 'Weekdays (Monday – Friday)' },
            { value: 'Emergency Callout Anytime', label: 'Ready for emergency disaster callouts' },
            { value: 'Remote / Digital Coordination', label: 'Remote / digital volunteer tasks only' }
          ]}
        />

        <Textarea
          label="Skills or Relevant Background (Optional)"
          rows={2}
          value={skills}
          onChange={e => setSkills(e.target.value)}
          placeholder="e.g. CPR/First aid certified, nurse, teacher, licensed driver, logistics packer..."
        />

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-ios-lightBorder dark:border-ios-darkBorder">
          <Button type="button" variant="secondary" onClick={closeVolunteerModal}>
            Cancel
          </Button>
          <Button type="submit" variant="green" loading={loading}>
            Confirm Volunteer Registration
          </Button>
        </div>
      </form>
    </Modal>
  );
};

/* 4. CONTACT GABAYPH SUPPORT MODAL */
export const ContactModal: React.FC = () => {
  const { isContactModalOpen, closeContactModal } = useApp();
  const { showToast } = useToast();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required.';
    if (!email.trim()) errs.email = 'Email address is required.';
    if (!subject.trim()) errs.subject = 'Subject is required.';
    if (!message.trim()) errs.message = 'Message content is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      MockStorage.submitContact({ fullName, email, subject, message });
      showToast('Your message has been sent to the GabayPH support team!', 'success');
      setFullName('');
      setEmail('');
      setSubject('');
      setMessage('');
      closeContactModal();
    }, 500);
  };

  return (
    <Modal
      isOpen={isContactModalOpen}
      onClose={closeContactModal}
      title="Contact GabayPH Support"
      subtitle="Have questions, inquiries, or feedback regarding the public portal?"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        <TextInput
          label="Your Full Name"
          required
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          placeholder="Juan Dela Cruz"
          error={errors.fullName}
        />

        <TextInput
          label="Email Address"
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="citizen@example.com"
          error={errors.email}
        />

        <TextInput
          label="Subject"
          required
          value={subject}
          onChange={e => setSubject(e.target.value)}
          placeholder="e.g. Question regarding LTO Driver's License requirements"
          error={errors.subject}
        />

        <Textarea
          label="Message"
          required
          rows={3}
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type your question, suggestion, or feedback here..."
          error={errors.message}
        />

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-ios-lightBorder dark:border-ios-darkBorder">
          <Button type="button" variant="secondary" onClick={closeContactModal}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={loading}>
            Send Message
          </Button>
        </div>
      </form>
    </Modal>
  );
};
