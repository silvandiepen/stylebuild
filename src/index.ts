#!/usr/bin/env node
"use strict";

import { getArgs } from '@sil/args';
import { getFiles } from "./get";
import { getConfig } from './config';
import { blockSettings, blockHeader, blockFooter, blockLine, blockMid } from 'cli-block';
import { asyncForEach } from './utils';
import { compileSass } from './sass';
import { lintFile } from './lint';
import { logFile } from './log';
import { write } from 'fs';
import { writeData } from './filesystem';

const args = getArgs();



(async () => {

    blockHeader();

    blockMid('Config')
    const config = getConfig(args);

    await blockSettings(config);

    blockMid('Files')

    const files = await getFiles(config, config.entry, null, null);

    await asyncForEach(files, async (file, index) => {
        const compiled = await compileSass(file.data);
        file.css = compiled.css;

        const linted = await lintFile(file.data);

        file.lint = linted;

        const write = await writeData(file, config);
        await logFile(file, write);

    });

})();

