import { mainnet, MultiAddress } from '@polkadot-api/descriptors';
import { TypedApi, TxCallData, createClient } from 'polkadot-api';
import { getWsProvider } from 'polkadot-api/ws-provider/web';


const SUBTENSOR_MAINNET_ENDPOINT = 'wss://entrypoint-finney.opentensor.ai:443';

async function main() {
    const provider = getWsProvider(SUBTENSOR_MAINNET_ENDPOINT);
    const client = createClient(provider);

    // let client = await getClient()
    const api = client.getTypedApi(mainnet)

    const netuid = 39;

    const emission = await api.query.SubtensorModule.Emission.getValue(netuid);

    console.log(emission);
}

main().catch(console.error);
