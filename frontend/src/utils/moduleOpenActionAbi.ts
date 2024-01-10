export const moduleOpenActionAbi = [
    {
        "type": "constructor",
        "inputs": [
            {
                "name": "lensHubProxyContract",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "helloWorldContract",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "moduleOwner",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "HUB",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getModuleMetadataURI",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "string",
                "internalType": "string"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "initializePublicationAction",
        "inputs": [
            {
                "name": "profileId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "pubId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "data",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "metadataURI",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "string",
                "internalType": "string"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "owner",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "processPublicationAction",
        "inputs": [
            {
                "name": "params",
                "type": "tuple",
                "internalType": "struct Types.ProcessActionParams",
                "components": [
                    {
                        "name": "publicationActedProfileId",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "publicationActedId",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "actorProfileId",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "actorProfileOwner",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "transactionExecutor",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "referrerProfileIds",
                        "type": "uint256[]",
                        "internalType": "uint256[]"
                    },
                    {
                        "name": "referrerPubIds",
                        "type": "uint256[]",
                        "internalType": "uint256[]"
                    },
                    {
                        "name": "referrerPubTypes",
                        "type": "uint8[]",
                        "internalType": "enum Types.PublicationType[]"
                    },
                    {
                        "name": "actionModuleData",
                        "type": "bytes",
                        "internalType": "bytes"
                    }
                ]
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "stateMutability": "nonpayable"
    },
] as const;