import { LintResult, type Warning } from "stylelint";

export interface Config {
    watching: boolean;
    entry: string,
    outputDir: string,
    global: string[],
    lint: boolean,
    cache: {
        data: {
            [key: string]: string
        }
    }
}

export interface ExtendedWarning extends Warning {
    example: string[],
}

export interface Lint extends LintResult {
    problems: boolean;
    warnings: ExtendedWarning[],
}

export interface File {
    name: string;
    path: string;
    id: string;
    data: string;
    date: Date;
    css?: string;
    lint?: Lint;
}

