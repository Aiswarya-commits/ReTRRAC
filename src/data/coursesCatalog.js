// ReTRRAC Global Academy - Master Course Catalog
// Structured according to UK CPD Standards & UCEM Online Academy Shop design
// Covers AML, KYC, Sanctions, RegTech, Legal, and Accounting specializations

export const coursesCatalog = [
  {
    id: "cafs-specialist",
    slug: "certified-anti-financial-crime-specialist-cafs",
    code: "CAFS™",
    title: "Certified Anti-Financial Crime Specialist",
    tagline: "The UK and Global Benchmark CPD Qualification in Anti-Money Laundering, Sanctions Advisory & Financial Crime Investigation.",
    badge: "Flagship CPD Certification",
    category: "Accredited Certification",
    level: "Foundational to Advanced",
    duration: "60 Hours",
    breakdown: "40h Live Interactive Lectures + 20h Live Forensic Capstone Project",
    studyMode: "100% Online • Live Virtual Classroom + London On-Demand Studio",
    priceGBP: 1250,
    priceINR: 125000,
    rating: 4.96,
    reviewsCount: 384,
    accreditation: "CPD UK Standards Office Accredited",
    cpdPoints: 60,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    cohorts: [
      { id: "c1", date: "July 01, 2026", schedule: "Weekend Live Batch (Saturdays & Sundays 10:00 - 14:00 BST)", seatsLeft: 6 },
      { id: "c2", date: "July 15, 2026", schedule: "Weekday Evening Batch (Tue & Thu 18:30 - 21:00 BST)", seatsLeft: 9 },
      { id: "c3", date: "August 01, 2026", schedule: "Global Fast-Track Executive Batch", seatsLeft: 12 }
    ],
    overview: `The Certified Anti-Financial Crime Specialist (CAFS™) qualification is the flagship professional accreditation developed by ReTRRAC Academy London. Tailored for compliance officers, MLROs, solicitors, accountants, and banking professionals, this comprehensive 60-hour programme bridges statutory legal knowledge with practical investigative tradecraft.

Supervised under UK Money Laundering Regulations 2017 (MLR 2017), the Proceeds of Crime Act 2002 (POCA), and international FATF standards, candidates master Customer Due Diligence (CDD), Enhanced Due Diligence (EDD), PEP risk management, UK OFSI and US OFAC sanctions compliance, and live SAR filings with the UK National Crime Agency (NCA).

Crucially, the programme concludes with a mandatory 20-hour Live Forensic Capstone Project where candidates analyze simulated multi-layered banking transaction datasets, identify trade-based laundering networks, and defend their investigative findings before a panel of former Tier-1 UK MLROs.`,
    learningOutcomes: [
      "Master the legal duties and statutory liabilities of nominated officers under UK MLR 2017, POCA 2002, and the Economic Crime and Corporate Transparency Act 2023.",
      "Conduct forensic Customer Due Diligence (CDD) and Enhanced Due Diligence (EDD) across nested offshore shell companies and high-risk jurisdictions.",
      "Identify Ultimate Beneficial Ownership (UBO) structures designed to circumvent international transparency registers.",
      "Navigate UK OFSI, EU, UN, and US OFAC sanctions screening, fuzzy matching algorithms, and license exemptions.",
      "Formulate defensible practice-wide risk assessments (FWRA/PWRA) with dynamic risk-scoring methodology.",
      "Detect complex transactional red flags including smurfing, carousel VAT fraud, trade-based money laundering, and crypto mixer hopping.",
      "Draft compliant and prosecutable Suspicious Activity Reports (SARs) and Defence Against Money Laundering (DAML) requests for the UK NCA.",
      "Operate modern RegTech Client Lifecycle Management (CLM) platforms and automated perpetual KYC (pKYC) pipelines."
    ],
    modules: [
      {
        num: 1,
        title: "Module 1: Global Financial Crime Governance & UK MLR 2017 Framework",
        duration: "10 Hours",
        description: "Statutory grounding in UK, EU 6AMLD, and international FATF regulatory mandates. Examines the roles of the FCA, PRA, HMRC, SRA, and OPBAS.",
        topics: [
          "Money Laundering Regulations 2017 & 2019/2022 amendments",
          "Proceeds of Crime Act 2002 (POCA) offences and statutory defenses",
          "Terrorism Act 2000 & Counter-Proliferation Financing obligations",
          "Economic Crime and Corporate Transparency Act 2023 implications",
          "Regulatory enforcement case studies: NatWest, Standard Chartered, and Credit Suisse"
        ]
      },
      {
        num: 2,
        title: "Module 2: Customer Due Diligence (CDD), EDD & PEP Screening",
        duration: "10 Hours",
        description: "Hands-on execution of initial and ongoing customer identification, verification (IDV), and source of wealth investigation.",
        topics: [
          "Standard CDD vs. Simplified Due Diligence (SDD) vs. Enhanced Due Diligence (EDD)",
          "Verification of Source of Wealth (SoW) vs. Source of Funds (SoF) with legal evidence",
          "Politically Exposed Persons (PEPs), family members, and close associates (RCAs)",
          "High-Risk Third Countries (FATF Black & Grey lists) and risk weighting",
          "Ultimate Beneficial Ownership (UBO) unravelling through offshore trusts and nominee directors"
        ]
      },
      {
        num: 3,
        title: "Module 3: Sanctions Advisory, Proliferation Financing & OFSI Regime",
        duration: "10 Hours",
        description: "Comprehensive review of the UK Office of Financial Sanctions Implementation (OFSI), EU sanctions, and US OFAC regimes.",
        topics: [
          "Sanctions evasion typologies: transshipment hubs, flag hopping, and AIS spoofing",
          "Ownership and control rules (50% rule and indirect control criteria)",
          "General Licenses, Specific Licenses, and reporting frozen assets to OFSI",
          "Counter-Proliferation Financing (CPF) risk assessments under MLR 2017 amendments",
          "Sanctions list screening tools, fuzzy name matching, and true-match discounting"
        ]
      },
      {
        num: 4,
        title: "Module 4: Transaction Monitoring, Red Flags & UK NCA SAR Reporting",
        duration: "10 Hours",
        description: "Practical tradecraft in analyzing anomalous transaction volumes, drafting SARs, and avoiding tipping off.",
        topics: [
          "Rules-based and AI-powered transaction monitoring system architecture",
          "Smurfing, structuring, rapid movement of funds, and mule account identification",
          "Drafting high-quality Suspicious Activity Reports (SARs) for the UK NCA",
          "Applying for Defence Against Money Laundering (DAML) clearances",
          "Tipping-off provisions under POCA Section 333A and criminal liability protections"
        ]
      },
      {
        num: 5,
        title: "Module 5: RegTech Automation & Client Lifecycle Management (CLM)",
        duration: "10 Hours",
        description: "Modern digital onboarding pipelines, API biometric verification, and event-driven review workflows.",
        topics: [
          "Digital IDV, NFC passport chip reading, and liveness biometrics",
          "Perpetual KYC (pKYC) architecture and trigger-event monitoring",
          "Adverse media automated scraping and natural language sentiment discounting",
          "RegTech vendor selection and compliance technology integration",
          "Data privacy, GDPR compliance, and record retention under UK MLR 2017"
        ]
      },
      {
        num: 6,
        title: "Module 6: Live 20-Hour Forensic Compliance Capstone Project",
        duration: "20 Hours",
        description: "A comprehensive, realistic forensic simulation analyzing synthetic UK banking ledgers and defending an investigative portfolio.",
        topics: [
          "Ingestion of 5,000+ synthetic cross-border banking transactions",
          "Forensic entity resolution and illicit fund trail reconstruction",
          "Drafting an executive remediation dossier and practice-wide audit response",
          "Simulated live oral defense before former Tier-1 UK MLRO examiners",
          "Formal CPD UK accreditation assessment and certificate qualification"
        ]
      }
    ],
    targetAudience: [
      { title: "Compliance Officers & MLROs", desc: "Senior practitioners responsible for statutory compliance and regulatory reporting." },
      { title: "Commercial & Private Bankers", desc: "Relationship managers and onboarding specialists at UK and international banking desks." },
      { title: "Solicitors & Legal Gatekeepers", desc: "Law firm partners, risk directors, and COLP/MLCO officers navigating SRA AML audits." },
      { title: "Accountants & Auditors", desc: "ICAEW, ACCA, and HMRC-supervised accounting professionals conducting firm-wide reviews." },
      { title: "FinTech & Crypto Operators", desc: "Risk teams at neo-banks, payment service providers, and FCA-registered cryptoasset firms." }
    ],
    entryRequirements: [
      "Minimum 1 year of professional experience in financial services, law, accounting, or compliance (or relevant academic degree in law/finance).",
      "Proficiency in written and spoken English (all live lectures, documentation, and assessments are conducted in English).",
      "Access to a computer with high-speed internet to access the ReTRRAC UK Virtual Classroom and CLM Sandbox."
    ],
    assessmentMethod: "Continuous module assessments (40%) + Final 20-Hour Forensic Capstone Project & Oral Defense (60%). Passing grade of 70% required to confer the CPD UK Accredited CAFS™ Credential.",
    leadInstructor: {
      name: "Renjith Kalappurackal (Ren)",
      role: "Dean of ReTRRAC Academy & Former Fortune 500 Banking Leader",
      credentials: "MBA, 20+ Years Global Financial Services Leadership",
      bio: "Ren held senior leadership roles at Deutsche Bank, HSBC, Santander, Bank of America Merrill Lynch, and State Bank of India in London. He has guided hundreds of compliance officers through complex regulatory transformations.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
    },
    features: [
      "Official CPD UK Accredited Certificate with unique verifiable London Registry ID",
      "60 Verifiable CPD Points recognized by UK professional bodies (SRA, ICAEW, ACCA, CISI)",
      "40 Hours of live interactive lectures led by former HSBC & Deutsche Bank MLROs",
      "20 Hours of hands-on forensic capstone project work on synthetic UK banking data",
      "Lifetime access to ReTRRAC alumni network, regulatory update briefings, and event recordings",
      "Complimentary UK & Global CV Transformation and interview mentoring session"
    ],
    faqs: [
      {
        q: "Is the CAFS™ qualification recognized internationally?",
        a: "Yes. The Certified Anti-Financial Crime Specialist (CAFS™) is accredited by the CPD UK Standards Office, which is recognized across the United Kingdom, Europe, the Middle East, India, and globally by major banks, legal bodies, and accounting regulators."
      },
      {
        q: "What payment options are available for UK and international students?",
        a: "We support secure payments via PayPal in British Pounds (£ GBP) and Indian Rupees (₹ INR). You can pay using your PayPal balance or any major debit or credit card (Visa, Mastercard, American Express). Split payment invoicing is also available for corporate groups."
      },
      {
        q: "What happens if I miss a live lecture?",
        a: "All live interactive lectures are recorded in high-definition from our London studios and uploaded to the ReTRRAC Student Portal within 4 hours, accompanied by full transcripts, slides, and reading materials."
      },
      {
        q: "How does the 20-Hour Capstone Project work?",
        a: "Candidates are provisioned access to our ReTRRAC CLM Sandbox containing synthetic corporate ledgers. You will work individually and in small cohorts to trace illicit fund flows, draft SARs, and submit a defense dossier evaluated by our senior faculty."
      }
    ]
  },
  {
    id: "blackthrone-aml",
    slug: "blackthrone-training",
    code: "BT-SIM",
    title: "Blackthrone™ AML & Sanctions Evasion Simulation",
    tagline: "High-Intensity Live War Room Scenario Training Dissecting Offshore Laundering Networks and Crypto Mixers.",
    badge: "War Room Simulation",
    category: "High-Intensity Simulation",
    level: "Intermediate to Senior",
    duration: "30 Hours",
    breakdown: "20h War Room Investigations + 10h Debrief & Defense Dossier Review",
    studyMode: "100% Online • Live Interactive War Room Labs",
    priceGBP: 850,
    priceINR: 85000,
    rating: 4.92,
    reviewsCount: 192,
    accreditation: "CPD UK Standards Office Accredited",
    cpdPoints: 30,
    image: "https://images.unsplash.com/photo-1508873696983-2df5293cb325?auto=format&fit=crop&w=1200&q=80",
    cohorts: [
      { id: "bt1", date: "July 15, 2026", schedule: "Intensive 2-Week Evening Cohort (Mon/Wed/Fri)", seatsLeft: 5 },
      { id: "bt2", date: "August 10, 2026", schedule: "Weekend Masterclass Simulation", seatsLeft: 8 }
    ],
    overview: `Blackthrone™ is an intense, hands-on investigative war room simulation created by veteran financial crime investigators. Rather than passive theory, participants are dropped directly into a live crisis scenario featuring synthetic transaction telemetry from an international banking network under regulatory scrutiny.

Over 30 rigorous hours, candidates untangle complex offshore corporate webs, trace sanctioned entities using transshipment hubs, follow digital asset movement through crypto mixers, and draft actionable UK NCA Suspicious Activity Reports (SARs) under real-time time constraints.`,
    learningOutcomes: [
      "Dissect complex offshore corporate schemes involving nominee directors, bearer shares, and multi-layered trusts.",
      "Identify modern sanctions circumvention techniques including dark fleet maritime shipping and third-party jurisdiction rerouting.",
      "Trace blockchain transaction flows across decentralized exchanges and privacy mixer contracts.",
      "Formulate rapid defensible triage strategies during high-pressure supervisory inquiries.",
      "Draft prosecutable SARs with precise narrative structuring meeting UK NCA standards."
    ],
    modules: [
      {
        num: 1,
        title: "Phase 1: Shell Entity Networks & Ultimate Beneficial Owner Tracing",
        duration: "6 Hours",
        description: "Reconstructing hidden ownership structures spanning BVI, Cyprus, UAE, and Delaware entities.",
        topics: ["Corporate registry interrogation", "Nominee director discounting", "Complex trust deed analysis"]
      },
      {
        num: 2,
        title: "Phase 2: Complex Sanctions Circumvention via Transshipment Hubs",
        duration: "8 Hours",
        description: "Investigating dual-use industrial goods rerouted through secondary customs borders to evade UK OFSI prohibitions.",
        topics: ["Bills of lading forensic audits", "Vessel AIS tracking data", "Trade-based money laundering indicators"]
      },
      {
        num: 3,
        title: "Phase 3: Digital Asset & Crypto Mixer Forensic Tracing",
        duration: "8 Hours",
        description: "Following illicit funds bridged onto public blockchains, through anonymity pools, and cashed out via P2P ramps.",
        topics: ["On-chain cluster analysis", "Mixer peel chains", "VASP travel rule compliance"]
      },
      {
        num: 4,
        title: "Phase 4: Regulatory Defense & Defense Dossier Submission",
        duration: "8 Hours",
        description: "Assembling an airtight case file and presenting findings before an expert panel of compliance arbitrators.",
        topics: ["NCA SAR filing drills", "DAML clearance protocols", "Audit trial documentation"]
      }
    ],
    targetAudience: [
      { title: "Senior AML Investigators", desc: "Analysts looking to level up their forensic detection and complex case handling skills." },
      { title: "Sanctions Officers", desc: "Specialists handling trade sanctions and cross-border maritime compliance." },
      { title: "Financial Crime Heads", desc: "Leaders wanting battle-tested scenario training for their teams." }
    ],
    entryRequirements: ["Working knowledge of AML/KYC fundamentals or completion of CAFS™ Module 1-3."],
    assessmentMethod: "Practical War Room Performance & Final Defense Dossier Evaluation (Pass/Fail with Distinction).",
    leadInstructor: {
      name: "Marcus Vance",
      role: "Senior Forensic Investigator & Former UK Regulatory Advisor",
      credentials: "Former NCA Liaison & Forensic Accounting Specialist",
      bio: "Marcus has over 18 years of specialized experience in forensic accounting and cross-border financial crime investigations.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
    },
    features: [
      "Access to ReTRRAC proprietary synthetic banking transaction datasets",
      "30 Verifiable CPD UK credits upon successful completion",
      "Simulated UK NCA SAR filing and live peer review",
      "Tactical war room certificate of investigative competency"
    ],
    faqs: [
      {
        q: "Is prior coding or software experience required for Blackthrone™?",
        a: "No. All tools are accessed via an intuitive browser-based compliance interface provided by ReTRRAC."
      },
      {
        q: "Can corporate compliance teams take Blackthrone™ as a private cohort?",
        a: "Yes! We regularly deliver dedicated Blackthrone cohorts for banking teams and law firms with customized risk scenarios."
      }
    ]
  },
  {
    id: "clm-regtech",
    slug: "clients-lifecycle-management",
    code: "CLM-PRO",
    title: "Client Lifecycle Management & RegTech Architecture",
    tagline: "Master Modern Digital Onboarding Workflows, IDV Biometrics, Perpetual KYC Triggers & RegTech Systems.",
    badge: "RegTech Specialization",
    category: "Executive Masterclass",
    level: "Professional & Management",
    duration: "25 Hours",
    breakdown: "15h Architecture Labs + 10h System Deployment Case Studies",
    studyMode: "100% Online • Interactive Sandbox Labs",
    priceGBP: 650,
    priceINR: 65000,
    rating: 4.89,
    reviewsCount: 145,
    accreditation: "CPD UK Standards Office Accredited",
    cpdPoints: 25,
    image: "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=1200&q=80",
    cohorts: [
      { id: "clm1", date: "August 01, 2026", schedule: "Weekend Intensive Masterclass", seatsLeft: 12 },
      { id: "clm2", date: "August 22, 2026", schedule: "Executive Evening Cohort", seatsLeft: 15 }
    ],
    overview: `Client Lifecycle Management (CLM) has become the core infrastructure of modern financial institutions. This 25-hour specialized masterclass trains compliance leaders, product managers, and operations heads to architect and implement state-of-the-art CLM pipelines.

Explore digital identity verification (IDV), biometric liveness checks, automated corporate registry parsing across 237 jurisdictions, and event-driven perpetual KYC (pKYC) that replaces obsolete 3-year manual periodic review cycles.`,
    learningOutcomes: [
      "Architect end-to-end digital onboarding funnels that reduce drop-off while satisfying strict FCA & CASS requirements.",
      "Integrate automated IDV, optical character recognition (OCR), and multi-bureau registry APIs.",
      "Design event-driven perpetual KYC (pKYC) rule triggers based on adverse news and corporate filing changes.",
      "Evaluate RegTech vendor software architectures and formulate robust RFPs."
    ],
    modules: [
      {
        num: 1,
        title: "Module 1: Modern Digital Onboarding Architecture",
        duration: "5 Hours",
        description: "Customer acquisition journeys, multi-channel intake, and risk-based verification pathways.",
        topics: ["Omnichannel KYC intake", "Frictionless UI/UX compliance", "Regulatory standards for eIDV"]
      },
      {
        num: 2,
        title: "Module 2: Automated IDV, Biometrics & Document Verification",
        duration: "6 Hours",
        description: "Hologram verification, MRZ parsing, and facial biometric matching with passive liveness detection.",
        topics: ["Docu-fraud detection", "Biometric presentation attack detection", "Global ID database connectivity"]
      },
      {
        num: 3,
        title: "Module 3: Perpetual KYC (pKYC) & Event-Driven Triggers",
        duration: "7 Hours",
        description: "Transitioning from static periodic file reviews to real-time risk orchestration.",
        topics: ["Event-driven triggers", "Adverse news natural language parsing", "Automated remediation queue management"]
      },
      {
        num: 4,
        title: "Module 4: RegTech Vendor Selection & API Integration",
        duration: "7 Hours",
        description: "Evaluating enterprise compliance technology, API security, and audit readiness.",
        topics: ["Vendor evaluation frameworks", "API integration blueprints", "Audit trail preservation"]
      }
    ],
    targetAudience: [
      { title: "Compliance Architects", desc: "Designers of enterprise KYC/AML operating models." },
      { title: "FinTech Product Managers", desc: "Leads building digital onboarding and risk assessment journeys." },
      { title: "Operations Directors", desc: "Managers seeking to automate manual periodic remediation backlogs." }
    ],
    entryRequirements: ["Basic familiarity with financial services onboarding or compliance operations."],
    assessmentMethod: "Practical System Architecture Design Exercise & Multiple Choice Knowledge Check.",
    leadInstructor: {
      name: "Dr. Aris Thorne",
      role: "Head of RegTech Innovation at ReTRRAC Global",
      credentials: "PhD Computer Science, Former Tier-1 Banking Chief Architect",
      bio: "Dr. Thorne has deployed enterprise CLM platforms across top financial hubs in London, Frankfurt, and Singapore.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400"
    },
    features: [
      "Access to ReTRRAC CLM Sandbox Environment covering 237 countries",
      "25 CPD UK Accredited points with London registry certificate",
      "Customizable CLM vendor RFP and architecture blueprint templates",
      "Direct guidance on FCA safeguarding and CASS compliance"
    ],
    faqs: [
      {
        q: "Will I get hands-on access to the ReTRRAC CLM Platform?",
        a: "Yes! Every enrolled student is provided sandbox login credentials to configure workflows, test screening filters, and build simulated customer profiles."
      }
    ]
  },
  {
    id: "firmwide-risk-assessment",
    slug: "compliance-consulting",
    code: "FWRA-UK",
    title: "UK MLR 2017 Firm-Wide Risk Assessment (FWRA) Masterclass",
    tagline: "Tailored for Law Firms (SRA), Accountancy Practices (ICAEW), and Estate Agents under HMRC AML Supervision.",
    badge: "Gatekeeper Specialization",
    category: "Professional Practice",
    level: "MLROs, Partners & Compliance Heads",
    duration: "20 Hours",
    breakdown: "12h Theory & Template Calibration + 8h Audit Defense Workshop",
    studyMode: "100% Online • Interactive Virtual Masterclass",
    priceGBP: 550,
    priceINR: 55000,
    rating: 4.94,
    reviewsCount: 178,
    accreditation: "CPD UK Standards Office Accredited",
    cpdPoints: 20,
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80",
    cohorts: [
      { id: "fwra1", date: "July 22, 2026", schedule: "Executive 3-Day Intensive Masterclass", seatsLeft: 10 },
      { id: "fwra2", date: "August 18, 2026", schedule: "Weekend Legal & Accounting Cohort", seatsLeft: 14 }
    ],
    overview: `Regulation 18 of the UK Money Laundering Regulations 2017 makes it a strict statutory requirement for all regulated gatekeepers—law firms, accountancy practices, and estate agents—to maintain a comprehensive, up-to-date Firm-Wide Risk Assessment (FWRA). Failure to do so is the #1 reason for severe SRA and HMRC fines.

This 20-hour masterclass guides partners, compliance officers, and MLROs step-by-step through drafting, calibrating, and defending a legally sound FWRA tailored to your firm's customer base, geographic exposure, service delivery channels, and transactional risk profile.`,
    learningOutcomes: [
      "Understand supervisory expectations from SRA, ICAEW, ACCA, and HMRC under Regulation 18.",
      "Conduct a granular 5-pillar risk evaluation: Customers, Countries, Products/Services, Transactions, and Delivery Channels.",
      "Establish written Policies, Controls and Procedures (PCP) required under Regulation 19.",
      "Prepare your practice for supervisory desk audits and spot inspections with zero non-compliance findings."
    ],
    modules: [
      {
        num: 1,
        title: "Module 1: Statutory Duties under MLR 2017 Regulation 18 & 19",
        duration: "5 Hours",
        description: "The legal foundation of mandatory risk assessments and recent regulatory enforcement penalties.",
        topics: ["Regulation 18 statutory criteria", "Regulation 19 PCPs", "Supervisory thematic review lessons"]
      },
      {
        num: 2,
        title: "Module 2: Calibrating the 5 Risk Factor Pillars",
        duration: "5 Hours",
        description: "Scoring customer risk, high-risk jurisdictions, complex corporate structures, and payment modes.",
        topics: ["Inherent risk vs. Residual risk", "Source of Funds standards", "PEP and high net worth exposure"]
      },
      {
        num: 3,
        title: "Module 3: Establishing Auditable Policies, Controls & Procedures (PCP)",
        duration: "5 Hours",
        description: "Translating risk assessment findings into enforceable staff operational manuals and training logs.",
        topics: ["Drafting bespoke compliance manuals", "Annual staff AML training logs", "Independent audit triggers"]
      },
      {
        num: 4,
        title: "Module 4: Preparing for Regulatory Audits & Inspection Defense",
        duration: "5 Hours",
        description: "Simulated supervisory interviews and file sampling drills with former compliance auditors.",
        topics: ["Supervisory inspection questionnaires", "File audit sampling methods", "Corrective remediation planning"]
      }
    ],
    targetAudience: [
      { title: "Law Firm Partners & COLPs", desc: "Solicitors navigating SRA AML audits and Source of Funds compliance." },
      { title: "Accountants & Tax Advisers", desc: "Practices supervised by ICAEW, ACCA, or HMRC." },
      { title: "Estate & Letting Agents", desc: "Property professionals under HMRC anti-money laundering supervision." }
    ],
    entryRequirements: ["Relevant role in a UK regulated legal, accountancy, or property advisory business."],
    assessmentMethod: "Submission and peer-review of a Practice-Wide Risk Assessment Template Calibration.",
    leadInstructor: {
      name: "Renjith Kalappurackal (Ren)",
      role: "Chief Executive & Academy Dean",
      credentials: "MBA, 20+ Years Global Leadership",
      bio: "Ren has assisted dozens of London law firms and accountancy chambers in achieving 100% audit clearance during SRA and HMRC desk reviews.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
    },
    features: [
      "Customizable FWRA Word & Excel Templates vetted by UK Legal Counsel",
      "20 CPD UK Accredited points recognized by SRA & ICAEW",
      "Annual AML Staff Training Log template and testing questionnaires",
      "HMRC & SRA Audit Readiness Checklist with instant scoring"
    ],
    faqs: [
      {
        q: "Do I receive editable templates I can use immediately in my firm?",
        a: "Yes! You will receive our complete suite of editable Word and Excel Practice-Wide Risk Assessment templates, client risk assessment checklists, and training logs."
      }
    ]
  },
  {
    id: "crypto-fintech-aml",
    slug: "fintech-crypto-aml",
    code: "CRYPTO-AML",
    title: "FinTech, Crypto & Digital Assets Financial Crime Masterclass",
    tagline: "Specialized Qualification for Virtual Asset Service Providers (VASPs), Neo-Banks & Payment Service Providers.",
    badge: "Emerging Tech Specialization",
    category: "Executive Masterclass",
    level: "Practitioner to Specialist",
    duration: "20 Hours",
    breakdown: "12h On-Chain Forensic Labs + 8h Regulatory Licensing Workshop",
    studyMode: "100% Online • Hands-on Blockchain Analytics",
    priceGBP: 750,
    priceINR: 75000,
    rating: 4.95,
    reviewsCount: 112,
    accreditation: "CPD UK Standards Office Accredited",
    cpdPoints: 20,
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=1200&q=80",
    cohorts: [
      { id: "cr1", date: "August 10, 2026", schedule: "Weekend Virtual Lab Cohort", seatsLeft: 8 },
      { id: "cr2", date: "September 05, 2026", schedule: "Global Evening Batch", seatsLeft: 10 }
    ],
    overview: `Cryptoassets and decentralized finance have introduced unprecedented complexity into AML compliance. This 20-hour intensive masterclass provides compliance professionals with actionable skills to navigate FCA cryptoasset registration, FATF Travel Rule requirements, on-chain blockchain transaction monitoring, and crypto mixer discounting.`,
    learningOutcomes: [
      "Understand the FCA registration regime for UK cryptoasset businesses under MLR 2017 Regulation 54.",
      "Implement FATF Travel Rule messaging protocols for virtual asset transfers.",
      "Conduct wallet screening, provenance tracing, and blockchain risk scoring.",
      "Identify crypto money laundering red flags including chain hopping, privacy coins, and NFT wash trading."
    ],
    modules: [
      {
        num: 1,
        title: "Module 1: UK & Global Regulatory Architecture for Cryptoassets",
        duration: "5 Hours",
        description: "FCA supervisory regime, Travel Rule enforcement, and EU MiCA regulations.",
        topics: ["FCA crypto registration requirements", "FATF Travel Rule solutions", "MiCA stablecoin provisions"]
      },
      {
        num: 2,
        title: "Module 2: Blockchain Analytics & On-Chain Forensic Investigation",
        duration: "5 Hours",
        description: "Hands-on tracing across Bitcoin, Ethereum, and multi-chain protocols.",
        topics: ["Heuristic wallet clustering", "DEX routing analysis", "Mixer peel chain deconstruction"]
      },
      {
        num: 3,
        title: "Module 3: VASP Due Diligence & Counterparty Risk Management",
        duration: "5 Hours",
        description: "Assessing risk when executing cross-border payments with offshore virtual asset firms.",
        topics: ["Counterparty VASP due diligence", "Travel Rule sunrise issues", "Unhosted wallet verification"]
      },
      {
        num: 4,
        title: "Module 4: SAR Filing & Enforcement Case Studies",
        duration: "5 Hours",
        description: "Drafting crypto-specific SARs for the UK NCA and reviewing major international seizures.",
        topics: ["Documenting crypto transaction hashes for law enforcement", "Ransomware tracking", "Sanctioned wallet lists"]
      }
    ],
    targetAudience: [
      { title: "Crypto Compliance Officers", desc: "MLROs at exchanges, custodian wallet providers, and DeFi protocols." },
      { title: "Traditional Bank Risk Teams", desc: "Analysts evaluating crypto-exposed corporate customers." },
      { title: "Financial Investigators", desc: "Forensic accountants and law enforcement liaisons." }
    ],
    entryRequirements: ["Basic understanding of AML concepts and general familiarity with cryptocurrencies."],
    assessmentMethod: "On-Chain Blockchain Case Study Analysis & Risk Scoring Report.",
    leadInstructor: {
      name: "Marcus Vance",
      role: "Senior Forensic Investigator",
      credentials: "Former NCA Liaison & Digital Asset Forensic Specialist",
      bio: "Marcus has investigated some of the largest multi-million pound cryptocurrency laundering schemes in Western Europe.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
    },
    features: [
      "Access to simulated blockchain explorer and analytics sandboxes",
      "20 CPD UK Accredited points recognized across Europe and UK",
      "FCA Cryptoasset Registration Readiness Toolkit",
      "Travel Rule compliance operational workflow templates"
    ],
    faqs: [
      {
        q: "Do I need to own cryptocurrency or have a crypto wallet?",
        a: "No, all exercises use simulated blockchain explorers provided securely within our virtual classroom."
      }
    ]
  }
];

export function getCourseById(id) {
  return coursesCatalog.find(c => c.id === id || c.slug === id);
}
