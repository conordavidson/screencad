import Tree from 'lib/tree';

describe(Tree.insertChild, () => {
  it('should work', () => {
    const parent = {
      id: 'a',
      parent: null,
      children: [],
      data: { works: 'yes' },
    };

    const tree = [parent];

    const updatedTree = Tree.insertChild(tree, parent, {
      id: 'a-child',
      data: { works: 'also' },
    });

    expect(updatedTree).toEqual([
      {
        id: 'a',
        parent: null,
        children: [
          {
            id: 'a-child',
            data: {
              works: 'also',
            },
            children: [],
            parent,
          },
        ],
        data: {
          works: 'yes',
        },
      },
    ]);
  });
});

// const tree = {
//   id: 1,
//   parent: null,
//   children: [
//     {
//       id: 2,
//       parent: {
//         id: 1,
//         parent: null,
//         children: [
//           new node: [
//             {
//               id: 2,

//             }
//           ]
//           circlular
//         ]
//       },
//       children: []
//     },
//     {
//       id: 2,
//       parent: 1,
//       children: []
//     },
//   ]
// }

// const tree = {
//   1: {
//     id: 1,
//     parentIds: null,
//     childrenIds: [3, 4]
//   },
//   2: {
//     id: 1,
//     parentIds: null,
//     childrenIds: [3, 4]
//   },

// }
