// import { useState, useEffect, useRef } from 'react';
// import { Terminal } from 'xterm';
// import { FitAddon } from 'xterm-addon-fit';

// const useTerminal = () => {
//   const [currentLine, setCurrentLine] = useState('');
//   const [entries, setEntries] = useState([]);
//   const [currentPosition, setCurrentPosition] = useState(0);
//   const [position, setPosition] = useState(0);

//   const terminal = useRef(
//     new Terminal({
//       cursorBlink: true,
//     })
//   );

//   const dom = useRef(null);

//   useEffect(() => {
//     if (dom.current) {
//       const term = terminal.current;
//       term.open(dom.current);
//       term.write('Welcome to my Scheme web intepreter!');

//       term.onKey(function (e) {
//         const ev = e.domEvent;

//         const printable =
//           !ev.altKey &&
//           !ev.ctrlKey &&
//           !ev.metaKey &&
//           !(ev.keyCode === 37 && term.buffer.active.cursorX < 6);

//         if (ev.keyCode === 13) {
//           // Enter key
//           if (currentLine.replace(/^\s+|\s+$/g, '').length != 0) {
//             setEntries(currentLine);
//             setCurrentPosition(entries.length - 1);
//             // term.prompt();
//           } else {
//             term.write('\n\33[2K\r\u001b[32mscm> \u001b[37m');
//           }
//           setCurrentLine('');
//         } else if (ev.keyCode === 8) {
//           // Backspace
//           if (term.buffer.active.cursorX > 5) {
//             setCurrentLine(
//               currentLine.slice(0, term.buffer.active.cursorX - 6) +
//                 currentLine.slice(term.buffer.active.cursorX - 5)
//             );

//             setPosition(currentLine.length - term.buffer.active.cursorX + 6);
//             term.write('\33[2K\r\u001b[32mscm> \u001b[37m' + currentLine);
//             term.write('\033['.concat(pos.toString()).concat('D')); //term.write('\033[<N>D');
//             if (term.buffer.cursorX == 5 || term.buffer.cursorX == curr_line.length + 6) {
//               term.write('\033[1C');
//             }
//           }
//         } else if (ev.keyCode === 38) {
//           // Up arrow
//           if (entries.length > 0) {
//             if (currPos > 0) {
//               currPos -= 1;
//             }
//             curr_line = entries[currPos];
//             term.write('\33[2K\r\u001b[32mscm> \u001b[37m' + curr_line);
//           }
//         } else if (ev.keyCode === 40) {
//           // Down arrow
//           currPos += 1;
//           if (currPos === entries.length || entries.length === 0) {
//             currPos -= 1;
//             curr_line = '';
//             term.write('\33[2K\r\u001b[32mscm> \u001b[37m');
//           } else {
//             curr_line = entries[currPos];
//             term.write('\33[2K\r\u001b[32mscm> \u001b[37m' + curr_line);
//           }
//         } else if (
//           printable &&
//           !(ev.keyCode === 39 && term.buffer.cursorX > curr_line.length + 4)
//         ) {
//           if (ev.keyCode != 37 && ev.keyCode != 39) {
//             var input = ev.key;
//             if (ev.keyCode == 9) {
//               // Tab
//               input = '    ';
//             }
//             pos = curr_line.length - term.buffer.cursorX + 4;
//             curr_line = [
//               curr_line.slice(0, term.buffer.cursorX - 5),
//               input,
//               curr_line.slice(term.buffer.cursorX - 5),
//             ].join('');
//             term.write('\33[2K\r\u001b[32mscm> \u001b[37m' + curr_line);
//             term.write('\033['.concat(pos.toString()).concat('D')); //term.write('\033[<N>D');
//           } else {
//             term.write(key);
//           }
//         }
//       });

//       term.on('paste', function (data) {
//         curr_line += data;
//         term.write(curr_line);
//       });
//     }
//   }, [dom.current]);
// };

export default {};
