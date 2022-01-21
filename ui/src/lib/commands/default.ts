import Commands from 'lib/commands';
import Context from 'lib/context';
import Cmd from 'lib/cmd';

import * as Constants from 'lib/constants';
import * as Types from 'types';

const CustomArgs = {
  Tag: {
    description: 'type of tag',
    choices: Constants.HTML_TAGS,
    demandOption: true as true,
  },
  CssProperty: {
    description: 'css property',
    choices: Constants.CSS_PROPERTIES,
    demandOption: true as true,
  },
};

const DefaultCommands = [
  Commands.make({
    command: 'create <tag>',
    description: 'Create Node',
    args: {
      tag: CustomArgs.Tag,
    },
    handler: (context, { tag }) => {
      const node = Context.createNode(tag);
      return Context.append(context, node);
    },
  }),
  Commands.make({
    command: 'child <tag>',
    description: 'Create Child Node',
    args: {
      tag: CustomArgs.Tag,
    },
    handler: (context, { tag }) => {
      return withOneSelection(context, (parent) => {
        const child = Context.createNode(tag);
        return Context.appendChild(context, parent, child);
      });
    },
  }),
  Commands.make({
    command: 'style <property> <value>',
    description: 'Update CSS Property',
    args: {
      property: CustomArgs.CssProperty,
      value: {
        description: 'css property value',
        type: 'string',
        demandOption: true,
      },
    },
    handler: (context, { property, value }) => {
      return withSelections(context, (selections) => {
        return [...selections].reduce((context, selection) => {
          return Context.setData(context, selection, {
            ...selection.data,
            style: {
              ...selection.data.style,
              [property]: value,
            },
          });
        }, context);
      });
    },
  }),
];

// TODO: Return Error
const withSelections = (
  context: Types.Context,
  callback: (selections: Set<Types.DocumentNode>) => Types.Context
) => {
  const selections = Context.getSelections(context);
  if (selections.size === 0) return context;
  return callback(selections);
};

// TODO: Return Error
const withOneSelection = (
  context: Types.Context,
  callback: (selections: Types.DocumentNode) => Types.Context
) => {
  const selections = Context.getSelections(context);
  if (selections.size === 0) return context;
  if (selections.size > 1) return context;
  const [selection] = selections;
  return callback(selection);
};

export default DefaultCommands;
