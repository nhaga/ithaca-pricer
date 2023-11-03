import { useState } from "react"
import { Box, Button, Stack, Stepper, Step, StepIndicator, StepStatus, StepIcon, StepSeparator, useSteps, StepNumber, StepDescription } from "@chakra-ui/react"
import {
    AxelarGMPRecoveryAPI,
    GMPStatusResponse,
    Environment,
} from "@axelar-network/axelarjs-sdk"

const steps = [
    { title: '0', description: 'Sent' },
    { title: '1', description: 'Sent' },
    { title: '2', description: 'Gas Paid' },
    { title: '3', description: 'Express' },
    { title: '4', description: 'Confirmed' },
    { title: '5', description: 'Approved' },
    { title: '6', description: 'Executed' },
]

const sdk = new AxelarGMPRecoveryAPI({
    environment: Environment.TESTNET,
});

interface CrosschainDepositStatusProps {
    txHash: string
}

export default function CrosschainDepositStatus({ txHash }: CrosschainDepositStatusProps) {
    const [status, setStatus] = useState<GMPStatusResponse>();
    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length,
    })

    const getStatus = async () => {
        // const txHash: string = "0x6bf91d57e54ecac18346a658a7d6cd6ac184c2ae6c15eb8787b8d9e3c7a6bdbd";
        const txStatus: GMPStatusResponse = await sdk.queryTransactionStatus(txHash);

        const statusSteps: Record<string, number> = {
            "source_gateway_called": 1,
            "destination_gateway_approved": 2,
            "Express": 3,
            "Confirmed": 4,
            "Approved": 5,
            "destination_executed": 6
        }
        console.log(txStatus.status)
        setActiveStep(statusSteps[txStatus.status])
        setStatus(txStatus);
    }

    // const activeStepText = steps[activeStep].description


    return (
        <>
            {txHash && <>
                <Box>
                    <Button size="xs" onClick={() => getStatus()} colorScheme='green'>Refresh Status</Button>

                </Box>
                <Box maxW="4xl" mt="2" p="10" border={"1px"} rounded={"lg"} color={"green.400"}>
                    <Stack>
                        <Stepper size='sm' index={activeStep} colorScheme='green'>
                            {steps.map((step, index) => (
                                <Step key={index}>
                                    <StepIndicator>
                                        <StepStatus

                                            complete={<StepIcon />}
                                            incomplete={<StepNumber />}
                                            active={<StepNumber />}
                                        />
                                    </StepIndicator>
                                    <StepDescription>{step.description}</StepDescription>
                                    <StepSeparator />

                                </Step>
                            ))}
                        </Stepper>
                    </Stack>
                </Box>
                <Box fontSize={'xs'}>
                    {JSON.stringify(status)}


                </Box>
            </>
            }
        </>
    )
}
