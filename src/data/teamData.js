// ReTRRAC Global – Team members
// ─────────────────────────────────────────────────────────────
// HOW TO ADD PHOTOS
//   1. Put the photo in  public/team/  (e.g. public/team/ren.jpg)
//      – square, at least 600×600px, JPG or WEBP works best.
//   2. Set  image: '/team/ren.jpg'  on that member below.
//   If a photo is missing or fails to load, the card shows the
//   person's initials instead, so nothing ever looks broken.
//
// `featured: true`  → shown in the 3-card "Our Team" section on the home page
// `department`      → used for the filter tabs on the /team page
//
// Entries marked PLACEHOLDER are examples – replace them with your real
// colleagues (or delete them) before going live.
// ─────────────────────────────────────────────────────────────
import { leadershipTeam } from './siteData';
const MEB = '/Mebin.jpg';
const DAL = '/Daliya.jpg';
const GUR = '/Gurpreet.jpg';
const ARUN = '/Arun.jpg';
const PIC1 = '/pic1.jpg';
const PIC2 = '/pic2.jpg';
const SARITHA = '/pic3.jpg'; 
const [ren, sarah, ahmed] = leadershipTeam;

export const teamDepartments = [
  'All',
  'Leadership',
  'Compliance & Advisory',
  'Academy & Training',
  'Technology',
  'Operations'
];

export const teamMembers = [
  {
    id: 'ren',
    name: ren.fullName,
    role: ren.title,
    department: 'Leadership',
    location: 'London, UK',
    image: ren.image,
    credentials: ren.credentials,
    bio: ren.bio,
    extendedBio: ren.extendedBio,
    email: 'ren@retrrac.org',
    phone: '+44 7552 237997',
    linkedin: 'https://www.linkedin.com/company/retrrac-global/',
    expertise: ['Governance & Strategy', 'Tier-1 Banking', 'Regulatory Transformation'],
    featured: true
  },
  {
    id: 'sarah-adenaike',
    name: sarah.fullName,
    role: sarah.title,
    department: 'Leadership',
    location: 'London, UK',
    image: sarah.image,
    credentials: sarah.credentials,
    bio: sarah.bio,
    extendedBio: sarah.extendedBio,
    email: 'info@retrrac.org',
    linkedin: 'https://www.linkedin.com/company/retrrac-global/',
    expertise: ['Financial Crime Assurance', 'AML Leadership', 'Regulatory Compliance'],
    featured: true
  },
  {
    id: 'ahmed-mamoon',
    name: ahmed.fullName,
    role: ahmed.title,
    department: 'Compliance & Advisory',
    location: 'London, UK',
    image: ahmed.image,
    credentials: ahmed.credentials,
    bio: ahmed.bio,
    extendedBio: ahmed.extendedBio,
    email: 'info@retrrac.org',
    linkedin: 'https://www.linkedin.com/company/retrrac-global/',
    expertise: ['FCA / PRA Reporting', 'Transaction Monitoring', 'AML/CTF Operations'],
    featured: true
  },

  // ── PLACEHOLDER members – replace with real people ──────────
  {
    id: 'member-academy-lead',
    name: 'Mebin',
    role: 'Head of Academy & CPD Programmes',
    department: 'Academy & Training',
    location: 'London, UK',
    image: MEB,
    credentials: 'Add credentials',
    bio: 'Leads curriculum design for the CAFS™ certification and Blackthrone™ simulations, working with former MLROs to keep every module aligned with current UK regulation.',
    email: 'info@retrrac.org',
    expertise: ['Curriculum Design', 'CPD Accreditation'],
    placeholder: true
  },
  {
    id: 'member-clm-lead',
    name: 'DaliYa Davis',
    role: 'CLM RegTech Product Lead',
    department: 'Technology',
    location: 'Pune, India',
    image: DAL,
    credentials: 'Add credentials',
    bio: 'Owns the Client Lifecycle Management platform roadmap – screening, identity verification and KYB integrations across 237 jurisdictions.',
    email: 'info@retrrac.org',
    expertise: ['KYC/KYB Automation', 'Screening Engines'],
    placeholder: true
  },
  {
    id: 'member-kyc-analyst',
    name: 'Gurpreet',
    role: 'Senior KYC & EDD Analyst',
    department: 'Compliance & Advisory',
    location: 'Pune, India',
    image: GUR,
    credentials: 'Add credentials',
    bio: 'Delivers onboarding, periodic review and remediation projects for banking clients, specialising in complex ownership structures and EDD.',
    email: 'info@retrrac.org',
    expertise: ['CDD / EDD', 'UBO Analysis'],
    placeholder: true
  },
  {
    id: 'member-sanctions',
    name: 'Arun',
    role: 'Sanctions & Screening Specialist',
    department: 'Compliance & Advisory',
    location: 'Dubai, UAE',
    image: ARUN,
    credentials: 'Add credentials',
    bio: 'Supports MENA and GCC clients with sanctions screening calibration, alert discounting and CBUAE regulatory expectations.',
    email: 'info@retrrac.org',
    expertise: ['Sanctions Screening', 'CBUAE Compliance'],
    placeholder: true
  },
  {
    id: 'member-trainer',
    name: 'Team Member Name',
    role: 'AML Trainer & Course Facilitator',
    department: 'Academy & Training',
    location: 'Kochi, India',
    image: PIC1,
    credentials: 'Add credentials',
    bio: 'Facilitates live cohorts and capstone projects, guiding candidates through practical KYC, adverse media and SAR drafting exercises.',
    email: 'info@retrrac.org',
    expertise: ['Live Instruction', 'Capstone Mentoring'],
    placeholder: true
  },
  {
    id: 'member-operations',
    name: 'Team Member Name',
    role: 'Client Operations Manager',
    department: 'Operations',
    location: 'London, UK',
    image: PIC2,
    credentials: 'Add credentials',
    bio: 'First point of contact for clients and candidates – scheduling consultations, enrolment support and project coordination across our offices.',
    email: 'info@retrrac.org',
    expertise: ['Client Success', 'Project Coordination'],
    placeholder: true
  },
  {
    id: 'member-operations-2',
    name: 'Saritha',
    role: 'Client Operations Manager',
    department: 'Operations',
    location: 'London, UK',
    image: SARITHA,
    credentials: 'Add credentials',
    bio: 'First point of contact for clients and candidates – scheduling consultations, enrolment support and project coordination across our offices.',
    email: 'info@retrrac.org',
    expertise: ['Client Success', 'Project Coordination'],
    placeholder: true
  }
];

export const featuredTeam = teamMembers.filter((m) => m.featured).slice(0, 3);
