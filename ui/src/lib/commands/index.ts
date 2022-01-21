import * as Types from 'types';

import { Argv, Options, ArgumentsCamelCase, InferredOptionTypes } from 'yargs';

export type Command<TArgs extends { [key: string]: Options }> = {
  command: string;
  description: string;
  args: TArgs;
  handler: (
    context: Types.Context,
    args: ArgumentsCamelCase<InferredOptionTypes<TArgs>>
  ) => Types.Context;
};

const Command = {
  make<TArgs extends { [key: string]: Options }>(cmd: Command<TArgs>) {
    return (
      yargs: Argv<TArgs>,
      context: Types.Context,
      callback: (context: Types.Context) => void
    ) => {
      yargs.command(cmd.command, cmd.description, cmd.args, (args) => {
        callback(cmd.handler(context, args));
      });
    };
  },
};

export default Command;
