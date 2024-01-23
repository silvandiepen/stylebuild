"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStylelintConfig = exports.getConfig = void 0;
const fs_1 = require("fs");
let buildConfigCache = {};
let lineConfigCache = {};
const getConfig = (args) => {
    return Object.assign(Object.assign({ cache: {
            data: {}
        }, entry: "src", outputDir: "dist", global: [], lint: true, watch: false }, args), getBuildConfig());
};
exports.getConfig = getConfig;
const getBuildConfig = () => {
    if (Object.keys(buildConfigCache).length > 0) {
        return buildConfigCache;
    }
    if ((0, fs_1.existsSync)(".stylebuild.json")) {
        const file = (0, fs_1.readFileSync)(".stylebuild.json", 'utf8');
        buildConfigCache = JSON.parse(file);
        return JSON.parse(file);
    }
    buildConfigCache = {};
    return {};
};
const getStylelintConfig = () => {
    if (Object.keys(lineConfigCache).length > 0) {
        return lineConfigCache;
    }
    if ((0, fs_1.existsSync)(".stylelintrc")) {
        const file = (0, fs_1.readFileSync)(".stylelintrc", 'utf8');
        lineConfigCache = JSON.parse(file);
        return JSON.parse(file);
    }
    const defaultConfig = {
        extends: "stylelint-config-recommended",
        rules: {}
    };
    lineConfigCache = defaultConfig;
    return defaultConfig;
};
exports.getStylelintConfig = getStylelintConfig;
//# sourceMappingURL=config.js.map