import { FC, useState } from 'react';
import Commands from 'lib/commands';

const context = {
  document: {},
  selected: new Set<string>(),
};

const Commandline: FC = () => {
  const [input, setInput] = useState<string>('');

  const onEnter = (input: string) => {
    const output = Commands.parse(context, input);
  };

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
      {/* <div className="overflow-y-scroll">
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
      </div> */}
    </div>
  );
};

export default Commandline;
