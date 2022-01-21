import Tree from 'lib/tree';

import * as Types from 'types';

type DocumentNodeData = {
  tag: keyof JSX.IntrinsicElements;
  style: React.CSSProperties;
};

export type DocumentNode = Types.Node<DocumentNodeData>;
export type Document = Types.Tree<DocumentNodeData>;

export type Context = {
  tree: Document;
  selected: Set<string>;
};

const Context = {
  getSelections(context: Context): Set<DocumentNode> {
    return new Set([...context.selected].map((selectedId) => context.tree[selectedId]));
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

  removeSelections(context: Context, nodes: DocumentNode[]): Context {
    const selected = new Set(context.selected);
    nodes.forEach((node) => selected.delete(node.id));

    return {
      ...context,
      selected,
    };
  },

  toggleSelection(context: Context, node: DocumentNode): Context {
    const selected = new Set(context.selected);
    if (context.selected.has(node.id)) {
      selected.delete(node.id);
    } else {
      selected.add(node.id);
    }

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

  append(context: Context, node: DocumentNode): Context {
    return {
      ...context,
      tree: Tree.insert(context.tree, node),
    };
  },

  appendChild(context: Context, parent: DocumentNode, node: DocumentNode): Context {
    return {
      ...context,
      tree: Tree.appendChild(context.tree, parent, node),
    };
  },

  prependChild(context: Context, parent: DocumentNode, node: DocumentNode): Context {
    return {
      ...context,
      tree: Tree.prependChild(context.tree, parent, node),
    };
  },

  insertParent(context: Context, children: DocumentNode[], parent: DocumentNode): Context {
    return {
      ...context,
      tree: Tree.insertParent(context.tree, children, parent),
    };
  },

  setData(context: Context, node: DocumentNode, data: DocumentNodeData): Context {
    return {
      ...context,
      tree: Tree.setData(context.tree, node, data),
    };
  },
};

export default Context;
