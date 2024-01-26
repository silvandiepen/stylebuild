
import { compile } from 'sass';
import { File } from "./types"

export const compileSass = async (file: File): Promise<{ css: string }> => {
    try {
        const result = compile(file.path);
        return result;
    } catch (e) {
        console.log(e);
        return e;
    }
}