import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Link } from "@chakra-ui/react"
import DashboardRow from "./DashboardRow"
import { TOKENS } from "../../constants"


export default function Dashboard() {
    return (
        <TableContainer>
            <Table variant='simple'>
                <TableCaption>To pay gas on the Polygon Mumbai chain, you will need Testnet Polygon MATIC. Visit the this faucet to obtain some: <Link color='green' isExternal href="https://mumbaifaucet.com/">https://mumbaifaucet.com/</Link></TableCaption>
                <Thead>
                    <Tr>
                        <Th>Asset</Th>
                        <Th>Balance</Th>
                        <Th>FundLock</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {TOKENS.map((token) => <DashboardRow key={token} address={token} />)}
                </Tbody>
            </Table>
        </TableContainer>

    )
}


