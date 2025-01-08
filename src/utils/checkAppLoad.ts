const checkAppLoad = () => {
  return document.getElementById('approot')?.style.display === 'none'
    ? false
    : true;
};
export default checkAppLoad;
