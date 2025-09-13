import type { DomainKey } from "./banks";

export function getDomain(role: string): DomainKey {
  const s = role.toLowerCase();
  if (/(nurse|rn|clinician|doctor|md|physician|health|care)/.test(s)) return "healthcare";
  if (/(product|program|project|pmo|scrum|agile|delivery|portfolio)/.test(s)) return "product_project";
  if (/(founder|co-?founder|entrepreneur|startup|operator|gm)/.test(s)) return "startup";
  if (/(sales|marketing|growth|demand|brand|partner)/.test(s)) return "sales_marketing";
  if (/(finance|fp&a|account|ops|operations|controller|compliance)/.test(s)) return "finance_ops";
  if (/(teacher|prof|curriculum|education|instructor|advisor)/.test(s)) return "education";
  return "tech";
}
