
export class IMSInterface {
    /**
     * Establishes an IMS session. Must be called before any IMS access methods.
     * This method is not thread safe.
     *
     * @return An IMS reference string, as returned from IMSLib, which you
     *  can then use to make further IMS calls to this object's methods.
     *
     * @deprecated Please use imsConnectWithEndpoint instead.
     */
    imsConnect(): string {
        return window.__adobe_cep__.imsConnect();
    }

    imsDisconnect(imsRef: string): void {
        window.__adobe_cep__.imsDisconnect(imsRef);
    }

    imsConnectWithEndpoint(imsEndpoint?: string): string {
        return JSON.parse(window.__adobe_cep__.invokeSync("imsConnectWithEndpoint", JSON.stringify({imsEndpoint: imsEndpoint}))).result
    }

    imsFetchAccounts(imsRef: string, clientId: string): string {
        return window.__adobe_cep__.imsFetchAccounts(imsRef, clientId);
    }

    imsFetchUserProfileData(imsRef: string, userAccountGuid: string): string {
        const data = {
            imsRef: imsRef,
            userAccountGuid: userAccountGuid
        };
        return window.__adobe_cep__.invokeSync("imsFetchUserProfileData", JSON.stringify(data))
    }

    /**
     * Requests an access token from IMS for a given user and service.
     *
     * This function is asynchronous. To handle the result, register a callback for the event
     * "com.adobe.csxs.events.internal.ims.FetchAccessToken" or "com.adobe.csxs.events.internal.ims.FetchAccessTokenWithStatus".
     * For event "com.adobe.csxs.events.internal.ims.FetchAccessToken", the event data is a JSON string
     * with format {"toua":"...",...,"emailVerified":"false"}.
     * For event "com.adobe.csxs.events.internal.ims.FetchAccessTokenWithStatus", the event data is a JSON string
     * with format {"status":"0","details":{"toua":"...",...,"emailVerified":"false"}}.
     *
     * @see addEventListener()
     *
     * @param imsRef         An IMS reference returned from the \c IMSConnect() call.
     * @param clientId       The IMS client ID for your extension, assigned by the IMS team on registration.
     *               This is the service-code value in the Renga Service Account Object for your client.
     * @param clientSecret       The client secret associated with the provided client ID
     * @param userAccountGuid    The unique person GUID for the Renga account, as returned by the <code>fetchAccounts()</code> method. The token is generated for this user.
     * @param serviceAccountGuid (optional, not currently used) A unique identifier for a Service Account Object (SAO).
     * @param scope          (optional) A comma delimited list of services for which the refresh and access tokens are requested.
     *
     * By default, this is 'openid,AdobeID'. Scope strings are case sensitive.
     * If the cached version of the refresh token does not match the requested service scopes, a new refresh token is fetched.
     * To request your service's own SAO, add your service to the list;
     * for example,  'openid,AdobeID,browserlab'.
     *
     * @return A boolean status. Returning true means only the call to imsFetchAccessToken function itself is successful.
     *                            Returning false means that failed to fetch access token.
     */
    imsFetchAccessToken(imsRef: string, clientId: string, clientSecret: string, userAccountGuid: string, serviceAccountGuid?: string, scope?: string): boolean {
        return window.__adobe_cep__.imsFetchAccessToken(imsRef, clientId, clientSecret, userAccountGuid, serviceAccountGuid, scope);
    }

    imsFetchContinueToken(imsRef: any, bearerToken: string, targetClientId: string, redirectUri?: string, scope?: string, responseType?: string, locale?: string): string {
        const data = {
            imsRef: imsRef,
            bearerToken: bearerToken,
            targetClientId: targetClientId,
            redirectUri: redirectUri,
            scope: scope,
            responseType: responseType,
            locale: locale
        };

        return JSON.parse(window.__adobe_cep__.invokeSync("imsFetchContinueToken", JSON.stringify(data))).result;
    }

    imsRevokeDeviceToken(imsRef: string, clientId: string, clientSecret: string, userAccountGuid: string, serviceAccountGuid?: string): boolean {
        return window.__adobe_cep__.imsFetchAccessToken(imsRef, clientId, clientSecret, userAccountGuid, serviceAccountGuid, "REVOKE");
    }

    imsSetProxyCredentials(proxyUsername: string, proxyPassword: string): void {
        window.__adobe_cep__.imsSetProxyCredentials(proxyUsername, proxyPassword);
    }

    showAAM(clientId: string, clientSecret: string, redirectUri: string, userAccountGuid: string, serviceAccountGuid: string, scope: string): Boolean {
        return window.__adobe_cep__.showAAM(clientId, clientSecret, redirectUri, userAccountGuid, serviceAccountGuid, scope)
    }

    imsGetCurrentUserId(): object {
        return window.__adobe_cep__.getCurrentImsUserId();
    }

    imsGetCurrentUserIdHelper(callback: Function): void {
        const hostEnvironment = JSON.parse(window.__adobe_cep__.getHostEnvironment());
        const appName = hostEnvironment.appName;

        if ("ILST" === appName) {
            window.__adobe_cep__.evalScript("app.userGUID", function (result: any) {
                callback(result);
            });
        } else if ("IDSN" === appName) {
            window.__adobe_cep__.evalScript("app.userGuid", function (result: any) {
                callback(result);
            });
        } else if ("PHSP" === appName || "PHXS" === appName) {
            window.__adobe_cep__.evalScript("var getUserIdPhotoshop = function() {var userId = '';try {var bhnc = app.charIDToTypeID('bhnc');var ref = new ActionReference();ref.putProperty(app.charIDToTypeID('Prpr'), bhnc);ref.putEnumerated(app.charIDToTypeID('capp'), app.charIDToTypeID('Ordn'), app.charIDToTypeID('Trgt'));var appDesc = app.executeActionGet(ref);if (appDesc.hasKey(bhnc)) {userId = appDesc.getString(bhnc);}} catch (e) {}return userId;};", function (result: any) {
                window.__adobe_cep__.evalScript("getUserIdPhotoshop()", function (result: any) {
                    callback(result);
                })
            });
        } else {
            const clientId = window.__adobe_cep__.getCurrentImsUserId();
            callback(clientId)
        }
    }

    imsLogoutUser(imsRef: string, userAccountGuid: string, clientId: string): object {
        const data = {
            imsRef: imsRef,
            userAccountGuid: userAccountGuid,
            clientId: clientId
        };
        return JSON.parse(window.__adobe_cep__.invokeSync("imsLogoutUser", JSON.stringify(data))).result
    }

    imsAttemptSSOJumpWorkflows(openBrowser: boolean, url: string, imsRef: string, clientId?: string, clientSecret?: string, scope?: string, userAccountGuid?: string, targetClientId?: string, targetScope?: string, targetResponseType?: string, targetLocale?: string) {
        const data = {
            openBrowser: openBrowser,
            url: url,
            imsRef: imsRef,
            clientId: clientId,
            clientSecret: clientSecret,
            scope: scope,
            userAccountGuid: userAccountGuid,
            targetClientId: targetClientId,
            targetScope: targetScope,
            targetResponseType: targetResponseType,
            targetLocale: targetLocale
        };
        return JSON.parse(window.__adobe_cep__.invokeSync("imsAttemptSSOJumpWorkflows", JSON.stringify(data))).result
    }
}

export namespace IMSInterface {
    export enum Events {
        imsFetchAccessTokenWithStatus = "com.adobe.csxs.events.internal.ims.FetchAccessTokenWithStatus",
        imsFetchAccessToken = "com.adobe.csxs.events.internal.ims.FetchAccessToken",
        imsRevokeAccessToken = "com.adobe.csxs.events.internal.ims.FetchAccessTokenWithStatus",
        imsFetchContinueToken = "com.adobe.csxs.events.internal.ims.FetchAccessTokenWithStatus",
        imsAAMIMSStatus = "vulcan.SuiteMessage.com.adobe.aam.AAMIMSStatus",
        imsLogoutUser = "com.adobe.csxs.events.internal.ims.LogoutUser",
        imsSSOStatus = "com.adobe.csxs.events.internal.ims.SSOStatus"
    }

    export enum Status {
        IMS_SUCCESS = "0",
        IMS_ERROR_FAILURE = "1",
        IMS_ERROR_INVALID_ARGUMENTS = "2",
        IMS_ERROR_CANCEL = "20",
        IMS_ERROR_TIMEOUT = "21",
        IMS_ERROR_HTTPFAILURE = "22",
        IMS_ERROR_SSLFAILURE = "23",
        IMS_ERROR_AUTH_PROXY_REQUIRED = "24",
        IMS_ERROR_AUTH_PROXY_FAILED = "25",
        IMS_ERROR_IN_ACCESS_IDP = "26",
        IMS_ERROR_ANOTHER_REQUEST_IN_PROCESS = "40",
        IMS_ERROR_IN_READ_USER_DATA = "60",
        IMS_ERROR_IN_SAVE_USER_DATA = "61",
        IMS_ERROR_IN_REMOVE_USER_DATA = "62",
        IMS_ERROR_USER_DATA_NOT_PRESENT = "63",
        IMS_ERROR_IN_READ_DEVICE_TOKEN = "64",
        IMS_ERROR_IN_SAVE_DEVICE_TOKEN = "65",
        IMS_ERROR_IN_REMOVE_DEVICE_TOKEN = "66",
        IMS_ERROR_DEVICE_TOKEN_NOT_PRESENT = "67",
        IMS_ERROR_INVALID_DEVICE_TOKEN = "68",
        IMS_ERROR_CLIENTID_NOT_PRESENT = "69",
        IMS_ERROR_IN_FETCH_USER_ACCOUNTS = "70",
        IMS_ERROR_IN_SAVE_USER_FOR_CLIENTID = "71",
        IMS_ERROR_DEVICE_ID_NOT_PRESENT = "72",
        IMS_ERROR_DEFAULT_USER_FOR_CLIENTID_NOT_PRESENT = "73",
        IMS_ERROR_NO_USER_RECORDS_PRESENT = "74",
        IMS_ERROR_ACCESS_DENIED = "80",
        IMS_ERROR_INVALID_REQUEST = "81",
        IMS_ERROR_INVALID_CLIENT = "82",
        IMS_ERROR_INVALID_GRANT = "83",
        IMS_ERROR_UNAUTHORIZED_CLIENT = "84",
        IMS_ERROR_UNSUPPORTED_RESPONSE_TYPE = "85",
        IMS_ERROR_INVALID_SCOPE = "86",
        IMS_ERROR_UNSUPPORTED_GRANT_TYPE = "87",
        IMS_ERROR_BAD_REQUEST = "88",
        IMS_ERROR_INVALID_CREDENTIALS = "89",
        IMS_ERROR_IN_GET_AUTH_DATA_FROM_IDP = "100",
        IMS_ERROR_IN_GET_DEVICE_TOKEN_FROM_IDP = "101",
        IMS_ERROR_IN_GET_REFRESH_TOKEN_FROM_IDP = "102",
        IMS_ERROR_IN_GET_ACCESS_TOKEN_FROM_IDP = "103",
        IMS_ERROR_IN_GET_PROFILE_DATA_FROM_IDP = "104",
        IMS_ERROR_TOU_CHANGED = "120",
        IMS_ERROR_IN_REVOKE_DEVICE_TOKEN = "121",
        IMS_ERROR_TOU_NOT_CURRENT = "122",
        IMS_ERROR_EVS_INVALID = "123",
        IMS_ERROR_ACCT_ACT_REQ = "124",
        IMS_ERROR_ACCT_DISABLED = "125",
        IMS_ERROR_SUBS_ACT_REQ = "126",
        IMS_ERROR_SUBS_NO_SUB = "127",
        IMS_ERROR_NO_BUDDY_GROUP_FOR_CLIENT = "150",
        IMS_ERROR_CLIENT_REGISTERED_FOR_OTHER_GROUP = "151",
        IMS_ERROR_GROUP_ENTRY_NOT_PRESENT = "152",
        IMS_ERROR_IN_SAVE_GROUP_DATA = "153",
        IMS_ERROR_CNAME_ENTRY_NOT_PRESENT = "154",
        IMS_ERROR_IN_SAVE_BACKOFF_DATA = "155",
        IMSMANAGER_ERROR_EXCEPTION = "3000",
        IMSMANAGER_ERROR_ENCODING = "3001",
        IMSMANAGER_SUCCESS_BROWSER_OPENED = "3002",
        IMSMANAGER_ERROR_BROWSER_FAILED_TO_OPEN = "3003",
        IMS_UNKNOWN_ERROR = "0xFFFF"
    }
}