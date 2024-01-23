
import { compileString } from 'sass';

export const compileSass = async (data: string): Promise<{ css: string }> => {
    try {
        const result = compileString(data);
        return result;

    } catch (e) {
        return e;
    }
}