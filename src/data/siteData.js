// Extended Data for Multi-page Navigation and Detailed Pages
// Extracted and Structured from https://retrrac.org/ and official site layouts
const REN = '/Ren.jpeg';
const SARA = '/sara.jpg';
const MAMOON = '/mamoon.webp';
export const siteMeta = {
  name: "ReTRRAC Global",
  legalName: "ReTRRAC Global Ltd.",
  tagline: "Your trusted partner in regulatory transformation risk review and consulting.",
  subheadline: "ReTRRAC Global is a technology-driven global consulting and training company focused on compliance and risk assessment solutions. Headquartered in the United Kingdom, with operations in India and the UAE, we are dedicated to empowering businesses to comply with regulatory requirements.",
  accreditation: "CPD Accredited Organisation",
  founded: "2018",
  headquarters: {
    city: "London",
    country: "United Kingdom",
    address: "60 Cannon Street, London EC4N 6NP",
    phones: ["+44 (0) 204 509 7100", "+44 (0) 7552 237 997", "+44 7380923453"],
    email: "info@retrrac.org",
    execEmail: "ren@retrrac.org"
  },
  resourceCenter: {
    city: "Pune",
    country: "India",
    address: "Pune Global Resource Center, Maharashtra, India",
    phones: ["(+91) 7709991797", "(+91) 80890 07372", "(+91) 7758943485"],
    email: "info@retrrac.org"
  },
  uaeOffice: {
    region: "UAE Operations",
    city: "Dubai",
    country: "United Arab Emirates",
    email: "info@retrrac.org"
  },
  stats: [
    { label: "Countries Covered", value: "237+", highlight: "Global Reach" },
    { label: "Company Records", value: "150M+", highlight: "50+ Jurisdictions" },
    { label: "Leadership Experience", value: "20+ Yrs", highlight: "Fortune 500 Alumni" },
    { label: "Document Types Verified", value: "13,000+", highlight: "Automated OCR/IDV" },
    { label: "Regulatory Fines Avoided", value: "100%", highlight: "Client Track Record" }
  ]
};

// Our Story page specific data
export const ourStoryData = {
  heroTitle: "Our Story",
  heroSubtitle: "Empowering businesses worldwide to achieve regulatory excellence through technology, consulting, and accredited training.",
  leadParagraph: "ReTRRAC Global is a leading Global Compliance and Risk Review Consulting & Training Company, committed to providing businesses with innovative, technology-driven solutions for regulatory compliance and risk management. Headquartered in London, United Kingdom, with operations in India and the UAE, we are dedicated to empowering businesses to comply with regulatory requirements.",
  secondParagraph: "Our team of experienced industry professionals brings a diverse range of knowledge, skills, and decades of experience in financial services, legal, regulatory affairs, AML, and risk review. We specialize in empowering businesses to achieve compliance excellence through tailored consulting, comprehensive training programs, and cutting-edge RegTech solutions.",
  
  vision: "To be the globally recognized benchmark in regulatory transformation, risk intelligence, and financial crime prevention, enabling institutions to operate with unmatched transparency, resilience, and ethical confidence.",
  mission: "To deliver transformative consulting, enterprise RegTech tools, and world-class accredited training that empower organizations to exceed regulatory expectations and build lasting cultures of compliance.",
  
  coreValues: [
    { title: "Integrity", desc: "Uncompromising ethical standards in all regulatory advice and client engagements." },
    { title: "Precision", desc: "Rigorous attention to detail in forensic audits, policy drafting, and risk assessment." },
    { title: "Innovation", desc: "Leveraging cutting-edge RegTech and AI to streamline compliance and due diligence." },
    { title: "Client Centricity", desc: "Tailoring strategies to the bespoke operational reality of each regulated institution." },
    { title: "Empowerment", desc: "Building institutional capacity through knowledge transfer and CPD-accredited training." }
  ],

  journey: [
    {
      year: "2018",
      title: "Industry Experts Joined Hands",
      desc: "Senior compliance leaders from Fortune 500 financial institutions united in London to build a specialized regulatory consulting practice."
    },
    {
      year: "2019",
      title: "Dedicated Training Programmes Launched",
      desc: "Introduced specialized corporate AML and financial crime curriculum for regulated gatekeepers in the UK."
    },
    {
      year: "2020",
      title: "Transition to Live Virtual & Global Delivery",
      desc: "Expanded delivery to hybrid and live interactive global training formats, extending reach across Europe and Asia."
    },
    {
      year: "2021",
      title: "Incorporation of ReTRRAC Global",
      desc: "Formal incorporation of ReTRRAC Global Ltd. with global headquarters established at Cannon Street, London."
    },
    {
      year: "2022",
      title: "Overseas Expansion (UAE & India)",
      desc: "Launched dedicated Middle East operations in Dubai to serve CBUAE regulated institutions and cross-border firms."
    },
    {
      year: "2023",
      title: "Global Resource Center in Pune",
      desc: "Established state-of-the-art Global Resource Center in Pune, India, housing specialized compliance analysts and technologists."
    },
    {
      year: "2023",
      title: "Blackthrone™ Training & CAFS™ Certification",
      desc: "Launched the CPD-accredited Certified Anti-Financial Crime Specialist (CAFS™) and bespoke Blackthrone™ simulation modules."
    },
    {
      year: "2024",
      title: "CLM RegTech Platform Rollout",
      desc: "Unveiled proprietary in-house Client Lifecycle Management (CLM) System covering 237 countries and 150M+ company entities."
    }
  ],

  trustedBrands: [
    "Barclays Alumni Network",
    "Viva Wallet Neo-Bank",
    "Oasis Advisory",
    "First London Legal",
    "Chartered Accountants Guild",
    "Apex Wealth Management"
  ],

  learningPrograms: [
    {
      title: "Certified Anti-Financial Crime Specialist (CAFS™)",
      duration: "60 Hours (40h Lectures + 20h Live Project)",
      desc: "Globally recognized CPD-accredited certification covering AML, KYC, Sanctions, UBO, PEP, and adverse media.",
      path: "/courses/certified-anti-financial-crime-specialist-cafs"
    },
    {
      title: "Certified Anti-Money Laundering Specialist Prep",
      duration: "Comprehensive Masterclass",
      desc: "Executive training aligning with international AML standards and exam preparation.",
      path: "/retrrac-academy"
    },
    {
      title: "FinTech & Financial Crime",
      duration: "Advanced Practitioner Module",
      desc: "Specialized training for neo-banks, crypto exchanges (VASPs), and payment service providers.",
      path: "/retrrac-academy"
    },
    {
      title: "Blackthrone™ Corporate Training",
      duration: "Bespoke Institutional Workshops",
      desc: "Hands-on corporate simulation drills and audit-ready staff compliance certifications.",
      path: "/blackthrone-training"
    }
  ],

  whyPartnerWithUs: [
    { title: "More than 20 years of experience", desc: "Proven track record advising Tier-1 international banks and regulated firms." },
    { title: "Industry Knowledge", desc: "Deep statutory expertise in PRA, FCA, SRA, and HMRC supervisory requirements." },
    { title: "Market Positioning", desc: "Bridging the gap between manual legal compliance and high-efficiency RegTech automation." },
    { title: "Project Management", desc: "Structured, time-bound execution for complex remediation and backlog clearance." },
    { title: "Continuous Support", desc: "Ongoing monitoring, annual reviews, and prompt advisory whenever regulations evolve." },
    { title: "Training & Hand Holding", desc: "Empowering internal teams with practical skills, verifiable training logs, and confidence." },
    { title: "Regulatory Readiness", desc: "Ensuring zero fines and 100% audit readiness during supervisory desk reviews." }
  ],

  testimonials: [
    {
      name: "David M.",
      role: "Managing Partner, Chartered Accountants",
      rating: 5,
      comment: "ReTRRAC transformed our practice's MLR 2017 compliance. Their Firm-Wide Risk Assessment and staff training gave us complete peace of mind during our supervisory audit."
    },
    {
      name: "Amina K.",
      role: "Head of Financial Crime, Neo-Bank",
      rating: 5,
      comment: "The CLM platform automated our customer screening across hundreds of jurisdictions with unmatched accuracy. Truly an enterprise-grade RegTech solution."
    },
    {
      name: "Liam O'Connor",
      role: "Compliance Officer & CAFS Graduate",
      rating: 5,
      comment: "The CAFS certification at ReTRRAC Academy gave me hands-on project experience with real sanctions databases and UBO structures that directly advanced my career."
    }
  ]
};

// 11 Bespoke Banking Services (Matches Image 3)
export const bankingBespokeServices = [
  {
    id: "onboarding",
    title: "Customer Onboarding",
    items: [
      "Streamlined KYC Processes",
      "SDD, CDD and EDD review with CLM Technology",
      "Automated Customer Onboarding Tool",
      "AML/CTF searches",
      "Sanctions, PEP and Adverse News searches and discounting",
      "Risk review, Mitigation and Classification"
    ]
  },
  {
    id: "regular-review",
    title: "Regular Review",
    items: [
      "Analyse regular review population based on RRD (Next Review Date)",
      "SDD, CDD and EDD review with CLM technology",
      "Automated regular review tool",
      "AML/CTF searches",
      "Sanctions, PEP and Adverse News searches and discounting",
      "Account Activity Review (AAR)",
      "Risk review, Mitigation and Classification"
    ]
  },
  {
    id: "remediation",
    title: "Remediation",
    items: [
      "Regulatory Gap Analysis with existing customers",
      "Client File Review & Updates",
      "SDD, CDD and EDD review with CLM technology",
      "AML/CTF searches",
      "Sanctions, PEP and Adverse News searches and discounting",
      "Risk review, Mitigation and Classification",
      "Account Activity Review (AAR)",
      "Audit-Ready Solutions"
    ]
  },
  {
    id: "edr",
    title: "Event Driven Review (EDR)",
    items: [
      "Timely Risk Response on EDR",
      "Automated EDR Solutions",
      "Overdue file remediation",
      "Apply discounting methodology to identify true events",
      "Account Activity Review (AAR)",
      "Customised Reporting Frameworks"
    ]
  },
  {
    id: "transaction-monitoring",
    title: "Transaction Monitoring",
    items: [
      "Alert generation",
      "Real-Time data collection and Analysis",
      "Customisable Risk Rules and discounting",
      "Tracking and analysis of transactions",
      "Reporting & Escalation"
    ]
  },
  {
    id: "regulatory-reporting",
    title: "Regulatory Reporting",
    items: [
      "FIN060a Authorised EMI questionnaire",
      "FIN078 Baseline Financial Resilience Report",
      "FIN074 Economic Crime Levy",
      "FS Complaints Return",
      "REP-CRIM Financial Crime Return",
      "REP001 – Close links",
      "REP002 – Controllers Report",
      "REP017 Payment Fraud Report",
      "REP018 Operational and security risk report",
      "REP020 Dedicated Interactive Channel Report",
      "SYSC – Early High Growth Oversight reports",
      "Ad Hoc reports"
    ]
  },
  {
    id: "rcsa",
    title: "Risk And Controls Self-Assessment (RCSA)",
    items: [
      "Identification of Risks",
      "Evaluation of Controls",
      "Risk Assessment & Scoring",
      "Action Planning & Remediation",
      "Monitoring and Reporting to Board"
    ]
  },
  {
    id: "sanction-screening",
    title: "Sanction Screening and Review",
    items: [
      "Sanctions Screening tool with CLM technology",
      "Searches against Global, SDN list",
      "Searches against Sanctioned and Special Risk country",
      "Regular List Updates & Fuzzy Logic",
      "Comprehensive Review Process",
      "Regulatory reporting"
    ]
  },
  {
    id: "compliance-training",
    title: "Compliance Training",
    items: [
      "Tailored Compliance Programmes",
      "Expert-Led Workshops",
      "Ongoing Learning modules",
      "Interactive Learning Modules",
      "Comprehensive course materials",
      "CPD certified programmes"
    ]
  },
  {
    id: "sme-support",
    title: "Subject Matter Expertise (SME) Support",
    items: [
      "Expert Guidance & Board Advisory",
      "Regulatory Compliance Gap Reviews",
      "Anti-Money Laundering (AML) Oversight",
      "Know Your Customer (KYC) Compliance",
      "Know Your Customer (KYB) Compliance",
      "Sanctions and adverse news review",
      "Data Privacy and Security",
      "Fraud Prevention",
      "Custom Advisory Services",
      "Strategic Compliance Planning"
    ]
  },
  {
    id: "quality-check",
    title: "Quality Check Review",
    items: [
      "Comprehensive File Audits",
      "Gap analysis and Risk review",
      "Compliance Accuracy Verification",
      "Ongoing Improvement and Root Cause Analysis"
    ]
  }
];

// Consulting Sectors Master List
export const consultingSectors = [
  {
    id: "banks",
    slug: "banks-financial-institutions",
    title: "Banks & Financial Institutions",
    tagline: "Full-Spectrum AML/KYC & FinCrime Risk Frameworks",
    icon: "Landmark",
    summary: "Banks and financial institutions play a crucial role in combating financial crime by adhering to strict AML regulations. We deliver customised strategies and cutting-edge RegTech solutions to help identify, prevent, and report potential risks.",
    description: "Regulatory compliance in Banking and Financial Institutions is essential for establishing and implementing policies and procedures that adhere to both local and international compliance regulations. It is crucial for institutions to build trust, protect customers, ensure transparency, and extend protection beyond their customer base.",
    path: "/compliance-consulting/banks-financial-institutions",
    authorities: ["PRA", "FCA", "FATF"],
    bulletPoints: [
      "Customer Onboarding with automated CLM technology",
      "Regular Reviews and Event-Driven Reviews (EDR)",
      "Forensic Remediation and backlog clearance",
      "Transaction Monitoring rule optimization & alert discount",
      "Full Regulatory Reporting: REP-CRIM, FIN060a, FIN078, REP017/018",
      "Risk Controls and Self-Assessment (RCSA) and Sanctions Screening"
    ],
    badge: "Tier-1 & Neo-Banks",
    color: "from-blue-600 to-indigo-600"
  },
  {
    id: "accountants",
    slug: "accountants-and-bookkeepers",
    title: "Accountants & Bookkeepers",
    tagline: "Strict Adherence to Money Laundering Regulations 2017",
    icon: "Calculator",
    summary: "Accountants and bookkeepers are front-line guardians in detecting money laundering and terrorist financing. We ensure complete compliance with statutory MLR 2017 supervisory mandates.",
    description: "All financial institutions, businesses, and gatekeepers are regulated by either the Financial Conduct Authority (FCA), the Office for Professional Body Anti-Money Laundering Supervision (OPBAS), or HM Revenue and Customs (HMRC). The Association of Chartered Certified Accountants (ACCA) and the Institute of Chartered Accountants in England and Wales (ICAEW) serve as anti-money laundering (AML) supervisors.",
    path: "/compliance-consulting/accountants-and-bookkeepers",
    authorities: ["ACCA", "ICAEW", "CIMA", "OPBAS", "FCA", "HMRC"],
    bulletPoints: [
      "Firm-wide Risk Assessment (FWRA) formulation & annual updates",
      "Customer Due Diligence (CDD) / KYC – Identity & address, Sanctions, PEP, Adverse News",
      "Account Activity Review, Red Flags / Internal SAR & Escalation to NCA",
      "Policy Packs: AML policy, controls and procedures (PCP), Anti-Bribery & Corruption, Data Protection, Computer Use, Website & Social Media",
      "Mandatory compliance staff trainings, training manual, certificates & training logs",
      "Systematic Risk Review, Risk Classification & continuous Mitigation"
    ],
    badge: "MLR 2017 Audited",
    color: "from-purple-600 to-pink-600"
  },
  {
    id: "lawyers",
    slug: "lawyers-and-solicitors",
    title: "Lawyers & Solicitors",
    tagline: "Rigorous SRA Compliance & Source of Funds Verification",
    icon: "Scale",
    summary: "Law firms must regularly assess their exposure to money laundering risks through comprehensive Practice-wide, Client, and Matter risk assessments.",
    description: "Law firms must regularly conduct thorough assessments to identify and evaluate the risks of money laundering they may encounter. These assessments should be conducted at the practice-wide, client, and matter levels. Practice Wide Risk Assessments (PWRAs) are mandated by Regulation 18 of the Money Laundering, Terrorist Financing and Transfer of Funds (Information on the Payer) Regulations 2017 (MLR 2017).",
    path: "/compliance-consulting/lawyers-and-solicitors",
    authorities: ["FCA", "HMRC", "OPBAS", "The Law Society", "Solicitors Regulation Authority (SRA)"],
    bulletPoints: [
      "Practice-wide Risk Assessment (PWRA) aligned with legal sector typology",
      "Customer Due Diligence (CDD) and screening for Sanctions, PEP, RCA, SIP, Adverse News",
      "Identification and verification of the plausibility of Source of Funds (SoF) & Source of Wealth (SoW)",
      "Policy Packs including AML policy, controls and procedures (PCP), Anti-Bribery, Data Protection, Computer Use",
      "AML Training for staff, training manual, verifiable certificates and annual logs",
      "Matter-specific risk classification, internal SAR protocol, and escalation to NCA"
    ],
    badge: "SRA & Law Society Ready",
    color: "from-indigo-600 to-purple-600"
  },
  {
    id: "estate",
    slug: "estate-and-letting-agency-business",
    title: "Estate & Letting Agency Business",
    tagline: "Preventing Property Exploitation & Illegal Financial Flows",
    icon: "Building2",
    summary: "The Money Laundering, Terrorist Financing, and Transfer of Funds Regulations 2017 set out specific requirements for property businesses to prevent criminal proceeds from entering the property market.",
    description: "The Money Laundering, Terrorist Financing, and Transfer of Funds (Information on the Payer) Regulations 2017 (MLR 2017) set out specific requirements for estate and letting agency businesses to prevent their services from being exploited for illegal financial activities. These regulations mandate the appointment of a Money Laundering Reporting Officer (MLRO), the implementation of robust anti-money laundering (AML) policies and procedures, the performance of customer due diligence (CDD), the provision of comprehensive staff training, and the regular execution of risk assessments.",
    path: "/compliance-consulting/estate-and-letting-agency-business",
    authorities: ["HMRC", "National Trading Standards Estate & Letting Agency Team"],
    bulletPoints: [
      "Statutory appointment and registration of a certified Money Laundering Reporting Officer (MLRO)",
      "Implementation of robust, up-to-date AML policies, controls, and operational procedures",
      "Performance of multi-party Customer Due Diligence (CDD) on buyers, sellers, landlords, and tenants",
      "Thorough verification of ultimate beneficial ownership (UBO) for offshore and corporate property buyers",
      "Delivery of comprehensive staff AML awareness training and auditable compliance logs",
      "Execution of regular estate agency risk assessments and prompt suspicious activity reporting (SAR)"
    ],
    badge: "Property Sector MLR",
    color: "from-cyan-600 to-blue-600"
  },
  {
    id: "high_value_dealers",
    slug: "high-value-dealers",
    title: "High Value Dealers (HVDs)",
    tagline: "Supervised Compliance for Luxury Goods, Art, Gems & Metals",
    icon: "Gem",
    summary: "High Value Dealers accepting or making high cash or digital payments are strictly supervised by regulatory bodies such as HMRC and the FCA.",
    description: "High Value Dealers are supervised by their respective regulators, such as HMRC in the UK. These businesses are required to meet specific requirements as part of their annual supervisory review including risk assessment, customer due diligence, reporting suspicious activity, record keeping, and staff awareness.",
    path: "/compliance-consulting/high-value-dealers",
    authorities: ["HMRC", "FCA"],
    bulletPoints: [
      "Comprehensive Risk Assessment, institutional Policies, Controls and Procedures (PCP)",
      "Customer Due Diligence (CDD) on all transactions meeting or exceeding threshold limits (€10,000 / £8,500)",
      "Reporting Suspicious Activity (SAR) to the UK National Crime Agency (NCA) without tipping off",
      "Meticulous Record Keeping maintained for a minimum statutory period of 5 years",
      "Continuous Staff Awareness and tailored Annual Financial Crime Training"
    ],
    badge: "HMRC Supervised",
    color: "from-violet-600 to-indigo-700"
  }
];

export const clmTechnology = {
  title: "Client Lifecycle Management (CLM) System",
  tagline: "Enterprise RegTech for Automated Due Diligence & Onboarding",
  overview: "ReTRRAC's in-house Client Lifecycle Management (CLM) System delivers seamless compliance solutions designed to streamline customer onboarding, enhance identity verification, and automate due diligence processes. Built for maximum regulatory adherence, ensuring your organisation stays compliant with the latest anti-money laundering (AML) and counter-terrorist financing (CTF) standards.",
  coverage: "Global coverage spanning 237 countries and over 13,000 document types with automated OCR and verification.",
  kybCoverage: "Company Search enables you to automate your KYB (Know Your Business) onboarding flows by retrieving verified corporate data from over 50 countries' business registers, covering 150+ million companies.",
  pillars: [
    {
      category: "Customer Screening",
      icon: "ShieldAlert",
      description: "Stay ahead of compliance with ReTRRAC's robust customer screening capabilities, powered by global data and advanced automation.",
      features: [
        {
          name: "Sanctions & PEP Screening",
          detail: "Extensive screening against Sanctioned and Politically Exposed Persons (PEP) global databases to pinpoint high-risk individuals with unmatched precision."
        },
        {
          name: "Watchlist Screening",
          detail: "Access a comprehensive range of AML watchlist sources and leverage flexible automation to meet regulatory mandates effortlessly."
        },
        {
          name: "Continuous Real-Time Monitoring",
          detail: "Prompt automated alerts for any status changes in customer risk profiles, ensuring seamless ongoing due diligence."
        }
      ]
    },
    {
      category: "Identity Assurance",
      icon: "UserCheck",
      description: "A complete identity verification suite that is fast, reliable, and tailored to meet varying Levels of Assurance (LoA).",
      features: [
        {
          name: "Document Verification",
          detail: "User-friendly document verification analyzing security features, holograms, and machine-readable zones (MRZ)."
        },
        {
          name: "Customer Authentication",
          detail: "Protect corporate systems by controlling access while maintaining a frictionless onboarding experience for legitimate users."
        },
        {
          name: "Address Verification (PoA)",
          detail: "Automate Proof of Address verification with smart data capture and cross-referenced registry verification."
        },
        {
          name: "Multi-Bureau Checks",
          detail: "Thorough background verification cross-referencing national credit bureaus and government registers."
        }
      ]
    },
    {
      category: "Due Diligence & Compliance",
      icon: "FileCheck2",
      description: "Robust compliance engine for automated customer risk review methodology (CRRM) and risk mitigation.",
      features: [
        {
          name: "Know Your Customer (KYC)",
          detail: "Detects identity theft and fraud while maintaining smooth digital onboarding with configurable risk criteria."
        },
        {
          name: "Anti-Money Laundering (AML)",
          detail: "Easy-to-integrate AML platform tackling financial crime and counter-terrorism financing head-on."
        },
        {
          name: "Customer Risk Review Methodology (CRRM)",
          detail: "Dynamic risk scoring combining geographic risk, product risk, entity type, and transactional patterns."
        }
      ]
    }
  ]
};

export const academyData = {
  title: "ReTRRAC® Academy",
  accreditation: "CPD Accredited Training Institution",
  description: "At ReTRRAC Academy, our training programmes are tailored for Banks, Non-Banking Financial Companies (NBFCs), consulting firms, law offices, and educational institutions. Our globally recognised CAFS™ certification enhances employee knowledge and supports individuals in advancing their careers in banking and compliance.",
  cafsCourse: {
    code: "CAFS™",
    title: "Certified Anti-Financial Crime Specialist",
    badge: "CPD Accredited Programme",
    duration: "60 Hours",
    durationBreakdown: "40 hours Interactive Lectures + 20 hours LIVE Capstone Project",
    level: "All Levels (Foundational to Advanced)",
    investment: "£1,450 / ₹50,000",
    upcomingBatch: "Next Cohort Enrolling Now",
    seatsStatus: "Limited Seats Available per Cohort",
    summary: "The Anti-Money Laundering (AML) and Know Your Customer (KYC) initiatives have become crucial focus areas for financial institutions worldwide. The threat of hefty penalties for non-compliance, difficulties in acquiring the right customers, competition from digitally empowered rivals, and shrinking profit margins are all driving financial institutions to rethink their AML KYC and fin crime programmes.",
    takeaways: [
      "Global compliance scenarios across UK, EU, US, and MENA frameworks",
      "Core Anti-Money Laundering (AML) & Counter-Terrorist Financing (CTF) principles",
      "Sanctions regimes: OFAC, UK HMT, EU, and UN sanctions enforcement",
      "Jurisdictional requirements across EMEA, APAC, MENA, and AMER regions",
      "Review workflows: Regular Review, Remediation, and Event-Driven Reviews",
      "Mastery of complex corporate ownership structures and nested entities",
      "Ultimate Beneficial Owners (UBO) identification & Politically Exposed Persons (PEP) handling",
      "Adverse media screening, discount analysis, bribery, and corruption investigation"
    ],
    curriculumFeatures: [
      "Comprehensive training on KYC & AML review processes, banking basics, and departments",
      "Recorded live classes with lifetime portal access for future reference",
      "Practical sessions on obtaining KYC documents and conducting live sanctions searches",
      "Participation in in-house live client project simulations for hands-on portfolio proof",
      "Dedicated interview coaching, mock interview panels, CV building, and CPD certification"
    ]
  },
  blackthrone: {
    title: "Blackthrone™ Corporate Training",
    badge: "Enterprise L&D Solution",
    overview: "Specialised institutional training solutions tailored to meet the unique needs of regulated entities. We combine practical simulations with deep statutory compliance mandates.",
    highlights: [
      "Customised modules aligned with your firm's specific policies and internal risk appetite",
      "Real-world scenario simulations of suspicious transaction typologies",
      "Training logs, audit-ready compliance evidence, and employee certification records",
      "On-site workshops or flexible virtual masterclasses for compliance officers & front-line teams"
    ]
  }
};

export const leadershipTeam = [
  {
    name: "Ren",
    fullName: "Renjith Kalappurackal (Ren)",
    role: "Chief Executive",
    title: "Chief Executive Officer & Founder",
    image: REN,
    credentials: "MBA, 20+ Years Global Leadership",
    bio: "Renjith Kalappurackal(Ren) is a highly accomplished Management Graduate with over two decades of leadership experience within the Global financial services sector. Ren held senior roles at prominent Fortune 500 institutions such as Deutsche Bank, HSBC, Santander, Bank of America Merrill Lynch, and State Bank of India in the UK and abroad. Throughout his career, he has earned a reputation for measured judgement, strategic foresight, and ability to navigate complex organisational dynamics with discretion and integrity.",
    extendedBio: "Ren is widely regarded for his composed leadership style, diplomatic acumen, and unwavering commitment to institutional excellence. He is adept at fostering cross-functional collaboration, guiding senior stakeholders through periods of transformation and maintaining a steady focus on governance with ethical growth. He is a strong advocate of purpose-driven leadership and institutional integrity, bringing a thoughtful, values-based approach to decision-making. In recent years, Ren has extended his expertise through his leadership at ReTRRAC Global, a specialist Global Compliance consultancy based in London. In this capacity, he continues to advise financial institutions at a senior level, offering insight on leadership, governance, and strategic resilience.",
    phone: "+44 7552237997 | +44 7380923453",
    email: "ren@retrrac.org / info@retrrac.org"
  },
  {
    name: "Sarah Adenaike",
    fullName: "Sarah Adenaike",
    role: "Non-Executive Director",
    title: "Non-Executive Director & Regulatory Consultant",
    image: SARA,
    credentials: "LLB (Hons), LLM (Distinction), ICA Certified",
    bio: "Sarah, a Consultant and Non-Executive Director, is an ICA-certified professional distinguished by her achievements and expertise in financial services, legal, and regulatory domains. Her adaptability and focus on solutions have enabled her to forge solid connections with senior professionals and key stakeholders. A collaborative team member, Sarah shines in regulatory compliance management, financial crime, AML leadership, and financial crime assurance.",
    extendedBio: "Sarah holds an LLB from the University of Essex and a Master's in Law, specialising in Financial Regulation and Compliance, both with distinctions. Her excellence in the ICA Advanced Certificate in Anti-Money Laundering has also been recognized with an award. Sarah’s career trajectory includes impactful roles, most notably as the Head of Compliance, and she is a mentor to professionals in her field, guiding them towards success. Sarah’s presence in the industry is influential and inspiring.",
    phone: "+44 7552237997 | +44 7380923453",
    email: "info@retrrac.org"
  },
  {
    name: "Ahmed Mamoon",
    fullName: "Ahmed Mamoon",
    role: "Sr. Compliance and Regulatory Manager",
    title: "Senior Compliance and Regulatory Manager",
    image: MAMOON,
    credentials: "FCA / PRA Standards, Fintech Neo-Bank Senior Manager",
    bio: "Ahmed Mamoon is a seasoned compliance and risk management professional with extensive experience in regulatory compliance, anti-money laundering (AML), and financial reporting. Currently serving as Senior Manager of Regulatory Compliance and Reporting at Viva Wallet, a Fintech Neo-Bank in London, he plays a critical role in overseeing compliance operations, managing regulatory reporting, and ensuring adherence to the FCA and PRA standards.",
    extendedBio: "With prior roles at Kent Savers Credit Union, Hinduja Global Solutions, and HSBC, Ahmed has a strong background in financial crime prevention, transaction monitoring, and enterprise-wide risk frameworks. His expertise spans across AML/CTF operations, compliance audits, risk assessments, and staff training, ensuring organisations maintain a robust compliance culture while mitigating regulatory risks. He holds qualifications in business management, compliance, and banking, with additional certifications in risk management and regulatory transformation.",
    phone: "+44 7552237997 | +44 7380923453",
    email: "info@retrrac.org"
  }
];

export { knowledgeHubArticles } from './knowledgeHubData';

export const successStories = [
  {
    id: "case-study-1",
    client: "Tier-2 International Banking & Lending Entity",
    title: "Accountants & MLR 2017 - Avoiding Costly Penalties",
    challenge: "In our case study on how we helped our clients avoid fines under MLR 2017, we utilised various strategies to ensure compliance with the regulations. Firstly, we conducted a thorough audit of our client's process to identify any potential areas of non-compliance. Secondly, we provided comprehensive training to their staff on the requirements of the MLR 2017, ensuring that they were well-informed and able to adhere to the regulations.",
    solution: "We also implemented robust internal controls and monitoring systems to detect any suspicious activity or violations of the MLR 2017. By actively monitoring transactions and conducting regular reviews of their compliance procedures, we were able to identify and address any issues before they escalated into fines or penalties. Additionally, we collaborated closely with our clients to develop tailored compliance solutions that were specific to their business operations.",
    results: [
      "100% fine avoidance and clean regulatory sign-off",
      "Over 4,500 client accounts remediated within 90 days",
      "False-positive transaction alerts decreased by 42%",
      "Auditable, automated compliance logs established for annual supervisory review"
    ],
    tag: "Accountants & MLR 2017"
  },
  {
    id: "case-study-2",
    client: "Multi-Partner Chartered Accounting & Advisory Practice",
    title: "Accountants & MLR 2017 - Practical Remediation",
    challenge: "We helped our accountant clients avoid fines under MLR 2017. Firstly, we conducted a thorough review of our clients' current practices and identified areas where they were at risk of breaching the legislation. We provided extensive training to our clients on their obligations under MLR 2017, ensuring that they were fully informed of their responsibilities.",
    solution: "This included guidance on customer due diligence, record-keeping requirements, and reporting procedures. By empowering our clients with knowledge, we enabled them to make informed decisions and avoid inadvertent breaches of the regulations. Furthermore, we worked closely with our clients to develop tailored compliance programs that fit their specific needs and circumstances.",
    results: [
      "Full compliance certification achieved under professional supervisory review",
      "Client onboarding time reduced from 5 days to 24 hours",
      "All staff certified with official ReTRRAC AML training logs",
      "Zero compliance sanctions recorded during subsequent supervisory audits"
    ],
    tag: "Accountants & MLR 2017"
  }
];

export const internshipProgram = {
  title: "Student Internship Program",
  targetAudience: "Undergraduate, Master's, MBA, and PhD students & recent graduates",
  description: "Whether you’re graduating with an undergraduate degree, Master’s degree, MBA, or PhD, ReTRRAC has internship positions available globally. Our internships are designed to provide students with an understanding of what it’s like to work in the Banking & Financial services industry. Participants start with a comprehensive onboarding experience, have the opportunity to connect with other interns, and wrap up their internship with a presentation of their project to the ReTRRAC leadership team.",
  benefits: [
    {
      title: "Practical usage of concepts",
      detail: "You can test the knowledge skills you learned from our certification program in a practical setting."
    },
    {
      title: "Provides work experience",
      detail: "This is one of the key benefits of an internship. When you enter the workforce for the first time after completing your education, our Internship program is the perfect way to fill this gap and enables you to perform your job in a professional setting."
    },
    {
      title: "Offers mentorship opportunities",
      detail: "The most valuable mentor relationships often start with a personal connection. The ReTRRAC internship program will provide you with an opportunity to meet a potential mentor naturally."
    },
    {
      title: "Provides access to a variety of tasks",
      detail: "Our internship program will enable you to work on due diligence and KYC, customer risk review methodology (CRRM), Sanctions screening, Adverse media Hits and discounting, SDD, CDD and EDD process."
    },
    {
      title: "Creates a professional network",
      detail: "ReTRRAC Internships enable you to expand your professional network with industry connections for your future job prospects."
    },
    {
      title: "Offers career guidance",
      detail: "Based on your interests and grasp of the concepts, our career counselors will advise you to pick up suitable roles ranging from Customer Onboarding, Transaction Monitoring, Sanctions Screening, Regular Review, Event-Driven Review, or Remediation."
    },
    {
      title: "Create a strong resume",
      detail: "You can include details on your resume of all your valuable job experiences during your tenure as our intern, giving you a better chance of getting shortlisted."
    },
    {
      title: "Helps you transition to a permanent job",
      detail: "Hiring managers often use internships as an interview process to determine which interns might be good candidates for open positions."
    },
    {
      title: "Creates valuable references and recommendations",
      detail: "The supervisors and mentors you meet during your internship can be valuable references for you as you pursue a full-time job."
    },
    {
      title: "Builds confidence",
      detail: "Internships are a sensible way to transition from a 'student' to a professional, eliminating the pressure of finding a full-time job quickly."
    }
  ]
};

export const policiesData = {
  privacy: {
    title: "Privacy Policy",
    slug: "privacy-policy",
    lastUpdated: "2025-05-14",
    content: "ReTRRAC Global Ltd. is committed to protecting your privacy in compliance with the UK GDPR and Data Protection Act 2018. We collect personal information solely for the purposes of delivering compliance consulting, processing certifications, and facilitating corporate training. We do not sell or lease personal data to third parties. Data is secured using enterprise-grade encryption both in transit and at rest."
  },
  terms: {
    title: "Terms & Conditions",
    slug: "terms-conditions",
    lastUpdated: "2025-05-14",
    content: "By accessing retrrac.org and utilizing ReTRRAC Global's advisory or learning portals, you agree to comply with our institutional terms. All advisory materials, CAFS™ course modules, and CLM system frameworks remain the proprietary intellectual property of ReTRRAC Global Ltd."
  },
  cancellation: {
    title: "Cancellation & Refund Policy",
    slug: "cancellation-refund-policy",
    lastUpdated: "2025-05-14",
    content: "For ReTRRAC Academy and CAFS™ programmes, course enrollment cancellations requested 14 days prior to cohort commencement qualify for a full refund minus administrative processing fees. For consulting engagements, terms are governed by the specific Master Services Agreement (MSA)."
  },
  dataProtection: {
    title: "Data Protection",
    slug: "data-protection",
    lastUpdated: "2025-05-14",
    content: "ReTRRAC enforces strict data governance protocols. As a provider of AML and KYC solutions, our Client Lifecycle Management (CLM) system operates with strict access controls, pseudonymization, automated retention schedules, and continuous multi-factor authentication."
  },
  cookie: {
    title: "Cookie Policy",
    slug: "cookie-policy",
    lastUpdated: "2025-05-14",
    content: "We use essential cookies to maintain secure sessions and performance cookies to understand user engagement. You can customize cookie preferences at any time via your browser settings."
  }
};
