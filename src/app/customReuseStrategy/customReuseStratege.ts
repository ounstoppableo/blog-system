import { DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';
export class CustomReuseStrategt implements RouteReuseStrategy {
  shouldAttach(): boolean {
    return false;
  }
  store(): void {}
  shouldDetach(): boolean {
    return false;
  }
  retrieve(): DetachedRouteHandle | null {
    return null;
  }
  shouldReuseRoute(): boolean {
    return false;
  }
}
