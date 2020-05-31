export interface PC {
  id: number;
  roomId: number;
  pcName: string;
  generalHealthStatus: GeneralHealthStatus;
}

export enum GeneralHealthStatus {
  UNDEFINED = 'UNDEFINED',
  HEALTHY = 'HEALTHY',
  WARNING = 'WARNING',
  CRITICAL = 'CRITICAL',
}
