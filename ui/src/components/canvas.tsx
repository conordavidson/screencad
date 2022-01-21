import { FC } from 'react';

import cx from 'classnames';

import * as Types from 'types';
import * as Document from 'lib/document';

const Node: FC<{ node: Types.DocumentNode }> = ({ node }) => {
  const document = Document.useDocument();
  const selected = document.getSelections();

  const onClickNode = () => {
    document.toggleSelection(node);
  };

  const Tag = node.data.tag;

  return (
    <Tag
      style={node.data.style}
      onClick={(e) => {
        e.stopPropagation();
        onClickNode();
      }}
      className={cx('border border-gray-400 min-w-[200px] min-h-[200px]', {
        'border-2 border-blue-500': selected.has(node),
      })}
    >
      <span className="absolute text-xs text-blue">{node.id.slice(0, 6)}</span>
      {document.getChildren(node).map((node) => {
        return <Node key={node.id} node={node} />;
      })}
    </Tag>
  );
};

const TreeUi: FC = () => {
  const document = Document.useDocument();

  return (
    <div>
      {Object.values(document.getTree())
        .filter((node) => node.parentId === null)
        .map((node) => {
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
