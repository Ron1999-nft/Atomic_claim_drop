const { Api, JsonRpc } = require('eosjs');
const fetch = require('node-fetch'); //node only
const rpc = new JsonRpc('https://chain.wax.io', { fetch });

let a = rpc.get_table_rows({
        json: true,               // Get the response as json
        code: 'delphioracle',      // Contract that we target
        scope: 'waxpusd',         // Account that owns the data
        table: 'datapoints',        // Table name
        limit: 10,                // Maximum number of rows that we want to get
        reverse: false,           // Optional: Get reversed data
        show_payer: false          // Optional: Show ram payer
})

console.log(a)
