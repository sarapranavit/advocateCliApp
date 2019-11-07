const async=require('async');
const chalk=require('chalk');

console.log("Hereerr");

const display = (input,info,memid,jid,sid) => {

    console.log(chalk.blue("\nDisplay:"))
    console.log("Advocate Name:",memid);
	console.log("Here");

    if(input !=1 && input !=7){
        if(info[memid].State != undefined)
            console.log("Practicing State:",info[memid].State)

            if(info[memid].caseArr != undefined){
                let caseArr=info[memid].caseArr;
                async.eachOf(caseArr,(data,key,cb) => {
                    console.log("Practicing Cases:",caseArr[key].CaseID,"-",caseArr[key].CaseState)
                })
            }
        
            if(info[memid].blockList != undefined){
                let blockArr=info[memid].blockList;
                async.eachOf(blockArr,(data,key,cb) => {
                    console.log("Blacklist Cases:",blockArr[key].BlocklListId,"-",blockArr[key].BState)
                })
            }

        if(info[memid].jidArr != undefined){
            let juniorArr=info[memid].jidArr; 

            async.eachOf(juniorArr,(data,key,cb)=>{
                console.log("-Advocate Name:",juniorArr[key].JId)
              //  console.error("jArray",juniorArr[key]);
                if(juniorArr[key].Jstate !=undefined)
                console.log("-Practicing State:",juniorArr[key].Jstate);
            })         
        }
    }
    
   
    if(input == 7 && sid !=''){

        let arr=[];
        arr[memid]=[];
        
        if(info[memid].caseArr != undefined){
            let caseArr=info[memid].caseArr;
            async.eachOf(caseArr,(data,key,cb) => {
                console.log(sid,':');
                if(sid == caseArr[key].CaseState){
                    var caseid= caseArr[key].CaseID;
                    arr[memid].push(caseid); 
                }
            })
            if(arr.length > 0){
                let data=arr[memid].join(',')
                console.log(`${memid}:${data}`)
            }
        }       
    }
    
   console.log('\n');

}
module.exports= {
    display
}
