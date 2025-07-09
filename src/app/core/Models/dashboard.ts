export interface Dashboard {
  countVisit: number;
  countVisitSatisfait: number;
  countVisitNonSatisfait: number;
  countReq: number;
  countReqTraite: number;
  countReqNonTraite: number;
  countVisitByMonth: { month: string; total: number }[];
  visites: any[];
  reports: any[];
  mois: string;
  annee: string;
  moisLabel: string[];
}
