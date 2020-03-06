"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
/*
 * This is needed if the return type of the original method is other than `void` and we want to change it.
 * @link https://github.com/Microsoft/TypeScript/issues/4544
 * type CSInterfaceWithoutEval = new() => { [P in Exclude<keyof CSInterfaceBase, 'evalScript'>] : CSInterfaceBase[P] }
 * const CSInterfaceWithoutEval: CSInterfaceWithoutEval = CSInterfaceBase;
 * class CSInterface extends CSInterfaceWithoutEval {}
 */
var CSInterface = /** @class */ (function (_super) {
    __extends(CSInterface, _super);
    function CSInterface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CSInterface.prototype.evalScript = function (script, callback) {
        var _this = this;
        /**
         * @param {*} value
         */
        function escape(value) {
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
                    throw TypeError("Nicht unterst\u00FCtzter Typ \"" + typeof value + "\"");
            }
        }
        var args = Array.from(arguments);
        // Hole den Befehl oder den Funktionsnamen
        var eval_string = args.shift().trim();
        // Der Nutzer hat mehr als 1 Parameter angegeben,
        // a) Entweder eine callback, wenn du Funktion wie die original Function von CSInterface verwendet wird
        // b) Andere Typen wenn die Funktion automatisch die Parameter einer Funktion escapen soll
        var user_callback = null;
        if (args.length > 0) {
            if (typeof args[0] === 'function') {
                // a)
                user_callback = args.shift();
            }
            else {
                // b)
                // Prüfe ob der Nutzer vielleicht bereits die runden Klammern "()" angegeben hat und entferne die
                if (eval_string.length >= 3 && eval_string.substr(-3) === '();') {
                    eval_string = eval_string.substr(0, eval_string.length - 3);
                }
                else if (eval_string.length >= 2 && eval_string.substr(-2) === '()') {
                    eval_string = eval_string.substr(0, eval_string.length - 2);
                }
                eval_string += "(" + args.map(function (param) { return escape(param); }).join(', ') + ");";
            }
        }
        return new Promise(function (resolve, reject) {
            // Ermöglicht es eine genauere Fehlermeldung zu erhalten ("e" besitzt noch folgende Eigenschaften: start, end, source, fileName, number)
            // Von der Fehlerzeile müssen wir 1 abziehen, da der Try/Catch-Block mitgezählt wird
            var script = "try {\n                    " + eval_string + "\n                } catch(e) {\n                    '{\"error\": \"' + e.name + '\", \"message\": \"' + e.message.replace(/\"/g, \"'\") + '\", \"line\": \"' + (e.line ? e.line - 1: -1) + '\", \"stack\": \"' + (e.stack ? e.stack.replace(/\"/g, \"'\") : \"\") + '\"}'\n                }";
            _super.prototype.evalScript.call(_this, script, function (result) {
                // Wenn der Nutzer eine eigene Callback angegeben hat (evalScript legacy support)
                if (user_callback) {
                    return resolve(user_callback(result) || result);
                }
                if (typeof result === 'string' && result === index_1.default.EvalScript_ErrMessage) {
                    return reject(result);
                }
                if (typeof result === 'string' && result.length > 0) {
                    try {
                        var obj = JSON.parse(result);
                        if (typeof obj.error === 'string') {
                            return reject(obj);
                        }
                        return resolve(JSON.parse(result));
                    }
                    catch (e) {
                        // Ignoriere Parse Error und gebe den String zurück
                    }
                }
                return resolve(result);
            });
        });
    };
    return CSInterface;
}(index_1.default));
exports.CSInterface = CSInterface;
exports.default = CSInterface;
