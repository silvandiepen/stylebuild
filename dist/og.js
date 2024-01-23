// import { join } from 'path';
// import { readFileSync, readdirSync, statSync, existsSync, mkdirSync, writeFileSync } from 'fs';
// import { blue, red, yellow, dim, blockFooter, blockHeader, blockLine, blockLineSuccess, blockMid } from 'cli-block';
// import { compileString } from 'sass';
// import stylelint from 'stylelint';
// let buildConfigCache = {};
// let lineConfigCache = {};
// const getFile = (file)=>{
// }
// const getBuildConfig = ()=>{
//     if (Object.keys(buildConfigCache).length > 0) {
//         return buildConfigCache;
//     }
//     if (existsSync(".stylebuild.json")) {
//         const file = readFileSync(".stylebuild.json", 'utf8');
//         buildConfigCache = JSON.parse(file);
//         return JSON.parse(file);
//     }
//     const defaultConfig = {};
//     buildConfigCache = defaultConfig;
//     return defaultConfig; 
// }
// const getStylelintConfig = () => {
//     if (Object.keys(lineConfigCache).length > 0) {
//         return lineConfigCache;
//     }
//     if (existsSync(".stylelintrc")) {
//         const file = readFileSync(".stylelintrc", 'utf8');
//         lineConfigCache = JSON.parse(file);
//         return JSON.parse(file);
//     }
//     const defaultConfig = {
//         extends: "stylelint-config-recommended",
//         rules: {}
//     }
//     lineConfigCache = defaultConfig;
//     return defaultConfig;
// }
// const lintFile = async (data) => {
//     const config = getStylelintConfig();
//     const result = await stylelint.lint({
//         code: data,
//         config,
//         formatter: 'string',
//     })
//         .then(function (res) {
//             return res;
//         });
//     return result;
// }
// const watching = process.argv[2] === '--watch';
// const cache = {
//     data: {},
//     folder: {}
// };
// const getGlobal = async (config)=>{
//     let globals = [];
//     if(config.global){
//        asyncForEach(config.global,(file)=>{
//         })
//     }
//     const data = readFileSync(file.path, 'utf8');
// }
// const extractLintData = (lines) => {
//     const values = {
//         messages: [],
//         errors: null,
//         warnings: null,
//         problems: null
//     }
//     // console.log(str);
//     // const cleanMessage = stripAnsi(message);
//     // console.log(lines);
//     lines.forEach((str) => {
//         const message = {};
//         const matchMessage = str.match(/\x1B\[39m(.+?)\x1B\[2m/);
//         if (matchMessage) message.message = matchMessage[1].trim();
//         const matchLines = str.match(/\x1B\[2m(.+?)\x1B\[22m/);
//         const [line, char] = matchLines ? matchLines[1].trim().split(':') : [];
//         if (line) message.line = parseInt(line);
//         if (char) message.char = parseInt(char);
//         const matchRule = [...str.matchAll(/\x1B\[2m(.+?)\x1B\[22m/g)];
//         // console.log(matchRule);
//         const rulestring = matchRule.length > 0 ? matchRule[1][1].trim() : '';
//         if (matchRule.length > 0) message.rule = rulestring;
//         const matchType = str.match(/\x1B\[31m\x1B\[31m(.+?)\x1B\[39m/);
//         if (matchType) message.type = matchType[1].trim();
//         if (Object.keys(message).length > 0) values.messages.push(message);
//         const matchError = str.match(/\x1B\[31m(.+?) error/);
//         if (matchError) values.errors = parseInt(matchError[1].trim());
//         const matchWarning = str.match(/\x1B\[33m(.+?) warnings/);
//         if (matchWarning) values.warnings = parseInt(matchWarning[1].trim());
//         const matchProblem = str.match(/(.+?) problem/);
//         if (matchProblem) values.problems = parseInt(matchProblem[1].trim());
//     });
//     return values
// }
// const getLines = (file, line, char) => {
//     const lines = file.split('\n');
//     const start = line - 3;
//     const end = line + 3;
//     const linesToShow = lines.slice(start, end);
//     const linesWithNumbers = linesToShow.map((line, index) => {
//         const lineNumber = start + index + 1;
//         const lineChar = lineNumber === line ? char : '';
//         const concatLine = `${lineNumber} ${lineChar} ${line}`;
//         const str = concatLine.length > 75 ? `${concatLine.substr(0, 75)}...` : concatLine;
//         if (index === 2) return blue(str);
//         return dim(str)
//     });
//     return linesWithNumbers;
// }
// const logFile = (file) => {
//     let totalErrors = 0, totalWarnings = 0, totalProblems = 0;
//     blockLineSuccess(file.name);
//     if (file.lint.report) {
//         if (!typeof file.lint.report == 'string') return;
//         const reportArray = file.lint.report.split('\n');
//         const reportArrayCleaned = reportArray.slice(2, reportArray.length);
//         file.lint.ruleMetadata = {}
//         blockLine();
//         const data = extractLintData(reportArrayCleaned);
//         // if (!data.messages.length) return;
//         blockMid()
//         data.messages.forEach((msg) => {
//             let message = msg.message || '';
//             let type = msg.type ? red(`${msg.type} `) : '';
//             let rule = msg.rule || '';
//             let line = msg.line || '';
//             let char = msg.char || '';
//             const example = getLines(file.data, line, char);
//             if (line && char) blockLine(dim(`${line}:${char}`));
//             if (message) blockLine(`${type}${message}`);
//             if (rule) blockLine(blue(rule))
//             if (example) {
//                 blockLine();
//                 example.forEach((line) => {
//                     blockLine(line);
//                 });
//             }
//             blockLine()
//         });
//         blockMid()
//         let problems = data.problems !== null ? data.problems : '';
//         let errors = data.errors !== null ? data.errors : '';
//         let warnings = data.warnings !== null ? data.warnings : '';
//         if (problems) blockLine(`${problems} problems`);
//         if (errors) blockLine(`${red(errors)} errors`);
//         if (warnings) blockLine(`${yellow(warnings)} warnings`);
//         if (problems) totalProblems = problems;
//         if (warnings) totalWarnings += warnings;
//         if (errors) totalErrors += errors;
//         blockLine();
//     }
//     return { errors: totalErrors, warnings: totalWarnings, problems: totalProblems };
// }
// const start = ()=>{
//     const config = getBuildConfig();
// findFiles(join('../wp-content/themes')).then(async (files) => {
//     if (files.length === 0) return;
//     (watching ? blockHeader('Watching SCSS') : blockHeader('Compiling SCSS'));
//     let totalErrors = 0, totalWarnings = 0, totalProblems = 0;
//     blockLine();
//     await asyncForEach(files, async (file, index) => {
//         if (index > 0) blockMid();
//         const { warnings, errors, problems } = logFile(file);
//         if (problems) totalProblems += problems;
//         if (warnings) totalWarnings += warnings;
//         if (errors) totalErrors += errors;
//         writeFile(file.outputPath, file.css);
//     })
//     blockFooter();
//     if (files.length == 1) return;
//     blockHeader('Summary');
//     if (totalErrors) blockLine(`${red(totalErrors)} errors`);
//     if (totalWarnings) blockLine(`${yellow(totalWarnings)} warnings`);
//     if (totalProblems) blockLine(`${totalProblems} problems`);
//     blockFooter();
// });
// }
// start();
// const writeFile = async (fileName, data) => {
//     if (!data) return;
//     const dir = fileName.split('/').slice(0, -1).join('/');
//     if (!existsSync(dir)) {
//         mkdirSync(dir, { recursive: true });
//     }
//     try {
//         writeFileSync(fileName, data);
//     } catch (e) {
//         console.log('Error:', e.stack);
//     }
// }
// const compileSass = async (data) => {
//     try {
//         const result = compileString(data, {
//             outputStyle: 'compressed',
//         });
//         return result;
//     } catch (e) {
//         return e;
//     }
// }
// const getThemeFolder = (filePath) => {
//     const pathArray = filePath.split('/');
//     const themeIndex = pathArray.indexOf('themes') + 2;
//     const themePath = pathArray.slice(0, themeIndex).join('/');
//     console.log(themePath);
//     return themePath;
// }
//# sourceMappingURL=og.js.map