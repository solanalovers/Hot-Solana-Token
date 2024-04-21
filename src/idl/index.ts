export type VoteToken = {
  version: '0.1.0';
  name: 'vote_token';
  instructions: [
    {
      name: 'vote';
      accounts: [
        {
          name: 'voter';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'mint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'mintResult';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'numberOfVote';
          type: 'u16';
        }
      ];
    }
  ];
  accounts: [
    {
      name: 'voteResult';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'numberOfVote';
            type: 'u16';
          }
        ];
      };
    }
  ];
};

export const IDL: VoteToken = {
  version: '0.1.0',
  name: 'vote_token',
  instructions: [
    {
      name: 'vote',
      accounts: [
        {
          name: 'voter',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'mint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'mintResult',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'numberOfVote',
          type: 'u16',
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'voteResult',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'numberOfVote',
            type: 'u16',
          },
        ],
      },
    },
  ],
};
