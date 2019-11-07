import * as CSInterface from "./v9";

export function evalScript(script: string, callback?: (result?: any) => void): Promise<any> {
    /**
     *
     * @param {*} value
     */
    function escape(value: undefined | string | number | object | boolean): any {

        switch (typeof value) {
            case 'undefined':
                return '"null"';
            case 'string':
                return JSON.stringify(value);
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
                throw Error(`Nicht unterstützter Typ "${typeof value}"`);
        }
    }


    /**
     * Versucht eine Funktion oder einen Befehl auszuführen.
     *
     * Wird mehr als ein Parameter übergeben, ist der erste Parameter der Funktionsname
     * und alle weiteren Parameter werden jeweils als JSON-String hinzugefügt.
     *
     * @param {...any}
     *
     * @return {Promise<any>}
     */

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

        window.__adobe_cep__.evalScript(script, (result: any) => {

            // Wenn der Nutzer eine eigene Callback angegeben hat (evalScript legacy support)
            if (user_callback) {
                return resolve(user_callback(result) || result);
            }

            if (typeof result === 'string' && result === CSInterface.EvalScript_ErrMessage) {
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
