import { File, Config } from "./types.js";
export declare const resolveFile: (fileNames: string[]) => string[];
export declare const resolveProjectFile: (files: string[]) => string[];
export declare const resolvePackageFile: (files: string[]) => string[];
export declare const getFileData: (file: File, config: Config) => Promise<any>;
export declare const getFiles: (config: Config, base: string, files: string[], result: File[]) => Promise<File[]>;
