export function loadScript(src: any, callback: any) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = src;
  script.async = true;
  script.onload = callback;
  document.head.appendChild(script);
}
