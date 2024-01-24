#!/usr/bin/env node
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
import { getArgs } from '@sil/args';
import { getFiles, getPackageJson } from "./get.js";
import { getConfig } from './config.js';
import { blockSettings, blockHeader, blockFooter, blockMid, dim } from 'cli-block';
import { asyncForEach } from './utils.js';
import { compileSass } from './sass.js';
import { lintFile } from './lint.js';
import { logFile } from './log.js';
import { writeData } from './filesystem.js';
const args = getArgs();
(() => __awaiter(void 0, void 0, void 0, function* () {
    const config = getConfig(args);
    const packageJson = getPackageJson();
    if (args.watch) {
        /**
        *
        * Watch files
        *
        **/
        const files = yield getFiles(config, config.entry, null, null);
        blockHeader(`Build Styles Watch ${dim(packageJson.version)}`);
        yield asyncForEach(files, (file, index) => __awaiter(void 0, void 0, void 0, function* () {
            const compiled = yield compileSass(file.data);
            file.css = compiled.css;
            const linted = yield lintFile(file.data);
            file.lint = linted;
            const write = yield writeData(file, config);
            if (index > 0)
                blockMid();
            yield logFile(file, write);
        }));
        setTimeout(() => {
            blockFooter();
        }, 0);
    }
    else {
        /**
        *
        * Build All files
        *
        **/
        blockHeader(`Build Styles ${dim(packageJson.version)}`);
        blockMid('Config');
        yield blockSettings(config);
        blockMid('Files');
        const files = yield getFiles(config, config.entry, null, null);
        yield asyncForEach(files, (file) => __awaiter(void 0, void 0, void 0, function* () {
            const compiled = yield compileSass(file.data);
            file.css = compiled.css;
            const linted = yield lintFile(file.data);
            file.lint = linted;
            const write = yield writeData(file, config);
            blockMid();
            yield logFile(file, write);
        }));
        setTimeout(() => {
            blockFooter();
        }, 100);
    }
}))();
//# sourceMappingURL=index.js.map