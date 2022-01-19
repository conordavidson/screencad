import { useEffect } from 'react';
import { FC, useState } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

const TerminalUi: FC = () => {
  const [terminal, setTerminal] = useState<Terminal>();

  useEffect(() => {
    const term = new Terminal({
      cursorBlink: true,
    });
    const fitAddon = new FitAddon();
    setTerminal(term);
    const dom = document.getElementById('terminal');
    if (dom) {
      term.loadAddon(fitAddon);
      term.open(dom);
      term.onKey((e) => {
        console.log(e.key);
        term.write(e.key);
        if (e.key == '\r') term.write('\n');
      });
      fitAddon.fit();
    }
  }, []);

  return (
    <div className="h-full w-full ">
      <div id="terminal"></div>
    </div>
  );
};

export default TerminalUi;
