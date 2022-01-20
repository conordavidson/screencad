import { v4 } from 'uuid';

export type Tree<T> = {
  [id: string]: Node<T>;
};
export type Node<T> = {
  id: string;
  parentId: null | string;
  childIds: string[];
  data: T;
};

const Tree = {
  insert<T>(tree: Tree<T>, node: Node<T>): Tree<T> {
    return { ...tree, [node.id]: node };
  },

  insertChild<T>(
    tree: Tree<T>,
    parent: Node<T>,
    node: Node<T>,
    position: 'append' | 'prepend' = 'append'
  ): Tree<T> {
    if (position === 'append') return Tree.appendChild(tree, parent, node);
    return Tree.prependChild(tree, parent, node);
  },

  appendChild<T>(tree: Tree<T>, parent: Node<T>, node: Node<T>): Tree<T> {
    return {
      ...tree,
      [parent.id]: {
        ...parent,
        childIds: [...parent.childIds, node.id],
      },
      [node.id]: {
        ...node,
        parentId: parent.id,
      },
    };
  },

  prependChild<T>(tree: Tree<T>, parent: Node<T>, node: Node<T>): Tree<T> {
    return {
      ...tree,
      [parent.id]: {
        ...parent,
        childIds: [node.id, ...parent.childIds],
      },
      [node.id]: {
        ...node,
        parentId: parent.id,
      },
    };
  },

  insertParent<T>(tree: Tree<T>, children: Node<T>[], node: Node<T>) {
    const parentIds = new Set(children.map((parentId) => parentId));
    if (parentIds.size > 1) throw 'Children have different parentIds';

    return children.reduce(
      (newTree, child) => {
        return {
          ...newTree,
          [child.id]: {
            ...child,
            parentId: node.id,
          },
        };
      },
      {
        ...tree,
        [node.id]: node,
      }
    );
  },

  find<T>(tree: Tree<T>, id: string): Node<T> | null {
    return tree[id] || null;
  },

  createNode<T>({
    id = v4(),
    parentId = null,
    childIds = [],
    data,
  }: {
    id?: string;
    parentId?: null | string;
    childIds?: string[];
    data: T;
  }): Node<T> {
    return {
      id,
      parentId,
      childIds,
      data,
    };
  },
};

export default Tree;
