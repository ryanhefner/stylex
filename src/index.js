/**
 * Stylex
 *
 * @version 0.1.0
 * @description Easily convert CSS styles between the DOM and Javascript, and back.
 * @author Ryan Hefner <hi@ryanhefner.com>
 */

const convertNameToJson = Symbol();
const convertNameToCss = Symbol();

const VENDOR_PREFIX_REGEX = new RegExp('(webkit|moz|ms|o)([A-Z])');

class Stylex {

// Public Static Methods _____________________________________________________

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
        const name = Stylex[convertNameToJson](key.trim());
        styles[name] = value.trim();
      }
    });

    return styles;
  }

  /**
   * Convert JSON object to cssText.
   *
   * @param {Object} json
   * @return {String}
   */
  static convertJsonStyles(json) {
    let styles = '';

    Object.keys(json).forEach((key) => {
      styles += `${Stylex[convertNameToCss](key)}: ${json[key]};`
    });

    return styles;
  }

  /**
   * Return the cssText for the rule specified by the selector.
   *
   * @param {String} selector
   * @return {String}
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

// Private Static Methods ____________________________________________________

  /**
   * Convert the css attribute name to format supported by Javascript.
   *
   * @param {String} name
   * @return {String}
   */
  static [convertNameToJson](name) {
    if (!name) {
      return name;
    }

    if (name.length && name[0] === '-') {
      name = name.substr(1);
    }

    const parts = name.split('-');
    parts.forEach((part, index) => {
      if (index > 0) {
        part[index] = part.toUpperCase();
      }
    });

    return parts.join('');
  }

  /**
   * Convert Javascript attribute name to format supported by CSS/DOM.
   *
   * @param {String} name
   * @return {String}
   */
  static [convertNameToCss](name) {
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
  }
}

export default Stylex;
