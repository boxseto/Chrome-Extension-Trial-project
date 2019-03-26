function toDataURL(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}

//****    Context Menu    *********************************************************
chrome.contextMenus.onClicked.addListener(function(item, tab){
    console.log(item);
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
      toDataURL(item.srcUrl, function(dataUrl) {
        chrome.tabs.executeScript(null, {
            code: "window.addEventListener('load', function() { var box = document.querySelector('#top-bar ul.top-bar-right.float-right.keep-visible li'); setTimeout(function(){ box.click(); setTimeout(function(){ var link = document.querySelectorAll('#anywhere-upload .upload-box-status-text a')[1]; setTimeout(function(){ link.click(); setTimeout(function(){ var text = document.querySelector('#fullscreen-modal-body textarea'); setTimeout(function(){ text.value = '" + item.srcUrl +  "'; setTimeout(function(){ var submit = document.querySelector('.btn-container button'); setTimeout(function(){ submit.click(); setTimeout(function(){ var img = new Image(); img.onload = function(){ setTimeout(function(){ var canvas = document.querySelectorAll('#original'); var tmp = canvas.length-1; var c = document.createElement('canvas'); c.width = img.width; c.height = img.height; c.setAttribute('id','original'); c.setAttribute('class','original'); c.setAttribute('style', 'display:none'); canvas[tmp].parentElement.replaceChild(c, canvas[tmp]); setTimeout(function(){c.getContext('2d').drawImage(img,0,0); console.log('finished drawn'); console.log(canvas);}, 200); }, 200); }; img.crossOrigin = 'Anonymous'; img.src = '" + dataUrl  + "'; }, 200); }, 200); },200); },200); },200); },200); },200); },200); });"
        });
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
