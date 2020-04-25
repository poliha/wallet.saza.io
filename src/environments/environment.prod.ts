export const environment = {
  production: true,
  AUTH_TIMEOUT: 180000, // 3mins
  DB_NAME: '_sazaDBOfflineProd',
};

// needed in prod in order to recognize instance of SazaError.
// If not all errors are just instance of Error.
import 'zone.js/dist/zone-error';
