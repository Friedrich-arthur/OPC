export interface SKU {
  id: string;
  name: string;
  platform: string;
  store: string;
  owner: string;
  cost: number;
  price: number;
  stock: number;
  stockInTransit: number;
  sales7d: number;
  sales30d: number;
  profit30d: number;
  status: 'Active' | 'Paused' | 'Out of Stock' | 'Clearance';
  ageDays: number;
}

export type SuggestionType = 'Inventory' | 'Listing' | 'Ads' | 'Finance';
export type SuggestionStatus = 'Pending' | 'Approved' | 'Rejected' | 'Modified';

export interface AISuggestion {
  id: string;
  type: SuggestionType;
  title: string;
  context: string;
  ruleTriggered: string;
  recommendedAction: string;
  targetId?: string; // e.g., SKU id
  status: SuggestionStatus;
  createdAt: string;
  resolvedAt?: string;
  resolvedBy?: string;
  feedback?: string;
}

export interface Metric {
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}
