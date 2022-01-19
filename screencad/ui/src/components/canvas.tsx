import { FC } from 'react';

import cx from 'classnames';

import * as GlobalState from 'lib/globalState';
import * as T from 'types';

const Node: FC<{ node: T.DomNode }> = ({ node }) => {
  const globalState = GlobalState.useGlobalState();

  const onClickNode = () => {
    globalState.setState((state) => {
      const updatedSelected = new Set(state.selected);
      if (state.selected.has(node.id)) {
        updatedSelected.delete(node.id);
      } else {
        updatedSelected.add(node.id);
      }
      return {
        ...state,
        selected: updatedSelected,
      };
    });
  };

  const Tag = node.data.tag;

  return (
    <Tag
      onClick={onClickNode}
      className={cx('border border-gray-400 w-24 h-24', {
        'border-2': globalState.state.selected.has(node.id),
      })}
    >
      {node.children.map((node) => {
        return <Node key={node.id} node={node} />;
      })}
    </Tag>
  );
};

const TreeUi: FC = () => {
  const globalState = GlobalState.useGlobalState();

  return (
    <div>
      {globalState.state.tree.map((node) => {
        return <Node key={node.id} node={node} />;
      })}
    </div>
  );
};

const Canvas: FC = () => {
  return (
    <div className="h-full w-full bg-gray-100 p-4">
      <TreeUi />
    </div>
  );
};

export default Canvas;
