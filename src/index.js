/**
 * Regular expression used to check for the presense of vendor prefix on
 * the Javascript flavor of CSS properties.
 *
 * @const
 */
const VENDOR_PREFIX_REGEX = new RegExp('(webkit|moz|ms|o)([A-Z])');

/**
 * Convert the css attribute name to format supported by Javascript.
 *
 * @param {string} name
 * @return {string}
 */
const convertNameToJson = (name) => {
  if (!name) {
    return name;
  }

  if (name.length && name[0] === '-') {
    name = name.substr(1);
  }

  const parts = name.split('-');
  parts.forEach((part, index) => {
    if (index > 0) {
      parts[index] = `${part.charAt(0).toUpperCase()}${part.slice(1)}`;
    }
  });

  return parts.join('');
};

/**
 * Convert Javascript attribute name to format supported by CSS/DOM.
 *
 * @param {string} name
 * @return {string}
 */
const convertNameToCss = (name) => {
  if (!name) {
    return name;
  }

  if (VENDOR_PREFIX_REGEX.test(name)) {
    name = `-${name}`;
  }

  name = name.replace(/[A-Z]/g, (match) => {
    return `-${match.toLowerCase()}`;
  });

  return name;
};

class Stylex {

// Static Methods ____________________________________________________________

  /**
   * Convert cssText string to JSON style object.
   *
   * @param {String} cssText
   * @return {Object}
   */
  static convertCssText(cssText) {
    const declarations = cssText.split(';');
    const styles = {};
    declarations.forEach((declaration) => {
      if (declaration.indexOf(':') > -1) {
        const [key, value] = declaration.split(':');
        const name = convertNameToJson(key.trim());
        styles[name] = value.trim();
      }
    });

    return styles;
  }

  /**
   * Convert JSON object to cssText.
   *
   * @param {object} json
   * @return {string}
   */
  static convertJsonStyles(json) {
    let styles = '';

    Object.keys(json).forEach((key) => {
      styles += `${convertNameToCss(key)}: ${json[key]};`
    });

    return styles;
  }

  /**
   * Return the cssText for the rule specified by the selector.
   *
   * @param {string} selector
   * @return {string}
   */
  static findDOMStyles(selector) {
    const styleSheets = document.styleSheets;
    for (let i = 0; i < styleSheets.length; i++) {
      const styleSheet = styleSheets[i];
      const rules = styleSheet.rules || styleSheet.cssRules;

      for (let j = 0; j < rules.length; j++) {
        const rule = rules[j];
        if (rule.selectorText === `${selector}`) {
          const cssText = rule.cssText || rule.style.cssText;
          return cssText
            .replace(`${selector} `, '')
            .replace('{ ', '')
            .replace(' }', '');
        }
      }
    }

    return undefined;
  }
}

export default Stylex;
