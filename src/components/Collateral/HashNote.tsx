import { Button, Heading, Table, TableContainer, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react"
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'
import USYCTeller from '../../abis/USYCTeller.json'
import USDCBalance from "./USDCBalance"
import USYCDeposit from "./USYCDeposit"
import USYCBalance from "./USYCBalance"
import { useContractRead, useNetwork, useSwitchNetwork } from 'wagmi'

export default function HashNote() {
    const { chain } = useNetwork()
    const { isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()

    const { data: isOpen } = useContractRead({
        address: '0xE182E029462c848cfa0AdD4ceC2563306FA3a787',
        abi: USYCTeller,
        functionName: 'marketIsOpen',
        enabled: chain?.id == 5,
        watch: true
    })

    return (
        <>
            {chain?.id == 5 ?
                <>
                    <Heading as='h4' size='md' mt="20">
                        USYC (Hashnote)
                    </Heading>
                    {isOpen ?

                        <TableContainer>
                            <Table variant='simple'>
                                <Thead>
                                    <Tr>
                                        <Th>USDC</Th>
                                        <Th></Th>
                                        <Th>USYC</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td>
                                            <USDCBalance />
                                        </Td>
                                        <Td>
                                            <USYCDeposit />
                                        </Td>
                                        <Td>
                                            <USYCBalance />
                                        </Td>
                                    </Tr>

                                </Tbody>
                            </Table>
                        </TableContainer>

                        :

                        <Alert status='error'>
                            <AlertIcon />
                            <AlertTitle>Market is Closed!</AlertTitle>
                            <AlertDescription>
                                Deposits and Withdrawals can only be made when the market is open.

                            </AlertDescription>
                        </Alert>


                    }
                </> :
                <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>Wrong Network!</AlertTitle>
                    <AlertDescription>
                        Change network to
                        <Button mx="2"
                            onClick={() => switchNetwork?.(5)}
                        >
                            Goerli
                            {isLoading && pendingChainId === 5 && ' (switching)'}
                        </Button>

                        to use HashNote...

                    </AlertDescription>
                </Alert>
            }
        </>
    )
}
