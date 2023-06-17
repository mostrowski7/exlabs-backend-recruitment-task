import { createLogger, format, transports } from 'winston';

const { combine, timestamp, prettyPrint } = format;

const logger = createLogger({
  level: 'debug',
  format: combine(
    timestamp({
      format: 'DD-MM-YYYY HH:mm:ss',
    }),
    prettyPrint()
  ),
  transports: [new transports.Console()],
});

export default logger;
