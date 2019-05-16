"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingPage = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactSvgSpinner = _interopRequireDefault(require("react-svg-spinner"));

var _sweetalert = _interopRequireDefault(require("sweetalert2"));

var _axios = _interopRequireDefault(require("axios"));

var _react2 = require("nodereactor/react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var SettingPage =
/*#__PURE__*/
function (_Component) {
  _inherits(SettingPage, _Component);

  function SettingPage(props) {
    var _this;

    _classCallCheck(this, SettingPage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SettingPage).call(this, props));
    _this.state = {
      'ss_regex': 'bot|crawler|spider|crawling|facebookexternalhit',
      'loading': false
    };
    _this.saveOption = _this.saveOption.bind(_assertThisInitialized(_this));
    _this.setVal = _this.setVal.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(SettingPage, [{
    key: "setVal",
    value: function setVal(e) {
      var el = e.currentTarget;
      var v = el.value;
      this.setState({
        'ss_regex': v
      });
    }
  }, {
    key: "saveOption",
    value: function saveOption() {
      var _this2 = this;

      var vals = {
        'action': 'nr_save_ss_render_settings',
        'ss_regex': this.state.ss_regex
      };
      this.setState({
        'loading': true
      });
      (0, _axios["default"])({
        method: 'post',
        url: _react2.ajax_url,
        data: vals
      }).then(function (r) {
        _this2.setState({
          'loading': false
        });

        _sweetalert["default"].fire('Saved');
      })["catch"](function (r) {
        _this2.setState({
          'loading': false
        });

        _sweetalert["default"].fire('Error', 'Request Failed', 'error');
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      this.setState({
        'loading': true
      });
      (0, _axios["default"])({
        method: 'post',
        url: _react2.ajax_url,
        data: {
          'action': 'nr_get_ss_options'
        }
      }).then(function (r) {
        _this3.setState({
          'loading': false
        });

        if (r.data && r.data.ss_regex) {
          _this3.setState({
            'ss_regex': r.data.ss_regex
          });

          _this3.rg_txt.value = r.data.ss_regex;
        }
      })["catch"](function (r) {
        _this3.setState({
          'loading': false
        });

        _sweetalert["default"].fire('Error', 'Request Failed', 'error');
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var txt_css = {
        'whiteSpace': 'nowrap',
        'overflow': 'auto',
        'minHeight': '150px'
      };
      return _react["default"].createElement("div", null, _react["default"].createElement("h3", null, "Server Side Render ", this.state.loading ? _react["default"].createElement(_reactSvgSpinner["default"], {
        size: "15"
      }) : null), _react["default"].createElement("hr", null), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-12 col-sm-4 col-md-3 col-lg-2"
      }, "User Agent JS Regex", _react["default"].createElement("br", null), _react["default"].createElement("small", null, "Case insensitive by default.")), _react["default"].createElement("div", {
        className: "col-12 col-sm-8 col-md-6 col-lg-4"
      }, _react["default"].createElement("textarea", {
        style: txt_css,
        ref: function ref(el) {
          return _this4.rg_txt = el;
        },
        className: "form-control",
        defaultValue: this.state.ss_regex,
        onChange: this.setVal
      }), _react["default"].createElement("small", null, "Separate by new line. Without delimiter."), _react["default"].createElement("br", null), _react["default"].createElement("button", {
        className: "btn btn-secondary btn-sm",
        onClick: this.saveOption
      }, "Save"))));
    }
  }]);

  return SettingPage;
}(_react.Component);

exports.SettingPage = SettingPage;