// TODO Change this

export interface CollectedData {
  ClientInfo: {
    HardwareInfo: {
      ClientName: string,
      Campus: string,
      Floor: string,
      Room: string,
      cpuLoad: {
        [key: string]: number,
      },
      averageCPULoad: number,
    }
  };
  DateTime: string;
}
