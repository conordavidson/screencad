import { FC } from 'react';
import { createContext, useState, useContext, Dispatch, SetStateAction } from 'react';

import Cmd from 'lib/cmd';
import Context from 'lib/context';
import Tree from 'lib/tree';

import * as Types from 'types';

const DocumentContext = createContext<{
  context: Types.Context;
  setContext: Dispatch<SetStateAction<Types.Context>>;
}>({
  context: {
    tree: {},
    selected: new Set(),
  },
  setContext: () => ({
    tree: {},
    selected: new Set(),
  }),
});

export const Provider: FC = ({ children }) => {
  const [context, setContext] = useState<Types.Context>({
    tree: {},
    selected: new Set(),
  });

  return (
    <DocumentContext.Provider value={{ context, setContext }}>{children}</DocumentContext.Provider>
  );
};

export const useDocument = () => {
  const { context, setContext } = useContext(DocumentContext);

  return {
    executeCommand: (input: string) => {
      Cmd.execute(context, input).then((context) => {
        setContext(context);
      });
    },

    toggleSelection: (node: Types.DocumentNode) => {
      setContext(Context.toggleSelection(context, node));
    },

    getSelections: () => {
      return Context.getSelections(context);
    },

    getTree: () => {
      return context.tree;
    },

    getChildren: (node: Types.DocumentNode) => {
      return Tree.getChildren(context.tree, node);
    },
  };
};
