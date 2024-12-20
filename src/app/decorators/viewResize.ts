import { setSmallSize } from '../store/smallSizeStore/smallSize.actions';

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
        window.onresize = null;
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
  window.onresize = () => {
    pageControl(self);
  };
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
