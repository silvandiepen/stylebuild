import { File } from "./types";
export declare const compileSass: (file: File) => Promise<{
    css: string;
}>;
