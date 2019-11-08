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

import CSInterfaceV8 from "./v8";

export * from './v8'

/**
 * CSInterface - v9.4.0
 */
export default class CSInterface extends CSInterfaceV8 {
    /**
     * Retrieves the scale factor of Monitor.
     *
     * @since 8.5.0
     *
     * @return {number} value >= 1.0f only available for windows machine
     */
    getMonitorScaleFactor(): number {

        if (navigator.appVersion.toLowerCase().indexOf("windows") ===  -1) {
            throw Error('Operation System not supported');
        }

        return window.__adobe_cep__.getMonitorScaleFactor();
    }

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
    loadBinAsync(urlName: string, callback: Function): boolean {
        try
        {
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'arraybuffer'; // make response as ArrayBuffer
            xhr.open('GET', urlName, true);
            xhr.onerror = function ()
            {
                console.log("Unable to load snapshot from given URL");
                return false;
            };
            xhr.send();
            xhr.onload = () => {
                window.__adobe_cep__.loadSnapshot(xhr.response);
                if (typeof callback === "function")
                {
                    callback();
                }
                else if(typeof callback !== "undefined")
                {
                    console.log("Provided callback is not a function");
                }
            }
        }
        catch(err)
        {
            console.log(err);
            return false;
        }

        return true;
    }

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
    loadBinSync(pathName: string): boolean {
        try
        {
            const OSVersion = this.getOSInformation();
            if(pathName.startsWith("file://"))
            {
                if (OSVersion.indexOf("Windows") >= 0)
                {
                    pathName = pathName.replace("file:///", "");
                }
                else if (OSVersion.indexOf("Mac") >= 0)
                {
                    pathName = pathName.replace("file://", "");
                }
                window.__adobe_cep__.loadSnapshot(pathName);
                return true;
            }
        }
        catch(err)
        {
            console.log(err);
            return false;
        }
        //control should not come here
        return false;
    }
}