import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouteReuseStrategy,
} from '@angular/router';
export class CustomReuseStrategy implements RouteReuseStrategy {
  static cacheRouters = new Map<string, DetachedRouteHandle>();

  /*
   ** 清除cachedroute:
   ** (this.routeReuseStrategy as AppRouteReuseStrategy).clearCachedRoute('/factory/factoryManage');
   */
  public clearCachedRoute(key: string) {
    const handle = CustomReuseStrategy.cacheRouters.get(key);

    if (handle) {
      (handle as any).componentRef.destroy();
    }

    CustomReuseStrategy.cacheRouters.delete(key);
  }

  public clearCacheOnNewUrl(url: string) {
    CustomReuseStrategy.cacheRouters.forEach((val: any, key: any) => {
      if (url.indexOf(key) === -1) {
        this.clearCachedRoute(key);
      }
    });
  }

  // 进入路由触发，是否同一路由时复用路由
  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot,
  ): boolean {
    return (
      future.routeConfig === curr.routeConfig &&
      JSON.stringify(future.params) === JSON.stringify(curr.params)
    );
  }

  // 获取存储路由
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | any {
    const url = this.getFullRouteURL(route);
    if (this.shouldDetach(route) && CustomReuseStrategy.cacheRouters.has(url)) {
      return CustomReuseStrategy.cacheRouters.get(url);
    } else {
      return null;
    }
  }

  // 是否允许复用路由
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return Boolean(route.data['keepAlive']);
  }
  // 当路由离开时会触发，存储路由
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    const url = this.getFullRouteURL(route);
    CustomReuseStrategy.cacheRouters.set(url, handle);
  }
  //  是否允许还原路由
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const url = this.getFullRouteURL(route);
    return (
      this.shouldDetach(route) && CustomReuseStrategy.cacheRouters.has(url)
    );
  }

  // 获取当前路由url
  private getFullRouteURL(route: ActivatedRouteSnapshot): string {
    const { pathFromRoot } = route;
    let fullRouteUrlPath: string[] = [];
    pathFromRoot.forEach((item: ActivatedRouteSnapshot) => {
      fullRouteUrlPath = fullRouteUrlPath.concat(this.getRouteUrlPath(item));
    });
    return `/${fullRouteUrlPath.join('/')}`;
  }
  private getRouteUrlPath(route: ActivatedRouteSnapshot) {
    return route.url.map((urlSegment) => urlSegment.path);
  }
}
