import * as Types from 'types';

import { Argv, Options, ArgumentsCamelCase, InferredOptionTypes } from 'yargs';

import Context from 'lib/context';

type Command = {
  name: string[];
  run: (context: Types.Context) => Types.Context;
};

const Command = {
  make<TArgs extends { [key: string]: Options }>(
    command: string,
    description: string,
    args: TArgs,
    func: (
      context: Types.Context,
      args: ArgumentsCamelCase<InferredOptionTypes<TArgs>>
    ) => Types.Context
  ) {
    return (yargs: Argv<TArgs>, context: Types.Context) => {
      return yargs.command(command, description, args, (args) => {
        func(context, args);
      });
    };
  },
};

export default Command;
