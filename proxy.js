
var exec= require('child_process').exec,
    https = require('https'),
    http = require('http'),
    fs=require('fs')

   
// We download all the ressources from the Google Sheet
https.get('https://spreadsheets.google.com/feeds/list/1wvXbbPwfI8KZwu_OhbH5-0DS3f9tcOcGxg5ITwgUS6c/1/public/values?alt=json'
, function(resp){
  var  data = '';

  resp.on('data', function(chunk){
    data += chunk;
  });

  resp.on('end', function() {
      // All the data is downloaded and is checked
      var thedata=JSON.parse(data).feed.entry.map(function(d){return d.gsx$url.$t})
    checkall(thedata,[],function(result){
        // The result is saved in a file
        fs.writeFileSync("result.json",JSON.stringify(result))
    })
  });

}).on("error", function(err) {
  console.log("Error: " + err.message);
});



function checkall(alldata,result,next){
    // alldata is an array of URLs. We take one URL
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
// We check the URL by executing curl using the proxy located in Lahore in Pakistan    
var e='curl -x http://lahore.wonderproxy.com:12000 --proxy-user "USERNAME:PASSWORD" -L "'+url+'" -o /dev/null -w "%{http_code}"'

exec(e, (err, stdout, stderr) => {
    console.log(stderr)
    console.log(err)
    // We store the result of the call and any errors which may have occurred
    next({url:url,result:{stdout:stdout,stderr:stderr,err:(err?JSON.stringify(err):"")}})
});
}


