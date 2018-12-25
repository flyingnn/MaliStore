"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _urls = require("./pages/modules/urls.js");

var _urls2 = _interopRequireDefault(_urls);

var _system = require("./static/utils/system.js");

var _system2 = _interopRequireDefault(_system);

var _server = require("./pages/modules/server.js");

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = App({
  globalData: {},
  onLaunch: function onLaunch() {
    _system2.default.attachInfo();
    this.login();
    this.shopinfo();
  },
  shopinfo: function shopinfo() {
    var that = this;
    _server2.default.get(_urls2.default.links[0].mlshopinfo, {}).then(function (res) {
      if (res.code == 0) {
        wx.setStorage({ key: '__appShopInfo', data: res.data });
      }
    });
  },
  login: function login() {
    var that = this;
    var token = that.globalData.token;
    if (token) {
      _server2.default.get(_urls2.default.links[0].checktoken, { token: token }).then(function (res) {
        if (res.code != 0) {
          that.globalData.token = null;
          that.login();
        }
      });
      return;
    }
    wx.login({
      success: function success(res) {
        _server2.default.get(_urls2.default.links[0].wxapplogin, { code: res.code }).then(function (res) {
          if (res.code == 1e4) {
            that.globalData.userinfo = 1e4;
            return;
          }
          if (res.code != 0) {
            wx.showConfirm({
              content: "\u5C0F\u7A0B\u5E8F\u79D8\u94A5\u4FE1\u606F\u672A\u914D\u7F6E\u6216\u8005\u914D\u7F6E\u4E0D\u6B63\u786E\uFF0C\u8BF7\u68C0\u67E5\u540E\u91CD\u8BD5",
              showCancel: false,
              confirmColor: '#ffd305',
              confirmText: "\u6211\u77E5\u9053\u4E86",
              success: function success(res) {}
            });
            return;
          }
          that.globalData.userid = res.data.uid;
          wx.setStorage({ key: "__appUserInfo", data: { uid: res.data.uid, token: res.data.token } });
        });
      }
    });
  }
});