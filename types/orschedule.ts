export type OrSchedule = {
  id: number;
  opdate: string;          // date → string (ISO)
  ptname: string;
  age: number | null;
  dx: string;
  op: string;
  optype: string;
  underlying: string | null;
  note: string | null;
  que: number;
  status: string;
  media: any[];            // jsonb default []
  created_at: string;      // timestamptz → string
  updated_at: string;      // timestamptz → string
};
