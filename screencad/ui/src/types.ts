import { Node } from 'lib/tree';

import * as Constants from 'lib/constants';

export type { Node } from 'lib/tree';

export type DomNode = Node<{ tag: typeof Constants.HTML_TAGS[number] }>;

export type DomNodeIndex = {
  [id: string]: DomNode;
};
