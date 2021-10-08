export type HostId = "PHSP" | "PHXS" | "IDSN" | "AICY" | "ILST" | "PPRO" | "PRLD" | "AEFT" | "FLPR" | "AUDT" | "DRWV" | "MUSE" | "KBRG" | "RUSH";

type HostNameMap = {
 [K in HostId]: string
};

export const HostApplication: Partial<HostNameMap> = {
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

export * from './v11';
export {CSInterface as CSInterfacePromise} from "./utils";
export {default} from './v11'
