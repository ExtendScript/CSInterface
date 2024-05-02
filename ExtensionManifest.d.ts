declare namespace ExtensionManifest {

    type CollectionWithAttributes<K extends string, T, A> =
        Partial<A> extends A
            ? Array<{ [P in K]: T } & A> | Array<[K, T, A?]>
            : Array<{ [P in K]: T } & A> | Array<[K, T, A]>;

    type CollectionWithoutAttributes<K extends string, T> =
        Array<{ [P in K]: T }> | Array<[K, T]>;

    type Collection<K extends string, V, A = null> =
        A extends object
            ? CollectionWithAttributes<K, V, A>
            : CollectionWithoutAttributes<K, V>;


    /*
    type OptionalAttr<T = never> = Partial<T> extends T
        ? string | {'#text': string} & T
        : {'#text': string} & T;


    type OptionalAttrS<T = never, A = never> =
        T extends object ?
            A extends never ? string : {}
        :


    // https://github.com/oozcitak/xmlbuilder-js/wiki/Conversion-From-Object

    let opt: OptionalAttr =  "test";
    let opt2: OptionalAttr =  4;
    let opt3: OptionalAttr =  {'#text': "ff"};
    let opt4: OptionalAttr =  {'#text': 4};
    let opt5: OptionalAttr<{Id?: string}> =  {'#text': "", Id: "ddd"};
    let opt6: OptionalAttr<{Id?: string}> =  {Id: "ddd", '#text': 3};
    let opt7: OptionalAttr<{Id?: string}> =  "test";
    let opt8: OptionalAttr<Host, {Id?: string}> = {"Host": };
    */


    /**
     * An ID.
     *
     * <xs:pattern value="[A-Za-z0-9._\-]+"/>
     */
    export type ID = RequiredString;
    /**
     * A version consists of major.minor.micro.special. major, minor, micro must be numbers and special can be any string (version parts can have up to 9 digits).
     * At least the major has to be specified, all other elements are optional. If minor or micro versions are not specified, they are assumed to be zero.
     * When it comes to comparing versions the special discriminator will be compared based on UTF-8 encoding.
     *
     * <xs:pattern value="\d{1,9}(\.\d{1,9}(\.\d{1,9}(\.(\w|_|-)+)?)?)?"/>
     */
    export type Version = string;
    /**
     * A ranged version defines at least a minimum version and optionally a maximum version. If only one version is specified it is taken as minimum version
     * with no special maximum version. With "[","]", "(" and ")" inclusive and exclusive ranges can be specified. For example, to define a range
     * from 7.0 to 7.5 inclusive, use [7.0,7.5]. Note that because unspecified versions are assumed to be zero, 7.5.1 is not included in this range.
     * To include 7.5.1 and any other micro version changes, use the range [7.0,7.6) which includes versions greater than 7.0.0 but less than 7.6.0.
     * See definition of Version for further information.
     *
     * <xs:pattern value="(\d{1,9}(\.\d{1,9}(\.\d{1,9}(\.(\w|_|-)+)?)?)?)|([(\[]\d{1,9}(\.\d{1,9}(\.\d{1,9}(\.(\w|_|-)+)?)?)?,?\d{1,9}(\.\d{1,9}(\.\d{1,9}(\.(\w|_|-)+)?)?)?[)\]])"/>
     */
    export type RangedVersion = string;
    /**
     * An InclusiveRangedVersion is the same as a RangedVersion, except that only a single version or an inclusive version range may be specified (using "[","]" notation). An exclusive version range cannot be specified.
     *
     * <xs:pattern value="(\d{1,9}(\.\d{1,9}(\.\d{1,9}(\.(\w|_|-)+)?)?)?)|(\[\d{1,9}(\.\d{1,9}(\.\d{1,9}(\.(\w|_|-)+)?)?)?,?\d{1,9}(\.\d{1,9}(\.\d{1,9}(\.(\w|_|-)+)?)?)?\])"/>
     */
    export type InclusiveRangedVersion = string;
    /**
     * A relative path always has to start with ./ and points to a resource relative to the extension bundle's root.
     *
     * <xs:pattern value="\./.+"/>
     */
    export type RelativePath = string;
    /**
     * A RelativePath element which can also be localized.
     */
    export type RelativePathLoc = RelativePath | LocalizableString;
    /**
     * A string with at least one element.
     *
     * <xs:minLength value="1"/>
     */
    export type RequiredString = string;
    /**
     * A RequiredString which can also be localized.
     */
    export type RequiredStringLoc = RequiredString | LocalizableString;
    /**
     * An optional string.
     */
    export type OptionalString = string;
    /**
     * An OptionalString which can also be localized.
     */
    export type OptionalStringLoc = OptionalString | LocalizableString;
    /**
     * A string which has to start with '%'. This string denotes a key which will be replaced by the appropriate value from the messages.properties file for the current language.
     *
     * <xs:minLength value="2"/>
     * <xs:pattern value="%[^%].*"/>
     */
    export type LocalizableString = string;
    /**
     * A size which can be a positive number or 0.
     *
     * unsignedInt
     */
    export type Size = number;
    /**
     * A Size which can also be localized.
     */
    export type SizeLoc = Size | LocalizableString;

    /**
     * ExtensionManifest for CEP extensions.
     */
    export interface ExtensionManifest {
        /**
         * An optional author of this ExtensionBundle.
         */
        Author?: string;
        /**
         * An optional contact for this ExtensionBundle.
         *
         * An optional contact mail.
         */
        Contact?: OptionalString | { value: string, mailto?: RequiredString };
        /**
         * An optional legal notice for this ExtensionBundle.
         *
         * A link to a legal site.
         */
        Legal?: OptionalString | { value: string, href?: string };

        /**
         * An optional abstract for this ExtensionBundle.
         */
        Abstract?: OptionalString | { value: string, href?: string };

        /**
         * @TODO: Unklar ob der Wert Optional sein kann...
         *
         * Contains a list of extensions defined in this ExtensionManifest.
         */
        ExtensionList: Collection<"Extension", null, Extension>;

        ExecutionEnvironment: ExecutionEnvironment;

        /**
         * Contains a list for every extension's attributes.
         */
        DispatchInfoList: Collection<"Extension", null, DispatchInfoList.Extension>;
    }

    /**
     * Declaration of an extension specified in this ExtensionManifest. There can be an arbitrary number of extension specified.
     */
    export interface Extension {
        /**
         * The id of the specific extension. This id has to be unique within the whole CEP system. Recommendation is to use reverse domain names. This id is used within the ExtensionManifest as reference in other tags.
         */
        Id: ID;
        /**
         * The version of the specific extension.
         */
        Version: Version;
    }

    export interface ExecutionEnvironment {
        /**
         * Contains a list of all supported hosts.
         */
        HostList?: Collection<"Host", null, Host>;
        /**
         * Contains a list for all supported locales.
         */
        LocaleList?: Collection<"Host", null, Locale>;
        /**
         * Contains a list for all required runtimes. The absence for any runtime implies no requirement.
         */
        RequiredRuntimeList?: Collection<"Host", null, RequiredRuntime>;
    }

    /**
     * The host defines a supported product.
     */
    export interface Host {
        /**
         * The name must be the enigma code of the supported point product.
         */
        Name: RequiredString;
        /**
         * A version range for this host. See the RangedVersion type for information.
         */
        Version: RangedVersion;
    }

    /**
     * Contains an entry for a supported code. The code must be given in the form xx_XX or as All to specify that all locales are supported.
     */
    export interface Locale {
        /**
         * The language code in the form xx_XX or All.
         */
        Code: RequiredString;
    }

    /**
     * Specifies runtimes which must be available in order for the extension to run. For CS5 and CS5.5, the CEP runtime version is 2.0; for CS6, it is 3.0; for CC 2013, it is 4.0; for CC 2014, it is 5.0. Specifying an accurate CEP runtime requirement is recommended, since this value enables (though does not guarantee) compatibility with future versions of CEP. If no CEP runtime requirement is specified, the target CEP runtime is assumed to be 2.0 and above. This is significant, because extensions which target older CEP runtime versions may not be loaded by future versions of CEP.
     */
    export interface RequiredRuntime {
        /**
         * Name of the runtime.
         */
        Name: "CSXS";
        /**
         * A version range for this runtime. See the RangedVersion type for information.
         */
        Version: RangedVersion;
    }

    export namespace DispatchInfoList {

        export type FeatureParameterValue = "SameSiteByDefaultCookies" | "CookiesWithoutSameSiteMustBeSecure" | "NetworkService";

        /**
         * One CEF command line parameter
         */
        export type Parameter =
            "--enable-media-stream" |                   // Enable media (WebRTC audio/video) streaming.
            "--enable-speech-input" |                   // Enable speech input (x-webkit-speech).
            "--persist-session-cookies" |               // Persist session cookies.
            "--disable-image-loading" |                 // Disable loading of images from the network. A cached image will still be rendered if requested.
            "--disable-javascript-open-windows" |       // Disable opening of windows via JavaScript.
            "--disable-javascript-close-windows" |      // Disable closing of windows via JavaScript.
            "--disable-javascript-access-clipboard" |   // Disable clipboard access via JavaScript.
            "--enable-caret-browsing" |                 // Enable caret browsing.
            "--proxy-auto-detect" |                     // This tells Chrome to try and automatically detect your proxy configuration.
                                                        // See more info at http://www.chromium.org/developers/design-documents/network-settings.
            "--user-agent" |                            // A string used to override the default user agent with a custom one.
            "--disable-application-cache" |             // Disable the ApplicationCache.
            "--enable-nodejs" |                         // Enable Node.js APIs in extensions. Supported since CEP 6.1.
            "--disable-pinch" |                         // Disable compositor-accelerated touch-screen pinch gestures.
            "--mixed-context" |                         // Enable the "mixed context" mode. Supported since CEP 7.0.

            "--allow-file-access" |
            "--allow-file-access-from-files" |
            // @see https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_11.x/Documentation/CEP%2011.1%20HTML%20Extension%20Cookbook.md#migration-from-cep-10-to-cep-11
            "--disable-features" |
            "--disable-site-isolation-trials"
            ;

        /**
         * Contains a list of CEF command line parameters.
         */
        export type CEFCommandLine = Parameter[];

        /**
         * This defines an optional ID for the ExtendsScript engine. This can be used to run different scripts in the same engine. This value is localizable.
         */
        export type ScriptPath = RelativePathLoc | { value: RelativePathLoc, Engine?: RequiredStringLoc };


        export interface Resources {
            /**
             * The MainPath contains the path to the extension's main content file (e.g. main.swf / index.html). The path has to be relative to the extensions root directory and start with a "./". Use "/" as path delimiter. This value is localizable.
             */
            MainPath?: RelativePathLoc;
            /**
             * The ScriptPath contains the path to the extension's script file. The path has to be relative to the extensions root directory and start with a "./". Use "/" as path delimiter. This value is localizable.
             */
            ScriptPath?: ScriptPath;
            /**
             * Contains a list of CEF command line parameters.
             */
            CEFCommandLine?: CEFCommandLine;
        }

        export interface Event {
            /**
             * Specifies zero or more events on which the extension should be started. The name of the event has to be the fully qualified event id. This value is localizable.
             */
            Event: RequiredStringLoc
        }

        export interface Lifecycle {
            /**
             * This flag controls whether the extension's UI should be made visible automatically when started or if the extension wants to control this itself. Panel type extensions should always be made visible automatically in order to maintain consistency with non-CEP panels. This value is localizable.
             */
            AutoVisible?: "true" | "false" | LocalizableString;
            /**
             * With StartOn the extension can define different ways to start itself.
             */
            StartOn?: Event[];
        }

        export namespace UI {

            /**
             * Specifies the type of the extension. Note that the "Custom" type means that it is up to the point product to decide how this extension will be handled. This value is localizable.
             */
            export type Type = "Panel" | "ModalDialog" | "Modeless" | "Custom" | "Embedded" | "Dashboard"; // LocalizableString

            /**
             * A special placement which doesn't have to be honored by the point products. This value is localizable.
             */
            export type Menu = RequiredStringLoc | { Placement?: RequiredStringLoc }

            export namespace Geometry {

                export interface ScreenPercentage {
                    /**
                     * The percentage for height based on the screen size.
                     */
                    Height?: SizeLoc;
                    /**
                     * The percentage for width based on the screen size.
                     */
                    Width?: SizeLoc;
                }

                export interface Size {
                    /**
                     * The height. If not provided this will default to the system default or any value set in the AIR API. This value is localizable.
                     */
                    Height?: SizeLoc;
                    /**
                     * The width. If not provided this will default to the system default or any value set in the AIR API. This value is localizable.
                     */
                    Width?: SizeLoc;
                }

                export interface MaxSize {
                    /**
                     * The height. If not provided this will default to the system default or any value set in the AIR API. This value is localizable.
                     */
                    Height?: SizeLoc;
                    /**
                     * The width. If not provided this will default to the system default or any value set in the AIR API. This value is localizable.
                     */
                    Width?: SizeLoc;
                }

                export interface MinSize {
                    /**
                     * The height. If not provided this will default to the system default or any value set in the AIR API. This value is localizable.
                     */
                    Height?: SizeLoc;
                    /**
                     * The width. If not provided this will default to the system default or any value set in the AIR API. This value is localizable.
                     */
                    Width?: SizeLoc;
                }
            }

            export interface Geometry {
                /**
                 * If values are provided here both have to be specified. Note that those values can be scattered over different DispatchInfos.
                 */
                ScreenPercentage?: Geometry.ScreenPercentage;
                /**
                 * If values are provided here both have to be specified. Note that those values can be scattered over different DispatchInfos.
                 */
                Size?: Geometry.Size;
                /**
                 * If values are provided here both have to be specified. Note that those values can be scattered over different DispatchInfos.
                 */
                MaxSize?: Geometry.MaxSize;
                /**
                 * If values are provided here both have to be specified. Note that those values can be scattered over different DispatchInfos.
                 */
                MinSize?: Geometry.MinSize;
            }

            /**
             * The type of the icon.
             */
            type IconTyp = "Normal" | "Disabled" | "RollOver" | "DarkNormal" | "DarkRollOver";

            /**
             * A specific icon for a given type. This value is localizable.
             *
             * <xs:attribute name="Type" use="required">
             */
            export interface Icon {
                //Icon: RelativePathLoc<{Type: IconTyp}>;
                Icon: RelativePathLoc;
            }
        }

        export interface UI {
            /**
             * Specifies the type of the extension. Note that the "Custom" type means that it is up to the point product to decide how this extension will be handled. This value is localizable.
             */
            Type?: DispatchInfoList.UI.Type;
            /**
             * Specifies the name for the menu entry. This value is localizable.
             */
            Menu?: UI.Menu;
            /**
             * Specifies the geometry of the extension. Please note that all elements are onle "preferred" values. Some point products will not support all of these values. These values can be overwritten by an AIR extension through the AIR window API.
             */
            Geometry?: UI.Geometry;
            /**
             * Icons provided for the UI of this extension.
             *
             *  minOccurs="0" maxOccurs="5"
             */
            Icons?: UI.Icon[];
        }

        /**
         * A DispatchInfo contains all parameter which are needed to run an extension. A DispatchInfo can have an optional attribute "Host" to define specific attributes per "Host". If an DispatchInfo has no "Host" it will act as a default for all values which are not set in a specific Host-DispatchInfo.
         */
        export interface DispatchInfo {
            Resources?: Resources;
            Lifecycle?: Lifecycle;
            UI?: UI;
            /**
             * This section contains arbitrary information about this extension. This value is localizable.
             */
            ExtensionData?: any[];
        }

        export interface Dependency {
            /**
             * The id of the extension which is depended upon.
             */
            Id: ID
            /**
             * Specifies that a particular version of the extension is depended upon. Either a single version or a range of versions may be specified. A range of versions must be specified using inclusive lower and upper bounds; exclusive bounds are not allowed. Omitting this attribute indicates that no specific version is required.
             */
            Version?: InclusiveRangedVersion
        }

        /**
         * Declaration of the extension for which the following list of DispatchInfos is declared.
         */
        export interface Extension {
            /**
             * @FIXME: Typ erzeugen
             *
             * The "HostList" tag allows the user to define a host list specific to each extension by overriding both the optional "Host" attribute in the "DispatchInfo" tag and the "HostList" tag under the "ExecutionEnvrironment" tag. If no "HostList" tag is defined, either the optional "Host" attribute or the the default host list will be used.
             */
            HostList?: any
            /**
             * A DispatchInfo contains all parameter which are needed to run an extension. A DispatchInfo can have an optional attribute "Host" to define specific attributes per "Host". If an DispatchInfo has no "Host" it will act as a default for all values which are not set in a specific Host-DispatchInfo.
             *
             * @TODO: <xs:attribute name="Host" type="RequiredString" use="optional"/>
             */
            DispatchInfo: DispatchInfo
            /**
             * Specifies a list of extensions which this extension depends upon. Adobe Extension Manager will install this extension only if all of its strict dependencies are already installed in the system.
             */
            DependencyList?: Collection<"Dependency", null, Dependency>;
        }
    }


    interface ManifestAttr {
        /**
         * The version of this ExtensionManifest.
         */
        Version: "7.0"
        /**
         * The Id for all extensions included in this ExtensionManifest.
         */
        ExtensionBundleId: ExtensionManifest.ID
        /**
         * The version of this ExtensionBundle.
         */
        ExtensionBundleVersion: ExtensionManifest.Version
        /**
         * An optional user-friendly name for this ExtensionBundle.
         */
        ExtensionBundleName?: ExtensionManifest.RequiredString
    }
}


interface V6 extends ExtensionManifest.ExtensionManifest {
}

interface V7 extends ExtensionManifest.ExtensionManifest {
}

export { V6, V7}
export default ExtensionManifest;
