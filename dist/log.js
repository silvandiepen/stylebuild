var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { blockLine, blockLineError, blockLineSuccess, dim, red, yellow } from "cli-block";
export const logFile = (file, written = false) => __awaiter(void 0, void 0, void 0, function* () {
    const outputFile = written ? dim('→ ') + dim(file.name.replace('.scss', '.css')) : '';
    if (!file.lint.problems) {
        blockLineSuccess(file.name + ' ' + outputFile);
        return;
    }
    blockLineError(`${file.name} ${outputFile}`);
    blockLine();
    file.lint.warnings.forEach(warning => {
        blockLine(`${warning.line}:${warning.column} ${warning.severity == 'error' ? red(warning.severity) : yellow(warning.severity)}`);
        blockLine(`${warning.text} ${dim(warning.rule)}`);
        blockLine();
        warning.example.forEach(warningLine => {
            blockLine(warningLine);
        });
        blockLine();
    });
    return;
});
//# sourceMappingURL=log.js.map