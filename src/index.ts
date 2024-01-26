#!/usr/bin/env node
"use strict";

import { getArgs } from '@sil/args';
import { getFiles, getPackageJson } from "./get.js";
import { getConfig } from './config.js';
import { blockSettings, blockHeader, blockFooter, blockLine, blockMid, dim } from 'cli-block';
import { asyncForEach } from './utils.js';
import { compileSass } from './sass.js';
import { lintFile } from './lint.js';
import { logFile } from './log.js';
import { writeData } from './filesystem.js';

const args = getArgs();



(async () => {

    const config = getConfig(args);
const packageJson = getPackageJson();


    if (args.watch) {

        /**
        *
        * Watch files
        *  
        **/

        const files = await getFiles(config, config.entry, null, null);

        blockHeader(`Build Styles Watch ${dim(packageJson.version)}`);
        await asyncForEach(files, async (file, index) => {



            const compiled = await compileSass(file);
            file.css = compiled.css;

            const linted = await lintFile(file.data);

            file.lint = linted;
            const write = await writeData(file, config);
            if (index > 0) blockMid()
            await logFile(file, write);

        });
        setTimeout(() => {
            blockFooter();
        }, 100)

    } else {
        /**
        *
        * Build All files
        *  
        **/



        blockHeader(`Build Styles ${dim(packageJson.version)}`);

        blockMid('Config')

        await blockSettings(config);

        blockMid('Files')

        const files = await getFiles(config, config.entry, null, null);

        await asyncForEach(files, async (file) => {

            const compiled = await compileSass(file);
            file.css = compiled.css;

            const linted = await lintFile(file.data);
            file.lint = linted;

            const write = await writeData(file, config);

            blockMid();
            await logFile(file, write);

        });
        setTimeout(() => {
            blockFooter();
        }, 100)
    }


})();

