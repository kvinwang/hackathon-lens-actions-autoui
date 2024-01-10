
import { getContract } from "viem";
import { defaultClient } from "@/main";
import { moduleOpenActionAbi } from "./moduleOpenActionAbi";

export async function fetchModuleMetadata(address: `0x${string}`) {
    const contract = getContract({
        address,
        abi: moduleOpenActionAbi,
        publicClient: defaultClient(),
    });
    const metadataUri = await contract.read.getModuleMetadataURI();

    return metadataUri;
}
