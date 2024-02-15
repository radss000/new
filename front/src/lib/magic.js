import { Magic } from "magic-sdk";
/* import { OAuthExtension } from "@magic-ext/oauth";
 */

const customNodeOptions = {
  rpcUrl: "https://polygon-rpc.com/", // Polygon RPC URL
  chainId: 137, // Polygon chain id
};

// Create client-side Magic instance
const createMagic = (key) => {
  return (
    typeof window != "undefined" &&
    new Magic(key, {
      network: customNodeOptions,
    })
  );
};

export const magic = createMagic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);

/*  const createWeb3Magic = (key) => {
  return (
    typeof window != "undefined" &&
    new Magic(key, {
       network: "mainnet", extensions: [new OAuthExtension()],
    })
  );
};



export const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY, {
  network: 'polygon', // connected to Polygon Mainnet!
});
 */
