import { useAccount, useContractRead, useContractWrite, useToken, erc20ABI } from 'wagmi'
import { Button } from '@chakra-ui/react'
import FundLock from '../../abis/FundLock.json'
import { fundLock, tokenManager } from "../../constants"
import { parseUnits } from 'viem'

interface RowProps {
  address: `0x${string}`
}


function FundlockDeposit({ address }: RowProps) {
  const { address: account } = useAccount()
  const { data: res } = useToken({ address })

  const { data: allowance } = useContractRead({
    address,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [account || "0x", tokenManager],
    watch: true
  })


  const { write } = useContractWrite({
    address: fundLock,
    abi: FundLock.abi,
    functionName: 'deposit',
    args: [address, parseUnits('500', res?.decimals as number)],
  })


  const { write: approve } = useContractWrite({
    address,
    abi: erc20ABI,
    functionName: 'approve',
    args: [tokenManager, parseUnits('1000000000000000', res?.decimals || 6)],
  })


  return (<>
    {allowance && allowance > 0 ?
      <Button colorScheme='green' onClick={() => write()}>Deposit</Button> :
      <Button colorScheme='green' onClick={() => approve()}>Approve</Button>}

  </>
  )
}

export default FundlockDeposit