import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouteReuseStrategy,
} from '@angular/router';
export class CustomReuseStrategy implements RouteReuseStrategy {
  static cacheRouters = new Map<string, DetachedRouteHandle>();
  static LRUStack: any[] = [];
  static keepAliveCount = 8;

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

  public useLRUStorePage(url: string, page: DetachedRouteHandle) {
    if (
      CustomReuseStrategy.LRUStack.length < CustomReuseStrategy.keepAliveCount
    ) {
      if (CustomReuseStrategy.cacheRouters.has(url)) {
        moveElement(
          CustomReuseStrategy.LRUStack,
          CustomReuseStrategy.LRUStack.findIndex((item) => item === url),
          CustomReuseStrategy.LRUStack.length - 1,
        );
      } else {
        CustomReuseStrategy.LRUStack.unshift(url);
      }
    } else {
      if (CustomReuseStrategy.cacheRouters.has(url)) {
        moveElement(
          CustomReuseStrategy.LRUStack,
          CustomReuseStrategy.LRUStack.findIndex((item) => item === url),
          CustomReuseStrategy.LRUStack.length - 1,
        );
      } else {
        this.clearCachedRoute(CustomReuseStrategy.LRUStack.shift());
        CustomReuseStrategy.LRUStack.unshift(url);
      }
    }
    CustomReuseStrategy.cacheRouters.set(url, page);
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
    this.useLRUStorePage(url, handle);
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

function moveElement(array: any[], fromIndex: number, toIndex: number) {
  // 边界处理：确保索引在合法范围内
  if (
    fromIndex < 0 ||
    fromIndex >= array.length ||
    toIndex < 0 ||
    toIndex >= array.length
  ) {
    throw new Error('Index out of bounds');
  }

  // 移动元素
  const element = array.splice(fromIndex, 1)[0]; // 从原位置移除元素
  array.splice(toIndex, 0, element); // 插入到新位置
  return array;
}
