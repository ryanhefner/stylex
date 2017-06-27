'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Stylex
 *
 * @version 0.1.0
 * @description Easily convert CSS styles between the DOM and Javascript, and back.
 * @author Ryan Hefner <hi@ryanhefner.com>
 */

var convertNameToJson = Symbol();
var convertNameToCss = Symbol();

var VENDOR_PREFIX_REGEX = new RegExp('(webkit|moz|ms|o)([A-Z])');

var Stylex = function () {
  function Stylex() {
    _classCallCheck(this, Stylex);
  }

  _createClass(Stylex, null, [{
    key: 'convertCssText',


    // Public Static Methods _____________________________________________________

    /**
     * Convert cssText string to JSON style object.
     *
     * @param {String} cssText
     * @return {Object}
     */
    value: function convertCssText(cssText) {
      var declarations = cssText.split(';');
      var styles = {};
      declarations.forEach(function (declaration) {
        if (declaration.indexOf(':') > -1) {
          var _declaration$split = declaration.split(':'),
              _declaration$split2 = _slicedToArray(_declaration$split, 2),
              key = _declaration$split2[0],
              value = _declaration$split2[1];

          var name = Stylex[convertNameToJson](key.trim());
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

  }, {
    key: 'convertJsonStyles',
    value: function convertJsonStyles(json) {
      var styles = '';

      Object.keys(json).forEach(function (key) {
        styles += Stylex[convertNameToCss](key) + ': ' + json[key] + ';';
      });

      return styles;
    }

    /**
     * Return the cssText for the rule specified by the selector.
     *
     * @param {String} selector
     * @return {String}
     */

  }, {
    key: 'findDOMStyles',
    value: function findDOMStyles(selector) {
      var styleSheets = document.styleSheets;
      for (var i = 0; i < styleSheets.length; i++) {
        var styleSheet = styleSheets[i];
        var rules = styleSheet.rules || styleSheet.cssRules;

        for (var j = 0; j < rules.length; j++) {
          var rule = rules[j];
          if (rule.selectorText === '' + selector) {
            var cssText = rule.cssText || rule.style.cssText;
            return cssText.replace(selector + ' ', '').replace('{ ', '').replace(' }', '');
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

  }, {
    key: convertNameToJson,
    value: function value(name) {
      if (!name) {
        return name;
      }

      if (name.length && name[0] === '-') {
        name = name.substr(1);
      }

      var parts = name.split('-');
      parts.forEach(function (part, index) {
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

  }, {
    key: convertNameToCss,
    value: function value(name) {
      if (!name) {
        return name;
      }

      if (VENDOR_PREFIX_REGEX.test(name)) {
        name = '-' + name;
      }

      name = name.replace(/[A-Z]/g, function (match) {
        return '-' + match.toLowerCase();
      });

      return name;
    }
  }]);

  return Stylex;
}();

exports.default = Stylex;