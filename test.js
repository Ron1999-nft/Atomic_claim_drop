const { Api, JsonRpc } = require('eosjs');
const fetch = require('node-fetch'); //node only
const rpc = new JsonRpc('https://chain.wax.io', { fetch });

var a = 0;
async function doWork(){
    const data = await rpc.get_table_rows({
        json: true,               // Get the response as json
        code: 'delphioracle',      // Contract that we target
        scope: 'waxpusd',         // Account that owns the data
        table: 'datapoints',        // Table name
        limit: 1,                // Maximum number of rows that we want to get
        reverse: false,           // Optional: Get reversed data
        show_payer: false          // Optional: Show ram payer
    })
    return data['rows'][0]['median']
}

/*
a = doWork()
console.log(a)*/

(async () => {
    a = await doWork()
    console.log(a)
  })()