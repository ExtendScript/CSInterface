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
/**
 * CSInterface - v9.4.0
 */
var CSInterface = /** @class */ (function (_super) {
    __extends(CSInterface, _super);
    function CSInterface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Retrieves the scale factor of Monitor.
     *
     * @since 8.5.0
     *
     * @return {number} value >= 1.0f only available for windows machine
     */
    CSInterface.prototype.getMonitorScaleFactor = function () {
        if (navigator.appVersion.toLowerCase().indexOf("windows") === -1) {
            throw Error('Operation System not supported');
        }
        return window.__adobe_cep__.getMonitorScaleFactor();
    };
    /**
     * @since 9.4.0
     *
     * Loads binary file created which is located at url asynchronously
     *
     * @param urlName url at which binary file is located. Local files should start with 'file://'
     * @param callback Optional. A callback function that returns after binary is loaded
     *
     * @return {boolean}
     *
     * @example
     *
     * To create JS binary use command ./cep_compiler test.js test.bin
     * To load JS binary asyncronously
     *   var CSLib = new CSInterface();
     *   CSLib.loadBinAsync(url, function () { });
     */
    CSInterface.prototype.loadBinAsync = function (urlName, callback) {
        try {
            var xhr_1 = new XMLHttpRequest();
            xhr_1.responseType = 'arraybuffer'; // make response as ArrayBuffer
            xhr_1.open('GET', urlName, true);
            xhr_1.onerror = function () {
                console.log("Unable to load snapshot from given URL");
                return false;
            };
            xhr_1.send();
            xhr_1.onload = function () {
                window.__adobe_cep__.loadSnapshot(xhr_1.response);
                if (typeof callback === "function") {
                    callback();
                }
                else if (typeof callback !== "undefined") {
                    console.log("Provided callback is not a function");
                }
            };
        }
        catch (err) {
            console.log(err);
            return false;
        }
        return true;
    };
    /**
     * @since 9.4.0
     *
     * Loads binary file created synchronously
     *
     * @param pathName the local path at which binary file is located
     *
     * @example
     * To create JS binary use command ./cep_compiler test.js test.bin
     * To load JS binary syncronously
     *   var CSLib = new CSInterface();
     *   CSLib.loadBinSync(path);
     */
    CSInterface.prototype.loadBinSync = function (pathName) {
        try {
            var OSVersion = this.getOSInformation();
            if (pathName.startsWith("file://")) {
                if (OSVersion.indexOf("Windows") >= 0) {
                    pathName = pathName.replace("file:///", "");
                }
                else if (OSVersion.indexOf("Mac") >= 0) {
                    pathName = pathName.replace("file://", "");
                }
                window.__adobe_cep__.loadSnapshot(pathName);
                return true;
            }
        }
        catch (err) {
            console.log(err);
            return false;
        }
        //control should not come here
        return false;
    };
    return CSInterface;
}(v8_1.default));
__export(require("./v8"));
exports.default = CSInterface;
