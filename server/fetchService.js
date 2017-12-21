let jsonfile = require('jsonfile');
let DBPATH = __dirname+"/data/data.json";
let ChainTask = require('task-chain').ChainTask;
let ChainTaskRunner = require('task-chain').ChainTaskRunner;
let chainTaskRunner = new ChainTaskRunner();
let GetHTMLContent = require('./GetHTMLContent');
function triggerFetch(callback){
    let stored = jsonfile.readFileSync(DBPATH);
    console.log("1");
    stored.forEach((item, index)=>{
        console.log("2");
        let stock = item.stock;
        let now = Date.parse(new Date());
        let url = `https://gupiao.baidu.com/api/stocks/stockdaybar?from=pc&os_ver=1&cuid=xxx&vv=100&format=json&stock_code=${stock}&step=3&start=&count=365&fq_type=front&timestamp=${now}`;
        console.log(url);
        let task = new ChainTask(()=>{
            GetHTMLContent.downloadHttps(url, (response, err)=>{
                let res = JSON.parse(response);
                item.current = res.mashData[0].kline.close;
                if(res.mashData[0].kline.high < res.mashData[1].kline.high && res.mashData[0].kline.low < res.mashData[1].kline.low){
                    item.isHeaderHappened = true;
                }
                stored[index] = item;
                console.log(err);
                setTimeout(()=>{
                    if(index == stored.length-1){
                        callback(stored);
                    }
                    task.end();
                }, 50);
            });
        });
        chainTaskRunner.addTask(task);
    });
}

module.exports.triggerFetch = triggerFetch;