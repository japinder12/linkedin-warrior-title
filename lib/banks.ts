export const PREFIXES = ["Global","Worldwide","Cross-Functional","AI-Native","Platform","Principal","Lead","Chief","Forward-Deployed","Staff","Fractional"];
export const CORES_X  = ["X Strategist","X Architect","X Orchestrator","X Whisperer","X Evangelist","X Sherpa","X Wrangler","X Generalist","X Solutions Engineer","X Program Owner","X Enablement Lead"];
export const CORES_Y  = ["Visionary of Y","Head of Y Narrative","Director of Y Futures","Custodian of Y Excellence","Ambassador for Y","Steward of Y","Keeper of Y Roadmaps"];
export const BOOSTERS = ["0→1","10x","Go-To-Market","Edge","Scale","LLM","GenAI","Growth","Reliability","Security","Platform","Infra","Data"];
export const POSTFIXES= ["· Driving Impact at Scale"," | Storyteller"," — Builder @ Heart"," · Operator/Owner"," · Human API"," — Systems > Goals"," · Shipping Weekly"," · Problem Framer"];
export const Y_NOUNS  = ["Strategy","Systems","Outcomes","Programs","Roadmaps","Excellence"];

export const DOMAIN_BANKS = {
  general: {
    prefixes: ["Global","Senior","Lead","Principal","Regional","Strategic"],
    boosters: ["Scale","Quality","Impact","Efficiency","Growth"],
    nouns: ["Operations","Programs","Excellence","Outcomes","Systems","Services"],
    coresX: ["X Strategist","X Lead","X Coordinator","X Specialist","X Manager","X Partner"],
    coresY: ["Head of Y","Director of Y","Steward of Y","Custodian of Y"],
    postfixes: [" - Driving Outcomes"," - Systems Over Chaos"," - Stakeholder First"],
  },
  tech: {
    prefixes: PREFIXES,
    boosters: ["0→1","10x","Scale","LLM","GenAI","Platform","Infra","Data","Reliability","Security"],
    nouns: Y_NOUNS,
    coresX: CORES_X,
    coresY: CORES_Y,
    postfixes: POSTFIXES,
  },
  product_project: {
    prefixes: ["Global","Principal","Senior","Lead","Program","Portfolio"],
    boosters: ["Delivery","Roadmaps","Alignment","OKRs","Stakeholders","Scale","Risks","Agility"],
    nouns: ["Delivery","Execution","Roadmaps","Governance","PMO","Programs"],
    coresX: ["X Program Lead","X Delivery Owner","X Portfolio Manager","X Orchestrator","X Operations Strategist"],
    coresY: ["Director of Y","Head of Y","Steward of Y Excellence","Custodian of Y"],
    postfixes: [" · On-Time/On-Budget"," · Stakeholder Whisperer"," · PMO Champion"],
  },
  startup: {
    prefixes: ["Founder","Co-Founder","Fractional","Interim","Operating","Venture"],
    boosters: ["0→1","PMF","Growth","Fundraising","Scrappy","Ops","GTM"],
    nouns: ["Growth","GTM","Ops","Strategy","Product","Finance"],
    coresX: ["X Operator","X Builder","X Generalist","X Architect"],
    coresY: ["Head of Y","Director of Y","Champion of Y"],
    postfixes: [" · Wearing All The Hats"," · From Zero To One"],
  },
  healthcare: {
    prefixes: ["Chief","Lead","Senior","Clinical","Board-Certified","Attending","Registered"],
    boosters: ["Patient-Centric","Outcomes","Quality","Safety","Evidence-Based","Community Health"],
    nouns: ["Care","Operations","Quality","Safety","Informatics","Education"],
    coresX: ["X Practitioner","X Specialist","X Coordinator","X Administrator","X Informaticist"],
    coresY: ["Director of Y","Steward of Y","Head of Y Programs"],
    postfixes: [" · Compassion in Practice"," · Evidence-Based Care"],
  },
  sales_marketing: {
    prefixes: ["Global","Regional","Growth","Demand Gen","Revenue","Brand"],
    boosters: ["Pipeline","Win-Rate","CAC/LTV","Retention","GTM","Storytelling"],
    nouns: ["Growth","Acquisition","Lifecycle","Enablement","Brand","Pipeline"],
    coresX: ["X Strategist","X Leader","X Partner Manager","X Enablement Lead"],
    coresY: ["Head of Y","Director of Y","Owner of Y"],
    postfixes: [" · Numbers First"," · Story + Systems"],
  },
  finance_ops: {
    prefixes: ["Corporate","Operational","Strategic","Senior","Lead"],
    boosters: ["FP&A","Controls","Forecasting","Unit Economics","Compliance"],
    nouns: ["FP&A","Operations","Compliance","Controls","Forecasting","Reporting"],
    coresX: ["X Partner","X Analyst","X Controller","X Operations Lead"],
    coresY: ["Director of Y","Head of Y"],
    postfixes: [" · Calm Under Chaos"],
  },
  education: {
    prefixes: ["Lead","Senior","Instructional","Curriculum","Academic"],
    boosters: ["Student Success","Learning Outcomes","Assessment","Equity"],
    nouns: ["Curriculum","Instruction","Programs","Student Success","Assessment"],
    coresX: ["X Coordinator","X Designer","X Instructor","X Advisor"],
    coresY: ["Director of Y","Head of Y"],
    postfixes: [" · Learning First"],
  },
  legal: {
    prefixes: ["General","Senior","Lead","Corporate","Regulatory"],
    boosters: ["Regulatory","Ethics","Governance","Risk"],
    nouns: ["Counsel","Compliance","Governance","Contracts","Risk"],
    coresX: ["X Counsel","X Advisor","X Specialist","X Operations Lead"],
    coresY: ["Director of Y","Head of Y","Steward of Y"],
    postfixes: [" - Sound Judgment"],
  },
  creative: {
    prefixes: ["Creative","Senior","Lead","Art","Executive"],
    boosters: ["Taste","Craft","Story","Originality"],
    nouns: ["Design","Content","Brand","Film","Editorial"],
    coresX: ["X Director","X Producer","X Strategist","X Lead","X Partner"],
    coresY: ["Head of Y","Director of Y","Steward of Y"],
    postfixes: [" - From Brief to Breakthrough"],
  },
  data_analytics: {
    prefixes: ["Senior","Lead","Insights","Analytics","Data"],
    boosters: ["Clarity","Rigor","Signal","Impact"],
    nouns: ["Analytics","Insights","Reporting","Experimentation"],
    coresX: ["X Analyst","X Scientist","X Strategist","X Partner"],
    coresY: ["Head of Y","Director of Y"],
    postfixes: [" - Evidence Over Opinions"],
  },
  customer_success: {
    prefixes: ["Customer","Client","Success","Senior","Lead"],
    boosters: ["NPS","Adoption","Retention","Value"],
    nouns: ["Success","Support","Enablement","Onboarding","Retention"],
    coresX: ["X Manager","X Partner","X Advocate","X Strategist"],
    coresY: ["Head of Y","Director of Y"],
    postfixes: [" - Outcomes Over Outputs"],
  },
};

export type DomainKey = keyof typeof DOMAIN_BANKS;
