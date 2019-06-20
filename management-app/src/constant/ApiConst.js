const uri = 'ws://175.207.46.3:8546'

const contractAddr = '0xd093a3c46439480d176bc25f189de42ff6e4a73e'

const defaultAccount = '0xa107aa8103ebfa0f79c054bdb470ddc7e4474651'

const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "addr",
				"type": "address"
			},
			{
				"name": "facilityIp",
				"type": "bytes32"
			},
			{
				"name": "accessTimestamp",
				"type": "uint256"
			}
		],
		"name": "access",
		"outputs": [
			{
				"name": "isAuthorized",
				"type": "bool"
			}
		],
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
			}
		],
		"name": "clearAuth",
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
				"type": "bytes32"
			},
			{
				"name": "status",
				"type": "bytes32"
			},
			{
				"name": "dong",
				"type": "bytes32"
			},
			{
				"name": "ho",
				"type": "bytes32"
			}
		],
		"name": "createCard",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "ip",
				"type": "bytes32"
			},
			{
				"name": "name",
				"type": "bytes32"
			},
			{
				"name": "status",
				"type": "bytes32"
			}
		],
		"name": "createFacility",
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
				"name": "auth",
				"type": "bytes32[]"
			}
		],
		"name": "updateAuth",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
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
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "status",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "dong",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "ho",
				"type": "bytes32"
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
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "status",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "dong",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "ho",
				"type": "bytes32"
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
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "status",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "dong",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "ho",
				"type": "bytes32"
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
				"name": "ip",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "name",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "status",
				"type": "bytes32"
			}
		],
		"name": "setFacility",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "addr",
				"type": "address"
			}
		],
		"name": "clearCardAuth",
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
				"name": "auth",
				"type": "bytes32[]"
			}
		],
		"name": "updateCardAuth",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "accessTimestamp",
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
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "cardId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "dong",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "ho",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "facilityName",
				"type": "bytes32"
			}
		],
		"name": "successHistory",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "accessTimestamp",
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
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "cardId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "dong",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "ho",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "facilityName",
				"type": "bytes32"
			}
		],
		"name": "failureHistory",
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
				"type": "bytes32[]"
			},
			{
				"name": "names",
				"type": "bytes32[]"
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
		"name": "getCardInfo",
		"outputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "bytes32"
			},
			{
				"name": "",
				"type": "bytes32"
			},
			{
				"name": "",
				"type": "bytes32"
			},
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getCardList",
		"outputs": [
			{
				"name": "ids",
				"type": "bytes32[]"
			},
			{
				"name": "statuses",
				"type": "bytes32[]"
			},
			{
				"name": "dongs",
				"type": "bytes32[]"
			},
			{
				"name": "hos",
				"type": "bytes32[]"
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
				"name": "ip",
				"type": "bytes32"
			}
		],
		"name": "getFacilityInfo",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			},
			{
				"name": "",
				"type": "bytes32"
			},
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getFacilityList",
		"outputs": [
			{
				"name": "ips",
				"type": "bytes32[]"
			},
			{
				"name": "names",
				"type": "bytes32[]"
			},
			{
				"name": "statuses",
				"type": "bytes32[]"
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
				"name": "_to",
				"type": "address"
			}
		],
		"name": "isValidCard",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]


export { uri, contractAddr, abi, defaultAccount }