export type LogType = 'error' | 'info';
export type LogMessage = {
  time: number;
  logType: LogType;
  message: string;
};
export type Logs = LogMessage[];
