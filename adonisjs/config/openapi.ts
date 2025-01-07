// config/openapi.ts
import path from 'node:path'
import url from 'node:url'

export default {
  path: path.dirname(url.fileURLToPath(import.meta.url)) + '/../',
  title: 'My Awesome App',
  version: '1.0.0',
  snakeCase: true,
  tagIndex: 2,
  ignore: ['/openapi', '/docs'],
  // If PUT/PATCH are provided for the same route, prefer PUT
  preferredPutPatch: 'PUT',
  common: {
    // OpenAPI conform parameters that are commonly used
    parameters: {},
    // OpenAPI conform headers that are commonly used
    headers: {},
  },
}
