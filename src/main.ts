import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(() => {
    window.addEventListener('load', () => {
      document.getElementById('approot')!.style.display = '';
      document.getElementById('bongoCat')!.remove();
      document.getElementById('bongoCatCss')!.remove();
      document.getElementById('bongoDarkJs') && document.getElementById('bongoDarkJs')!.remove();
    });
  })
  .catch((err) => console.error(err));
