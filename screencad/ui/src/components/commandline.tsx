import { FC, useState } from 'react';

import Cmd, { Commands } from 'lib/cmd';

import * as GlobalState from 'lib/globalState';

const makeSuggestions = (input: string, cmd: () => Commands) => {
  const commands = cmd();
  const parsed = input.trim().split(' ');
  if (parsed.length === 1 && !(parsed[0] in commands))
    return Object.keys(commands).filter((command) => command.includes(parsed[0]));
  if (parsed.length === 1) {
    return Object.keys((commands as any)[parsed[0]]());
  }
  if (parsed.length === 2) {
    return Object.keys((commands as any)[parsed[0]]()).filter((command) =>
      command.includes(parsed[1])
    );
  }
  return [];
};

const Commandline: FC = () => {
  const globalState = GlobalState.useGlobalState();

  const [input, setInput] = useState<string>('');

  const cmd = Cmd.factory({ globalState });
  (window as any).Cmd = cmd;

  const suggestions = makeSuggestions(input, cmd);

  return (
    <div className="h-full w-full grid grid-cols-2">
      <input
        type="text"
        className="h-full w-full p-2 bg-gray-800 text-white font-mono"
        value={input}
        onChange={({ target }) => {
          setInput(target.value);
        }}
      />
      <div className="overflow-y-scroll">
        <ul>
          {suggestions.map((suggestion) => {
            return <li key={suggestion}>{suggestion}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Commandline;
