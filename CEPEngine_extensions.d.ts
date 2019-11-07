declare type LastErrorResult = number;
declare type ErrorResult = { err: LastErrorResult };

export declare function getLastError(): LastErrorResult;

export declare function getErrorResult(): ErrorResult;

declare type FileEncoding = string; // Encoding.UTF8 | Encoding.Base64

declare class FS {
    /**
     * @constant No error.
     */
    readonly NO_ERROR = 0;

    /**
     * @constant Unknown error occurred.
     */
    readonly ERR_UNKNOWN = 1;

    /**
     * @constant Invalid parameters passed to function.
     */
    readonly ERR_INVALID_PARAMS = 2;

    /**
     * @constant File or directory was not found.
     */
    readonly ERR_NOT_FOUND = 3;

    /**
     * @constant File or directory could not be read.
     */
    readonly ERR_CANT_READ = 4;

    /**
     * @constant An unsupported encoding value was specified.
     */
    readonly ERR_UNSUPPORTED_ENCODING = 5;

    /**
     * @constant File could not be written.
     */
    readonly ERR_CANT_WRITE = 6;

    /**
     * @constant Target directory is out of space. File could not be written.
     */
    readonly ERR_OUT_OF_SPACE = 7;

    /**
     * @constant Specified path does not point to a file.
     */
    readonly ERR_NOT_FILE = 8;

    /**
     * @constant Specified path does not point to a directory.
     */
    readonly ERR_NOT_DIRECTORY = 9;

    /**
     * @constant Specified file already exists.
     */
    readonly ERR_FILE_EXISTS = 10;

    /**
     * Displays the OS File Open dialog, allowing the user to select files or directories.
     *
     * @param allowMultipleSelection {boolean} When true, multiple files/folders can be selected.
     * @param chooseDirectory {boolean} When true, only folders can be selected. When false, only
     *        files can be selected.
     * @param title {string} Title of the open dialog.
     * @param initialPath {string} Initial path to display in the dialog. Pass NULL or "" to
     *        display the last path chosen.
     * @param fileTypes {Array.<string>} The file extensions (without the dot) for the types
     *      of files that can be selected. Ignored when chooseDirectory=true.
     *
     * @return An object with these properties:
     *      <ul><li>"data": An array of the full names of the selected files.</li>
     *          <li>"err": The status of the operation, one of
     *          <br>NO_ERROR
     *          <br>ERR_INVALID_PARAMS </li>
     *      </ul>
     **/
    showOpenDialog(allowMultipleSelection: boolean, chooseDirectory: boolean, title: string, initialPath: string | null, fileTypes: string[]): { data: string[], err: LastErrorResult };

    /**
     * Displays the OS File Open dialog, allowing the user to select files or directories.
     *
     * @param allowMultipleSelection {boolean} When true, multiple files/folders can be selected.
     * @param chooseDirectory {boolean} When true, only folders can be selected. When false, only
     *        files can be selected.
     * @param title {string} Title of the open dialog.
     * @param initialPath {string} Initial path to display in the dialog. Pass NULL or "" to
     *        display the last path chosen.
     * @param fileTypes {Array.<string>} The file extensions (without the dot) for the types
     *      of files that can be selected. Ignored when chooseDirectory=true.
     * @param friendlyFilePrefix {string} String to put in front of the extensions
     *      of files that can be selected. Ignored when chooseDirectory=true. (win only)
     *      For example:
     *          fileTypes = ["gif", "jpg", "jpeg", "png", "bmp", "webp", "svg"];
     *          friendlyFilePrefix = "Images (*.gif;*.jpg;*.jpeg;*.png;*.bmp;*.webp;*.svg)";
     * @param prompt {string} String for OK button (mac only, default is "Open" on mac, "Open" or "Select Folder" on win).
     *
     * @return An object with these properties:
     *      <ul><li>"data": An array of the full names of the selected files.</li>
     *          <li>"err": The status of the operation, one of
     *          <br>NO_ERROR
     *          <br>ERR_INVALID_PARAMS </li>
     *      </ul>
     **/
    showOpenDialogEx(allowMultipleSelection: boolean, chooseDirectory: boolean, title: string, initialPath: string, fileTypes: string[], friendlyFilePrefix: string, prompt: string): { data: string[], err: LastErrorResult };

    /**
     * Displays the OS File Save dialog, allowing the user to type in a file name.
     *
     * @param title {string} Title of the save dialog.
     * @param initialPath {string} Initial path to display in the dialog. Pass NULL or "" to
     *        display the last path chosen.
     * @param fileTypes {Array.<string>} The file extensions (without the dot) for the types
     *      of files that can be selected.
     * @param defaultName {string} String to start with for the file name.
     * @param friendlyFilePrefix {string} String to put in front of the extensions of files that can be selected. (win only)
     *      For example:
     *          fileTypes = ["gif", "jpg", "jpeg", "png", "bmp", "webp", "svg"];
     *          friendlyFilePrefix = "Images (*.gif;*.jpg;*.jpeg;*.png;*.bmp;*.webp;*.svg)";
     * @param prompt {string} String for Save button (mac only, default is "Save" on mac and win).
     * @param nameFieldLabel {string} String displayed in front of the file name text field (mac only, "File name:" on win).
     *
     * @return An object with these properties:
     *      <ul><li>"data": The file path selected to save at or "" if canceled</li>
     *          <li>"err": The status of the operation, one of
     *          <br>NO_ERROR
     *          <br>ERR_INVALID_PARAMS </li>
     *      </ul>
     **/
    showSaveDialogEx(title: string, initialPath: string, fileTypes: string[], defaultName: string, friendlyFilePrefix: string, prompt: string, nameFieldLabel: string): { data: string, err: LastErrorResult };

    /**
     * Reads the contents of a folder.
     *
     * @param path {string} The path of the folder to read.
     *
     * @return An object with these properties:
     *      <ul><li>"data": An array of the names of the contained files (excluding '.' and '..'.</li>
     *          <li>"err": The status of the operation, one of:
     *          <br>NO_ERROR
     *          <br>ERR_UNKNOWN
     *          <br>ERR_INVALID_PARAMS
     *          <br>ERR_NOT_FOUND
     *          <br>ERR_CANT_READ </li></ul>
     **/
    readdir(path: string): { data: string, err: LastErrorResult };

    /**
     * Creates a new folder.
     *
     * @param path {string} The path of the folder to create.
     *
     * @return An object with this property:
     *      <ul><li>"err": The status of the operation, one of:
     *          <br>NO_ERROR
     *          <br>ERR_UNKNOWN
     *          <br>ERR_INVALID_PARAMS</li></ul>
     **/
    makedir(path: string): ErrorResult;

    /**
     * Renames a file or folder.
     *
     * @param oldPath {string}  The old name of the file or folder.
     * @param newPath {string}  The new name of the file or folder.
     *
     * @return An object with this property:
     *      <ul><li>"err": The status of the operation, one of:
     *          <br>NO_ERROR
     *          <br>ERR_UNKNOWN
     *          <br>ERR_INVALID_PARAMS
     *          <br>ERR_NOT_FOUND
     *          <br>ERR_FILE_EXISTS </li></ul>
     **/
    rename(oldPath: string, newPath: string): ErrorResult;

    /**
     * Reports whether an item is a file or folder.
     *
     * @param path {string} The path of the file or folder.
     *
     * @return An object with these properties:
     *      <ul><li>"data": An object with properties
     *          <br>isFile (boolean)
     *          <br>isDirectory (boolean)
     *          <br>mtime (modification DateTime) </li>
     *          <li>"err": The status of the operation, one of
     *          <br>NO_ERROR
     *          <br>ERR_UNKNOWN
     *          <br>ERR_INVALID_PARAMS
     *          <br>ERR_NOT_FOUND  </li>
     *      </ul>
     **/
    stat(path: string): { data: { isFile: boolean, isDirectory: boolean, mtime: Date }, err: LastErrorResult };

    /**
     * Reads the entire contents of a file.
     *
     * @param path {string}  The path of the file to read.
     * @param encoding {string}  The encoding of the contents of file, one of
     *      UTF8 (the default) or Base64.
     *
     * @return An object with these properties:
     *      <ul><li>"data": The file contents. </li>
     *          <li>"err": The status of the operation, one of
     *          <br>NO_ERROR
     *          <br>ERR_UNKNOWN
     *          <br>ERR_INVALID_PARAMS
     *          <br>ERR_NOT_FOUND
     *          <br>ERR_CANT_READ
     *          <br>ERR_UNSUPPORTED_ENCODING </li>
     *      </ul>
     **/
    readFile(path: string, encoding: FileEncoding): { data: string, err: LastErrorResult };

    /**
     * Writes data to a file, replacing the file if it already exists.
     *
     * @param path {string}  The path of the file to write.
     * @param data {string}  The data to write to the file.
     * @param encoding {string}  The encoding of the contents of file, one of
     *      UTF8 (the default) or Base64.
     *
     * @return An object with this property:
     *      <ul><li>"err": The status of the operation, one of:
     *          <br>NO_ERROR
     *          <br>ERR_UNKNOWN
     *          <br>ERR_INVALID_PARAMS
     *          <br>ERR_UNSUPPORTED_ENCODING
     *          <br>ERR_CANT_WRITE
     *          <br>ERR_OUT_OF_SPACE </li></ul>
     **/
    writeFile(path: string, data: string, encoding: FileEncoding): ErrorResult;

    /**
     * Sets permissions for a file or folder.
     *
     * @param path {string}  The path of the file or folder.
     * @param mode {number}  The permissions in numeric format (for example, 0777).
     *
     * @return An object with this property:
     *      <ul><li>"err": The status of the operation, one of:
     *          <br>NO_ERROR
     *          <br>ERR_UNKNOWN
     *          <br>ERR_INVALID_PARAMS
     *          <br>ERR_CANT_WRITE </li></ul>
     **/
    chmod(path: string, mode: number): ErrorResult;

    /**
     * Deletes a file.
     *
     * @param path {string}  The path of the file to delete.
     *
     * @return An object with this property:
     *      <ul><li>"err": The status of the operation, one of:
     *          <br>NO_ERROR
     *          <br>ERR_UNKNOWN
     *          <br>ERR_INVALID_PARAMS
     *          <br>ERR_NOT_FOUND
     *          <br>ERR_NOT_FILE </li></ul>
     **/
    deleteFile(path: string): ErrorResult
}

declare class Process {
    /**
     * @constant The maximum number of processes has been exceeded.
     */
    readonly ERR_EXCEED_MAX_NUM_PROCESS = 101;

    /**
     * Creates a process.
     *
     * @param arguments {list} The arguments to create process. The first one is the full path of the executable,
     *                         followed by the arguments of the executable.
     *
     * @return An object with these properties:
     *      <ul><li>"data": The pid of the process, or -1 on error. </li>
     *          <li>"err": The status of the operation, one of
     *          <br>NO_ERROR
     *          <br>ERR_UNKNOWN
     *          <br>ERR_INVALID_PARAMS
     *          <br>ERR_EXCEED_MAX_NUM_PROCESS
     *          <br>ERR_NOT_FOUND
     *          <br>ERR_NOT_FILE</li>
     *      </ul>
     **/
    createProcess(...args: string[]): { data: number, err: LastErrorResult };

    /**
     * Registers a standard-output handler for a process.
     *
     * @param pid {int} The pid of the process.
     * @param callback {function}  The handler function for the standard output callback.
     *
     * @return An object with this property:
     *      <ul><li>"err": The status of the operation, one of:
     *          <br>NO_ERROR
     *          <br>ERR_UNKNOWN
     *          <br>ERR_INVALID_PARAMS
     *          <br>ERR_INVALID_PROCESS_ID </li></ul>
     **/
    stdout(pid: number, callback: Function): ErrorResult;

    /**
     * Registers up a standard-error handler for a process.
     *
     * @param pid {int} The pid of the process.
     * @param callback {function}  The handler function for the standard error callback.
     *
     * @return An object with this property:
     *      <ul><li>"err": The status of the operation, one of:
     *          <br>NO_ERROR
     *          <br>ERR_UNKNOWN
     *          <br>ERR_INVALID_PARAMS
     *          <br>ERR_INVALID_PROCESS_ID </li></ul>
     **/
    stderr(pid: number, callback: Function): ErrorResult;

    /**
     * Writes data to the standard input of a process.
     *
     * @param pid {int}  The pid of the process
     * @param data {string} The data to write.
     *
     * @return An object with this property:
     *      <ul><li>"err": The status of the operation, one of:
     *          <br>NO_ERROR
     *          <br>ERR_UNKNOWN
     *          <br>ERR_INVALID_PARAMS
     *          <br>ERR_INVALID_PROCESS_ID </li></ul>
     **/
    stdin(pid: number, data: string): ErrorResult;

    /**
     * Retrieves the working directory of a process.
     *
     * @param pid {int} The pid of the process.
     *
     * @return An object with these properties:
     *      <ul><li>"data": The path of the working directory. </li>
     *          <li>"err": The status of the operation, one of
     *          <br>NO_ERROR
     *          <br>ERR_UNKNOWN
     *          <br>ERR_INVALID_PARAMS
     *          <br>ERR_INVALID_PROCESS_ID </li></ul>
     **/
    getWorkingDirectory(pid: number): { data: string, err: LastErrorResult };

    /**
     * Waits for a process to quit.
     *
     * @param pid {int} The pid of the process.
     *
     * @return An object with this property:
     *      <ul><li>"err": The status of the operation, one of:
     *          <br>NO_ERROR
     *          <br>ERR_UNKNOWN
     *          <br>ERR_INVALID_PARAMS
     *          <br>ERR_INVALID_PROCESS_ID </li></ul>
     **/
    waitfor(pid: number): ErrorResult;

    /**
     * Registers a handler for the onquit callback of a process.
     *
     * @param pid {int}  The pid of the process.
     * @param callback {function}  The handler function.
     *
     * @return An object with this property:
     *      <ul><li>"err": The status of the operation, one of:
     *          <br>NO_ERROR
     *          <br>ERR_UNKNOWN
     *          <br>ERR_INVALID_PARAMS
     *          <br>ERR_INVALID_PROCESS_ID </li></ul>
     **/
    onquit(pid: number, callback: Function): ErrorResult;

    /**
     * Reports whether a process is currently running.
     *
     * @param pid {int} The pid of the process.
     *
     * @return An object with these properties:
     *      <ul><li>"data": True if the process is running, false otherwise. </li>
     *          <li>"err": The status of the operation, one of
     *          <br>NO_ERROR
     *          <br>ERR_UNKNOWN
     *          <br>ERR_INVALID_PARAMS
     *          <br>ERR_INVALID_PROCESS_ID </li></ul>
     **/
    isRunning(pid: number): { data: boolean, err: LastErrorResult };

    /**
     * Terminates a process.
     *
     * @param pid {int} The pid of the process
     *
     * @return An object with this property:
     *      <ul><li>"err": The status of the operation, one of:
     *          <br>NO_ERROR
     *          <br>ERR_UNKNOWN
     *          <br>ERR_INVALID_PARAMS
     *          <br>ERR_INVALID_PROCESS_ID </li></ul>
     **/
    terminate(pid: number): ErrorResult;
}

declare interface EncodingConvertion {
    utf8_to_b64(str: string): string;

    b64_to_utf8(base64str: string): string;

    binary_to_b64(binary: string): string;

    b64_to_binary(base64str: string): string;

    ascii_to_b64(ascii: string): string;

    b64_to_ascii(base64str: string): string;
}

declare class Encoding {
    /**
     * @constant UTF8 encoding type.
     */
    readonly UTF8 = "UTF-8";

    /**
     * @constant Base64 encoding type.
     */
    readonly Base64 = "Base64";

    convertion: EncodingConvertion
}

declare class Util {
    /**
     * @constant Invalid URL.
     */
    readonly ERR_INVALID_URL = 201;

    /**
     * @constant deprecated API.
     */
    readonly DEPRECATED_API = 202;

    /**
     * Opens a page in the default system browser.
     *
     * @param url {string} The URL of the page/file to open, or the email address.
     * Must use HTTP/HTTPS/file/mailto. For example:
     *  "http://www.adobe.com"
     *  "https://github.com"
     *  "file:///C:/log.txt"
     *  "mailto:test@adobe.com"
     *
     * @return An object with this property:
     *      <ul><li>"err": The status of the operation, one of:
     *          <br>NO_ERROR
     *          <br>ERR_UNKNOWN
     *          <br>ERR_INVALID_PARAMS</li></ul>
     **/
    openURLInDefaultBrowser(url: string): ErrorResult;

    /**
     * Registers a callback function for extension unload. If called more than once,
     * the last callback that is successfully registered is used.
     *
     * @deprecated since version 6.0.0
     *
     * @param callback {function}  The handler function.
     *
     * @return An object with this property:
     *      <ul><li>"err": The status of the operation, one of:
     *          <br>NO_ERROR
     *          <br>ERR_INVALID_PARAMS</li></ul>
     **/
    registerExtensionUnloadCallback(callback: Function): { err: LastErrorResult };

    /**
     * Stores the user's proxy credentials
     *
     * @param username {string}  proxy username
     * @param password {string}  proxy password
     *
     * @return An object with this property:
     *      <ul><li>"err": The status of the operation, one of
     *          <br>NO_ERROR
     *          <br>ERR_INVALID_PARAMS </li>
     *      </ul>
     **/
    storeProxyCredentials(username: string, password: string): ErrorResult;
}

export declare var cep: {
    fs: FS,
    process: Process,
    util: Util,
    encoding: Encoding
};
