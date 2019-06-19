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

/**
 * Method for grabbing all stylesheets and rules associated with <style> tags from the page.
 *
 * @return {array}
 */
const getStyles = () => {
  const styles = [];
  let i;

  // Parse linked style sheets
  const styleSheets = document.styleSheets;
  for (i = 0; i < styleSheets.length; i++) {
    styles.push(styleSheets[i]);
  }

  // Parse <style> tags
  const tags = document.querySelectorAll('style');
  for (i = 0; i < tags.length; i++) {
    styles.push(tags[i].sheet);
  }

  return styles;
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
    getStyles().forEach((style) => {
      const rules = style.rules || style.cssRules;

      if (rules) {
        for (let i = 0; i < rules.length; i++) {
          const rule = rules[i];

          if (rule.selectorText === `${selector}`) {
            const cssText = rule.cssText || rule.style.cssText;
            return cssText
              .replace(`${selector} `, '')
              .replace('{ ', '')
              .replace(' }', '');
          }
        }
      }
    });

    return undefined;
  }
}

export default Stylex;
