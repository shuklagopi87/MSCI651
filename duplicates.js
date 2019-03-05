function setduplicates() {
  
  // We initialize some variables on the current sheet
  var spreadsheet = SpreadsheetApp.getActive();
  var sh=spreadsheet.getSheets()
  var brokenlinks=[]
  var thisrow=SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getActiveCell().getRow()
  var thissheet=SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
  
  // We select all the sheets which contain URLs. All the names contain the text CH
  var chapters=sh.filter(function(d){
    var n=d.getName().toUpperCase()
    return (n.indexOf("CH")>=0)
  })
  // rs is ou JSON object where the URLs will be stored
  var rs={}
  chapters.forEach(function(sh){
    // No chapter has more than 100 URLs, so we limit the range to 100 lines. The first 4 lines contain headers. The URLs are in column 3
    var x=sh.getRange(4,3,100).getValues()
    x.forEach(function(line,i){
      var url=line[0].trim()
      if (url!=""&&url!="Resource Location") {
        // We try to open the ressource
        try {
        var response = UrlFetchApp.fetch(url);
          if (response.getResponseCode()!=200) { 
              // There was an error opening the ressource, so we put that URL in a brokenlink array
              brokenlinks.push({url:url,code:response.getResponseCode(),chapter:sh.getName(),line:4+i})
            }
          }
          catch (e){
            // There was an error opening the ressource, so we put that URL in a brokenlink array

            brokenlinks.push({url:url,code:-1,chapter:sh.getName(),line:4+i})
          }
        // We add the URL to our object rs. the URL is the key of the JSON object
        if (!rs[url]) {
          rs[url]=[{chapter:sh.getName(),line:4+i}]        
        }
        else {
          rs[url].push({chapter:sh.getName(),line:4+i})
        }
      }
    
    })
  
  })
  // We go through our URL object and write out the duplicates only
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
  // We go through our brokenlinks array and write them on the sheet them

      brokenlinks.forEach(function(d){
        thissheet.getRange(i,1).setValue("Broken Link")
        thissheet.getRange(i,2).setValue(d.line)
        thissheet.getRange(i,3).setValue(d.chapter)
        thissheet.getRange(i,4).setValue(d.url)
        i++
      })
// We clean the list as the previous list might have been longer
while (thissheet.getRange(i,1).getValue()!="") {
    thissheet.getRange(i,1).setValue("")
    thissheet.getRange(i,2).setValue("")
    thissheet.getRange(i,3).setValue("")
    thissheet.getRange(i,4).setValue("")
    i++
  }
  thissheet.getRange("B23").setValue(doubles)
  thissheet.getRange("B24").setValue(brokenlinks.length)


}
