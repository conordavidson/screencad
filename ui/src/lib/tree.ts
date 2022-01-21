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
  setData<T>(tree: Tree<T>, node: Node<T>, data: T): Tree<T> {
    return {
      ...tree,
      [node.id]: {
        ...node,
        data,
      },
    };
  },

  getChildren<T>(tree: Tree<T>, node: Node<T>): Node<T>[] {
    return node.childIds.map((childId) => tree[childId]);
  },

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

  // child-parent-grand

  insertParent<T>(tree: Tree<T>, children: Node<T>[], parent: Node<T>): Tree<T> {
    const parentIds = new Set(children.map((child) => child.parentId));
    if (parentIds.size > 1) throw 'Children have different parentIds';
    const [parentId] = parentIds;

    // TODO: This needs to find any nodes that are currently pointing
    // the children and point them to the new node.

    // const childIds = children.map((child) => child.id);

    // const grandParents = Object.values(tree).filter((node) =>
    //   node.childIds.some((childId) => childIds.includes(childId))
    // );

    // return grandParents.reduce((newTree: Tree<T>, grandParent) => {
    //   return {
    //     ...newTree,
    //     [grandParent.id]: {
    //       ...grandParent,
    //       childIds: [parentId],
    //     },
    //   } as Tree<T>;
    // }, treeWithChildren);

    const treeWithChildren: Tree<T> = children.reduce(
      (newTree, child) => {
        return {
          ...newTree,
          [child.id]: {
            ...child,
            parentId: parent.id,
          },
        };
      },
      {
        ...tree,
        [parent.id]: {
          ...parent,
          parentId: parentId,
          childIds: children.map((child) => child.id),
        },
      }
    );

    return treeWithChildren;
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
