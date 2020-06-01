export interface PC {
  id: number;
  roomId: number;
  data: PCData;
}

export enum GeneralHealthStatus {
  UNDEFINED = 'UNDEFINED',
  HEALTHY = 'HEALTHY',
  WARNING = 'WARNING',
  CRITICAL = 'CRITICAL',
}

export interface PCData {
  pcName: string;
  generalHealthStatus: GeneralHealthStatus;
}
