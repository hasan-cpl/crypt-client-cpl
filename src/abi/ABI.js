// Send Token ABI
export const tokenTransferABI = [
    // transfer
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "type": "function"
    }
];

// The minimum ABI to get ERC20 Token balance
export const tokenBalanceABI = [
    // balanceOf
    {
      "constant":true,
          "inputs": [
              {
                  "name": "_owner",
                  "type": "address"
              }
          ],
      "name":"balanceOf",
          "outputs": [
              {
                  "name": "balance",
                  "type": "uint256"
              }
          ],
      "type":"function"
    },
    // decimals
    {
      "constant":true,
      "inputs":[],
      "name":"decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
      "type":"function"
    }
  ];

export const TOKEN_ADDRESS = "0xB8C89D77522Cf6f3BDcB50768ac2B845FFAdD269";

