import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from "@angular/router";
export class CustomReuseStrategt implements RouteReuseStrategy {
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return false
  }
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
  }
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return false
  }
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return null
  }
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return false
  }
}
