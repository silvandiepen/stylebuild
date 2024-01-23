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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lintFile = void 0;
const fs_1 = require("fs");
const stylelint_1 = __importDefault(require("stylelint"));
const cli_block_1 = require("cli-block");
let lintConfigCache = {};
const getStylelintConfig = () => {
    if (Object.keys(lintConfigCache).length > 0) {
        return lintConfigCache;
    }
    if ((0, fs_1.existsSync)(".stylelintrc")) {
        const file = (0, fs_1.readFileSync)(".stylelintrc", 'utf8');
        lintConfigCache = JSON.parse(file);
        return JSON.parse(file);
    }
    const defaultConfig = {
        extends: "stylelint-config-recommended",
        rules: {}
    };
    lintConfigCache = defaultConfig;
    return defaultConfig;
};
const getLines = (fileData, report) => {
    const lines = fileData.split('\n');
    const start = report.line - 3;
    const end = report.line + 3;
    const linesToShow = lines.slice(start, end);
    const linesWithNumbers = linesToShow.map((txtLine, index) => {
        const lineNumber = start + index + 1;
        const lineChar = ""; // lineNumber === txtLine ? char : '';
        const concatLine = `${lineNumber} ${lineChar} ${txtLine}`;
        const str = concatLine.length > 75 ? `${concatLine.substring(0, 75)}...` : concatLine;
        if (index === 2)
            return (0, cli_block_1.blue)(str);
        return (0, cli_block_1.dim)(str);
    });
    return linesWithNumbers;
};
const processLintFile = (file) => {
    return Object.assign({}, file);
};
const hasProblems = (report) => {
    return !!!(report.warnings.length === 0 && report.deprecations.length === 0 && report.invalidOptionWarnings.length === 0 && report.errored == false && report.parseErrors.length === 0);
};
const lintFile = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const config = getStylelintConfig();
    const { report } = yield stylelint_1.default.lint({
        code: data,
        config,
    });
    const reportData = JSON.parse(report)[0];
    // if (hasProblems(reportData)) return { problems: false, ...reportData } as Lint;
    return Object.assign({ problems: hasProblems(reportData) }, Object.assign(Object.assign({}, reportData), { warnings: reportData.warnings.length ? reportData.warnings.map((warning) => (Object.assign(Object.assign({}, warning), { text: warning.text.replace(`(${warning.rule})`, '').trim(), example: getLines(data, warning) }))) : [] }));
});
exports.lintFile = lintFile;
//# sourceMappingURL=lint.js.map