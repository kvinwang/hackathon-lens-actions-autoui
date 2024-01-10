import { useState } from "react";
import { useLensHelloWorld } from "../context/LensHelloWorldContext";
import { encodeAbiParameters, encodeFunctionData, zeroAddress } from "viem";
import { uiConfig } from "../utils/constants";
import { lensHubAbi } from "../utils/lensHubAbi";
import { useWalletClient } from "wagmi";
import { defaultClient } from "../main";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// TODO: query from server
const actionsMarketDb = [
  {
    name: "Hello World",
    abi: [
      { type: "string", name: "message" },
    ],
  },
  {
    name: "Tipping",
    abi: [
      { type: "uint256", name: "min-value" },
      { type: "uint256", name: "max-value" },
    ],
  },
  {
    name: "Pay to Read",
    abi: [{ type: "uint256", name: "price" }],
  },
  {
    name: "Rent a Post",
    abi: [{ type: "uint256", name: "price" }],
  },
];

export const Create = () => {
  const { address, profileId, refresh } = useLensHelloWorld();
  const { data: walletClient } = useWalletClient();
  const [createState, setCreateState] = useState<string | undefined>();
  const [txHash, setTxHash] = useState<string | undefined>();
  const [uri, setURI] = useState<string>("");
  const [selectedAction, setSelectedAction] = useState(actionsMarketDb[0]);
  const [inputValues, setInputValues] = useState<string[]>([]);
  const [showAction, setShowAction] = useState<boolean>(false);

  const handleActionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const actionName = e.target.value;
    const action = actionsMarketDb.find((act) => act.name === actionName);
    if (action) {
      setSelectedAction(action);
      setInputValues(Array(action.abi.length).fill(""));
    }
  };

  const handleInputChange = (index: number, value: string) => {
    setInputValues((values) => values.map((v, i) => (i === index ? value : v)));
  };

  const createPost = async () => {
    const encodedInitData = encodeAbiParameters(
      selectedAction.abi,
      inputValues
    );

    const actionModulesInitDatas = [encodedInitData];
    const actionModules = [uiConfig.openActionContractAddress];

    // Post parameters
    const args = {
      profileId: BigInt(profileId!),
      contentURI: uri,
      actionModules,
      actionModulesInitDatas,
      referenceModule: zeroAddress as `0x${string}`,
      referenceModuleInitData: "0x01" as `0x${string}`,
    };

    const calldata = encodeFunctionData({
      abi: lensHubAbi,
      functionName: "post",
      args: [args],
    });

    setCreateState("PENDING IN WALLET");
    try {
      const hash = await walletClient!.sendTransaction({
        to: uiConfig.lensHubProxyAddress,
        account: address,
        data: calldata,
      });
      setCreateState("PENDING IN MEMPOOL");
      setTxHash(hash);
      const result = await defaultClient().waitForTransactionReceipt({ hash });
      if (result.status === "success") {
        setCreateState("SUCCESS");
        refresh();
      } else {
        setCreateState("CREATE TXN REVERTED");
      }
    } catch (e) {
      setCreateState(`ERROR: ${e instanceof Error ? e.message : String(e)}`);
    }
  };

  return (
    <>
      {address && profileId && (
        <div className="pb-4">
          <div className="flex flex-1 flex-col">
            <p className="my-2">Content URI (link to content for the post)</p>
            <Input
              type="text"
              value={uri}
              placeholder="Content URI"
              onChange={(e) => setURI(e.target.value)}
            />
            {showAction && (
              <>
                <p className="my-3">Choose an Action</p>
                <select
                  value={selectedAction.name}
                  onChange={handleActionChange}
                  className="form-select block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                >
                  {actionsMarketDb.map((action) => (
                    <option key={action.name} value={action.name}>
                      {action.name}
                    </option>
                  ))}
                </select>
                <p className="my-4">Action arguments</p>
                {selectedAction.abi.map((input, index) => (
                  <Input
                    key={input.name}
                    placeholder={input.name}
                    // Assume only "string" or "uint256" for simplicity
                    type={input.type === "uint256" ? "number" : "text"}
                    value={inputValues[index]}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                  />
                ))}
              </>
            )}
            <Button className="my-3" onClick={() => setShowAction(true)}>
              Add an action
            </Button>
            <Button className="mt-3" onClick={createPost}>
              Create
            </Button>
          </div>
          {createState && <p className="create-state-text">{createState}</p>}
          {txHash && (
            <a
              href={`${uiConfig.blockExplorerLink}${txHash}`}
              className="block-explorer-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Block Explorer Link
            </a>
          )}
          <Button
            variant={"outline"}
            className="my-4"
            onClick={() => {
              setTxHash(undefined);
              setInputValues([]);
              setURI("");
              setCreateState(undefined);
            }}
          >
            Clear
          </Button>
        </div>
      )}
    </>
  );
};
