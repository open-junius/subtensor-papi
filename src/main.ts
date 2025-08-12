import { ethers } from 'ethers';
const URL = "https://lite.chain.opentensor.ai"
async function main() {
    const provider = new ethers.JsonRpcProvider(URL);
    const balance = await provider.getBalance("0xef395b0C8Dae290aFe48C0C05DC5e2B063E19771");
    console.log(balance);
}
main().catch(console.error);
