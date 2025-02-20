import { setSmallSize } from '../store/smallSizeStore/smallSize.actions';
const eventCache: any = {};
export default function ViewResize() {
  return function (
    target: any,
    propertyKey: string,
    descriptor?: PropertyDescriptor,
  ) {
    if (propertyKey === 'ngAfterViewInit') {
      const fn = descriptor!.value;
      descriptor!.value = function () {
        fn.call(this);
        onResize(this);
      };
    }
    if (propertyKey === 'ngOnDestroy') {
      const fn = descriptor!.value;
      descriptor!.value = function () {
        fn.call(this);
        window.removeEventListener('resize', eventCache.cb);
      };
    }
    if (propertyKey === 'ngOnInit') {
      const fn = descriptor!.value;
      descriptor!.value = function () {
        fn.call(this);
        pageControl(this);
      };
    }
  };
}
//监控页面大小变化事件
function onResize(self: any) {
  eventCache.cb = () => {
    pageControl(self);
  };
  window.addEventListener('resize', eventCache.cb);
}
//页面参数控制
function pageControl(self: any) {
  if (innerWidth < 1024) {
    self.store.dispatch(setSmallSize({ flag: true }));
  } else {
    self.store.dispatch(setSmallSize({ flag: false }));
  }
  document.documentElement.style.setProperty(
    '--bodyHeight',
    innerHeight + 'px',
  );
}
