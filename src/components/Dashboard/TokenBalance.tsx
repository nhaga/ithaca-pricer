import { erc20ABI, useAccount, useContractReads, useNetwork } from "wagmi"
import { deploymentChain } from "../../constants"
import { formatUnits } from 'viem'


interface RowProps {
    address: `0x${string}`
}

export default function TokenBalance({ address }: RowProps) {
    const { chain } = useNetwork()
    const { address: account } = useAccount()

    const contract = {
        address,
        abi: erc20ABI,
    }

    const { data } = useContractReads({
        contracts: [
            {
                ...contract,
                functionName: 'balanceOf',
                args: [account as `0x${string}`],
            },
            {
                ...contract,
                functionName: 'decimals',
            },


        ],
        enabled: chain?.id == deploymentChain,
        watch: true
    })


    return (
        <>
            {data && formatUnits(data[0]?.result || BigInt(0), data[1].result as number)}
        </>
    )
}

