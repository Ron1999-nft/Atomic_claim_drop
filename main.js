/*
Required module
check before usage:

npm install eosjs
npm install node-fetch

*/

//Account requirement

/*
20 wax-Ram but in blok.io
4 wax of stake CPU in blok.io
*/
//Account requirement

//User Information Bar(Required to be filled)
var userPrivateKey = "1"//Private key in String
var userAction = 'claimdrop' // what action does the user acts 
var userReferAccount = 'atomicdropsx' // Account that carries out the contract
var userClaimAccount// 'Enter the account name that received drop'  User Claim account in String
var userClaimDropId //Claim id in number  link(https://wax.atomichub.io/drops/2013)
var userClaimAmount //Claim amount in number
var userIntendedDelphiMedian //Intended delphi median can be check at link(https://wax.bloks.io/account/delphioracle?loadContract=true&tab=Tables&table=datapoints&account=delphioracle&scope=waxpusd&limit=10) 
var userCountry = "MY"//Country
var userReferrer = 'atomichub' //Refer to atomuvhub

// atomichub api
const { Api, JsonRpc } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');  // development only
const fetch = require('node-fetch'); //node only
const rpc = new JsonRpc('https://chain.wax.io', { fetch });
const { TextDecoder, TextEncoder } = require('util'); //node only

// file openning
var fs = require('fs')
const { exit } = require('process')

//Get Intended dewlphi Median
const  getIntMedian= () => rpc.get_table_rows({
  json: true,               // Get the response as json
  code: 'delphioracle',      // Contract that we target
  scope: 'waxpusd',         // Account that owns the data
  table: 'datapoints',        // Table name
  limit: 1,                // Maximum number of rows that we want to get
  reverse: false,           // Optional: Get reversed data
  show_payer: false          // Optional: Show ram payer
})

// Ask User about the drop
function mainBody(){
  fs.readFile('data.txt', (err, data) => {
  if (err) throw err;
  // file openning
  data = data.toString()
  let res = data.split('\r\n')
  let pk = res[0]
  let user = res[1]
  let did = res[2]
  let date = res[3]
  let time = res[4]
  let claimam = res[5]
  let delph = res[6]
  pk = pk.split(" :")
  user = user.split(" :")
  did = did.split(" :")
  date = date.split(" :")
  time = time.split(" :")
  claimam = claimam.split(" :")
  delph = delph.split(" :")
  userPrivateKey = pk[1]
  userClaimAccount = user[1]
  userClaimDropId = parseInt(did[1])
  date = date[1].split('/')
  let year = parseInt(date[2])
  let month = parseInt(date[1]) - 1
  let day = parseInt(date[0])
  time = time[1].split(":")
  let hour = parseInt(time[0])
  let minute = parseInt(time[1])
  userClaimAmount = parseInt(claimam[1])
  respond = delph[1]

  // Api
  const privateKeys = [userPrivateKey];
  const signatureProvider = new JsSignatureProvider(privateKeys);
  const rpc = new JsonRpc('https://chain.wax.io', { fetch }); //required to read blockchain state
  const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() }); //required to submit transactions
  
  // Reccurtion Claim
  let Claim = () => {
    api.transact({
      actions: [{
        account: userReferAccount,
        name: userAction,
        authorization: [{
          actor: userClaimAccount,
          permission: 'active',
        }],
        data: {
            claim_amount: userClaimAmount,
            claimer: userClaimAccount,
            country: userCountry,
            drop_id: userClaimDropId,
            intended_delphi_median: userIntendedDelphiMedian,
            referrer:userReferrer,
          },
        }]
      }, {
      blocksBehind: 3,
      expireSeconds: 30,
      }).then((res) =>{
        console.log(res)
        console.log('-----------------Sucess----------------------')
      }).catch((err) =>{ 
          console.log(err)
          console.log('-----------------Fail----------------------')
          Claim()
        })
  }

  //Timer
  // 13 second delay if Intended delphi median is needed
  var buy_time = new Date(year,month,day,hour,minute,0,0);
  if(respond=='Y'){
    // 8.1 second delay
    buy_time = buy_time - 8100
    buy_time = new Date(buy_time)
  }
  else if(respond=='N'){
    // 6 second delay 
    userIntendedDelphiMedian = 0
    buy_time = buy_time - 6000
    buy_time = new Date(buy_time)
  }

  while (true){
    var time_now = new Date();
    //exit()
    if (time_now.getTime() >= buy_time.getTime()){
      break
    }
  }

  if(respond=='Y'){
    getIntMedian().then((data) =>{
      userIntendedDelphiMedian = data['rows'][0]['median']
      Claim()
    })()
  }
  else if(respond=='N'){
    // claimdrop
    Claim()
  }
  })
}

//Run Code
mainBody()

// atomichub api
/*

const privateKeys = [userPrivateKey];
const signatureProvider = new JsSignatureProvider(privateKeys);
const rpc = new JsonRpc('https://chain.wax.io', { fetch }); //required to read blockchain state
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() }); //required to submit transactions
*/
//--------------------------------User Information Bar----------------------------------------------------//
//--------------------------------Timer----------------------------------------------------//
/*
while (true){
    var time_now = new Date();
    // new Date(year, month, day, hours, minutes, seconds, milliseconds)
    // 0 is january
    // Date(Year,month 0 = Jan,day,hour,minute,sec)
    var buy_time = new Date(2021,0,27,0,59,55,0);
    console.log(time_now.getFullYear()+'-'+(time_now.getMonth()+1)+'-'+ time_now.getDate()+ " & " + time_now.getHours() + ":" + time_now.getMinutes() + ":" + time_now.getSeconds());
    if (time_now.getTime() == buy_time.getTime()){
      console.log(buy_time.getFullYear()+'-'+(buy_time.getMonth()+1)+'-'+ buy_time.getDate()+ " & " + buy_time.getHours() + ":" + buy_time.getMinutes() + ":" + buy_time.getSeconds());
      console.log("yes")
      break
    }
  }
*/
//--------------------------------Timer----------------------------------------------------//

//--------------------------------Main----------------------------------------------------//

//--------------------------------Function----------------------------------------------------//
/*
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
        country: userCountry,
        drop_id: userClaimDropId,
        intended_delphi_median:userIntendedDelphiMedian,
        referrer:userReferrer,
      },
    }]
  }, {
  blocksBehind: 3,
  expireSeconds: 30,
  }).then((err, res) =>{
  if (err) console.log(err)
  if (res) console.log(require)
})
*/
//--------------------------------Function----------------------------------------------------//
//--------------------------------Main----------------------------------------------------//