import { Button, TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Link } from "@chakra-ui/react"
import FaucetRow from "./FaucetRow"
import { useNetwork, useSwitchNetwork } from 'wagmi'
import { deploymentChain } from "../../constants"

import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'

// MUMBAI: const TOKENS: `0x${string}`[] = ["0xFE5DAfAe7f0D3e08c4A312dA890B554f621ed472", "0xEa1058616F573cf9fCdC23707a3Ae7608D8565dc"]
const TOKENS: `0x${string}`[] = ["0x5C96109D6535e8AD49189950aeE836b84A1Bc10B", "0x43aeb2B2bC97D32D3e5418b4441225a164eB3726"]

export default function Faucet() {
    const { chain } = useNetwork()
    const { isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()
    return (
        <>
            {chain?.id == deploymentChain ?
                <TableContainer>
                    <Table variant='simple'>
                        <TableCaption>To pay gas on the Polygon Mumbai chain, you will need Testnet Polygon MATIC. Visit the this faucet to obtain some: <Link color='green' isExternal href="https://mumbaifaucet.com/">https://mumbaifaucet.com/</Link></TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Asset</Th>
                                <Th>Wallet Balance</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {TOKENS.map((token) => <FaucetRow key={token} address={token} />)}
                        </Tbody>
                    </Table>
                </TableContainer>
                :
                <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>Wrong Network!</AlertTitle>
                    <AlertDescription>Change network to
                        <Button mx="2"
                            onClick={() => switchNetwork?.(deploymentChain)}
                        >
                            Arbitrum Goerli
                            {isLoading && pendingChainId === 5 && ' (switching)'}
                        </Button>
                        to use the Faucet...</AlertDescription>
                </Alert>


            }
        </>
    )
}
