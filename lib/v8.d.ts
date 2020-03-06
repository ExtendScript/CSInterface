/**
 * Stores constants for the window types supported by the CSXS infrastructure.
 */
declare enum CSXSWindowType {
    _PANEL = "Panel",
    _MODELESS = "Modeless",
    _MODAL_DIALOG = "ModalDialog"
}
/**
 * Defines a version number with major, minor, micro, and special
 * components. The major, minor and micro values are numeric; the special
 * value can be any string.
 */
declare class Version {
    major: number;
    minor: number;
    micro: number;
    special: string;
    /**
     * The maximum value allowed for a numeric version component.
     * This reflects the maximum value allowed in PlugPlug and the manifest schema.
     */
    static readonly MAX_NUM: number;
    /**
     * @param major   The major version component, a positive integer up to nine digits long.
     * @param minor   The minor version component, a positive integer up to nine digits long.
     * @param micro   The micro version component, a positive integer up to nine digits long.
     * @param special The special version component, an arbitrary string.
     *
     * @return A new Version object.
     */
    constructor(major: number, minor: number, micro: number, special: string);
}
/**
 * Defines a boundary for a version range, which associates a Version object
 * with a flag for whether it is an inclusive or exclusive boundary.
 */
declare class VersionBound {
    version: Version;
    inclusive: boolean;
    /**
     * @param version   The Version object.
     * @param inclusive True if this boundary is inclusive, false if it is exclusive.
     *
     * @return A new VersionBound object.
     */
    constructor(version: Version, inclusive: boolean);
}
/**
 * Defines a range of versions using a lower boundary and optional upper boundary.
 */
declare class VersionRange {
    lowerBound: VersionBound;
    upperBound?: VersionBound | undefined;
    /**
     * @param lowerBound The VersionBound object.
     * @param upperBound The VersionBound object, or null for a range with no upper boundary.
     *
     * @return A new VersionRange object.
     */
    constructor(lowerBound: VersionBound, upperBound?: VersionBound | undefined);
}
/**
 * Represents a runtime related to the CEP infrastructure.
 * Extensions can declare dependencies on particular
 * CEP runtime versions in the extension manifest.
 */
declare class Runtime {
    name: string;
    versionRange: VersionRange;
    /**
     * @FIXME: Documentation tell us "version" but the Javascript say "versionRange"
     */
    version: VersionRange;
    /**
     * @param name    The runtime name.
     * @param version A VersionRange object that defines a range of valid versions.
     *
     * @return A new Runtime object.
     */
    constructor(name: string, versionRange: VersionRange);
}
/**
 * @FIXME: ExtensionManifest_v_7_0.xsd#205
 */
interface ExtensionDispatchInfo {
}
/**
 * @FIXME: interface?
 * Encapsulates a CEP-based extension to an Adobe application.
 */
declare class Extension {
    id: any;
    name: string;
    mainPath: string;
    basePath: string;
    windowType: CSXSWindowType;
    width: number;
    height: number;
    minWidth: number;
    minHeight: number;
    maxWidth: number;
    maxHeight: number;
    defaultExtensionDataXml: ExtensionDispatchInfo;
    specialExtensionDataXml: ExtensionDispatchInfo;
    requiredRuntimeList: Runtime[];
    isAutoVisible: boolean;
    isPluginExtension: boolean;
    /**
     * @param id              The unique identifier of this extension.
     * @param name            The localizable display name of this extension.
     * @param mainPath        The path of the "index.html" file.
     * @param basePath        The base path of this extension.
     * @param windowType      The window type of the main window of this extension.
     *                        Valid values are defined by CSXSWindowType.
     * @param width           The default width in pixels of the main window of this extension.
     * @param height          The default height in pixels of the main window of this extension.
     * @param minWidth        The minimum width in pixels of the main window of this extension.
     * @param minHeight       The minimum height in pixels of the main window of this extension.
     * @param maxWidth        The maximum width in pixels of the main window of this extension.
     * @param maxHeight       The maximum height in pixels of the main window of this extension.
     * @param defaultExtensionDataXml The extension data contained in the default ExtensionDispatchInfo section of the extension manifest.
     * @param specialExtensionDataXml The extension data contained in the application-specific ExtensionDispatchInfo section of the extension manifest.
     * @param requiredRuntimeList     An array of Runtime objects for runtimes required by this extension.
     * @param isAutoVisible       True if this extension is visible on loading.
     * @param isPluginExtension   True if this extension has been deployed in the Plugins folder of the host application.
     */
    constructor(id: any, name: string, mainPath: string, basePath: string, windowType: CSXSWindowType, width: number, height: number, minWidth: number, minHeight: number, maxWidth: number, maxHeight: number, defaultExtensionDataXml: ExtensionDispatchInfo, specialExtensionDataXml: ExtensionDispatchInfo, requiredRuntimeList: Runtime[], isAutoVisible: boolean, isPluginExtension: boolean);
}
/**
 * A standard JavaScript event, the base class for CEP events.
 */
declare class CSEvent {
    type: string;
    scope: CSInterface.EventScope;
    appId: string;
    extensionId: string;
    /**
     * Event-specific data.
     */
    data?: any;
    /**
     * @param type          The name of the event type.
     * @param scope         The scope of event, can be "GLOBAL" or "APPLICATION".
     * @param appId         The unique identifier of the application that generated the event.
     * @param extensionId   The unique identifier of the extension that generated the event.
     */
    constructor(type: string, scope: CSInterface.EventScope, appId: string, extensionId: string);
}
/**
 * Stores color-type constants.
 */
declare enum ColorType {
    /**
     * RGB color type.
     */
    RGB = "rbg",
    /**
     * Gradient color type.
     */
    GRADIENT = "gradient",
    /**
     * Null color type.
     */
    NONE = "none"
}
/**
 * @FIXME: range [0.0 to 255.0] any idea?
 */
declare type RGBNumber = number;
/**
 * Stores an RGB color with red, green, blue, and alpha values.
 * All values are in the range [0.0 to 255.0]. Invalid numeric values are
 * converted to numbers within this range.
 */
declare class RGBColor {
    red: RGBNumber;
    green: RGBNumber;
    blue: RGBNumber;
    alpha: RGBNumber;
    /**
     * @param red   The red value, in the range [0.0 to 255.0].
     * @param green The green value, in the range [0.0 to 255.0].
     * @param blue  The blue value, in the range [0.0 to 255.0].
     * @param alpha The alpha (transparency) value, in the range [0.0 to 255.0].
     *              The default, 255.0, means that the color is fully opaque.
     *
     * @return A new RGBColor object.
     */
    constructor(red: RGBNumber, green: RGBNumber, blue: RGBNumber, alpha?: RGBNumber);
}
/**
 * A point value in which the y component is 0 and the x component
 * is positive or negative for a right or left direction,
 * or the x component is 0 and the y component is positive or negative for
 * an up or down direction.
 */
declare class Direction {
    x: number;
    y: number;
    /**
     * @param x     The horizontal component of the point.
     * @param y     The vertical component of the point.
     *
     * @return A new Direction object.
     */
    constructor(x: number, y: number);
}
/**
 * @FIXME: range [0.0 to 1.0] any idea?
 */
declare type GradientOffset = number;
/**
 * Stores gradient stop information.
 */
declare class GradientStop {
    offset: GradientOffset;
    rgbColor: RGBColor;
    /**
     * @param offset   The offset of the gradient stop, in the range [0.0 to 1.0].
     * @param rgbColor The color of the gradient at this point, an RGBColor object.
     *
     * @return GradientStop object.
     */
    constructor(offset: GradientOffset, rgbColor: RGBColor);
}
/**
 * Stores gradient color information.
 */
declare class GradientColor {
    type: "linear";
    direction: Direction;
    numStops: number;
    arrGradientStop: GradientStop;
    /**
     * @FIXME: Documentation tell us "gradientStopList" but the Javascript say "arrGradientStop"
     */
    gradientStopList: GradientStop;
    /**
     * @param type              The gradient type, must be "linear".
     * @param direction         A Direction object for the direction of the gradient (up, down, right, or left).
     * @param numStops          The number of stops in the gradient.
     * @param gradientStopList  An array of GradientStop objects.
     *
     * @return A new GradientColor object.
     */
    constructor(type: "linear", direction: Direction, numStops: number, arrGradientStop: GradientStop);
}
/**
 * Stores color information, including the type, anti-alias level, and specific color
 * values in a color object of an appropriate type.
 *
 * @FIXME: use Conditional Type for the constructor
 */
declare class UIColor {
    type: 1 | 2;
    antialiasLevel: any;
    color: RGBColor | GradientColor;
    /**
     * @param type              The color type, 1 for "rgb" and 2 for "gradient". The supplied color object must correspond to this type.
     * @param antialiasLevel    The anti-alias level constant.
     * @param color             A RGBColor or GradientColor object containing specific color information.
     *
     * @return A new UIColor object.
     */
    constructor(type: 1 | 2, antialiasLevel: any, color: RGBColor | GradientColor);
}
/**
 * Stores window-skin properties, such as color and font. All color parameter values are UIColor objects except that systemHighlightColor is RGBColor object.
 */
interface AppSkinInfo {
    /**
     * The base font family of the application.
     */
    readonly baseFontFamily: string;
    /**
     * The base font size of the application.
     */
    readonly baseFontSize: string;
    /**
     * The application bar background color.
     */
    readonly appBarBackgroundColor: UIColor;
    /**
     * The background color of the extension panel.
     */
    readonly panelBackgroundColor: UIColor;
    /**
     * The application bar background color, as sRGB.
     */
    readonly appBarBackgroundColorSRGB: UIColor;
    /**
     * The background color of the extension panel, as sRGB.
     */
    readonly panelBackgroundColorSRGB: UIColor;
    /**
     * The highlight color of the extension panel, if provided by the host application. Otherwise, the operating-system highlight color.
     */
    readonly systemHighlightColor: UIColor;
}
/**
 * Stores information about the environment in which the extension is loaded.
 */
interface HostEnvironment {
    /**
     * The application's name.
     */
    readonly appName: string;
    /**
     * The application's version.
     */
    readonly appVersion: string;
    /**
     * The application's current license locale.
     */
    readonly appLocale: string;
    /**
     * The application's current UI locale.
     */
    readonly appUILocale: string;
    /**
     * The application's unique identifier.
     */
    readonly appId: string;
    /**
     * True if the application is currently online.
     */
    readonly isAppOnline: boolean;
    /**
     * An AppSkinInfo object containing the application's default color and font styles.
     */
    readonly appSkinInfo: AppSkinInfo;
}
/**
 * Stores information about the host capabilities.
 */
interface HostCapabilities {
    /**
     * EXTENDED_PANEL_MENU True if the application supports panel menu.
     */
    readonly EXTENDED_PANEL_MENU: boolean;
    /**
     * EXTENDED_PANEL_ICONS True if the application supports panel icon.
     */
    readonly EXTENDED_PANEL_ICONS: boolean;
    /**
     * DELEGATE_APE_ENGINE True if the application supports delegated APE engine.
     */
    readonly DELEGATE_APE_ENGINE: boolean;
    /**
     * SUPPORT_HTML_EXTENSIONS True if the application supports HTML extensions.
     */
    readonly SUPPORT_HTML_EXTENSIONS: boolean;
    /**
     * DISABLE_FLASH_EXTENSIONS True if the application disables FLASH extensions.
     */
    readonly DISABLE_FLASH_EXTENSIONS: boolean;
}
/**
 * Stores current api version.
 *
 * @since 4.2.0
 */
interface ApiVersion {
    /**
     * The major version
     */
    readonly major: number;
    /**
     * The minor version
     */
    readonly minor: number;
    /**
     * The micro version
     */
    readonly micro: number;
}
/**
 * Stores flyout menu item status
 *
 * @since 5.2.0
 */
declare class MenuItemStatus {
    menuItemLabel: string;
    enabled: boolean;
    checked: boolean;
    /**
     * @param menuItemLabel  The menu item label.
     * @param enabled         True if user wants to enable the menu item.
     * @param checked         True if user wants to check the menu item.
     *
     * @return MenuItemStatus object.
     */
    constructor(menuItemLabel: string, enabled: boolean, checked: boolean);
}
/**
 * Stores the status of the context menu item.
 *
 * @since 5.2.0
 */
declare class ContextMenuItemStatus {
    menuItemID: string;
    enabled: boolean;
    checked: boolean;
    /**
     * @param menuItemID     The menu item id.
     * @param enabled         True if user wants to enable the menu item.
     * @param checked         True if user wants to check the menu item.
     *
     * @return MenuItemStatus object.
     */
    constructor(menuItemID: string, enabled: boolean, checked: boolean);
}
/**
 * This is the entry point to the CEP extensibility infrastructure.
 * Instantiate this object and use it to:
 * <ul>
 * <li>Access information about the host application in which an extension is running</li>
 * <li>Launch an extension</li>
 * <li>Register interest in event notifications, and dispatch events</li>
 * </ul>
 *
 */
export declare class CSInterface {
    /**
     * The host environment data object.
     */
    hostEnvironment: HostEnvironment;
    /**
     * Retrieves information about the host environment in which the extension is currently running.
     *
     * @return {HostEnvironment} A HostEnvironment object.
     */
    getHostEnvironment(): HostEnvironment;
    /**
     * Closes this extension.
     */
    closeExtension(): void;
    /**
     * Retrieves a path for which a constant is defined in the system.
     *
     * @param pathType The path-type constant defined in SystemPath ,
     *
     * @return {string} The platform-specific system path string.
     */
    getSystemPath(pathType: CSInterface.SystemPath): string;
    /**
     * Evaluates a JavaScript script, which can use the JavaScript DOM
     * of the host application.
     *
     * @param script    The JavaScript script.
     * @param callback  Optional. A callback function that receives the result of execution.
     *          If execution fails, the callback function receives the error message EvalScript_ErrMessage.
     */
    evalScript(script: string, callback?: (result?: any) => void | null): void;
    /**
     * Retrieves the unique identifier of the application.
     * in which the extension is currently running.
     *
     * @return {string} The unique ID string.
     */
    getApplicationID(): string;
    /**
     * Retrieves host capability information for the application
     * in which the extension is currently running.
     *
     * @return {HostCapabilities} A HostCapabilities object.
     */
    getHostCapabilities(): HostCapabilities;
    /**
     * Triggers a CEP event programmatically. Yoy can use it to dispatch
     * an event of a predefined type, or of a type you have defined.
     *
     * @param event A CSEvent object.
     */
    dispatchEvent<T extends CSEvent>(event: T): void;
    /**
     * Registers an interest in a CEP event of a particular type, and
     * assigns an event handler.
     * The event infrastructure notifies your extension when events of this type occur,
     * passing the event object to the registered handler function.
     *
     * @param type     The name of the event type of interest.
     * @param listener The JavaScript handler function or method.
     * @param obj      Optional, the object containing the handler method, if any. Default is null.
     */
    addEventListener<T extends CSEvent>(type: string, listener: (evt: T) => void, obj?: object): void;
    /**
     * Removes a registered event listener.
     *
     * @param type      The name of the event type of interest.
     * @param listener  The JavaScript handler function or method that was registered.
     * @param obj       Optional, the object containing the handler method, if any.
     *          Default is null.
     */
    removeEventListener(type: string, listener: any, obj?: object): void;
    /**
     * Loads and launches another extension, or activates the extension if it is already loaded.
     *
     * @param extensionId       The extension's unique identifier.
     * @param startupParams     Not currently used, pass "".
     *
     * @example
     * To launch the extension "help" with ID "HLP" from this extension, call:
     * <code>requestOpenExtension("HLP", ""); </code>
     *
     */
    requestOpenExtension(extensionId: string, startupParams?: string): void;
    /**
     * @TODO: "zero" or more Extension objects.
     *
     * Retrieves the list of extensions currently loaded in the current host application.
     * The extension list is initialized once, and remains the same during the lifetime
     * of the CEP session.
     *
     * @param extensionIds  Optional, an array of unique identifiers for extensions of interest.
     *          If omitted, retrieves data for all extensions.
     *
     * @return {Extension[]} Zero or more Extension objects.
     */
    getExtensions(extensionIds?: string[]): Extension[];
    /**
     * @TODO: create network interface
     *
     * Retrieves network-related preferences.
     *
     * @return {Object} A JavaScript object containing network preferences.
     */
    getNetworkPreferences(): object;
    /**
     * Initializes the resource bundle for this extension with property values
     * for the current application and locale.
     * To support multiple locales, you must define a property file for each locale,
     * containing keyed display-string values for that locale.
     * See localization documentation for Extension Builder and related products.
     *
     * Keys can be in the
     * form <code>key.value="localized string"</code>, for use in HTML text elements.
     * For example, in this input element, the localized \c key.value string is displayed
     * instead of the empty \c value string:
     *
     * <code><input type="submit" value="" data-locale="key"/></code>
     *
     * @return {Object} An object containing the resource bundle information.
     */
    initResourceBundle(): object;
    /**
     * Writes installation information to a file.
     *
     * @return {string} The file path.
     */
    dumpInstallationInfo(): string;
    /**
     * Retrieves version information for the current Operating System,
     * See http://www.useragentstring.com/pages/Chrome/ for Chrome navigator.userAgent values.
     *
     * @return {string} A string containing the OS version, or "unknown Operation System".
     * If user customizes the User Agent by setting CEF command parameter "--user-agent", only
     * "Mac OS X" or "Windows" will be returned.
     */
    getOSInformation(): string;
    /**
     * Opens a page in the default system browser.
     *
     * @since 4.2.0
     *
     * @param url  The URL of the page/file to open, or the email address.
     * Must use HTTP/HTTPS/file/mailto protocol. For example:
     *   "http://www.adobe.com"
     *   "https://github.com"
     *   "file:///C:/log.txt"
     *   "mailto:test@adobe.com"
     *
     * @return {number} One of these error codes:\n
     *      <ul>
     *          <li>NO_ERROR - 0</li>
     *          <li>ERR_UNKNOWN - 1</li>
     *          <li>ERR_INVALID_PARAMS - 2</li>
     *          <li>ERR_INVALID_URL - 201</li>
     *      </ul>\n
     */
    openURLInDefaultBrowser(url: string): number;
    /**
     * Retrieves extension ID.
     *
     * @since 4.2.0
     *
     * @return {string} extension ID.
     */
    getExtensionID(): string;
    /**
     * Retrieves the scale factor of screen.
     * On Windows platform, the value of scale factor might be different from operating system's scale factor,
     * since host application may use its self-defined scale factor.
     *
     * @since 4.2.0
     *
     * @return {number} One of the following float number.
     *      <ul>
     *          <li> -1.0 when error occurs </li>
     *          <li> 1.0 means normal screen </li>
     *          <li> >1.0 means HiDPI screen </li>
     *      </ul>
     */
    getScaleFactor(): number;
    /**
     * Set a handler to detect any changes of scale factor. This only works on Mac.
     *
     * @since 4.2.0
     *
     * @param handler   The function to be called when scale factor is changed.
     */
    setScaleFactorChangedHandler(handler: () => void): void;
    /**
     * Retrieves current API version.
     *
     * @since 4.2.0
     *
     * @return ApiVersion object.
     */
    getCurrentApiVersion(): ApiVersion;
    /**
     * Set panel flyout menu by an XML.
     *
     * @since 5.2.0
     *
     * Register a callback function for "com.adobe.csxs.events.flyoutMenuClicked" to get notified when a
     * menu item is clicked.
     * The "data" attribute of event is an object which contains "menuId" and "menuName" attributes.
     *
     * Register callback functions for "com.adobe.csxs.events.flyoutMenuOpened" and "com.adobe.csxs.events.flyoutMenuClosed"
     * respectively to get notified when flyout menu is opened or closed.
     *
     * @param menu     A XML string which describes menu structure.
     * An example menu XML:
     * <Menu>
     *   <MenuItem Id="menuItemId1" Label="TestExample1" Enabled="true" Checked="false"/>
     *   <MenuItem Label="TestExample2">
     *     <MenuItem Label="TestExample2-1" >
     *       <MenuItem Label="TestExample2-1-1" Enabled="false" Checked="true"/>
     *     </MenuItem>
     *     <MenuItem Label="TestExample2-2" Enabled="true" Checked="true"/>
     *   </MenuItem>
     *   <MenuItem Label="---" />
     *   <MenuItem Label="TestExample3" Enabled="false" Checked="false"/>
     * </Menu>
     */
    setPanelFlyoutMenu(menu: string): void;
    /**
     * Updates a menu item in the extension window's flyout menu, by setting the enabled
     * and selection status.
     *
     * @since 5.2.0
     *
     * @param menuItemLabel    The menu item label.
     * @param enabled        True to enable the item, false to disable it (gray it out).
     * @param checked        True to select the item, false to deselect it.
     *
     * @return {boolean} false when the host application does not support this functionality (HostCapabilities.EXTENDED_PANEL_MENU is false).
     *         Fails silently if menu label is invalid.
     *
     * @see HostCapabilities.EXTENDED_PANEL_MENU
     */
    updatePanelMenuItem(menuItemLabel: string, enabled: boolean, checked: boolean): boolean;
    /**
     * Set context menu by XML string.
     *
     * @since 5.2.0
     *
     * There are a number of conventions used to communicate what type of menu item to create and how it should be handled.
     * - an item without menu ID or menu name is disabled and is not shown.
     * - if the item name is "---" (three hyphens) then it is treated as a separator. The menu ID in this case will always be NULL.
     * - Checkable attribute takes precedence over Checked attribute.
     * - a PNG icon. For optimal display results please supply a 16 x 16px icon as larger dimensions will increase the size of the menu item.
     *   The Chrome extension contextMenus API was taken as a reference.
     *   https://developer.chrome.com/extensions/contextMenus
     * - the items with icons and checkable items cannot coexist on the same menu level. The former take precedences over the latter.
     *
     * @param menu      A XML string which describes menu structure.
     * @param callback  The callback function which is called when a menu item is clicked. The only parameter is the returned ID of clicked menu item.
     *
     * @description An example menu XML:
     * <Menu>
     *   <MenuItem Id="menuItemId1" Label="TestExample1" Enabled="true" Checkable="true" Checked="false" Icon="./image/small_16X16.png"/>
     *   <MenuItem Id="menuItemId2" Label="TestExample2">
     *     <MenuItem Id="menuItemId2-1" Label="TestExample2-1" >
     *       <MenuItem Id="menuItemId2-1-1" Label="TestExample2-1-1" Enabled="false" Checkable="true" Checked="true"/>
     *     </MenuItem>
     *     <MenuItem Id="menuItemId2-2" Label="TestExample2-2" Enabled="true" Checkable="true" Checked="true"/>
     *   </MenuItem>
     *   <MenuItem Label="---" />
     *   <MenuItem Id="menuItemId3" Label="TestExample3" Enabled="false" Checkable="true" Checked="false"/>
     * </Menu>
     */
    setContextMenu(menu: string, callback: (menuItemID: string) => void): void;
    /**
     * Set context menu by JSON string.
     *
     * @since 6.0.0
     *
     * There are a number of conventions used to communicate what type of menu item to create and how it should be handled.
     * - an item without menu ID or menu name is disabled and is not shown.
     * - if the item label is "---" (three hyphens) then it is treated as a separator. The menu ID in this case will always be NULL.
     * - Checkable attribute takes precedence over Checked attribute.
     * - a PNG icon. For optimal display results please supply a 16 x 16px icon as larger dimensions will increase the size of the menu item.
     The Chrome extension contextMenus API was taken as a reference.
     * - the items with icons and checkable items cannot coexist on the same menu level. The former take precedences over the latter.
     https://developer.chrome.com/extensions/contextMenus
     *
     * @param menu      A JSON string which describes menu structure.
     * @param callback  The callback function which is called when a menu item is clicked. The only parameter is the returned ID of clicked menu item.
     *
     * @description An example menu JSON:
     *
     * {
     *      "menu": [
     *          {
     *              "id": "menuItemId1",
     *              "label": "testExample1",
     *              "enabled": true,
     *              "checkable": true,
     *              "checked": false,
     *              "icon": "./image/small_16X16.png"
     *          },
     *          {
     *              "id": "menuItemId2",
     *              "label": "testExample2",
     *              "menu": [
     *                  {
     *                      "id": "menuItemId2-1",
     *                      "label": "testExample2-1",
     *                      "menu": [
     *                          {
     *                              "id": "menuItemId2-1-1",
     *                              "label": "testExample2-1-1",
     *                              "enabled": false,
     *                              "checkable": true,
     *                              "checked": true
     *                          }
     *                      ]
     *                  },
     *                  {
     *                      "id": "menuItemId2-2",
     *                      "label": "testExample2-2",
     *                      "enabled": true,
     *                      "checkable": true,
     *                      "checked": true
     *                  }
     *              ]
     *          },
     *          {
     *              "label": "---"
     *          },
     *          {
     *              "id": "menuItemId3",
     *              "label": "testExample3",
     *              "enabled": false,
     *              "checkable": true,
     *              "checked": false
     *          }
     *      ]
     *  }
     *
     */
    setContextMenuByJSON(menu: string, callback: (menuItemID: string) => void): void;
    /**
     * Updates a context menu item by setting the enabled and selection status.
     *
     * @since 5.2.0
     *
     * @param menuItemID    The menu item ID.
     * @param enabled        True to enable the item, false to disable it (gray it out).
     * @param checked        True to select the item, false to deselect it.
     */
    updateContextMenuItem(menuItemID: string, enabled: boolean, checked: boolean): void;
    /**
     * Get the visibility status of an extension window.
     *
     * @since 6.0.0
     *
     * @return {boolean} true if the extension window is visible; false if the extension window is hidden.
     */
    isWindowVisible(): boolean;
    /**
     * Resize extension's content to the specified dimensions.
     * 1. Works with modal and modeless extensions in all Adobe products.
     * 2. Extension's manifest min/max size constraints apply and take precedence.
     * 3. For panel extensions
     *    3.1 This works in all Adobe products except:
     *        * Premiere Pro
     *        * Prelude
     *        * After Effects
     *    3.2 When the panel is in certain states (especially when being docked),
     *        it will not change to the desired dimensions even when the
     *        specified size satisfies min/max constraints.
     *
     * @since 6.0.0
     *
     * @param width  The new width
     * @param height The new height
     */
    resizeContent(width: number, height: number): void;
    /**
     * TODO: What is the return typ?
     *
     * Register the invalid certificate callback for an extension.
     * This callback will be triggered when the extension tries to access the web site that contains the invalid certificate on the main frame.
     * But if the extension does not call this function and tries to access the web site containing the invalid certificate, a default error page will be shown.
     *
     * Since 6.1.0
     *
     * @param callback the callback function
     */
    registerInvalidCertificateCallback(callback: () => void): void;
    /**
     * Register an interest in some key events to prevent them from being sent to the host application.
     *
     * This function works with modeless extensions and panel extensions.
     * Generally all the key events will be sent to the host application for these two extensions if the current focused element
     * is not text input or dropdown,
     * If you want to intercept some key events and want them to be handled in the extension, please call this function
     * in advance to prevent them being sent to the host application.
     *
     * @since 6.1.0
     *
     * @param keyEventsInterest      A JSON string describing those key events you are interested in. A null object or
     an empty string will lead to removing the interest
     *
     * This JSON string should be an array, each object has following keys:
     *
     * keyCode:  [Required] represents an OS system dependent virtual key code identifying
     *           the unmodified value of the pressed key.
     * ctrlKey:  [optional] a Boolean that indicates if the control key was pressed (true) or not (false) when the event occurred.
     * altKey:   [optional] a Boolean that indicates if the alt key was pressed (true) or not (false) when the event occurred.
     * shiftKey: [optional] a Boolean that indicates if the shift key was pressed (true) or not (false) when the event occurred.
     * metaKey:  [optional] (Mac Only) a Boolean that indicates if the Meta key was pressed (true) or not (false) when the event occurred.
     *                      On Macintosh keyboards, this is the command key. To detect Windows key on Windows, please use keyCode instead.
     * An example JSON string:
     *
     * [
     *     {
     *         "keyCode": 48
     *     },
     *     {
     *         "keyCode": 123,
     *         "ctrlKey": true
     *     },
     *     {
     *         "keyCode": 123,
     *         "ctrlKey": true,
     *         "metaKey": true
     *     }
     * ]
     *
     */
    registerKeyEventsInterest(keyEventsInterest: string): void;
    /**
     * Set the title of the extension window.
     * This function works with modal and modeless extensions in all Adobe products, and panel extensions in Photoshop, InDesign, InCopy, Illustrator, Flash Pro and Dreamweaver.
     *
     * @since 6.1.0
     *
     * @param title The window title.
     */
    setWindowTitle(title: string): void;
    /**
     * Get the title of the extension window.
     * This function works with modal and modeless extensions in all Adobe products, and panel extensions in Photoshop, InDesign, InCopy, Illustrator, Flash Pro and Dreamweaver.
     *
     * @since 6.1.0
     *
     * @return {string} The window title.
     */
    getWindowTitle(): string;
}
export declare namespace CSInterface {
    /**
     * Stores operating-system-specific location constants for use in the CSInterface.getSystemPath() method.
     */
    enum SystemPath {
        /**
         * The path to user data.
         */
        USER_DATA = "userData",
        /**
         * The path to common files for Adobe applications.
         */
        COMMON_FILES = "commonFiles",
        /**
         * The path to the user's default document folder.
         */
        MY_DOCUMENTS = "myDocuments",
        /**
         * @deprecated. Use SystemPath.Extension.
         */
        APPLICATION = "application",
        /**
         * The path to current extension.
         */
        EXTENSION = "extension",
        /**
         * The path to hosting application's executable.
         */
        HOST_APPLICATION = "hostApplication"
    }
    /**
     *
     */
    const EvalScript_ErrMessage: string;
    /**
     *
     */
    type EventScope = "GLOBAL" | "APPLICATION";
    /**
     *
     */
    const THEME_COLOR_CHANGED_EVENT: string;
}
export { CSXSWindowType, ExtensionDispatchInfo, Extension, RGBColor, UIColor, ColorType, Direction, GradientStop, GradientColor, CSEvent, ContextMenuItemStatus, MenuItemStatus, ApiVersion, HostCapabilities, HostEnvironment, AppSkinInfo };
export default CSInterface;
