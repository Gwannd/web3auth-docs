import { chainIdMap, rpcTargetMap } from "./maps";

export const getConstructorCode = (chain: "sol" | "starkex" | "starknet" | "tezos", isWhiteLabled: boolean) => {
  let chainDetails = ``;
  let uiConfig = ``;

  if (isWhiteLabled) {
    uiConfig = `
        uiConfig: {
          theme: "dark",
          loginMethodsOrder: ["facebook", "google"],
          appLogo: "https://web3auth.io/images/w3a-L-Favicon-1.svg", // Your App Logo Here
        }`;
  }

  if (chain === "sol") {
    chainDetails = `
          chainNamespace: CHAIN_NAMESPACES.SOLANA,
          chainId: "0x1", // Please use 0x1 for Mainnet, 0x2 for Testnet, 0x3 for Devnet
          rpcTarget: "${rpcTargetMap[chain]}", // This is the public RPC we have added, please pass on your own endpoint while creating an app`;
  } else if (chain === "starkex" || chain === "starknet" || chain === "tezos") {
    chainDetails = `
          chainNamespace: CHAIN_NAMESPACES.OTHER`;
  } else {
    chainDetails = `
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "${chainIdMap[chain]}",
          rpcTarget: "${rpcTargetMap[chain]}", // This is the public RPC we have added, please pass on your own endpoint while creating an app`;
  }

  const code = `
      const web3auth = new Web3Auth({
        clientId,
        chainConfig: {${chainDetails}
        },${uiConfig}
      });`;

  return code;
};
