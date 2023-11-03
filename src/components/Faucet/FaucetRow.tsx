import {
  Tr,
  Td,
  Button
} from '@chakra-ui/react'
import { useAccount, useContractRead, erc20ABI, useToken, useContractWrite } from 'wagmi'
import { formatUnits, parseUnits } from 'viem'
import Token from '../../abis/Token.json'
import { useNetwork } from 'wagmi'
import { deploymentChain } from '../../constants'

interface FaucetProps {
  address: `0x${string}`
}

function FaucetRow({ address }: FaucetProps) {
  const { chain } = useNetwork()
  const { address: account } = useAccount()

  const { data: res } = useToken({
    address,
    enabled: chain?.id == deploymentChain,
  })

  const { data } = useContractRead({
    address,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [account as `0x${string}`],
    enabled: chain?.id == deploymentChain,
    watch: true
  })

  const { write } = useContractWrite({
    address,
    abi: Token.abi,
    functionName: 'mint',
    args: [account, parseUnits('1000', res?.decimals as number)],
  })

  return (
    <Tr>
      <Td>{res && res.symbol}</Td>
      <Td>{data ? formatUnits(data, res?.decimals as number) : <></>}</Td>
      <Td>
        <Button size="xs" onClick={() => write()} colorScheme='green'>Get Tokens</Button>
      </Td>
    </Tr>
  )
}

export default FaucetRow