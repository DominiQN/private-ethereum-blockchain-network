const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "addr",
				"type": "address"
			}
		],
		"name": "getCard",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "addr",
				"type": "address"
			},
			{
				"name": "id",
				"type": "string"
			},
			{
				"name": "status",
				"type": "string"
			},
			{
				"name": "dong",
				"type": "uint32"
			},
			{
				"name": "ho",
				"type": "uint32"
			}
		],
		"name": "setCard",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
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
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_supply",
				"type": "uint256"
			},
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_symbol",
				"type": "string"
			},
			{
				"name": "_decimals",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "addr",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "id",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "status",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "dong",
				"type": "uint32"
			},
			{
				"indexed": false,
				"name": "ho",
				"type": "uint32"
			}
		],
		"name": "getCardEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "addr",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "id",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "status",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "dong",
				"type": "uint32"
			},
			{
				"indexed": false,
				"name": "ho",
				"type": "uint32"
			}
		],
		"name": "setCardSuccessEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "addr",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "id",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "status",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "dong",
				"type": "uint32"
			},
			{
				"indexed": false,
				"name": "ho",
				"type": "uint32"
			}
		],
		"name": "setCardFailureEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transferEvent",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "s1",
				"type": "string"
			},
			{
				"name": "s2",
				"type": "string"
			}
		],
		"name": "equals",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]