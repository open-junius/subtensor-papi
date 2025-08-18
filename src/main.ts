import { ethers } from 'ethers';
import { ISTAKING_V2_ADDRESS, IStakingV2ABI } from './staking';

import { hexToU8a } from "@polkadot/util";
import { blake2AsU8a, decodeAddress } from "@polkadot/util-crypto";

const URL = "https://lite.chain.opentensor.ai"
async function main() {
    const provider = new ethers.JsonRpcProvider(URL);
    const balance = await provider.getBalance("0xef395b0C8Dae290aFe48C0C05DC5e2B063E19771");
    console.log(balance);

    await getStakingContract()
}

async function getStakingContract() {
    const provider = new ethers.JsonRpcProvider(URL);
    const stakingContract = new ethers.Contract(ISTAKING_V2_ADDRESS, IStakingV2ABI, provider);
    // const balance = await stakingContract.getStake("0xef395b0C8Dae290aFe48C0C05DC5e2B063E19771", 1, 1000);

    const netuid = 2;
    const wallet = "0xfCf5D8a38197E52282ea5d5ff3f8d2FC15Da6bAd"
    const hotkey = "5C8Em1kDZi5rxgDN4zZtfoT7dUqJ7FFbTzS3yTP5GPgVUsn1"
    const coldkey = convertH160ToPublicKey(wallet)

    const contractAddress = "0x85b0E360BA736aD307492BcD4c5A3Fcf6771465a"

    console.log(coldkey)
    console.log(decodeAddress(hotkey))
    const stake = await stakingContract.getStake(decodeAddress(hotkey), coldkey, netuid);
    console.log(stake);

    const stake2 = await stakingContract.getStake(decodeAddress(hotkey), convertH160ToPublicKey(contractAddress), netuid);
    console.log(stake2);

    console.log(await provider.getBalance(contractAddress))
    console.log(await provider.getBalance(wallet))
}


export function convertH160ToPublicKey(ethAddress: string) {
    const prefix = "evm:";
    const prefixBytes = new TextEncoder().encode(prefix);
    const addressBytes = hexToU8a(
        ethAddress.startsWith("0x") ? ethAddress : `0x${ethAddress}`
    );
    const combined = new Uint8Array(prefixBytes.length + addressBytes.length);

    // Concatenate prefix and Ethereum address
    combined.set(prefixBytes);
    combined.set(addressBytes, prefixBytes.length);

    // Hash the combined data (the public key)
    const hash = blake2AsU8a(combined);
    return hash;
}


main().catch(console.error);


/*

0x477aa749b63cd7666c1656c0414ffc2540a1203b6c5119f4e89bc71be9cc1c63

0xfCf5D8a38197E52282ea5d5ff3f8d2FC15Da6bAd

0x85b0E360BA736aD307492BcD4c5A3Fcf6771465a

0xfCf5D8a38197E52282ea5d5ff3f8d2FC15Da6bAd




0x13c07f8e
02b1c3675e7d80b0a3c4bbb01584d09fa5cc4942b56b9a74dc077f759797fb0a
00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000989680570f7701656739385a945784a678702d62ad51d5ab87f56e42233648c0843fab




*/