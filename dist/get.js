"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFiles = exports.getFileData = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const utils_1 = require("./utils");
const getFileData = (file, config) => __awaiter(void 0, void 0, void 0, function* () {
    const { cache } = config || { cache: { data: {} } };
    if (cache.data[file.id]) {
        return cache[file.id];
    }
    try {
        const data = (0, fs_1.readFileSync)(file.path, 'utf8');
        cache.data[file.id] = data;
        return data;
    }
    catch (e) {
        console.log('Error:', e.stack);
    }
});
exports.getFileData = getFileData;
const getFiles = (config, base, files, result) => __awaiter(void 0, void 0, void 0, function* () {
    files = files || (0, fs_1.readdirSync)(base);
    result = result || [];
    yield (0, utils_1.asyncForEach)(files, (file) => __awaiter(void 0, void 0, void 0, function* () {
        const newbase = (0, path_1.join)(base, file);
        const isDirectory = (0, fs_1.statSync)(newbase).isDirectory();
        if (isDirectory) {
            result = yield (0, exports.getFiles)(config, newbase, (0, fs_1.readdirSync)(newbase), result);
            return;
        }
        if (!file.endsWith('.scss'))
            return;
        if (file.indexOf('node_modules') > -1)
            return;
        const fileName = newbase.split('/').pop();
        const filePath = newbase;
        const date = (0, fs_1.statSync)(newbase).mtime;
        const age = ((new Date()).getTime() - date.getTime()) / 1000;
        if (config.watching && age > 1)
            return;
        const identifier = (fileName + `${date}`).toLowerCase().replace(/[^a-z0-9]/g, '');
        const currentFile = { path: filePath, name: fileName, date, id: identifier, data: '' };
        const data = yield (0, exports.getFileData)(currentFile, config);
        result.push(Object.assign(Object.assign({}, currentFile), { data }));
    }));
    return result;
});
exports.getFiles = getFiles;
//# sourceMappingURL=get.js.map