var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fileURLToPath } from 'url';
import { readdirSync, statSync, readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { asyncForEach } from './utils.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const resolveCache = {
    project: {},
    package: {}
};
const createResolveCacheIdentifier = (files) => {
    return files.join('').toLowerCase().replace(/[^a-z0-9]/g, '');
};
export const resolveFile = (fileNames) => {
    const result = [];
    fileNames.forEach((fileName) => {
        const file = existsSync(fileName);
        if (!file)
            return;
        if (statSync(fileName).isDirectory()) {
            const subFiles = readdirSync(fileName);
            const subFilesResolved = resolveFile(subFiles.map((subFile) => {
                return join(fileName, subFile);
            }));
            result.push(...subFilesResolved);
        }
        else {
            const fileData = readFileSync(fileName, 'utf8');
            result.push(fileData);
        }
    });
    return result;
};
export const resolveProjectFile = (files) => {
    const identifier = createResolveCacheIdentifier(files);
    if (resolveCache.project[identifier]) {
        return resolveCache.project[identifier];
    }
    const resolvedFile = resolveFile(files.map((file) => {
        return join(__dirname, "../", file);
    }));
    resolveCache.project[identifier] = resolvedFile;
    return resolvedFile;
};
export const resolvePackageFile = (files) => {
    const identifier = createResolveCacheIdentifier(files);
    if (resolveCache.package[identifier]) {
        return resolveCache.package[identifier];
    }
    const resolvedFile = resolveFile(files.map((file) => {
        return join(process.cwd(), file);
    }));
    resolveCache.package[identifier] = resolvedFile;
    return resolvedFile;
};
export const getFileData = (file, config) => __awaiter(void 0, void 0, void 0, function* () {
    const { cache } = config || { cache: { data: {} } };
    if (cache.data[file.id]) {
        return cache[file.id];
    }
    try {
        const data = readFileSync(file.path, 'utf8');
        cache.data[file.id] = data;
        return data;
    }
    catch (e) {
        console.log('Error:', e.stack);
    }
});
export const getFiles = (config, base, files, result) => __awaiter(void 0, void 0, void 0, function* () {
    files = files || readdirSync(base);
    result = result || [];
    yield asyncForEach(files, (file) => __awaiter(void 0, void 0, void 0, function* () {
        const newbase = join(base, file);
        const isDirectory = statSync(newbase).isDirectory();
        if (isDirectory) {
            result = yield getFiles(config, newbase, readdirSync(newbase), result);
            return;
        }
        if (!file.endsWith('.scss'))
            return;
        if (file.indexOf('node_modules') > -1)
            return;
        const fileName = newbase.split('/').pop();
        const filePath = newbase;
        const date = statSync(newbase).mtime;
        const age = ((new Date()).getTime() - date.getTime()) / 10000;
        if (config.watch && age > 1)
            return;
        const identifier = (fileName + `${date}`).toLowerCase().replace(/[^a-z0-9]/g, '');
        const currentFile = { path: filePath, name: fileName, date, id: identifier, data: '' };
        const data = yield getFileData(currentFile, config);
        result.push(Object.assign(Object.assign({}, currentFile), { data }));
    }));
    return result;
});
//# sourceMappingURL=get.js.map