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

    class CSInterface extends CSInterfaceV8 {

        getMonitorScaleFactor(): number {
            return window.__adobe_cep__.getMonitorScaleFactor();
        }
    }
}
