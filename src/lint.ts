import styleLint, { type LintResult, type Warning } from 'stylelint';
import { blue, dim } from "cli-block";

import { Lint } from "./types.js";
import { resolveProjectFile, resolvePackageFile } from "./get.js";

let lintConfigCache = {};
const getStylelintConfig = () => {
    if (Object.keys(lintConfigCache).length > 0) return lintConfigCache;

    const configFiles = [".stylelintrc", ".stylelintrc.json"];
    const projectCfg = resolveProjectFile(configFiles)[0];
    const packageCfg = resolvePackageFile(configFiles)[0];
    const config = projectCfg || packageCfg;

    return JSON.parse(config);
}




const getLines = (fileData: string, report: Warning): string[] => {
    const lines = fileData.split('\n');
    const start = report.line - 3;
    const end = report.line + 3;
    const linesToShow = lines.slice(start, end);
    const linesWithNumbers = linesToShow.map((txtLine: string, index: number) => {
        const lineNumber = start + index + 1;
        const lineChar = ""; // lineNumber === txtLine ? char : '';

        const concatLine = `${lineNumber} ${lineChar} ${txtLine}`;
        const str = concatLine.length > 75 ? `${concatLine.substring(0, 75)}...` : concatLine;
        if (index === 2) return blue(str);
        return dim(str)
    });
    return linesWithNumbers;
}


const processLintFile = (file: File): File => {

    return { ...file }
}



const hasProblems = (report: LintResult): boolean => {
    return !!!(report.warnings.length === 0 && report.deprecations.length === 0 && report.invalidOptionWarnings.length === 0 && report.errored == false && report.parseErrors.length === 0)
}


export const lintFile = async (data: string): Promise<Lint> => {

    const config = getStylelintConfig();

    const { report } = await styleLint.lint({
        code: data,
        config,
    });


    const reportData = (JSON.parse(report) as unknown as LintResult[])[0];

    // if (hasProblems(reportData)) return { problems: false, ...reportData } as Lint;


    return { problems: hasProblems(reportData), ...{ ...reportData, warnings: reportData.warnings.length ? reportData.warnings.map((warning) => ({ ...warning, text: warning.text.replace(`(${warning.rule})`, '').trim(), example: getLines(data, warning) })) : [] } }


}