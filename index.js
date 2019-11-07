
const readline =require('readline');
const async=require('async');
//const chalk=require('chalk');
//const chalk =require('chalk');
//const log=console.log;
console.log("Hi");
const helper=require('./displayFunc');

const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout,
    prompt:'Input >'
});

//let aidState =[];


let inputDet ={}
let jidArr={}
let advocateId='';
let caseArr={}
let blockList={}
console.log("Test");
rl.prompt();

rl.on('line',(input) =>{

    switch(input.trim()){
        case '1': //Add Advocte
            rl.question('Add an advocate:',(aid) => {
                inputDet[aid]={
                    Id:aid
                }
                advocateId=aid;
                console.log(chalk.green(`Advocte Added ${aid}`));
                helper.display(input,inputDet,advocateId);
                
                rl.prompt();
            })
            break;
        case '2': //Add Junior Advocate
            rl.question('Senior Advcote ID:',(aid) => {
                rl.question('Junior ID:',(jid) =>{
                    jidArr[jid] ={
                        JId:jid
                    }
                    inputDet[aid].jidArr=jidArr;
                    console.log(chalk.green(`Advocate Added ${jid} under ${aid}`));
                    helper.display(input,inputDet,aid,jid);
                    rl.prompt();
                })
            })
            break;
        case '3': //Practicing State
                rl.question('Advocate ID:',(aid) => {
                    rl.question('Practicing State:',(aidState) =>{
                        aidState=aidState.toUpperCase()
                        if(aid == advocateId){
                            inputDet[aid].State=aidState;
                        }else{
                            
                            //console.log("inputDet",inputDet);

                            if(inputDet[advocateId].State != aidState){
                                jidArr[aid].Jstate=inputDet[advocateId].State;
                                console.log(`Cannot Add ${aidState} for ${aid}`);
                            }else{
                                jidArr[aid].Jstate=aidState;
                                console.log(`State Added ${aidState} for ${aid}`);
                            }
                        } 
                        
                        helper.display(input,inputDet,advocateId);
                       rl.prompt();
                    })
                })
                break; 
        case '4' : // Add case
                rl.question('Advocate ID:',(aid) =>{
                    rl.question('Case ID:',(cid) => {
                        rl.question('Practicing State:',(cidState) => {
                            cidState=cidState.toUpperCase();
                            if(aid == advocateId){
                                caseArr[cid] ={
                                    CaseID:cid,
                                    CaseState:cidState
                                }
                                inputDet[aid].caseArr = caseArr;
                               // inputDet[aid].CaseState=cidState
                            }
                            /*else{
                                jidArr[aid].Case=cid;
                              jidArr[aid].CaseState=cidState;
                            } */
                            console.log(`Case ${cid} Added for ${aid}`);
                            helper.display(input,inputDet,advocateId);
                            rl.prompt();
                        })
                    })
                })
                break;
        case '5' : // BLock List case
            rl.question('Advocate ID:',(aid) =>{
                rl.question('Case ID:',(bid) => {
                    if(aid == advocateId){
                            rl.question('Practicing State:',(bidState) => {
                                bidState=bidState.toUpperCase();
                                blockList[bid]={
                                    BlocklListId:bid,
                                    BState:bidState
                                }
                                inputDet[aid].blockList=blockList;
                                console.log(`Case ${bid} is added in Block list for ${aid}`);
                                helper.display(input,inputDet,advocateId);
                               
                                rl.prompt();
                            })
                        }else{
                            if(inputDet[advocateId].blockList != undefined){
                                let blockArr=inputDet[advocateId].blockList;
                                async.eachOf(blockArr,(data,key,cb) => {
                                    if(key==bid){
                                        console.log(`Cannot add ${bid} case under ${aid}`);
                                        rl.prompt();
                                    }else{
                                        rl.question('Practicing State:',(bidState) => {
                                            blockList[bid]={
                                                BlocklListId:bid,
                                                BState:bidState
                                            }
                                            inputDet[aid].blockList=blockList;
                                            console.log(`Case ${bid} is added in Block list for ${aid}`);
                                            helper.display(input,inputDet,advocateId);
                                            rl.prompt();
                                        })
                                    }
                                })
                            }
                        }
                })
             })
             break;
             case '6': //List all advocate
                    helper.display(input,inputDet,advocateId);
                    rl.prompt();
                    break;
            case '7': //List all advocate based on input state
                    rl.question('State ID:',(sid) =>{
                        helper.display(input,inputDet,advocateId,'',sid.toUpperCase());
                        rl.prompt();
                    })
                    break;
            default:
                console.log("Please enter valid input...");
                rl.prompt();
                break;
    }

})
