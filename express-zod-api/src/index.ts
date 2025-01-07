import { createConfig } from 'express-zod-api';
import { createServer } from 'express-zod-api';
import { Routing } from 'express-zod-api';
import authorsEndpoint from './routes/authors';
import { Documentation } from 'express-zod-api';
import { apiReference } from '@scalar/express-api-reference';

const config = createConfig({
  http: {
    listen: 3000 // port, UNIX socket or options
  },
  cors: true,
  beforeRouting: ({ app }) => {
    app.use(
      '/reference',
      apiReference({ theme: 'solarized', spec: { content: doc.getSpecAsJson() } })
    );
  },
  logger: {
    level: 'silent'
  }
});

const routing: Routing = {
  authors: {
    ':id': authorsEndpoint
  }
};

const doc = new Documentation({
  routing, // the same routing and config that you use to start the server
  config,
  version: '1.2.3',
  title: 'Example API',
  serverUrl: 'http://localhost:3000',
  composition: 'inline' // optional, or "components" for keeping schemas in a separate dedicated section using refs
  // descriptions: { positiveResponse, negativeResponse, requestParameter, requestBody } // check out these features
});

createServer(config, routing);
