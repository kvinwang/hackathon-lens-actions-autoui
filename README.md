# Lens Smart Post with Automated Action Arguments UI

This repository contains smart contracts and a UI that demonstrates how to dynamically generate a UI for the arguments of Lens Open Action Modules.

## The problem

Nowadays, when someone develops a new Lens Open Action Module, they are not only required to deploy the action's smart contract on-chain but also have to develop and host a UI that enables interaction with the action. Without this UI, users are limited to script-based interactions or using polygonscan, which is not user-friendly. This poses a considerable barrier for developers who wish to promote their actions.

The problems can be summarized as follows:

- Developers are forced to develop a UI for their actions, which is additional, unnecessary work.
- Developers need to host the UI for their actions themselves, incurring extra costs for maintenance and promotion.
- End users won't use these third-party UIs due to inconvenience and security concerns.

Ideally, there should be a standard protocol that allows developers to register their Action Modules somewhere (such as a Kinda Actions Market), publish their metadata, and then well-known frontends such as [Hey](https://testnet.hey.xyz/) should automatically generate UIs for users to interact with the Action Modules.

This repository contains the demo code that demonstrates how the above idea can be achieved. These features should eventually be implemented by the official Lens frontend.

## Demo Video

https://github.com/kvinwang/hackathon-lens-actions-autoui/assets/6442159/51040550-bc89-4869-b6e2-081b876c47a2

## How it works

When developing a new Open Action Module, one should:

1. Implement the LensModuleMetadata. (It should [already be true](https://github.com/defispartan/lens-hello-world-open-action/blob/master/contracts/src/HelloWorldOpenAction.sol#L11) if following the hello world tutorial)
2. Make a metadata file for the action according the [doc](https://docs.lens.xyz/docs/module-metadata-standard) and host it somewhere ([here](https://files.kvin.wang:8443/lens-actions-abi/helloworld.json) for example).
3. Set the metadataURI in the Contract constructor:

```solidity
    constructor(
        address lensHubProxyContract,
        address helloWorldContract,
        address moduleOwner
    ) HubRestricted(lensHubProxyContract) LensModuleMetadata(moduleOwner) {
        _helloWorld = IHelloWorld(helloWorldContract);

        // Set the metadataURI to the location of the metadata file
        metadataURI = "https://files.kvin.wang:8443/lens-actions-abi/helloworld.json";
    }
```

[Here is a deployed example](https://mumbai.polygonscan.com/address/0x200411A607275040DF5Ef0C4Ef5017E0a6041Ff8#readContract#F2)

When a user publish a post with actions with this UI, the following steps will be executed:

1. The UI will fetch the list for supported open action modules.
2. When use enter the Post page , fill in post content and click [Add an Action] button, the UI will ask the contract for the localtion of the action's metadata, download the metadata and generate UI according to the content of `initializeCalldataABI`, where `initializeCalldataABI` is formated in standard solidity JSON ABI format.
3. When user click [Create] button, the UI will generate the calldata for the action and call the action with the calldata.

Note, the registry & metadata hosting are mocked in this demo code.

## How to run the frontend locally

To run locally, clone repo, make sure you have yarn installed.

1. Switch to frontend directory, copy `.env.example` to `.env`, input environment variables, and run `source .env` (or equivalent on your OS).
2. Run `yarn && yarn dev`
