import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { inject } from '@vercel/analytics';
import { APP_INITIALIZER, isDevMode } from '@angular/core';

inject();
platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    providers: [
      {
        provide: APP_INITIALIZER,
        useFactory: () => {
          inject({ mode: isDevMode() ? 'development' : 'production' });
        },
      },
    ],
  })
  .catch((err) => console.error(err));
