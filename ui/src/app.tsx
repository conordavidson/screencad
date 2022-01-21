import Commandline from 'components/commandline';
import Canvas from 'components/canvas';
import Sidebar from 'components/sidebar';

import * as Document from 'lib/document';

const App = () => {
  return (
    <Document.Provider>
      <div className="h-full main-layout">
        <div className="canvas border-b">
          <Canvas />
        </div>
        <div className="terminal">
          <Commandline />
        </div>
        <div className="sidebar border-l">
          <Sidebar />
        </div>
      </div>
    </Document.Provider>
  );
};

export default App;
