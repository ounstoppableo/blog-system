import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

const toggleLoadState = () => {
  document.getElementById('approot')!.style.display = '';
  const bongoCat_dark = document.getElementById('bongoCat_dark');
  const bongoCat_light = document.getElementById('bongoCat_light');
  bongoCat_dark!.remove();
  bongoCat_light!.remove();
  document.getElementById('bongoCatCss')?.remove();
};

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(() => {
    Promise.all(
      Array.from(document.querySelectorAll('link'))
        .filter(
          (link) =>
            link.href.includes('styles') || link.href.includes('iconfont'),
        )
        .map((link, index) => {
          return new Promise((resolve) => {
            const testLink: any = document.createElement('link');
            testLink.id = 'testLink' + index;
            testLink.rel = 'stylesheet';
            testLink.href = link.href;
            document.head.append(testLink);
            testLink.onload = function () {
              resolve(index);
            };
          });
        }),
    ).then((res) => {
      toggleLoadState();
      res.forEach((_, index) => {
        document.getElementById('testLink' + index)?.remove();
      });
    });
  })
  .catch((err) => console.error(err));
