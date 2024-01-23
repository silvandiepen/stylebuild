import { block, blockLine, blockLineError, blockLineSuccess, blockMid, dim, red, yellow } from "cli-block";
import { File } from "./types"

export const logFile = async (file: File, written: boolean = false): Promise<void> => {


    blockMid();
    const outputFile = written ? dim('→ ') + dim(file.name.replace('.scss', '.css')) : '';


    if (file.lint.problems) {




        blockLineError(`${file.name} ${outputFile}`);

        blockLine();

        file.lint.warnings.forEach(warning => {
            blockLine(`${warning.line}:${warning.column} ${warning.severity == 'error' ? red(warning.severity) : yellow(warning.severity)}`);
            blockLine(`${warning.text} ${dim(warning.rule)}`);
            blockLine();
            warning.example.forEach(warningLine => {
                blockLine(warningLine);
            })
            blockLine()
        });

        return;

    }


    blockLineSuccess(file.name + ' ' + outputFile)

}