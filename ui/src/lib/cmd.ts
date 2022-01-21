import DefaultCommands from 'lib/commands/default';

// @ts-ignore
import Yargs from 'https://unpkg.com/yargs@16.0.0-beta.1/browser.mjs';
import { Argv } from 'yargs';

import * as Types from 'types';

const _createParser = (
  context: Types.Context,
  callback: (context: Types.Context) => void
): Argv<{}> => {
  const parser: Argv<{}> = Yargs();
  DefaultCommands.forEach((command) => command(parser as any, context, callback));
  return parser;
};

const Cmd = {
  execute: (context: Types.Context, input: string): Promise<Types.Context> => {
    return new Promise((resolve) => {
      const parser = _createParser(context, (context) => {
        resolve(context);
      });
      parser.parse(input, (err: any, argv: any, output: any) => {
        console.log('err', err, 'argv', argv, 'output', output);
      });
    });
  },
};

export default Cmd;
