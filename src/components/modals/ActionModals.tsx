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
      setError('Pakilahad ang mga detalye ng maling impormasyon.');
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
      showToast('Salamat sa iyong ulat! Susuriin ito ng aming moderation team.', 'success');
      setDetails('');
      setEmail('');
      closeReportModal();
    }, 500);
  };

  return (
    <Modal
      isOpen={Boolean(reportModalItem)}
      onClose={closeReportModal}
      title="I-ulat ang Maling Impormasyon"
      subtitle={`Tungkol sa: ${reportModalItem.title}`}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <Select
          label="Uri ng Isyu"
          required
          value={reportType}
          onChange={e => setReportType(e.target.value as any)}
          options={[
            { value: 'incorrect_info', label: 'Maling hakbang o requirements' },
            { value: 'wrong_fee', label: 'Maling bayarin o presyo' },
            { value: 'outdated_link', label: 'Sira o hindi na gumaganang official website' },
            { value: 'abuse', label: 'Maling sangay o hindi awtorisadong impormasyon' },
            { value: 'other', label: 'Iba pang puna o pagwawasto' }
          ]}
        />

        <Textarea
          label="Mga Detalye ng Pagwawasto"
          required
          rows={4}
          value={details}
          onChange={e => setDetails(e.target.value)}
          placeholder="Ilarawan kung ano ang maling impormasyon at kung ano ang tamang detalye..."
          error={error}
        />

        <TextInput
          label="Iyong Email (Opsyonal para sa update)"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="citizen@halimbawa.com"
          helperText="Gagamitin lamang upang ipagbigay-alam ang aksyon sa iyong ulat."
        />

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-ios-lightBorder dark:border-ios-darkBorder">
          <Button type="button" variant="secondary" onClick={closeReportModal}>
            Kanselahin
          </Button>
          <Button type="submit" variant="destructive" loading={loading}>
            Isumite ang Ulat
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
    if (!serviceName.trim()) errs.serviceName = 'Kailangang ilagay ang pangalan ng serbisyo.';
    if (!agencyName.trim()) errs.agencyName = 'Kailangang ilagay ang responsableng ahensya.';
    if (!description.trim()) errs.description = 'Pakilahad ang maikling paglalarawan ng serbisyo.';
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
      showToast('Matagumpay na naisumite ang iyong mungkahi!', 'success');
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
      title="Magmungkahi ng Bagong Serbisyo"
      subtitle="Tulungan ang GabayPH na mapalawak ang pampublikong direktoryo"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <TextInput
          label="Pangalan ng Serbisyo o Programa"
          required
          value={serviceName}
          onChange={e => setServiceName(e.target.value)}
          placeholder="hal. Solo Parent ID, Barangay Indigency, atbp."
          error={errors.serviceName}
        />

        <TextInput
          label="Ahensya ng Pamahalaan o Tanggapan"
          required
          value={agencyName}
          onChange={e => setAgencyName(e.target.value)}
          placeholder="hal. DSWD, LGU Quezon City, BIR, atbp."
          error={errors.agencyName}
        />

        <Textarea
          label="Maikling Paliwanag sa Serbisyo"
          required
          rows={3}
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Para kanino ang serbisyong ito at anong tulong ang naibibigay?"
          error={errors.description}
        />

        <TextInput
          label="Opisyal na Link / Website (Kung mayroon)"
          type="url"
          value={sourceUrl}
          onChange={e => setSourceUrl(e.target.value)}
          placeholder="https://..."
          helperText="Makakatulong upang mas mapadali ang pagsusuri ng datos."
        />

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-ios-lightBorder dark:border-ios-darkBorder">
          <Button type="button" variant="secondary" onClick={closeSuggestModal}>
            Kanselahin
          </Button>
          <Button type="submit" variant="primary" loading={loading}>
            Isumite ang Suhestiyon
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
  const [availability, setAvailability] = useState('Weekends (Sabado/Linggo)');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!volunteerProgramModal) return null;

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!fullName.trim()) errs.fullName = 'Kailangan ang buong pangalan.';
    if (!email.trim()) errs.email = 'Kailangan ang email address.';
    if (!phone.trim()) errs.phone = 'Kailangan ang numero ng telepono.';
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
      showToast('Salamat sa iyong pagbabayanihan! Natanggap ang iyong rehistrasyon.', 'success');
      closeVolunteerModal();
    }, 600);
  };

  return (
    <Modal
      isOpen={Boolean(volunteerProgramModal)}
      onClose={closeVolunteerModal}
      title="Magpatala Bilang Volunteer"
      subtitle={volunteerProgramModal.title}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        <TextInput
          label="Buong Pangalan"
          required
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          placeholder="Pangalan at Apelyido"
          error={errors.fullName}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <TextInput
            label="Email Address"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="email@halimbawa.com"
            error={errors.email}
          />
          <TextInput
            label="Contact Mobile"
            required
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="0917-xxx-xxxx"
            error={errors.phone}
          />
        </div>

        <TextInput
          label="Lungsod / Munisipyo"
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="hal. Quezon City, Cebu City"
        />

        <Select
          label="Kailan Ka Maaaring Mag-volunteer?"
          value={availability}
          onChange={e => setAvailability(e.target.value)}
          options={[
            { value: 'Weekends (Sabado/Linggo)', label: 'Tuwing Sabado o Linggo' },
            { value: 'Weekdays (Lunes–Biyernes)', label: 'Araw ng Lunes hanggang Biyernes' },
            { value: 'Emergency Callout Anytime', label: 'Handang tumugon sa emergency callouts' },
            { value: 'Remote / Online Support', label: 'Online / Digital coordination lamang' }
          ]}
        />

        <Textarea
          label="Kasanayan o Karanasan (Opsyonal)"
          rows={2}
          value={skills}
          onChange={e => setSkills(e.target.value)}
          placeholder="hal. First aid certified, teacher, driver, logistics packer..."
        />

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-ios-lightBorder dark:border-ios-darkBorder">
          <Button type="button" variant="secondary" onClick={closeVolunteerModal}>
            Kanselahin
          </Button>
          <Button type="submit" variant="green" loading={loading}>
            Kumpirmahin ang Rehistrasyon
          </Button>
        </div>
      </form>
    </Modal>
  );
};

/* 4. CONTACT GABAYPH MODAL */
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
    if (!fullName.trim()) errs.fullName = 'Kailangan ang pangalan.';
    if (!email.trim()) errs.email = 'Kailangan ang email address.';
    if (!subject.trim()) errs.subject = 'Kailangan ang paksa.';
    if (!message.trim()) errs.message = 'Kailangan ang mensahe.';
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
      showToast('Naihatid ang iyong mensahe sa GabayPH team!', 'success');
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
      title="Makipag-ugnayan sa GabayPH"
      subtitle="May katanungan, mungkahi, o tulong ukol sa portal?"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        <TextInput
          label="Iyong Pangalan"
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
          placeholder="juan@email.com"
          error={errors.email}
        />

        <TextInput
          label="Paksa"
          required
          value={subject}
          onChange={e => setSubject(e.target.value)}
          placeholder="hal. Pagtatanong ukol sa LTO requirements"
          error={errors.subject}
        />

        <Textarea
          label="Mensahe"
          required
          rows={3}
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Isulat dito ang iyong katanungan o puna..."
          error={errors.message}
        />

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-ios-lightBorder dark:border-ios-darkBorder">
          <Button type="button" variant="secondary" onClick={closeContactModal}>
            Kanselahin
          </Button>
          <Button type="submit" variant="primary" loading={loading}>
            Ipadala ang Mensahe
          </Button>
        </div>
      </form>
    </Modal>
  );
};
