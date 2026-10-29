// AI Knowledge Base & Regulatory Intelligence for ReTRRAC Copilot & Diagnostic Scanner

export const aiPresetPrompts = [
  "What are the 6 mandatory requirements for Accountants under MLR 2017?",
  "How does ReTRRAC assist Law firms with Practice-wide Risk Assessments (PWRA)?",
  "What is the difference between CDD and EDD under UK regulations?",
  "What are the career benefits and curriculum of the CAFS™ certification?",
  "How does the ReTRRAC CLM RegTech platform perform Sanctions & PEP screening?",
  "What are High Value Dealers (HVDs) required to report to HMRC?"
];

export const aiKnowledgeResponses = {
  mlr_accountants: {
    keywords: ["accountant", "accountants", "bookkeeper", "bookkeeping", "mlr 2017", "fwra", "firm-wide"],
    title: "MLR 2017 Mandatory Requirements for Accountants",
    content: `Under the UK Money Laundering Regulations 2017 (MLR 2017), accountants and bookkeepers must satisfy 6 core obligations to avoid severe HMRC or professional body penalties:

1. **Firm-wide Risk Assessment (FWRA)**: Document and periodically update an assessment of firm vulnerability to money laundering.
2. **AML Policies & Procedures (P&P)**: Written, operational guidelines customized to your firm's specific client profiles.
3. **Transaction & Account Activity Monitoring**: Ongoing vigilance to detect anomalous transactions.
4. **Staff Training & Logs**: Regular, verifiable training with audit logs, certificates, and an up-to-date manual.
5. **Customer Due Diligence (CDD)**: Comprehensive verification of identity, address, sanctions lists, PEP databases, and adverse media.
6. **Risk Classification & Mitigation**: Tiered client risk scoring with commensurate mitigation controls.

*ReTRRAC Global provides full gap-audits and automated compliance toolkits for accounting practices.*`
  },
  lawyers_pwra: {
    keywords: ["lawyer", "lawyers", "solicitor", "solicitors", "law firm", "pwra", "sra", "source of funds", "sof"],
    title: "SRA & MLR Compliance for Legal Practices",
    content: `For Lawyers and Solicitors, the Solicitors Regulation Authority (SRA) and MLR 2017 mandate strict proactive risk management:

• **Practice-wide Risk Assessment (PWRA)**: Must specifically reflect legal work typologies (conveyancing, corporate acquisitions, trusts).
• **Source of Funds (SoF) & Source of Wealth (SoW)**: Not just checking bank statements, but validating the underlying economic origin and plausibility of assets.
• **Matter-Level Risk Assessments**: Assessing each specific instruction for red flags.
• **Customer Due Diligence (CDD)**: Biometric ID verification, UBO verification for corporate structures, and international sanctions screening.

*ReTRRAC provides SRA-ready compliance frameworks, SoF verification checklists, and bespoke legal staff masterclasses.*`
  },
  cdd_vs_edd: {
    keywords: ["cdd", "edd", "enhanced due diligence", "customer due diligence", "difference"],
    title: "Customer Due Diligence (CDD) vs Enhanced Due Diligence (EDD)",
    content: `**Customer Due Diligence (CDD)** is the standard baseline process:
• Verifying customer identity via government-issued photo ID and proof of address.
• Identifying Ultimate Beneficial Owners (UBOs) owning 25%+ of corporate entities.
• Assessing the purpose and intended nature of the business relationship.

**Enhanced Due Diligence (EDD)** is legally mandatory when higher risk is present:
• Applicable to Politically Exposed Persons (PEPs) and their family members/associates.
• Transactions involving high-risk third countries (FATF grey/black lists).
• Unusually complex or unusually large transactions with no clear economic rationale.
• Requires senior management sign-off, detailed Source of Wealth verification, and continuous real-time transaction monitoring.

*ReTRRAC's CLM platform automates both CDD and EDD workflows with real-time risk scoring across 237 jurisdictions.*`
  },
  cafs_certification: {
    keywords: ["cafs", "certification", "course", "career", "syllabus", "academy", "training", "hours"],
    title: "Certified Anti-Financial Crime Specialist (CAFS™)",
    content: `The **CAFS™** credential offered by ReTRRAC Academy is a premier CPD-accredited programme designed for banking and compliance professionals:

• **Duration**: 60 Hours (40 hours of intensive live lectures + 20 hours hands-on live client capstone project).
• **Coverage**: UK MLR, EU 6AMLD, US FinCEN, UAE CBUAE frameworks, UBO identification, PEP screening, and adverse media discounting.
• **Practical Edge**: Hands-on navigation of enterprise KYC software and real sanctions database simulations.
• **Career Support**: 1-on-1 CV building, mock interview panels with Fortune 500 compliance leaders, and CPD certification.
• **Investment**: £1,450 / ₹50,000 with flexible cohort schedules.`
  },
  clm_technology: {
    keywords: ["clm", "regtech", "technology", "screening", "sanctions", "pep", "watchlist", "automated"],
    title: "ReTRRAC Client Lifecycle Management (CLM) RegTech",
    content: `ReTRRAC's in-house CLM System delivers institutional-grade compliance automation:

• **Global Reach**: Coverage across 237 countries with support for 13,000+ government ID document types.
• **KYB Automation**: Access to 150M+ verified corporate records across 50+ national business registries.
• **Screening Engine**: Real-time screening against global Sanctions lists (OFAC, UK HMT, EU, UN), PEP registries, and adverse media.
• **Continuous Monitoring**: Automatic event-triggered alerts whenever a client's risk profile or legal status changes.`
  },
  hvd_regulations: {
    keywords: ["hvd", "high value", "luxury", "dealers", "hmrc", "art", "cash"],
    title: "High Value Dealer (HVD) Compliance Mandates",
    content: `A High Value Dealer (HVD) is any business accepting cash payments of €10,000 / £8,500 or more (in a single payment or linked payments). Under HMRC supervision:

1. **Mandatory HMRC Registration**: Unregistered high-value trading carries severe criminal penalties.
2. **Mandatory CDD on Threshold Transactions**: Validating buyer identity before cash or high-value settlement.
3. **Suspicious Activity Reporting (SAR)**: Filing timely reports with the National Crime Agency (NCA) without alerting the customer.
4. **Record Retention**: Auditable records kept securely for a minimum of 5 years.
5. **Staff Training**: Annual certified training for all sales, finance, and front-line personnel.`
  }
};

export const diagnosticQuestions = [
  {
    id: "sector",
    question: "Which regulated industry sector best describes your organization?",
    options: [
      { label: "Banks & FinTech Neo-Banks", riskWeight: 25, tip: "Subject to direct FCA/PRA/CBUAE prudential & AML supervision." },
      { label: "Accountancy & Bookkeeping Practice", riskWeight: 20, tip: "Supervised under MLR 2017 by HMRC or professional bodies." },
      { label: "Legal Firm / Solicitors Practice", riskWeight: 20, tip: "Supervised by the SRA; requires strict Source of Funds verification." },
      { label: "Estate Agency & Property Letting", riskWeight: 15, tip: "High vulnerability to illicit international capital and property laundering." },
      { label: "High Value Dealer / Art / Luxury Goods", riskWeight: 15, tip: "HMRC cash threshold regulations apply (€10k / £8.5k rules)." }
    ]
  },
  {
    id: "fwra",
    question: "Do you have a written, up-to-date Firm-wide / Practice-wide Risk Assessment (FWRA/PWRA)?",
    options: [
      { label: "Yes, fully updated within the last 12 months with auditable logs", score: 30, status: "Compliant" },
      { label: "Yes, but it has not been reviewed or updated recently (> 1 year)", score: 15, status: "Moderate Risk" },
      { label: "We have basic templates, but not a tailored written document", score: 5, status: "High Risk" },
      { label: "No written FWRA / PWRA in place currently", score: 0, status: "Critical Vulnerability" }
    ]
  },
  {
    id: "cdd_process",
    question: "How does your firm conduct Customer Due Diligence (CDD) and Sanctions/PEP screening?",
    options: [
      { label: "Automated RegTech platform with real-time continuous monitoring & UBO checks", score: 30, status: "Best Practice" },
      { label: "Digital verification at onboarding, but manual or periodic refresh checks", score: 20, status: "Acceptable" },
      { label: "Manual photo ID collection (copies of passports/utility bills) without automated screening", score: 10, status: "Vulnerable" },
      { label: "Informal checks based on client familiarity or trust", score: 0, status: "Severe Breach Risk" }
    ]
  },
  {
    id: "staff_training",
    question: "Have all relevant staff completed certified AML training with recorded audit logs?",
    options: [
      { label: "Yes, 100% of staff completed CPD-accredited AML training with logged certificates", score: 25, status: "Compliant" },
      { label: "Most key staff trained, but training logs are incomplete or informal", score: 15, status: "Moderate Gap" },
      { label: "Only senior management / MLRO received training", score: 5, status: "High Risk" },
      { label: "No formal AML training provided within the last 18 months", score: 0, status: "Critical Vulnerability" }
    ]
  },
  {
    id: "mlro_governance",
    question: "Is there a formally designated MLRO and documented SAR escalation policy?",
    options: [
      { label: "Yes, certified MLRO registered with the regulator & clear SAR protocol", score: 15, status: "Compliant" },
      { label: "Informal compliance officer designated, but SAR workflow is not documented", score: 8, status: "Moderate Gap" },
      { label: "No formal MLRO appointed or unsure", score: 0, status: "Statutory Breach" }
    ]
  }
];
