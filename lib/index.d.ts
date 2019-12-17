export declare type HostId = "PHSP" | "PHXS" | "IDSN" | "AICY" | "ILST" | "PPRO" | "PRLD" | "AEFT" | "FLPR" | "AUDT" | "DRWV" | "MUSE" | "KBRG" | "RUSH";
declare type HostNameMap = {
    [K in HostId]: string;
};
export declare const HostApplication: Partial<HostNameMap>;
export * from './v9';
export { CSInterface as CSInterfacePromise } from "./utils";
export { default } from './v9';
