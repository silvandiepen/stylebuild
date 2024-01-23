
import { readdirSync, statSync, readFileSync } from 'fs';
import { join } from 'path';
import { asyncForEach } from './utils';

import { File, Config } from "./types"

export const getFileData = async (file: File, config: Config) => {
    const { cache } = config || { cache: { data: {} } };
    if (cache.data[file.id]) {
        return cache[file.id];
    }
    try {
        const data = readFileSync(file.path, 'utf8');
        cache.data[file.id] = data;
        return data;
    } catch (e) {
        console.log('Error:', e.stack);
    }
}

export const getFiles = async (config: Config, base: string, files: string[], result: File[]) => {
    files = files || readdirSync(base);
    result = result || [];

    await asyncForEach(files, async (file: string) => {
        const newbase = join(base, file);
        const isDirectory = statSync(newbase).isDirectory();

        if (isDirectory) {
            result = await getFiles(config, newbase, readdirSync(newbase), result)
            return;
        }

        if (!file.endsWith('.scss')) return;
        if (file.indexOf('node_modules') > -1) return;

        const fileName = newbase.split('/').pop();
        const filePath = newbase;
        const date = statSync(newbase).mtime;


        const age = ((new Date()).getTime() - date.getTime()) / 1000;

        if (config.watching && age > 1) return;

        const identifier = (fileName + `${date}`).toLowerCase().replace(/[^a-z0-9]/g, '');
        const currentFile: File = { path: filePath, name: fileName, date, id: identifier, data: '' }
        const data = await getFileData(currentFile, config);

        result.push({ ...currentFile, data })
    })

    return result
}
