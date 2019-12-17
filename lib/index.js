"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.HostApplication = {
    PHSP: "Photohsop",
    PHXS: "Photoshop",
    IDSN: "InDesign",
    AICY: "InCopy",
    ILST: "Illustrator",
    PPRO: "Premiere Pro",
    PRLD: "Prelude",
    AEFT: "After Effects",
    FLPR: "Animate (Flash Pro)",
    AUDT: "Audition",
    DRWV: "Dreamweaver",
    MUSE: "Muse",
    KBRG: "Bridge",
    RUSH: "Rush"
};
__export(require("./v9"));
var utils_1 = require("./utils");
exports.CSInterfacePromise = utils_1.CSInterface;
var v9_1 = require("./v9");
exports.default = v9_1.default;
