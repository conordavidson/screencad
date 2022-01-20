import { FC } from 'react';

import * as GlobalState from 'lib/globalState';

const Sidebar: FC = () => {
  // const globalState = GlobalState.useGlobalState();

  return (
    <div className="w-full h-full p-4">
      <ul className="space-y-4">
        {/* {Array.from(globalState.state.selected).map((selectedId) => {
          const node = globalState.state.treeIndex[selectedId];
          return (
            <li className="border p-2" key={node.id}>
              <p>id: {node.id}</p>
            </li>
          );
        })} */}
      </ul>
    </div>
  );
};

export default Sidebar;
