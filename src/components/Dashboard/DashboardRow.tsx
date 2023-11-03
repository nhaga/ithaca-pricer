import {
    Tr,
    Td,
    HStack
} from '@chakra-ui/react'
import { deploymentChain } from "../../constants"
import { useNetwork, useToken } from 'wagmi'
import TokenBalance from './TokenBalance'
import FundLockBalance from './FundLockBalance'
import FundlockDeposit from './FundlockDeposit'
import FaucetButton from './FaucetButton'

interface RowProps {
    address: `0x${string}`
}

export default function DashboardRow({ address }: RowProps) {
    const { chain } = useNetwork()

    const { data: res } = useToken({
        address,
        enabled: chain?.id == deploymentChain,
    })

    return (
        <Tr>
            <Td>{res && res.symbol}</Td>
            <Td>
                <HStack>
                    <TokenBalance address={address} />
                    <FaucetButton address={address} />

                </HStack>
            </Td>
            <Td><FundLockBalance address={address} /></Td>
            <Td>
                <FundlockDeposit address={address} />

            </Td>
        </Tr>
    )
}

