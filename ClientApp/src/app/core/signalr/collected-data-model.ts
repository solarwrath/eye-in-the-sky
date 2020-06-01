export interface CollectedData {
  ClientInfo: {
    ClientName: string,
    Campus: string,
    Floor: string,
    Room: string,
    HardwareInfo: {
      cpuLoad: {
        [key: string]: number,
      },
      averageCPULoad: number,
    }
  };
  DateTime: string;
}
