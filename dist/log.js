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
exports.logFile = void 0;
const cli_block_1 = require("cli-block");
const logFile = (file, written = false) => __awaiter(void 0, void 0, void 0, function* () {
    (0, cli_block_1.blockMid)();
    const outputFile = written ? (0, cli_block_1.dim)('→ ') + (0, cli_block_1.dim)(file.name.replace('.scss', '.css')) : '';
    if (file.lint.problems) {
        (0, cli_block_1.blockLineError)(`${file.name} ${outputFile}`);
        (0, cli_block_1.blockLine)();
        file.lint.warnings.forEach(warning => {
            (0, cli_block_1.blockLine)(`${warning.line}:${warning.column} ${warning.severity == 'error' ? (0, cli_block_1.red)(warning.severity) : (0, cli_block_1.yellow)(warning.severity)}`);
            (0, cli_block_1.blockLine)(`${warning.text} ${(0, cli_block_1.dim)(warning.rule)}`);
            (0, cli_block_1.blockLine)();
            warning.example.forEach(warningLine => {
                (0, cli_block_1.blockLine)(warningLine);
            });
            (0, cli_block_1.blockLine)();
        });
        return;
    }
    (0, cli_block_1.blockLineSuccess)(file.name + ' ' + outputFile);
});
exports.logFile = logFile;
//# sourceMappingURL=log.js.map