console.log("dddddddddddd");
function go(){
  chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs){
    let url = tabs[0].url;
    console.log(url);
    if(url.startsWith("https://playentry.org/")){
      console.log("ieeee");
      if(url.split("#!/").length>1){
        if(url.split("#!/")[1].startsWith("my_project")){
          chrome.tabs.executeScript({file: "jquery.js"}, function(){
            chrome.tabs.executeScript({file: "ent.js"}, function(){
              chrome.tabs.executeScript({file: "index.js"}, function(){
                console.log("jj");
                chrome.tabs.insertCSS({file: "index.css"}, function(){
                  console.log("success");
                });
              });
            });
          });
        }
      }

    }
  });

}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  if (changeInfo.status == 'complete' && tab.active) {
    console.log("555");
    go();
    // do your things

  }

});

chrome.runtime.onStartup.addListener(function(){
  console.log("Wwwwweeqerqwedda");
  go();
});
