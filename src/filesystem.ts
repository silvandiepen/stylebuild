import { Console } from "console";
import { File, Config } from "./types";
import { writeFile, mkdir } from "fs/promises";

export const writeData = async (file: File, config: Config): Promise<boolean> => {

    const { name, css } = file;


    const path = (config.outputDir || './dist') + '/' + name.replace('.scss', '.css');
    const dir = path.substring(0, path.lastIndexOf('/'));

    const data = css || "";

    try {

        await mkdir(dir, { recursive: true });

        if(!data) {
            return false;
        }

        await writeFile(path, data, { encoding: 'utf8', flag: 'w' });

        return true;
    } catch (e) {
        console.log(e);
    }

}