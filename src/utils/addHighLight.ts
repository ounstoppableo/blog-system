const addHighLight = () => {
  document.getElementById('hljs')?.remove();
  document.getElementById('hljsExec')?.remove();
  const code = `
    hljs.configure({ ignoreUnescapedHTML: true });
    document.querySelectorAll('pre code').forEach((el) => {
      const languageArr = el.className.split('-');
      if (languageArr.length !== 2) {
        hljs.highlightElement(el);
        return true;
      }
      const language = languageArr[1].trim();
      if (hljs.getLanguage(language)) {
        hljs.highlightElement(el);
        return true;
      }
      el.className = 'language-javascript hljs';
      hljs.highlightElement(el);
    });`;
  const hljsScript = document.createElement('script');
  hljsScript.id = 'hljs';
  hljsScript.src =
    'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js';
  document.body.append(hljsScript);
  hljsScript.onload = () => {
    const script = document.createElement('script');
    script.id = 'hljsExec';
    try {
      script.appendChild(document.createTextNode(code));
    } catch (e) {
      script.text = code;
    } finally {
      document.body.append(script);
    }
  };
};
export default addHighLight;
