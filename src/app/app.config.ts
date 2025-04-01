import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(withEventReplay()),
    provideExperimentalZonelessChangeDetection(),
    provideHttpClient(withFetch()),
  ],
};
// Se elimina Zone.js de app.config y de angular.json para evitar utilizar la detección de cambios
// * provideExperimentalZonelessChangeDetection: es un proveedor que deshabilita la detección de cambios de Angular con signals y permite que la aplicación funcione sin Zone.js.
