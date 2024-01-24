var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { writeFile, mkdir } from "fs/promises";
export const writeData = (file, config) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, css } = file;
    const path = (config.outputDir || './dist') + '/' + name.replace('.scss', '.css');
    const dir = path.substring(0, path.lastIndexOf('/'));
    const data = css || "";
    try {
        yield mkdir(dir, { recursive: true });
        if (!data)
            return false;
        yield writeFile(path, data, { encoding: 'utf8', flag: 'w' });
        return true;
    }
    catch (e) {
        console.log(e);
    }
});
//# sourceMappingURL=filesystem.js.map