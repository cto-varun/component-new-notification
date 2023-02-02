"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = NewNotification;
var _react = _interopRequireWildcard(require("react"));
var _componentCache = require("@ivoyant/component-cache");
var _antd = require("antd");
var _icons = require("@ant-design/icons");
var _componentMessageBus = require("@ivoyant/component-message-bus");
require("./styles.css");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function NewNotification(_ref) {
  let {
    visible,
    setShowNewNotification
  } = _ref;
  const newNotificationCachedData = _componentCache.cache.get('WhatsNewNotificationData');
  const [notificationData, setNotificationData] = (0, _react.useState)(newNotificationCachedData ? newNotificationCachedData : undefined);
  const [pending, setPending] = (0, _react.useState)(true);
  let {
    attId
  } = window[window.sessionStorage?.tabId].COM_IVOYANT_VARS;
  const handleNotificationData = () => (subscriptionId, topic, eventData, closure) => {
    if (eventData) {
      setNotificationData(eventData);
    }
  };
  (0, _react.useEffect)(() => {
    if (notificationData !== undefined) {
      setPending(false);
    }
  }, [notificationData]);
  (0, _react.useEffect)(() => {
    setTimeout(() => {
      if (notificationData === undefined) {
        setPending(false);
      }
    }, 8000);
  }, []);
  (0, _react.useEffect)(() => {
    _componentMessageBus.MessageBus.subscribe('GETNOTIFICATIONDATA', 'GETNOTIFICATIONDATA', handleNotificationData(), {});
    return () => {
      _componentMessageBus.MessageBus.unsubscribe('GETNOTIFICATIONDATA');
      _componentMessageBus.MessageBus.unsubscribe('NEWNOTIFICATION'.concat('.').concat(attId));
    };
  }, []);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd.Modal, {
    title: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_icons.ToolOutlined, {
      style: {
        color: '#52C41A'
      },
      className: "title-icon"
    })), ' ', "Latest Releases and Bugfixes", ' ', /*#__PURE__*/_react.default.createElement("span", {
      className: "title-date"
    }, ' ', "| ", notificationData?.releaseDate))),
    open: visible,
    onOk: () => setShowNewNotification(false),
    onCancel: () => setShowNewNotification(false),
    footer: null,
    centered: true,
    closable: true,
    closeIcon: /*#__PURE__*/_react.default.createElement(_icons.MinusOutlined, null),
    width: 600
  }, /*#__PURE__*/_react.default.createElement(_antd.Spin, {
    tip: "Loading...",
    spinning: pending
  }, !pending && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, notificationData !== undefined ? /*#__PURE__*/_react.default.createElement("div", {
    className: "all-section-wrapper"
  }, /*#__PURE__*/_react.default.createElement("div", null, notificationData?.releaseInfo?.newFeatures?.length > 0 && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "topic-header-section"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "topic-name"
  }, "New Features")), notificationData?.releaseInfo?.newFeatures?.map(feature => {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
      className: "sub-topic-box"
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "sub-topic-name"
    }, feature?.name)), /*#__PURE__*/_react.default.createElement("div", {
      className: "feature-description"
    }, /*#__PURE__*/_react.default.createElement("span", null, feature?.description)), /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: feature?.url ? 20 : 24
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        height: '10px'
      }
    })), feature?.url && /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: 4
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "url-text"
    }, /*#__PURE__*/_react.default.createElement("a", {
      className: "url-text-link",
      href: feature?.url,
      target: "_blank"
    }, "LEARN MORE"))))));
  })), notificationData?.releaseInfo?.enhancements?.length > 0 && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "topic-header-section"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "topic-name"
  }, "Enhancements")), notificationData?.releaseInfo?.enhancements?.map(feature => {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
      className: "sub-topic-box"
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "sub-topic-name"
    }, feature?.name)), /*#__PURE__*/_react.default.createElement("div", {
      className: "feature-description"
    }, /*#__PURE__*/_react.default.createElement("span", null, feature?.description)), /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: feature?.url ? 20 : 24
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        height: '10px'
      }
    })), feature?.url && /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: 4
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "url-text"
    }, /*#__PURE__*/_react.default.createElement("a", {
      className: "url-text-link",
      href: feature?.url,
      target: "_blank"
    }, "LEARN MORE"))))));
  })), notificationData?.releaseInfo?.bugFixes?.length > 0 && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "topic-header-section"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "topic-name"
  }, "Bug Fixes")), notificationData?.releaseInfo?.bugFixes?.map(feature => {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
      className: "sub-topic-box"
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "sub-topic-name"
    }, feature?.name)), /*#__PURE__*/_react.default.createElement("div", {
      className: "feature-description"
    }, /*#__PURE__*/_react.default.createElement("span", null, feature?.description)), /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: feature?.url ? 20 : 24
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        height: '10px'
      }
    })), feature?.url && /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: 4
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "url-text"
    }, /*#__PURE__*/_react.default.createElement("a", {
      className: "url-text-link",
      href: feature?.url,
      target: "_blank"
    }, "LEARN MORE"))))));
  })))) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "no-data-available"
  }, "No data is available to display"))))));
}
module.exports = exports.default;