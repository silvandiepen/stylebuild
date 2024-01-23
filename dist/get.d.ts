import { File, Config } from "./types";
export declare const getFileData: (file: File, config: Config) => Promise<any>;
export declare const getFiles: (config: Config, base: string, files: string[], result: File[]) => Promise<File[]>;
