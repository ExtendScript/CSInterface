import CSInterfaceBase from "./index";

/*
 * This is needed if the return type of the original method is other than `void` and we want to change it.
 * @link https://github.com/Microsoft/TypeScript/issues/4544
 * type CSInterfaceWithoutEval = new() => { [P in Exclude<keyof CSInterfaceBase, 'evalScript'>] : CSInterfaceBase[P] }
 * const CSInterfaceWithoutEval: CSInterfaceWithoutEval = CSInterfaceBase;
 * class CSInterface extends CSInterfaceWithoutEval {}
 */

class CSInterface extends CSInterfaceBase {

    /**
     * @param {string} script
     * @param {...*} args
     *
     * @return {Promise<*>}
     */
    // TODO: Generic function evalScript<T extends (...args: any[]) => any>(script: string, ...args: Parameters<T>): void
    evalScript(script: string, ...args: unknown[]): Promise<any>;
    evalScript(script: string, callback?: (result?: any) => void): Promise<any> {
        /**
         * @param {*} value
         */
        function escape(value: undefined | string | number | object | boolean): any {

            switch (typeof value) {
                case 'undefined':
                    return '"null"';
                case 'string':
                    let str = JSON.stringify(value);
                    if (str.substr(0,1) !== '"' || str.substr(-1) !== '"') {
                        throw TypeError(`Unbekannter JSON String: "${str}"`);
                    }

                    return `"\\${str.substr(0, str.length -1)}\\""`;
                case 'number': {

                    if (Number.isNaN(value) || Infinity === value) {
                        return 0;
                    }

                    return value;
                }
                case 'object': {
                    if (value === null) {
                        return '"null"';
                    }

                    return escape(JSON.stringify(value));
                }
                case 'boolean': {
                    return value;
                }
                default:
                    throw TypeError(`Nicht unterstützter Typ "${typeof value}"`);
            }
        }

        const args = Array.from(arguments);

        // Hole den Befehl oder den Funktionsnamen
        let eval_string = args.shift().trim();

        // Der Nutzer hat mehr als 1 Parameter angegeben,
        // a) Entweder eine callback, wenn du Funktion wie die original Function von CSInterface verwendet wird
        // b) Andere Typen wenn die Funktion automatisch die Parameter einer Funktion escapen soll
        let user_callback: any = null;
        if (args.length > 0) {

            if (typeof args[0] === 'function') {
                // a)
                user_callback = args.shift();

            } else {
                // b)

                // Prüfe ob der Nutzer vielleicht bereits die runden Klammern "()" angegeben hat und entferne die
                if (eval_string.length >= 3 && eval_string.substr(-3) === '();') {
                    eval_string = eval_string.substr(0, eval_string.length - 3);
                } else if (eval_string.length >= 2 && eval_string.substr(-2) === '()') {
                    eval_string = eval_string.substr(0, eval_string.length - 2);
                }

                eval_string += `(${args.map(param => escape(param)).join(', ')});`;
            }
        }

        return new Promise((resolve, reject) => {

            // Ermöglicht es eine genauere Fehlermeldung zu erhalten ("e" besitzt noch folgende Eigenschaften: start, end, source, fileName, number)
            // Von der Fehlerzeile müssen wir 1 abziehen, da der Try/Catch-Block mitgezählt wird
            const script = `try {
                    ${eval_string}
                } catch(e) {
                    '{"error": "' + e.name + '", "message": "' + e.message.replace(/"/g, \"'\") + '", "line": "' + (e.line ? e.line - 1: -1) + '", "stack": "' + (e.stack ? e.stack.replace(/"/g, \"'\") : \"\") + '"}'
                }`;
            super.evalScript(script, (result: any) => {

                // Wenn der Nutzer eine eigene Callback angegeben hat (evalScript legacy support)
                if (user_callback) {
                    return resolve(user_callback(result) || result);
                }

                if (typeof result === 'string' && result === CSInterfaceBase.EvalScript_ErrMessage) {
                    return reject(result);
                }

                if (typeof result === 'string' && result.length > 0) {
                    try {
                        const obj = JSON.parse(result);

                        if (typeof obj.error === 'string') {
                            return reject(obj);
                        }

                        return resolve(JSON.parse(result));
                    } catch (e) {
                        // Ignoriere Parse Error und gebe den String zurück
                    }
                }

                return resolve(result);
            });
        });
    }

    // @TODO: loadBinAsync, loadBinSync -> Promise
}

export {CSInterface}
export default CSInterface