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
Object.defineProperty(exports, "__esModule", { value: true });
const args_1 = require("@sil/args");
const get_1 = require("./get");
const config_1 = require("./config");
const cli_block_1 = require("cli-block");
const utils_1 = require("./utils");
const sass_1 = require("./sass");
const lint_1 = require("./lint");
const log_1 = require("./log");
const filesystem_1 = require("./filesystem");
const args = (0, args_1.getArgs)();
(() => __awaiter(void 0, void 0, void 0, function* () {
    (0, cli_block_1.blockHeader)();
    (0, cli_block_1.blockMid)('Config');
    const config = (0, config_1.getConfig)(args);
    yield (0, cli_block_1.blockSettings)(config);
    (0, cli_block_1.blockMid)('Files');
    const files = yield (0, get_1.getFiles)(config, config.entry, null, null);
    yield (0, utils_1.asyncForEach)(files, (file, index) => __awaiter(void 0, void 0, void 0, function* () {
        const compiled = yield (0, sass_1.compileSass)(file.data);
        file.css = compiled.css;
        const linted = yield (0, lint_1.lintFile)(file.data);
        file.lint = linted;
        const write = yield (0, filesystem_1.writeData)(file, config);
        yield (0, log_1.logFile)(file, write);
    }));
}))();
//# sourceMappingURL=index.js.map