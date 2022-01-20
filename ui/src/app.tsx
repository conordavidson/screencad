import Commandline from 'components/commandline';
import Canvas from 'components/canvas';
import Sidebar from 'components/sidebar';

// import * as GlobalState from 'lib/globalState';

const App = () => {
  return (
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
  );
};

export default App;
