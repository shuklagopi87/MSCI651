
var exec= require('child_process').exec,
    https = require('https'),
    http = require('http'),
    fs=require('fs')

   

https.get('https://spreadsheets.google.com/feeds/list/1wvXbbPwfI8KZwu_OhbH5-0DS3f9tcOcGxg5ITwgUS6c/1/public/values?alt=json'
, function(resp){
  var  data = '';

  resp.on('data', function(chunk){
    data += chunk;
  });

  resp.on('end', function() {
    check(JSON.parse(data).feed.entry.map(function(d){return d.gsx$url.$t}),function(result){
        fs.writeFileSync("result.json",JSON.stringify(result))
    })
  });

}).on("error", function(err) {
  console.log("Error: " + err.message);
});


    


function check(data,next){
    console.log(data[0])
    var res=[]
    checkall(data.slice(0,500),[],function(result){
      next(result)
    })
    
}
function checkall(alldata,result,next){
  console.log(alldata.length)
  //var res=[]
  var r=alldata.pop()
  if (r) {
    checkoneurl(r,function(d){
      result.push(d)
      checkall(alldata,result,next)
    })
  }
  else {
    next(result)
  }
}

function checkoneurl(url,next){
  console.log(url)
var e='curl -x http://lahore.wonderproxy.com:12000 --proxy-user "marcomerens:785NEWautomobile" -L "'+url+'" -o /dev/null -w "%{http_code}"'

//var e='curl -s -o /dev/null -w "%{http_code}" -x 124.109.53.100:8888 "'+url+'"'
exec(e, (err, stdout, stderr) => {
    console.log(stderr)
    console.log(err)
    next({url:url,result:{stdout:stdout,stderr:stderr,err:(err?JSON.stringify(err):"")}})
});
}


