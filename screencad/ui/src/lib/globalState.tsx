// import { FC, SetStateAction } from 'react';
// import { createContext, useState, useContext, Dispatch } from 'react';

// import * as T from 'types';
// import * as Constants from 'lib/constants';

// type DomTree = T.Node<{
//   tag: typeof Constants.HTML_TAGS[number];
// }>[];
// type State = {
//   tree: DomTree;
//   selected: Set<string>;
// };

// type TContext = {
//   state: State;
//   setState: Dispatch<SetStateAction<State>>;
// };

// const Context = createContext<TContext>({
//   state: {
//     tree: [],
//     selected: new Set(),
//   },
//   setState: () => ({
//     tree: [],
//     selected: new Set(),
//   }),
// });

// export const Provider: FC = ({ children }) => {
//   const [state, setState] = useState<State>({
//     tree: [],
//     selected: new Set(),
//   });

//   return <Context.Provider value={{ state, setState }}>{children}</Context.Provider>;
// };

// export const useGlobalState = () => {
//   const { state, setState } = useContext(Context);

//   const createIndex = (tree: DomTree, index: {}): T.DomNodeIndex => {
//     return tree.reduce((index: T.DomNodeIndex, node) => {
//       index[node.id] = node;
//       if (node.children.length > 0) return createIndex(node.children, index);
//       return index;
//     }, index);
//   };

//   const treeIndex = createIndex(state.tree, {});

//   return {
//     setState,
//     state: {
//       ...state,
//       treeIndex,
//     },
//   };
// };

export {};
