import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MatMenuModule } from '@angular/material/menu';


import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
