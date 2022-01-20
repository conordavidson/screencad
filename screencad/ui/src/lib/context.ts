import Tree from 'lib/tree';

import * as Types from 'types';

type DocumentNodeData = {
  tag: keyof JSX.IntrinsicElements;
  style: React.CSSProperties;
};

type DocumentNode = Types.Node<DocumentNodeData>;
type Document = Types.Tree<DocumentNodeData>;

export type Context = {
  document: Document;
  selected: Set<string>;
};

const Context = {
  getSelections(context: Context): DocumentNode[] {
    return [...context.selected].map((selectedId) => context.document[selectedId]);
  },

  setSelections(context: Context, nodes: DocumentNode[]): Context {
    return {
      ...context,
      selected: new Set(nodes.map((node) => node.id)),
    };
  },

  addSelections(context: Context, nodes: DocumentNode[]): Context {
    return {
      ...context,
      selected: new Set([...context.selected, ...nodes.map((node) => node.id)]),
    };
  },

  removeSelections(context: Context, nodeIds: string[]): Context {
    const selected = new Set(context.selected);
    nodeIds.forEach((nodeId) => selected.delete(nodeId));

    return {
      ...context,
      selected,
    };
  },

  createNode(
    tag: keyof JSX.IntrinsicElements,
    attrs: { style: React.CSSProperties } = { style: {} }
  ) {
    return Tree.createNode({ data: { tag: tag, ...attrs } });
  },

  append(context: Context, node: DocumentNode) {
    return {
      ...context,
      document: Tree.insert(context.document, node),
    };
  },

  appendChild(context: Context, parent: DocumentNode, node: DocumentNode) {
    return {
      ...context,
      document: Tree.appendChild(context.document, parent, node),
    };
  },

  prependChild(context: Context, parent: DocumentNode, node: DocumentNode) {
    return {
      ...context,
      document: Tree.prependChild(context.document, parent, node),
    };
  },

  insertParent(context: Context, children: DocumentNode[], parent: DocumentNode) {
    return {
      ...context,
      document: Tree.insertParent(context.document, children, parent),
    };
  },
};

export default Context;
