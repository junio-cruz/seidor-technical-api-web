import { app } from './index';
import { Logger } from '../../infra/logger/Logger';
import { logging } from '../../infra/logger/Manager';
import { AppConfig } from '../../infra/config/AppConfig';
import { DatabaseSession } from '../../infra/database/session';

(async () => {
  const SERVER_PORT = 8001;
  const appConfig = new AppConfig();
  const logger: Logger = logging(appConfig.getValue('LOG_LEVEL')).getLogger(
    'Server',
  );
  try {
    const database = new DatabaseSession([]).getSession();
    console.log('Database running', !!database);
    await app.run(SERVER_PORT);
    console.log(`server running on port: ${SERVER_PORT}`);
  } catch (error) {
    logger.error('application not started', error);
    process.exit(1);
  }
})();
