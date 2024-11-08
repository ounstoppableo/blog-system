const addMathJax = () => {
  document.getElementById('mathJaxScript')?.remove();
  (window as any).MathJax = {
    chtml: {
      scale: 0.8, // global scaling factor for all expressions
      minScale: 0.5, // smallest scaling factor to use
      mtextInheritFont: false, // true to make mtext elements use surrounding font
      merrorInheritFont: true, // true to make merror text use surrounding font
      mathmlSpacing: false, // true for MathML spacing rules, false for TeX rules
      skipAttributes: {}, // RFDa and other attributes NOT to copy to the output
      exFactor: 0.5, // default size of ex in em units
      displayAlign: 'center', // default for indentalign when set to 'auto'
      displayIndent: '0', // default for indentshift when set to 'auto'
      matchFontHeight: true, // true to match ex-height of surrounding font
      fontURL: '[mathjax]/components/output/chtml/fonts/woff-v2', // The URL where the fonts are found
      adaptiveCSS: true, // true means only produce CSS that is used in the processed equations
    },
    //
    //  Load only TeX input and the contextual menu
    //
    loader: {
      load: ['input/tex', 'output/chtml'],
    },

    tex: {
      packages: { '[+]': ['AMS'] }, // extensions to use
      inlineMath: [
        // start/end delimiter pairs for in-line math
        ['$', '$'],
        ['\\(', '\\)'],
      ],
      displayMath: [
        // start/end delimiter pairs for display math
        ['$$', '$$'],
        ['\\[', '\\]'],
      ],
      processEscapes: true, // use \$ to produce a literal dollar sign
      processEnvironments: true, // process \begin{xxx}...\end{xxx} outside math mode
      processRefs: true, // process \ref{...} outside of math mode
      digits: /^(?:[0-9]+(?:\{,\}[0-9]{3})*(?:\.[0-9]*)?|\.[0-9]+)/,
      // pattern for recognizing numbers
      tags: 'all', // or 'ams' or 'all'
      tagSide: 'right', // side for \tag macros
      tagIndent: '0.8em', // amount to indent tags
      useLabelIds: true, // use label name rather than tag for ids
      maxMacros: 10000, // maximum number of macro substitutions per expression
      maxBuffer: 5 * 1024, // maximum size for the internal TeX string (5K)
      // URL for use with links to tags (when there is a <base> tag in effect)
      baseURL:
        document.getElementsByTagName('base').length === 0
          ? ''
          : String(document.location).replace(/#.*$/, ''),
      // function called when TeX syntax errors occur
      formatError: (jax: any, err: any) => jax.formatError(err),
    },
  };
  const mathJaxScript = document.createElement('script');
  mathJaxScript.id = 'mathJaxScript';
  mathJaxScript.src =
    'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
  document.body.append(mathJaxScript);
  init();
  window.addEventListener('load', () => {
    init();
  });
};

const init = () => {
  requestIdleCallback(() => {
    mathFontSizeResize();
    window.removeEventListener('resize', mathFontSizeResize);
    window.addEventListener('resize', mathFontSizeResize);
  });
};

const mathFontSizeResize = () => {
  const mjxContainer = document.querySelectorAll('mjx-container');

  mjxContainer.forEach((item: any) => {
    const parentWidth = item.parentNode.offsetWidth;
    const child = item.querySelectorAll('mjx-mlabeledtr')[0];
    const childWidth = Math.max(child.offsetWidth, item.offsetWidth);
    const ratio = childWidth / parentWidth;
    const originalFontSize = parseInt(item.style.fontSize);

    item.style.fontSize = Math.floor(originalFontSize / ratio) + '%';
  });
};
export default addMathJax;
