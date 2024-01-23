
import { existsSync, readFileSync } from "fs";
import { Config } from "./types";

let buildConfigCache = {};
let lineConfigCache = {};

export const getConfig = (args: {}): Config => {



    return {
        cache: {
            data: {}
        },
        entry: "src",
        outputDir: "dist",
        global: [],
        lint: true,
        watch: false,
        ...args,
        ...getBuildConfig()
    }
}


const getBuildConfig = () => {
    if (Object.keys(buildConfigCache).length > 0) {
        return buildConfigCache;
    }
    if (existsSync(".stylebuild.json")) {
        const file = readFileSync(".stylebuild.json", 'utf8');
        buildConfigCache = JSON.parse(file);
        return JSON.parse(file);
    }
    buildConfigCache = {};
    return {};
}

export const getStylelintConfig = () => {
    if (Object.keys(lineConfigCache).length > 0) {
        return lineConfigCache;
    }
    if (existsSync(".stylelintrc")) {
        const file = readFileSync(".stylelintrc", 'utf8');
        lineConfigCache = JSON.parse(file);
        return JSON.parse(file);
    }
    const defaultConfig = {
        extends: "stylelint-config-recommended",
        rules: {}
    }
    lineConfigCache = defaultConfig;
    return defaultConfig;
}
