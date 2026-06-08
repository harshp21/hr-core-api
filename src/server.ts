import app from './app';
import { env, validateConfiguration } from '@config/env';

// Validate critical configuration at startup before binding to port
validateConfiguration();

const port = env.port;

app.listen(port, () => {
  console.log(`${env.appName} listening on http://localhost:${port}`);
});
