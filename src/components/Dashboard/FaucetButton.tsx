import {
    Button
} from '@chakra-ui/react'
import { deploymentChain } from '../../constants'
import { useNetwork, useToken, useContractWrite, useAccount } from 'wagmi'
import Token from '../../abis/Token.json'
import { parseUnits } from 'viem'

interface RowProps {
    address: `0x${string}`
}


export default function FaucetButton({ address }: RowProps) {
    const { address: account } = useAccount()
    const { chain } = useNetwork()

    const { data: res } = useToken({
        address,
        enabled: chain?.id == deploymentChain,
    })


    const { write } = useContractWrite({
        address,
        abi: Token.abi,
        functionName: 'mint',
        args: [account, parseUnits('1000', res?.decimals as number)],
    })


    return (
        <Button size="xs" onClick={() => write()} colorScheme='green'>Faucet</Button>
    )
}

