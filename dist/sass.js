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
exports.compileSass = void 0;
const sass_1 = require("sass");
const compileSass = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = (0, sass_1.compileString)(data);
        return result;
    }
    catch (e) {
        return e;
    }
});
exports.compileSass = compileSass;
//# sourceMappingURL=sass.js.map