import { ApiPromise, WsProvider } from '@polkadot/api';

// Subtensor mainnet WebSocket endpoint
const SUBTENSOR_MAINNET_ENDPOINT = 'wss://entrypoint-finney.opentensor.ai:443';

async function main(): Promise<void> {
    try {
        console.log('🔗 Connecting to Subtensor mainnet...');
        console.log(`📡 Endpoint: ${SUBTENSOR_MAINNET_ENDPOINT}`);

        // Create WebSocket provider
        const provider = new WsProvider(SUBTENSOR_MAINNET_ENDPOINT);

        // Create API instance
        const api = await ApiPromise.create({ provider });

        // Wait for the API to be ready
        await api.isReady;

        console.log('✅ Successfully connected to Subtensor mainnet!');

        // Get basic chain information
        const [chain, nodeName, nodeVersion] = await Promise.all([
            api.rpc.system.chain(),
            api.rpc.system.name(),
            api.rpc.system.version(),
        ]);

        console.log(`⛓️  Chain: ${chain}`);
        console.log(`🏷️  Node Name: ${nodeName}`);
        console.log(`📦 Node Version: ${nodeVersion}`);

        // Get latest block information
        const lastHeader = await api.rpc.chain.getHeader();
        console.log(`🏗️  Latest Block Number: ${lastHeader.number}`);
        console.log(`🔑 Latest Block Hash: ${lastHeader.hash.toHex()}`);

        // Get runtime version
        const runtimeVersion = await api.rpc.state.getRuntimeVersion();
        console.log(`🔧 Runtime Version: ${runtimeVersion.specName} v${runtimeVersion.specVersion}`);

        // Example: Get some basic network stats (if available)
        try {
            const totalIssuance = await api.query.balances?.totalIssuance();
            if (totalIssuance) {
                console.log(`💰 Total TAO Issuance: ${totalIssuance.toHuman()}`);
            }
        } catch (error) {
            console.log('ℹ️  Total issuance not available or not accessible');
        }

        console.log('\n🎉 Connection successful! You can now interact with the Subtensor network.');

    } catch (error) {
        console.error('❌ Failed to connect to Subtensor mainnet:', error);
        process.exit(1);
    }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n👋 Shutting down...');
    process.exit(0);
});

// Run the main function
if (require.main === module) {
    main().catch((error) => {
        console.error('💥 Unhandled error:', error);
        process.exit(1);
    });
}

export { main };