"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingPage = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("nodereactor/react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var fields = {
  ss_regex: {
    title: 'User Agent JS Regex',
    type: 'textarea',
    hint: ['Separate by new line, without delimiter.', 'Case insensitive by default.']
  }
};

var SettingPage = function SettingPage() {
  return _react["default"].createElement(_react2.BasicSettings, {
    title: "User Agent JS Regex",
    fields: fields,
    package_name: "server-side-render"
  });
};

exports.SettingPage = SettingPage;