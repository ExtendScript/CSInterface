"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IMSInterface = /** @class */ (function () {
    function IMSInterface() {
    }
    /**
     * Establishes an IMS session. Must be called before any IMS access methods.
     * This method is not thread safe.
     *
     * @return An IMS reference string, as returned from IMSLib, which you
     *  can then use to make further IMS calls to this object's methods.
     *
     * @deprecated Please use imsConnectWithEndpoint instead.
     */
    IMSInterface.prototype.imsConnect = function () {
        return window.__adobe_cep__.imsConnect();
    };
    IMSInterface.prototype.imsDisconnect = function (imsRef) {
        window.__adobe_cep__.imsDisconnect(imsRef);
    };
    IMSInterface.prototype.imsConnectWithEndpoint = function (imsEndpoint) {
        return JSON.parse(window.__adobe_cep__.invokeSync("imsConnectWithEndpoint", JSON.stringify({ imsEndpoint: imsEndpoint }))).result;
    };
    IMSInterface.prototype.imsFetchAccounts = function (imsRef, clientId) {
        return window.__adobe_cep__.imsFetchAccounts(imsRef, clientId);
    };
    IMSInterface.prototype.imsFetchUserProfileData = function (imsRef, userAccountGuid) {
        var data = {
            imsRef: imsRef,
            userAccountGuid: userAccountGuid
        };
        return window.__adobe_cep__.invokeSync("imsFetchUserProfileData", JSON.stringify(data));
    };
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
    IMSInterface.prototype.imsFetchAccessToken = function (imsRef, clientId, clientSecret, userAccountGuid, serviceAccountGuid, scope) {
        return window.__adobe_cep__.imsFetchAccessToken(imsRef, clientId, clientSecret, userAccountGuid, serviceAccountGuid, scope);
    };
    IMSInterface.prototype.imsFetchContinueToken = function (imsRef, bearerToken, targetClientId, redirectUri, scope, responseType, locale) {
        var data = {
            imsRef: imsRef,
            bearerToken: bearerToken,
            targetClientId: targetClientId,
            redirectUri: redirectUri,
            scope: scope,
            responseType: responseType,
            locale: locale
        };
        return JSON.parse(window.__adobe_cep__.invokeSync("imsFetchContinueToken", JSON.stringify(data))).result;
    };
    IMSInterface.prototype.imsRevokeDeviceToken = function (imsRef, clientId, clientSecret, userAccountGuid, serviceAccountGuid) {
        return window.__adobe_cep__.imsFetchAccessToken(imsRef, clientId, clientSecret, userAccountGuid, serviceAccountGuid, "REVOKE");
    };
    IMSInterface.prototype.imsSetProxyCredentials = function (proxyUsername, proxyPassword) {
        window.__adobe_cep__.imsSetProxyCredentials(proxyUsername, proxyPassword);
    };
    IMSInterface.prototype.showAAM = function (clientId, clientSecret, redirectUri, userAccountGuid, serviceAccountGuid, scope) {
        return window.__adobe_cep__.showAAM(clientId, clientSecret, redirectUri, userAccountGuid, serviceAccountGuid, scope);
    };
    IMSInterface.prototype.imsGetCurrentUserId = function () {
        return window.__adobe_cep__.getCurrentImsUserId();
    };
    IMSInterface.prototype.imsGetCurrentUserIdHelper = function (callback) {
        var hostEnvironment = JSON.parse(window.__adobe_cep__.getHostEnvironment());
        var appName = hostEnvironment.appName;
        if ("ILST" === appName) {
            window.__adobe_cep__.evalScript("app.userGUID", function (result) {
                callback(result);
            });
        }
        else if ("IDSN" === appName) {
            window.__adobe_cep__.evalScript("app.userGuid", function (result) {
                callback(result);
            });
        }
        else if ("PHSP" === appName || "PHXS" === appName) {
            window.__adobe_cep__.evalScript("var getUserIdPhotoshop = function() {var userId = '';try {var bhnc = app.charIDToTypeID('bhnc');var ref = new ActionReference();ref.putProperty(app.charIDToTypeID('Prpr'), bhnc);ref.putEnumerated(app.charIDToTypeID('capp'), app.charIDToTypeID('Ordn'), app.charIDToTypeID('Trgt'));var appDesc = app.executeActionGet(ref);if (appDesc.hasKey(bhnc)) {userId = appDesc.getString(bhnc);}} catch (e) {}return userId;};", function (result) {
                window.__adobe_cep__.evalScript("getUserIdPhotoshop()", function (result) {
                    callback(result);
                });
            });
        }
        else {
            var clientId = window.__adobe_cep__.getCurrentImsUserId();
            callback(clientId);
        }
    };
    IMSInterface.prototype.imsLogoutUser = function (imsRef, userAccountGuid, clientId) {
        var data = {
            imsRef: imsRef,
            userAccountGuid: userAccountGuid,
            clientId: clientId
        };
        return JSON.parse(window.__adobe_cep__.invokeSync("imsLogoutUser", JSON.stringify(data))).result;
    };
    IMSInterface.prototype.imsAttemptSSOJumpWorkflows = function (openBrowser, url, imsRef, clientId, clientSecret, scope, userAccountGuid, targetClientId, targetScope, targetResponseType, targetLocale) {
        var data = {
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
        return JSON.parse(window.__adobe_cep__.invokeSync("imsAttemptSSOJumpWorkflows", JSON.stringify(data))).result;
    };
    return IMSInterface;
}());
exports.IMSInterface = IMSInterface;
(function (IMSInterface) {
    var Events;
    (function (Events) {
        Events["imsFetchAccessTokenWithStatus"] = "com.adobe.csxs.events.internal.ims.FetchAccessTokenWithStatus";
        Events["imsFetchAccessToken"] = "com.adobe.csxs.events.internal.ims.FetchAccessToken";
        Events["imsRevokeAccessToken"] = "com.adobe.csxs.events.internal.ims.FetchAccessTokenWithStatus";
        Events["imsFetchContinueToken"] = "com.adobe.csxs.events.internal.ims.FetchAccessTokenWithStatus";
        Events["imsAAMIMSStatus"] = "vulcan.SuiteMessage.com.adobe.aam.AAMIMSStatus";
        Events["imsLogoutUser"] = "com.adobe.csxs.events.internal.ims.LogoutUser";
        Events["imsSSOStatus"] = "com.adobe.csxs.events.internal.ims.SSOStatus";
    })(Events = IMSInterface.Events || (IMSInterface.Events = {}));
    var Status;
    (function (Status) {
        Status["IMS_SUCCESS"] = "0";
        Status["IMS_ERROR_FAILURE"] = "1";
        Status["IMS_ERROR_INVALID_ARGUMENTS"] = "2";
        Status["IMS_ERROR_CANCEL"] = "20";
        Status["IMS_ERROR_TIMEOUT"] = "21";
        Status["IMS_ERROR_HTTPFAILURE"] = "22";
        Status["IMS_ERROR_SSLFAILURE"] = "23";
        Status["IMS_ERROR_AUTH_PROXY_REQUIRED"] = "24";
        Status["IMS_ERROR_AUTH_PROXY_FAILED"] = "25";
        Status["IMS_ERROR_IN_ACCESS_IDP"] = "26";
        Status["IMS_ERROR_ANOTHER_REQUEST_IN_PROCESS"] = "40";
        Status["IMS_ERROR_IN_READ_USER_DATA"] = "60";
        Status["IMS_ERROR_IN_SAVE_USER_DATA"] = "61";
        Status["IMS_ERROR_IN_REMOVE_USER_DATA"] = "62";
        Status["IMS_ERROR_USER_DATA_NOT_PRESENT"] = "63";
        Status["IMS_ERROR_IN_READ_DEVICE_TOKEN"] = "64";
        Status["IMS_ERROR_IN_SAVE_DEVICE_TOKEN"] = "65";
        Status["IMS_ERROR_IN_REMOVE_DEVICE_TOKEN"] = "66";
        Status["IMS_ERROR_DEVICE_TOKEN_NOT_PRESENT"] = "67";
        Status["IMS_ERROR_INVALID_DEVICE_TOKEN"] = "68";
        Status["IMS_ERROR_CLIENTID_NOT_PRESENT"] = "69";
        Status["IMS_ERROR_IN_FETCH_USER_ACCOUNTS"] = "70";
        Status["IMS_ERROR_IN_SAVE_USER_FOR_CLIENTID"] = "71";
        Status["IMS_ERROR_DEVICE_ID_NOT_PRESENT"] = "72";
        Status["IMS_ERROR_DEFAULT_USER_FOR_CLIENTID_NOT_PRESENT"] = "73";
        Status["IMS_ERROR_NO_USER_RECORDS_PRESENT"] = "74";
        Status["IMS_ERROR_ACCESS_DENIED"] = "80";
        Status["IMS_ERROR_INVALID_REQUEST"] = "81";
        Status["IMS_ERROR_INVALID_CLIENT"] = "82";
        Status["IMS_ERROR_INVALID_GRANT"] = "83";
        Status["IMS_ERROR_UNAUTHORIZED_CLIENT"] = "84";
        Status["IMS_ERROR_UNSUPPORTED_RESPONSE_TYPE"] = "85";
        Status["IMS_ERROR_INVALID_SCOPE"] = "86";
        Status["IMS_ERROR_UNSUPPORTED_GRANT_TYPE"] = "87";
        Status["IMS_ERROR_BAD_REQUEST"] = "88";
        Status["IMS_ERROR_INVALID_CREDENTIALS"] = "89";
        Status["IMS_ERROR_IN_GET_AUTH_DATA_FROM_IDP"] = "100";
        Status["IMS_ERROR_IN_GET_DEVICE_TOKEN_FROM_IDP"] = "101";
        Status["IMS_ERROR_IN_GET_REFRESH_TOKEN_FROM_IDP"] = "102";
        Status["IMS_ERROR_IN_GET_ACCESS_TOKEN_FROM_IDP"] = "103";
        Status["IMS_ERROR_IN_GET_PROFILE_DATA_FROM_IDP"] = "104";
        Status["IMS_ERROR_TOU_CHANGED"] = "120";
        Status["IMS_ERROR_IN_REVOKE_DEVICE_TOKEN"] = "121";
        Status["IMS_ERROR_TOU_NOT_CURRENT"] = "122";
        Status["IMS_ERROR_EVS_INVALID"] = "123";
        Status["IMS_ERROR_ACCT_ACT_REQ"] = "124";
        Status["IMS_ERROR_ACCT_DISABLED"] = "125";
        Status["IMS_ERROR_SUBS_ACT_REQ"] = "126";
        Status["IMS_ERROR_SUBS_NO_SUB"] = "127";
        Status["IMS_ERROR_NO_BUDDY_GROUP_FOR_CLIENT"] = "150";
        Status["IMS_ERROR_CLIENT_REGISTERED_FOR_OTHER_GROUP"] = "151";
        Status["IMS_ERROR_GROUP_ENTRY_NOT_PRESENT"] = "152";
        Status["IMS_ERROR_IN_SAVE_GROUP_DATA"] = "153";
        Status["IMS_ERROR_CNAME_ENTRY_NOT_PRESENT"] = "154";
        Status["IMS_ERROR_IN_SAVE_BACKOFF_DATA"] = "155";
        Status["IMSMANAGER_ERROR_EXCEPTION"] = "3000";
        Status["IMSMANAGER_ERROR_ENCODING"] = "3001";
        Status["IMSMANAGER_SUCCESS_BROWSER_OPENED"] = "3002";
        Status["IMSMANAGER_ERROR_BROWSER_FAILED_TO_OPEN"] = "3003";
        Status["IMS_UNKNOWN_ERROR"] = "0xFFFF";
    })(Status = IMSInterface.Status || (IMSInterface.Status = {}));
})(IMSInterface || (IMSInterface = {}));
exports.IMSInterface = IMSInterface;
exports.default = IMSInterface;
