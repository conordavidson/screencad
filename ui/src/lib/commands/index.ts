import DefaultCommands from 'lib/commands/default';

// @ts-ignore
import Yargs from 'https://unpkg.com/yargs@16.0.0-beta.1/browser.mjs';
import { Argv } from 'yargs';

import * as Types from 'types';

const _createParser = (context: Types.Context): Argv<{}> => {
  const parser: Argv<{}> = Yargs();
  DefaultCommands.forEach((command) => command(parser as any, context));
  return parser;
};

const Commands = {
  parse: (context: Types.Context, input: string): Types.Context => {
    const parser = _createParser(context);
    parser.parse(input, (err: any, argv: any, output: any) => {
      console.log('err', err, 'argv', argv, 'output', output);
    });
    return context;
  },
};

export default Commands;
