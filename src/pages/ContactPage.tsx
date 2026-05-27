import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import {
  AlertCircle,
  CheckCircle2,
  Building2,
  ChevronDown,
  Clock3,
  FileText,
  FlaskConical,
  GraduationCap,
  Mail,
  MapPin,
  Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { db, isFirebaseConfigured } from '../firebase/config';

const departments = [
  {
    icon: Building2,
    title: "Dean's Office",
    lines: ['Building A, Room 104', 'ul. Warszawska 24, 31-155 Krakow'],
    phone: '+48 12 628 20 00',
    email: 'deansoffice@pk.edu.pl'
  },
  {
    icon: GraduationCap,
    title: 'Student Affairs',
    lines: ['Building B, Ground Floor', 'Recruitment & Scholarships'],
    phone: '+48 12 628 21 45',
    email: 'students@pk.edu.pl'
  }
];

const officeHours = [
  { label: 'Mon - Wed', value: '09:00 - 14:00' },
  { label: 'Thursday', value: 'Closed for Work', accent: true },
  { label: 'Friday', value: '10:00 - 13:00' },
  { label: 'Saturday (Part-time)', value: '08:00 - 12:00' }
];

const specialistContacts = [
  {
    icon: FileText,
    title: 'Media Inquiries',
    email: 'press@pk.edu.pl'
  },
  {
    icon: FlaskConical,
    title: 'Research Collaboration',
    email: 'research.it@pk.edu.pl'
  }
];

const subjectOptions = [
  'General Inquiry',
  'Admissions',
  'Research Collaboration',
  'Student Support'
];

const initialFormState = {
  fullName: '',
  email: '',
  subject: subjectOptions[0],
  message: '',
  privacyAccepted: false
};

export function ContactPage() {
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!isFirebaseConfigured) {
      setError('Firebase is not configured. Add the Vite Firebase environment variables before submitting inquiries.');
      return;
    }

    if (!formData.privacyAccepted) {
      setError('Please accept the privacy policy before sending your inquiry.');
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'contactSubmissions'), {
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        subject: formData.subject,
        message: formData.message.trim(),
        privacyAccepted: true,
        createdAt: serverTimestamp(),
        source: 'contact-page',
        status: 'new'
      });

      setFormData(initialFormState);
      setSuccessMessage('Your inquiry has been sent. The faculty team will review it shortly.');
    } catch (err: any) {
      console.error(err);

      if (err.code === 'permission-denied') {
        setError('Firestore rejected the write. Allow creates for contact submissions in your Firebase security rules or route the form through a trusted backend.');
      } else {
        setError('The inquiry could not be sent right now. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/faculty_hero.png"
            alt="Faculty campus"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#09285f]/88" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />
        </div>

        <div className="relative mx-auto flex min-h-[300px] w-full max-w-[1200px] items-center px-6 py-16 md:px-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.24em] text-white/55">
              <Link to="/" className="transition-colors hover:text-white/80">
                Home
              </Link>
              <span className="text-white/30">›</span>
              <span className="text-white">Contact</span>
            </div>

            <h1 className="mt-5 text-3xl font-bold tracking-tight text-white md:text-[40px]">
              Get in Touch
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-8 text-slate-300">
              Connect with the Faculty of Computer Science and Mathematics. We are here to
              support your academic journey and research inquiries.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid w-full max-w-[1200px] gap-6 lg:grid-cols-[minmax(0,1.95fr)_minmax(380px,1.08fr)]">
          <article className="rounded-[4px] border border-slate-200 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
            <div className="h-1 rounded-t-[4px] bg-[#4c6f10]" />
            <div className="grid gap-10 p-8 md:grid-cols-[minmax(0,1.05fr)_320px] md:p-12">
              <div>
                <h2 className="text-[15px] font-semibold text-slate-800">
                  Administration &amp; Support
                </h2>

                <div className="mt-10 space-y-8">
                  {departments.map((department) => {
                    const Icon = department.icon;

                    return (
                      <div key={department.title} className="flex gap-4">
                        <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-sm bg-[#b6f36f]/20 text-[#587d16]">
                          <Icon className="h-4.5 w-4.5" />
                        </div>

                        <div>
                          <h3 className="text-[14px] font-bold uppercase tracking-[0.08em] text-slate-700">
                            {department.title}
                          </h3>
                          <div className="mt-2 space-y-1 text-[15px] leading-7 text-slate-500">
                            {department.lines.map((line) => (
                              <p key={line}>{line}</p>
                            ))}
                          </div>
                          <div className="mt-3 flex items-center gap-2 text-[15px] font-bold text-slate-800">
                            <Phone className="h-4 w-4 text-slate-400" />
                            <span>{department.phone}</span>
                          </div>
                          <div className="mt-1 flex items-center gap-2 text-[15px] font-semibold text-[#6d9722]">
                            <Mail className="h-4 w-4 text-[#6d9722]" />
                            <a href={`mailto:${department.email}`} className="hover:text-[#57791c]">
                              {department.email}
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[4px] border border-slate-200 bg-[#f7f9fc] p-6 shadow-inner">
                <div className="flex items-center gap-3 text-slate-800">
                  <Clock3 className="h-5 w-5 text-slate-500" />
                  <h2 className="text-[13px] font-bold uppercase tracking-[0.14em]">
                    Office Hours
                  </h2>
                </div>

                <div className="mt-6 space-y-4">
                  {officeHours.map((row, index) => (
                    <div
                      key={row.label}
                      className={[
                        'flex items-center justify-between gap-6 text-[15px]',
                        index === officeHours.length - 1 ? '' : 'border-b border-slate-200/80 pb-4'
                      ].join(' ')}
                    >
                      <span className="text-slate-500">{row.label}</span>
                      <span className={row.accent ? 'font-bold text-[#cf3d33]' : 'font-bold text-slate-800'}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          <aside className="rounded-[18px] bg-[linear-gradient(145deg,#68696c,#56575a)] p-5 shadow-[0_24px_60px_rgba(15,23,42,0.18)] md:p-6">
            <div className="relative min-h-[500px] overflow-hidden rounded-[14px] bg-[linear-gradient(155deg,#66676a,#535457)] px-4 pt-10 md:min-h-[560px] md:px-6 md:pt-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_42%),linear-gradient(145deg,rgba(255,255,255,0.02),transparent_40%)]" />

              <div className="relative mx-auto h-[260px] w-[74%] max-w-[420px] overflow-hidden rounded-[42px] bg-[linear-gradient(180deg,#e7e7e7,#d5d5d5)] shadow-[0_18px_35px_rgba(15,23,42,0.18)] md:h-[290px]">
                <div className="absolute inset-0 opacity-70">
                  <div className="absolute left-[-6%] top-[20%] h-[2px] w-[42%] rotate-[49deg] bg-white/95" />
                  <div className="absolute left-[8%] top-[8%] h-[2px] w-[38%] rotate-[62deg] bg-white/90" />
                  <div className="absolute left-[28%] top-[10%] h-[2px] w-[24%] rotate-[104deg] bg-white/85" />
                  <div className="absolute left-[55%] top-[2%] h-[2px] w-[18%] rotate-[96deg] bg-white/85" />
                  <div className="absolute right-[-6%] top-[24%] h-[2px] w-[36%] rotate-[77deg] bg-white/90" />
                  <div className="absolute right-[-4%] top-[58%] h-[2px] w-[28%] rotate-[52deg] bg-white/90" />
                  <div className="absolute left-[0%] top-[48%] h-[2px] w-[32%] rotate-[39deg] bg-white/70" />
                  <div className="absolute left-[14%] top-[56%] h-[2px] w-[22%] rotate-[85deg] bg-white/55" />
                  <div className="absolute left-[34%] top-[50%] h-[2px] w-[42%] rotate-[14deg] bg-white/95" />
                  <div className="absolute left-[30%] top-[62%] h-[2px] w-[32%] rotate-[-4deg] bg-white/85" />
                  <div className="absolute left-[20%] top-[72%] h-[2px] w-[44%] rotate-[16deg] bg-white/65" />
                  <div className="absolute left-[42%] top-[76%] h-[2px] w-[42%] rotate-[-2deg] bg-white/10" />
                  <div className="absolute left-[18%] top-[36%] h-[2px] w-[36%] rotate-[8deg] bg-white/65" />
                  <div className="absolute left-[11%] top-[32%] h-[2px] w-[18%] rotate-[89deg] bg-white/50" />
                  <div className="absolute left-[46%] top-[38%] h-[2px] w-[18%] rotate-[88deg] bg-white/55" />
                  <div className="absolute left-[60%] top-[48%] h-[2px] w-[17%] rotate-[83deg] bg-white/55" />
                  <div className="absolute left-[73%] top-[52%] h-[2px] w-[16%] rotate-[86deg] bg-white/50" />
                  <div className="absolute left-[26%] top-[58%] h-[2px] w-[18%] rotate-[83deg] bg-white/45" />
                  <div className="absolute left-[38%] top-[59%] h-[2px] w-[16%] rotate-[85deg] bg-white/45" />
                  <div className="absolute left-[51%] top-[60%] h-[2px] w-[14%] rotate-[84deg] bg-white/45" />
                </div>

                <div className="absolute left-[68%] top-[6%] h-[28%] w-[18%] rounded-[42%] bg-[#cdcdcd] opacity-90" />
                <div className="absolute right-[-3%] top-[13%] h-[26%] w-[15%] rounded-[45%] bg-[#cecece] opacity-85" />
                <div className="absolute right-[3%] top-[48%] h-[32%] w-[19%] rounded-[48%] bg-[#dbdbdb] opacity-75" />

                <div className="absolute left-1/2 top-[57%] z-10 -translate-x-1/2 -translate-y-1/2 text-[#696969] drop-shadow-[0_3px_6px_rgba(0,0,0,0.18)]">
                  <MapPin className="h-10 w-10 fill-current stroke-none" />
                </div>
              </div>

              <div className="absolute bottom-6 left-1/2 z-20 w-[calc(100%-28px)] max-w-[520px] -translate-x-1/2 rounded-[4px] border border-slate-300 bg-white px-8 py-9 shadow-[0_14px_34px_rgba(15,23,42,0.16)] md:bottom-8 md:w-[calc(100%-44px)] md:px-9">
                <h2 className="text-[19px] font-medium tracking-[-0.02em] text-[#0f172a] md:text-[22px]">
                  Campus Location
                </h2>
                <p className="mt-6 text-[19px] leading-[1.45] text-slate-500 md:text-[20px]">
                  Main Campus (WIiM)
                  <br />
                  Kraków, Poland
                </p>
                <a
                  href="https://maps.google.com/?q=Warszawska+24,+31-155+Krakow,+Poland"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex h-14 w-full items-center justify-center rounded-[3px] bg-[#08275c] px-6 text-[19px] font-medium text-white transition-colors hover:bg-[#123977]"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-[#f7f9fc] px-6 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid w-full max-w-[1200px] gap-10 lg:grid-cols-[420px_minmax(0,1fr)] lg:gap-16">
          <div>
            <h2 className="text-[15px] font-semibold text-slate-800">Send a Message</h2>
            <p className="mt-8 max-w-sm text-[15px] leading-8 text-slate-500">
              Have a specific question about our programs or research opportunities? Complete
              the form and our department will route your inquiry to the right specialist.
            </p>

            <div className="mt-10 space-y-6">
              {specialistContacts.map((contact) => {
                const Icon = contact.icon;

                return (
                  <div
                    key={contact.title}
                    className="flex items-center gap-5 rounded-[4px] border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-[2px] bg-[#b6f36f]/70 text-[#5b7b20]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-semibold text-slate-700">{contact.title}</h3>
                      <a
                        href={`mailto:${contact.email}`}
                        className="mt-1 block text-[15px] text-slate-500 transition-colors hover:text-slate-700"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[6px] border border-slate-200 bg-white p-8 shadow-[0_20px_50px_rgba(15,23,42,0.08)] md:p-12"
          >
            {error && (
              <div className="mb-6 flex items-start gap-3 rounded-[4px] border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {successMessage && (
              <div className="mb-6 flex items-start gap-3 rounded-[4px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-[14px] text-emerald-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              <label className="block">
                <span className="mb-3 block text-[15px] font-semibold text-slate-700">Full Name</span>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(event) => {
                    setFormData((current) => ({ ...current, fullName: event.target.value }));
                    if (error) setError(null);
                    if (successMessage) setSuccessMessage(null);
                  }}
                  className="h-12 w-full rounded-[2px] border border-slate-300 px-4 text-[15px] text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-[#08275c]"
                />
              </label>

              <label className="block">
                <span className="mb-3 block text-[15px] font-semibold text-slate-700">Email Address</span>
                <input
                  type="email"
                  required
                  placeholder="john@university.edu"
                  value={formData.email}
                  onChange={(event) => {
                    setFormData((current) => ({ ...current, email: event.target.value }));
                    if (error) setError(null);
                    if (successMessage) setSuccessMessage(null);
                  }}
                  className="h-12 w-full rounded-[2px] border border-slate-300 px-4 text-[15px] text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-[#08275c]"
                />
              </label>
            </div>

            <label className="mt-6 block">
              <span className="mb-3 block text-[15px] font-semibold text-slate-700">Subject</span>
              <div className="relative">
                <select
                  value={formData.subject}
                  onChange={(event) => {
                    setFormData((current) => ({ ...current, subject: event.target.value }));
                    if (error) setError(null);
                    if (successMessage) setSuccessMessage(null);
                  }}
                  className="h-12 w-full appearance-none rounded-[2px] border border-slate-300 bg-white px-4 pr-12 text-[15px] text-slate-700 outline-none transition-colors focus:border-[#08275c]"
                >
                  {subjectOptions.map((subject) => (
                    <option key={subject}>{subject}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </label>

            <label className="mt-6 block">
              <span className="mb-3 block text-[15px] font-semibold text-slate-700">Message</span>
              <textarea
                rows={7}
                required
                placeholder="How can we help you?"
                value={formData.message}
                onChange={(event) => {
                  setFormData((current) => ({ ...current, message: event.target.value }));
                  if (error) setError(null);
                  if (successMessage) setSuccessMessage(null);
                }}
                className="w-full rounded-[2px] border border-slate-300 px-4 py-4 text-[15px] text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-[#08275c]"
              />
            </label>

            <label className="mt-6 flex items-start gap-3 text-[15px] leading-7 text-slate-600">
              <input
                type="checkbox"
                checked={formData.privacyAccepted}
                onChange={(event) => {
                  setFormData((current) => ({ ...current, privacyAccepted: event.target.checked }));
                  if (error) setError(null);
                }}
                className="mt-1 h-4 w-4 rounded-[2px] border-slate-300 text-[#08275c] focus:ring-[#08275c]"
              />
              <span>
                I agree to the{' '}
                <Link to="#" className="font-medium text-slate-800 underline underline-offset-2">
                  Privacy Policy
                </Link>{' '}
                regarding data processing.
              </span>
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-8 inline-flex items-center justify-center rounded-[2px] bg-[#08275c] px-9 py-4 text-[15px] font-medium text-white shadow-md transition-colors hover:bg-[#123977] disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {isSubmitting ? 'Sending...' : 'Send Inquiry'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
