/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { registerLocaleData } from '@angular/common';
import localeEsMX from '@angular/common/locales/es-MX';

bootstrapApplication(AppComponent, appConfig)
  .catch(err => {
    console.log('error en bootstrap aplicacion')
    console.error(err)
  });
registerLocaleData(localeEsMX, 'es-MX');