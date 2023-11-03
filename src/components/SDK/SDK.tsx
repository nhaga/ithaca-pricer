// @ts-nocheck
import { IthacaSDK, IthacaNetwork } from '@ithaca-finance/sdk';
import { createPublicClient, http } from 'viem'
import { polygonMumbai } from 'viem/chains'
import { useState } from 'react';
import { Button } from '@chakra-ui/react';

const publicClient = createPublicClient({
    chain: polygonMumbai,
    transport: http()
})

// Read-Only mode
const ithacaSDK = IthacaSDK.init({
    network: IthacaNetwork.MUMBAI,
    publicClient // Refer: https://viem.sh/docs/clients/public.html
});

export default function SDK() {
    // const [contracts, setContracts] = useState([]);
    const [expiries, setExpiries] = useState([]);

    const getContract = () => {
        ithacaSDK.protocol.contractList().then((res) => {
            // setContracts(res);
            setExpiries([...new Set(res.map((contract) => contract.economics.expiry))])
        })
    }

    return (
        <>
            <Button onClick={getContract}>Get Expiries</Button>
            <div>{JSON.stringify(expiries)}</div>
        </>
    )
}

