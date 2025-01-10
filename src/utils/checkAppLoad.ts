const checkAppLoad = () => {
  return document.getElementById('approot')?.style.display === 'none'
    ? false
    : true;
};
const asyncCheckAppLoad = (cb: any) => {
  if (checkAppLoad()) return cb();
  const interval = setInterval(() => {
    if (checkAppLoad()) {
      cb();
      clearInterval(interval);
    }
  }, 100);
};
export default asyncCheckAppLoad;
