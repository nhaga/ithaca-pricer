import { useAccount, useNetwork, useContractRead, useToken, erc20ABI } from 'wagmi'
import { formatUnits } from 'viem'

type TokenAddress = Record<string, `0x${string}`>

const aUSDC: TokenAddress = {
  "Base Goerli": "0x254d06f33bDc5b8ee05b2ea472107E300226659A",
  "Polygon Mumbai": "0x2c852e740B62308c46DD29B982FBb650D063Bd07",
  "Goerli": "0x254d06f33bDc5b8ee05b2ea472107E300226659A"
}


function AUSDCBalance() {
  const { address: account } = useAccount()
  const { chain } = useNetwork()
  const { data: res } = useToken({ address: aUSDC[chain ? chain.name : "Base Goerli"] as `0x${string}` })
  const { data } = useContractRead({
    address: aUSDC[chain ? chain?.name : "Base Goerli"] as `0x${string}`,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [account as `0x${string}`],
    watch: true
  })


  return (
    <>
      {(chain && data) && formatUnits(data, res?.decimals as number)}
    </>
  )
}

export default AUSDCBalance