const addMathJax = () => {
  document.getElementById('mathJaxScript')?.remove();
  (window as any).MathJax = {
    //
    //  Load only TeX input and the contextual menu
    //
    loader: { load: ['input/tex', 'ui/menu'] },
    //
    //  When page is ready:
    //    disable the assistive-mathml menu item
    //    render the document
    //
    startup: {
      pageReady() {
        (window as any).MathJax.startup.document.menu.menu
          .findID('Accessibility', 'AssistiveMml')
          .disable();
        (window as any).MathJax._.mathjax.mathjax.handleRetriesFor(() =>
          (window as any).MathJax.startup.document.render(),
        );
      },
    },
    //
    //  Use dollar signs for in-line delimiters in addition to the usual ones
    //
    tex: {
      inlineMath: { '[+]': [['$', '$']] },
      blockMath: { '[+]': [['$$', '$$']] },
    },
    //
    //  Override the usual typeset render action with one that generates MathML output
    //
    options: {
      menuOptions: {
        settings: {
          assistiveMml: false,
        },
      },
      renderActions: {
        assistiveMml: [], // disable assistive mathml
        typeset: [
          150,
          (doc: any) => {
            for (const math of doc.math) {
              (window as any).MathJax.config.renderMathML(math, doc);
            }
          },
          (math: any, doc: any) =>
            (window as any).MathJax.config.renderMathML(math, doc),
        ],
      },
    },
    //
    // The action to use for rendering MathML
    //
    renderMathML(math: any, doc: any) {
      console.log(doc)
      math.typesetRoot = document.createElement('mjx-container');
      math.typesetRoot.innerHTML = (window as any).MathJax.startup.toMML(
        math.root,
      );
      math.typesetRoot.children[0].style['overflow-x'] = 'auto';
      math.typesetRoot.children[0].style['overflow-y'] = 'hidden';
    },
  };
  const mathJaxScript = document.createElement('script');
  mathJaxScript.id = 'mathJaxScript';
  mathJaxScript.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
  document.body.append(mathJaxScript);
};
export default addMathJax;
