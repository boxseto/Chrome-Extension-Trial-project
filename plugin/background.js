//****    Context Menu    *********************************************************
chrome.contextMenus.onClicked.addListener(function(item, tab){
  //fetch URL
  var url;
  chrome.storage.sync.get('cheURL', function(result){
    if(result.cheURL == undefined){
      //set to default
      url = "http://localhost/";
      chrome.storage.sync.set({'cheURL' : url });
    }else{
      url = "http://" + result.cheURL;
    }
    //access url
    chrome.tabs.create({url: url}, function(tab){
        chrome.tabs.executeScript(null, {
          code: "if(document.readyState !== 'loading'){CHV.fn.uploader.toggle();CHV.fn.uploader.add(null, '"+ item.srcUrl +"');}else{document.addEventListener('DOMContentLoaded', function() {CHV.fn.uploader.toggle();CHV.fn.uploader.add(null, '"+ item.srcUrl +"');});}"
        });
    });
  });
});

//add context menu
chrome.runtime.onInstalled.addListener(function(){
  chrome.contextMenus.create({
    "id": "csci4140",
    "title": "Upload to Chevereto",
    "type": "normal",
    "contexts": ["image"],
  });
});

chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tab){
  //fetch URL
  var url;
  chrome.storage.sync.get('cheURL', function(result){
    if(result.cheURL == undefined){
      //set to default
      url = "localhost/";
      chrome.storage.sync.set({'cheURL' : url });
    }else{
      url = result.cheURL;
    }
    //see url
    if(tab.url.indexOf(url) != -1 && changeInfo.status == 'complete'){
      //chrome.tabs.executeScript(null, {
      //  code: "alert('hi');"
      //});
    }
  });
});
