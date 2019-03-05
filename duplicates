function setduplicates() {
  
  var spreadsheet = SpreadsheetApp.getActive();
  var sh=spreadsheet.getSheets()
  var brokenlinks=[]
  var thisrow=SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getActiveCell().getRow()
  var thissheet=SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
  var chapters=sh.filter(function(d){
    var n=d.getName().toUpperCase()
    return (n.indexOf("CH")>=0)
  })
  var rs={}
  chapters.forEach(function(sh){
    var x=sh.getRange(4,3,100).getValues()
    x.forEach(function(line,i){
      var url=line[0].trim()
      if (url!=""&&url!="Resource Location") {
        try {
        var response = UrlFetchApp.fetch(url);
          if (response.getResponseCode()!=200) 
            brokenlinks.push({url:url,code:response.getResponseCode(),chapter:sh.getName(),line:4+i})
          }
          catch (e){
          brokenlinks.push({url:url,code:-1,chapter:sh.getName(),line:4+i})
          }
        if (!rs[url]) {
          rs[url]=[{chapter:sh.getName(),line:4+i}]        
        }
        else {
          rs[url].push({chapter:sh.getName(),line:4+i})
        }
      }
    
    })
  
  })
  //Logger.log(ressources.length)
  //Logger.log(doubles.length)
  var doubles=0,i=26
  for (key in rs) {
    var r=rs[key]
    if (r.length>1) {
      doubles+=r.length-1
      r.forEach(function(d){
        thissheet.getRange(i,1).setValue("Duplicate")
        thissheet.getRange(i,2).setValue(d.line)
        thissheet.getRange(i,3).setValue(d.chapter)
        thissheet.getRange(i,4).setValue(key)
        i++
      })

      }
  }
      brokenlinks.forEach(function(d){
        thissheet.getRange(i,1).setValue("Broken Link")
        thissheet.getRange(i,2).setValue(d.line)
        thissheet.getRange(i,3).setValue(d.chapter)
        thissheet.getRange(i,4).setValue(d.url)
        i++
      })

while (thissheet.getRange(i,1).getValue()!="") {
    thissheet.getRange(i,1).setValue("")
    thissheet.getRange(i,2).setValue("")
    thissheet.getRange(i,3).setValue("")
    thissheet.getRange(i,4).setValue("")
    i++
  }
  thissheet.getRange("B23").setValue(doubles)
  thissheet.getRange("B24").setValue(brokenlinks.length)

  //Logger.log(doubles)
  //return(doubles)
}
