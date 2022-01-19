import { v4 } from 'uuid';

export type Node<T> = {
  id: string;
  children: Node<T>[];
  data: T;
};

const Tree = {
  insertNode<T>(tree: Node<T>[], data: T): Node<T>[] {
    return [...tree, Tree.newNode(data)];
  },

  insertChild<T>(tree: Node<T>[], id: string, data: T): Node<T>[] {
    const found = Tree.find(tree, id);
    if (!found) return tree;
    found.children = [...found.children, Tree.newNode(data)];
    return [...tree];
  },

  find<T>(tree: Node<T>[], id: string): Node<T> | undefined {
    return tree.find((node) => {
      if (node.id === id) return true;
      if (node.children.length === 0) return false;
      return Tree.find(node.children, id);
    });
  },

  newNode<T>(data: T) {
    return {
      id: v4(),
      children: [],
      data,
    };
  },
};

export default Tree;
