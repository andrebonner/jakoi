import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: 'https://56e6a93982fa419a8d5194a1518bae1b@app.glitchtip.com/558',
  autoSessionTracking: true,
});

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((success) => console.log(`Bootstrap success`))
  .catch((err) => console.error(err))
  ;
