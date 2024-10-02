const fs = require('fs');
const path = require('path');

module.exports = function inlineCss() {
  return {
    name: 'vite-plugin-inline-css',
    apply: 'build',
    enforce: 'post',
    generateBundle(options, bundle) {
      for (const file in bundle) {
        if (bundle[file].type === 'asset' && bundle[file].fileName.endsWith('.css')) {
          const cssCode = bundle[file].source;
          delete bundle[file];
          for (const jsFile in bundle) {
            if (bundle[jsFile].type === 'chunk' && bundle[jsFile].fileName.endsWith('.js')) {
              bundle[jsFile].code = `const style = document.createElement('style'); style.textContent = \`${cssCode}\`; document.head.appendChild(style);\n` + bundle[jsFile].code;
            }
          }
        }
      }
    }
  }
}
