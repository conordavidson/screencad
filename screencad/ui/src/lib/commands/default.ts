import Command from 'lib/command';
import Context from 'lib/context';

import * as Constants from 'lib/constants';

const createNode = Command.make(
  'create <tag>',
  'Create Node',
  {
    tag: {
      describe: 'type of tag',
      choices: Constants.HTML_TAGS,
      demandOption: true,
    },
  },
  (context, { tag }) => {
    const node = Context.createNode(tag);
    return Context.append(context, node);
  }
);

const createChildNode = Command.make(
  'create child <tag>',
  'Create Child Node',
  {
    tag: {
      describe: 'type of tag',
      choices: Constants.HTML_TAGS,
      demandOption: true,
    },
  },
  (context, { tag }) => {
    const selections = Context.getSelections(context);
    if (selections.length === 0) return context;
    if (selections.length > 1) return context;
    const parent = selections[0];
    const child = Context.createNode(tag);
    return Context.appendChild(context, parent, child);
  }
);

export default [createNode, createChildNode];
