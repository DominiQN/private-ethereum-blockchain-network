const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "ip",
				"type": "uint32"
			},
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "status",
				"type": "string"
			}
		],
		"name": "createFacility",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
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
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "addr",
				"type": "address"
			}
		],
		"name": "getCardAuth",
		"outputs": [
			{
				"name": "ips",
				"type": "uint32[]"
			},
			{
				"name": "names",
				"type": "string[]"
			},
			{
				"name": "size",
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
		"inputs": [],
		"name": "getCardSize",
		"outputs": [
			{
				"name": "cardSize",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
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
				"name": "auth",
				"type": "uint32[]"
			}
		],
		"name": "updateCardAuth",
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
				"type": "string"
			},
			{
				"name": "ho",
				"type": "string"
			}
		],
		"name": "createCard",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "givenIp",
				"type": "uint32"
			}
		],
		"name": "getFacilityInfo",
		"outputs": [
			{
				"name": "ip",
				"type": "uint32"
			},
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "status",
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
		"name": "tokenName",
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
		"inputs": [
			{
				"name": "givenAddr",
				"type": "address"
			}
		],
		"name": "getCardInfo",
		"outputs": [
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
				"type": "string"
			},
			{
				"name": "ho",
				"type": "string"
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
				"name": "size",
				"type": "uint256"
			},
			{
				"name": "page",
				"type": "uint256"
			}
		],
		"name": "getCardList",
		"outputs": [
			{
				"name": "ids",
				"type": "string[]"
			},
			{
				"name": "statuses",
				"type": "string[]"
			},
			{
				"name": "dongs",
				"type": "string[]"
			},
			{
				"name": "hos",
				"type": "string[]"
			},
			{
				"name": "lastPage",
				"type": "uint256"
			},
			{
				"name": "currentPageSize",
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
		"name": "getFacilitySize",
		"outputs": [
			{
				"name": "cardSize",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "addr",
				"type": "address"
			}
		],
		"name": "clearAuth",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getFacilityKeys",
		"outputs": [
			{
				"name": "",
				"type": "uint32[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
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
				"name": "facilityIp",
				"type": "uint32"
			},
			{
				"name": "accessTimestamp",
				"type": "uint256"
			}
		],
		"name": "access",
		"outputs": [
			{
				"name": "authorized",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "size",
				"type": "uint256"
			},
			{
				"name": "page",
				"type": "uint256"
			}
		],
		"name": "getFacilityList",
		"outputs": [
			{
				"name": "ips",
				"type": "uint32[]"
			},
			{
				"name": "names",
				"type": "string[]"
			},
			{
				"name": "statuses",
				"type": "string[]"
			},
			{
				"name": "lastPage",
				"type": "uint256"
			},
			{
				"name": "currentPageSize",
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
		"name": "getCardKeys",
		"outputs": [
			{
				"name": "",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
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
				"type": "string"
			},
			{
				"indexed": false,
				"name": "ho",
				"type": "string"
			}
		],
		"name": "SetCard",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "ip",
				"type": "uint32"
			},
			{
				"indexed": false,
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "status",
				"type": "string"
			}
		],
		"name": "SetFacility",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "addr",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "ip",
				"type": "uint32"
			}
		],
		"name": "AddCardAuth",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"indexed": true,
				"name": "cardAddr",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "facilityIp",
				"type": "uint32"
			},
			{
				"indexed": false,
				"name": "cardId",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "dong",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "ho",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "facilityName",
				"type": "string"
			}
		],
		"name": "AccessHistory",
		"type": "event"
	}
]


export { contractAddr, abi, defaultAccount }