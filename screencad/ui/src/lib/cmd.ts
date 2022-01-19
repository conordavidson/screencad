import Tree from 'lib/tree';

import * as GlobalState from 'lib/globalState';
import * as Constants from 'lib/constants';

type State = ReturnType<typeof GlobalState.useGlobalState>;
type HTML_TAG = typeof Constants.HTML_TAGS[number];

// const mock = {
//   create: {
//     parent: {},
//     child: {},
//     sibling: {},
//     div: {},
//     p: {}
//   },
//   delete: {

//   },
//   update: {
//     style:
//     property:
//   }
// }

type CreateCommands = TagCommands & {
  parent?: Command<TagCommands>;
  child?: Command<TagCommands>;
  sibling?: Command<TagCommands>;
};

export type Commands = {
  create: Command<CreateCommands>;
  update?: () => void;
};

type Command<T> = {
  (): T;
  description: string;
};

type TagCommands = {
  [tag in HTML_TAG]: Command<void>;
};

type Context = {
  globalState: State;
};

const factory = (context: Context) => {
  return (): Commands => {
    const {
      globalState: { state, setState },
    } = context;

    const commands: Commands = {
      create: makeCommand('Create new things', () => {
        const createCommands = {} as CreateCommands;

        Constants.HTML_TAGS.forEach((tag) => {
          createCommands[tag] = makeCommand(`Insert root <${tag}/>`, () => {
            setState({
              ...state,
              tree: Tree.insertNode(state.tree, { tag }),
            });
          });
        });

        withOneSelection(context, (selection) => {
          createCommands.child = makeCommand(`Insert child node`, () => {
            const childCommands = {} as TagCommands;

            Constants.HTML_TAGS.forEach((tag) => {
              childCommands[tag] = makeCommand(`Insert child <${tag}/>`, () => {
                setState({
                  ...state,
                  tree: Tree.insertChild(state.tree, selection, { tag }),
                });
              });
            });

            return childCommands;
          });
        });

        const parent = () => {};

        const child = () => {};

        const sibling = () => {};

        return createCommands;
      }),
    };

    withSelections(context, (selections) => {
      commands.update = () => {};
    });

    return commands;
  };
};

const makeCommand = <T>(description: string, commands: T) => {
  return Object.assign(commands, { description });
};

const withSelections = (context: Context, callback: (selections: Set<string>) => void) => {
  if (context.globalState.state.selected.size === 0) return;
  return callback(context.globalState.state.selected);
};

const withOneSelection = (context: Context, callback: (selections: string) => void) => {
  if (context.globalState.state.selected.size === 0) return;
  if (context.globalState.state.selected.size > 1) return;
  const [selectedId] = context.globalState.state.selected;
  return callback(selectedId);
};

const Cmd = {
  factory,
};

export default Cmd;
