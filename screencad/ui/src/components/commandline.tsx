import { FC, useState, useRef } from 'react';
import Cmd, { Commands, CommandMenu, Command } from 'lib/cmd';

import cx from 'classnames';

import * as GlobalState from 'lib/globalState';

type Suggestion =
  | {
      label: string;
      type: 'COMMAND';
    }
  | {
      label: string;
      type: 'MENU';
    };

const suggestCommands = (input: string, cmd: CommandMenu<void>): Suggestion[] => {
  let currentCommand: any = cmd();
  let suggestions: Suggestion[] = Object.keys(currentCommand).map((label) => ({
    label,
    type: 'MENU',
  }));
  const parsed = input.split(' ');

  for (const fragment of parsed) {
    if (fragment in currentCommand && currentCommand[fragment]._type === 'COMMAND') {
      suggestions = [{ label: fragment, type: 'COMMAND' }];
      break;
    }

    if (fragment in currentCommand && currentCommand[fragment]._type === 'MENU') {
      currentCommand = currentCommand[fragment]();
      continue;
    }

    suggestions = Object.keys(currentCommand)
      .filter((command) => command.includes(fragment))
      .map((command) => {
        if (currentCommand[command]._type === 'MENU')
          return {
            label: command,
            type: 'MENU',
          };

        return {
          label: command,
          type: 'COMMAND',
        };
      });

    break;
  }

  return suggestions;
};

const runCommand = (input: string, cmd: CommandMenu<void>) => {
  let currentCommand: any = cmd();
  const parsed = input.split(' ');

  for (const fragment of parsed) {
    if (!(fragment in currentCommand)) {
      console.log('not found!');
      break;
    }

    if (currentCommand[fragment]._type === 'MENU') {
      currentCommand = currentCommand[fragment]();
      continue;
    }

    currentCommand[fragment]();
    break;
  }
};

const Commandline: FC = () => {
  const globalState = GlobalState.useGlobalState();

  const [input, setInput] = useState<string>('');

  const cmd = Cmd.factory({ globalState });
  const suggestions = suggestCommands(input, cmd);

  const onEnter = (input: string) => runCommand(input, cmd);

  (window as any).Cmd = cmd;

  return (
    <div className="h-full w-full grid grid-cols-2">
      <input
        placeholder="Type commands here..."
        type="text"
        className="h-full w-full p-2 bg-gray-800 text-white font-mono"
        value={input}
        onKeyUp={(event) => {
          if (event.keyCode === 13) onEnter(input);
        }}
        onChange={({ target }) => {
          setInput(target.value);
        }}
      />
      <div className="overflow-y-scroll">
        <ul className="divide-y">
          {suggestions.map((suggestion) => {
            return (
              <li
                className={cx('p-2', {
                  'text-blue-600': suggestion.type === 'COMMAND',
                })}
                key={suggestion.label}
              >
                {suggestion.type === 'COMMAND' ? `${suggestion.label} ↗` : suggestion.label}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Commandline;
