/*
Required module
check before usage:

npm install eosjs
npm install node-fetch

*/
//--------------------------------Account requirement----------------------------------------------------//
/*
20 wax-Ram but in blok.io
4 wax of stake CPU in blok.io
*/
//--------------------------------Account requirement----------------------------------------------------//

//--------------------------------User Information Bar(Required to be filled)----------------------------------------------------//
let userPrivateKey = 'Enter Your Private Key'//Private key in String
let userAction = 'claimdrop' // what action does the user acts 
let userReferAccount = 'atomicdropsx' // Account that carries out the contract
let userClaimAccount = 'Enter Your Account name'// 'Enter the account name that received drop'  User Claim account in String
let userClaimDropId = 746//Claim id in number  link(https://wax.atomichub.io/drops/746)
let userClaimAmount = 1//Claim amount in number
//--------------------------------User Information Bar----------------------------------------------------//

//--------------------------------Timer----------------------------------------------------//

/*
while (true){
    var time_now = new Date();
    // new Date(year, month, day, hours, minutes, seconds, milliseconds)
    // 0 is january
    var buy_time = new Date(2021,0,25,11,43,0,0);
    console.log(time_now)
    if (time_now.getTime() == buy_time.getTime()){
      console.log(buy_time);
      console.log("yes")
      break
    }
  }
*/
//--------------------------------Timer----------------------------------------------------//




//--------------------------------Main----------------------------------------------------//

//const { time } = require('console');
const { Api, JsonRpc } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');  // development only
const fetch = require('node-fetch'); //node only
const { TextDecoder, TextEncoder } = require('util'); //node only

const privateKeys = [userPrivateKey];
const signatureProvider = new JsSignatureProvider(privateKeys);
const rpc = new JsonRpc('https://chain.wax.io', { fetch }); //required to read blockchain state
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() }); //required to submit transactions

//--------------------------------Function----------------------------------------------------//
api.transact({
  actions: [{
    account: userReferAccount,
    name: userAction,
    authorization: [{
      actor: userClaimAccount,
      permission: 'active',
    }],
    data: {
        claim_amount:userClaimAmount,
        claimer: userClaimAccount,
        country: 'MY',
        drop_id: userClaimDropId,
        intended_delphi_median:0,
        referrer:'atomichub',
      },
    }]
  }, {
  blocksBehind: 3,
  expireSeconds: 30,
  }).then((err, res) =>{
  if (err) console.log(err)
  if (res) console.log(require)
})
//--------------------------------Main----------------------------------------------------//
//--------------------------------Main----------------------------------------------------//