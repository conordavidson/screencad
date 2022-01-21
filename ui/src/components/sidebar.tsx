import { FC } from 'react';

import * as Document from 'lib/document';

const Sidebar: FC = () => {
  const document = Document.useDocument();

  return (
    <div className="w-full h-full p-4">
      <ul className="space-y-4">
        {Array.from(document.getSelections()).map((node) => {
          return (
            <li className="border p-2" key={node.id}>
              <p>{`<${node.data.tag} id=${node.id.slice(0, 6)}>`}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
