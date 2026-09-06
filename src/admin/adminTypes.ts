export type TabType =
  | 'overview'
  | 'flights'
  | 'quotes'
  | 'tours'
  | 'destinations'
  | 'testimonials'
  | 'content'
  | 'logs';

export interface AdminLogEntry {
  timestamp: string;
  section: string;
  action: string;
  data: Record<string, unknown>;
}
