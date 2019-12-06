import CSInterfaceBase from "./index";
declare class CSInterface extends CSInterfaceBase {
    /**
     * @param {string} script
     * @param {...*} args
     *
     * @return {Promise<*>}
     */
    evalScript(script: string, ...args: any): Promise<any>;
}
export { CSInterface };
export default CSInterface;
