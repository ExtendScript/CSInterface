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
/**
 * CSInterface - v9.4.0
 */
declare class CSInterface extends CSInterfaceV8 {
    /**
     * Retrieves the scale factor of Monitor.
     *
     * @since 8.5.0
     *
     * @return {number} value >= 1.0f only available for windows machine
     */
    getMonitorScaleFactor(): number;
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
    loadBinAsync(urlName: string, callback: Function): boolean;
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
    loadBinSync(pathName: string): boolean;
}
export * from './v8';
export default CSInterface;
