import { fundLock } from "../../constants"
import { useAccount, useContractRead, useToken } from 'wagmi'
import { formatUnits } from 'viem'
import FundLock from '../../abis/FundLock.json'

interface RowProps {
    address: `0x${string}`
}


export default function FundLockBalance({ address }: RowProps) {
    const { address: account } = useAccount()
    const { data: res } = useToken({ address })
    const { data } = useContractRead({
        address: fundLock,
        abi: FundLock.abi,
        functionName: 'balanceSheet',
        args: [account, address],
        watch: true
    })



    return (
        // @ts-ignore
        <>{data && formatUnits(data, res?.decimals || 0)}</>
    )
}

