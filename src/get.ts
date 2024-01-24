
import { fileURLToPath } from 'url';
import { readdirSync, statSync, readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { asyncForEach } from './utils.js';

import { File, Config } from "./types.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const resolveCache = {
    project: {},
    package: {}
}

const createResolveCacheIdentifier = (files: string[]) => {
    return files.join('').toLowerCase().replace(/[^a-z0-9]/g, '');
}


export const resolveFile = (fileNames: string[]): string[] => {
    const result: string[] = [];

    fileNames.forEach((fileName) => {

        const file = existsSync(fileName);
        if (!file) return;

        if (statSync(fileName).isDirectory()) {
            const subFiles = readdirSync(fileName);
            const subFilesResolved = resolveFile(subFiles.map((subFile) => {
                return join(fileName, subFile)
            }))
            result.push(...subFilesResolved);
        } else {
            const fileData = readFileSync(fileName, 'utf8');
            result.push(fileData);
        }
    })
    return result;
}
export const resolveProjectFile = (files: string[]): string[] => {
    const identifier = createResolveCacheIdentifier(files);

    if (resolveCache.project[identifier]) {
        return resolveCache.project[identifier];
    }


    const resolvedFile = resolveFile(files.map((file) => {
        return join(__dirname, "../", file)
    }
    ))
    resolveCache.project[identifier] = resolvedFile

    return resolvedFile;
}
export const resolvePackageFile = (files: string[]): string[] => {
    const identifier = createResolveCacheIdentifier(files);

    if (resolveCache.package[identifier]) {
        return resolveCache.package[identifier];
    }
    const resolvedFile = resolveFile(files.map((file) => {
        return join(process.cwd(), file)
    }))

    resolveCache.package[identifier] = resolvedFile

    return resolvedFile;

}

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


        const age = ((new Date()).getTime() - date.getTime()) / 10000;

        if (config.watch && age > 1) return;

        const identifier = (fileName + `${date}`).toLowerCase().replace(/[^a-z0-9]/g, '');
        const currentFile: File = { path: filePath, name: fileName, date, id: identifier, data: '' }
        const data = await getFileData(currentFile, config);

        result.push({ ...currentFile, data })
    })

    return result
}
export const getPackageJson = () => {
    const data = readFileSync(join(__dirname, '../package.json'), 'utf8');
    return JSON.parse(data);
}
