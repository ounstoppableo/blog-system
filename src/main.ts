import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(() => {
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    if (isIOS) {
      setTimeout(() => {
        document.getElementById('approot')!.style.display = '';
        const bongoCat_dark = document.getElementById('bongoCat_dark');
        const bongoCat_light = document.getElementById('bongoCat_light');
        bongoCat_dark!.remove();
        bongoCat_light!.remove();
        document.getElementById('bongoCatCss')?.remove();
      }, 500);
      return;
    }
    window.addEventListener('load', () => {
      document.getElementById('approot')!.style.display = '';
      const bongoCat_dark = document.getElementById('bongoCat_dark');
      const bongoCat_light = document.getElementById('bongoCat_light');
      bongoCat_dark!.remove();
      bongoCat_light!.remove();
      document.getElementById('bongoCatCss')?.remove();
    });
  })
  .catch((err) => console.error(err));
