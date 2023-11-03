import { ConnectButton } from '@rainbow-me/rainbowkit';
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button, Box } from "@chakra-ui/react"
import AUSDCBalance from './AUSDCBalance';
import { useContractWrite } from 'wagmi'
import FundLockGateway from '../../abis/FundLockGateway.json';
import { parseUnits, parseEther } from 'viem';
import CrosschainDepositStatus from './CrosschainDepositStatus';
import { useState } from 'react';

export default function CrosschainDeposit() {
    const [txHash, setTxHash] = useState<string>('')

    const { write } = useContractWrite({
        address: "0xc25b5CfCb909885C48038F7b844E8084C7614236",
        abi: FundLockGateway.abi,
        functionName: 'deposit',
        args: ["aUSDC", parseUnits('0.001', 6)],
        value: parseEther('0.00005'),
        onSuccess(data) {
            setTxHash(data.hash)
            console.log('Success', data)
        },
    })

    return (
        <>
            <TableContainer mt="10">
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Chain</Th>
                            <Th>aUSDC Balance</Th>
                            <Th>FundLock Balance</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>
                                <ConnectButton accountStatus="address" showBalance={false} chainStatus="icon" />

                            </Td>
                            <Td>
                                <AUSDCBalance />
                            </Td>
                            <Td></Td>
                            <Td><Button size="sm" onClick={() => write()} colorScheme='green'>Deposit</Button></Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>

            <Box py="10">
                <CrosschainDepositStatus txHash={txHash} />
            </Box>
        </>
    )
}

