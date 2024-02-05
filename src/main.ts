import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(() => {
    window.addEventListener('load', () => {
      document.getElementById('approot')!.style.display = '';
      const bongoCat_dark = document.getElementById('bongoCat_dark');
      const bongoCat_light = document.getElementById('bongoCat_light');
      bongoCat_dark?.style.display === ''
        ? (bongoCat_dark!.style.display = 'none')
        : (bongoCat_light!.style.display = 'none');
      document.getElementById('bongoCatCss')?.remove();
    });
  })
  .catch((err) => console.error(err));
