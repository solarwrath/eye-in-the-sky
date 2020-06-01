export interface DataRecord {
  Timestamp: string;
  ClientName: string;
  Campus: string;
  Floor: string;
  Room: string;
  HardwareInfo: {
    AverageCPULoad: number,
    MemoryLoad: number,
    CPULoad: {
      [core: number]: number
    },
  };
  GeneralHealthStatus: GeneralHealthStatus;
}

export enum GeneralHealthStatus {
  HEALTHY = 'HEALTHY',
  WARNING = 'WARNING',
  CRITICAL = 'CRITICAL'
}
