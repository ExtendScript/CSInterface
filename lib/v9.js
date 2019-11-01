"use strict";
/**************************************************************************************************
 *
 * ADOBE SYSTEMS INCORPORATED
 * Copyright 2013 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
 * terms of the Adobe license agreement accompanying it.  If you have received this file from a
 * source other than Adobe, then your use, modification, or distribution of it requires the prior
 * written permission of Adobe.
 *
 **************************************************************************************************/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var v8_1 = require("./v8");
__export(require("./v8"));
/** CSInterface - v9.2.0 */
/**
 * Retrieves the scale factor of Monitor.
 *
 * @since 8.5.0
 *
 * @return value >= 1.0f
 * only available for windows machine
 */
if (navigator.appVersion.toLowerCase().indexOf("windows") >= 0) {
    var CSInterface = /** @class */ (function (_super) {
        __extends(CSInterface, _super);
        function CSInterface() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CSInterface.prototype.getMonitorScaleFactor = function () {
            return window.__adobe_cep__.getMonitorScaleFactor();
        };
        return CSInterface;
    }(v8_1.default));
}
