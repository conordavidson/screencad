import Terminal from 'components/terminal';
import Canvas from 'components/canvas';

const App = () => {
  return (
    <div className="h-full main-layout">
      <div className="canvas border-b">
        <Canvas />
      </div>
      <div className="terminal">
        <Terminal />
      </div>
      <div className="sidebar border-l">
        <div className="w-full h-full">
          <p>sidebar!</p>
        </div>
      </div>
    </div>
  );
};

export default App;
