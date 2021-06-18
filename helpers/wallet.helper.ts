import { Option } from "components/base/Select/NetworkSelect";
import { Contract, ethers, Signer } from "ethers"
import { ChainType, ChainTypes } from "interfaces";

export const mapSignerAsWallet = async (signer: Signer) => {
    return {
        address: await signer.getAddress(),
        balance: ethers.utils.formatEther(await signer.getBalance()),
        chainId: await signer.getChainId(),
        gasPrice: ethers.utils.formatEther(await signer.getGasPrice()),
        transactionCount: await signer.getTransactionCount(),
        signer
    }
}

const contractAbi = [
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "tokenOwner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "name": "transfer",
        "type": "function",
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "type": "uint256",
                "name": "_tokens"
            }
        ],
        "constant": false,
        "outputs": [],
        "payable": false
    }
];

export const getProviderBalance = async (signer: Signer, network: Option | null) => {
    if (!network) throw new Error('No network given')
    if (!signer) throw new Error('No signer given')
    const provider = ethers.providers.getDefaultProvider(network.value == ChainTypes.bep20 ? 'ropsten' : 'kovan')
    const contract = new Contract(network.tokenAddress, contractAbi, provider)
    const balance = await contract.balanceOf(await signer.getAddress());
    const readableBalance = ethers.utils.formatUnits(balance);
    console.log('readableBalance',readableBalance);    
    return readableBalance;
}
export const transfer = async (signer: Signer | null, network: Option | null, amount: number) => {
    if (!network) throw new Error('Give network to transfer')
    if (!signer) throw new Error('Give signer to transfer')

    const contract = new Contract(network.tokenAddress, contractAbi, signer)
    var numberOfDecimals = 18;
    var numberOfTokens = ethers.utils.parseUnits(amount.toString(), numberOfDecimals);

    // Send tokens
    try {
        return contract.transfer(network.bridgeAddress, numberOfTokens);
    } catch (error) {
        console.log(error.toString());
        throw new Error(error);
    }
}