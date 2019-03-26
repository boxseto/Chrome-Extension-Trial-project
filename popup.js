function initialize_popup(){
  //settings
  var settings = document.getElementById('settings');
  settings.addEventListener("click", function() {
    chrome.tabs.create({ 'url': 'chrome://extensions/?options=' + chrome.runtime.id});
  });
  //url
  var url = document.getElementById("url");
  chrome.storage.sync.get('cheURL', function(result){
    if(result.cheURL == undefined){
      //set to default
      url.value = "localhost/";
      chrome.storage.sync.set({'cheURL' : url.value });
    }else{
      url.value = result.cheURL;
    }
    console.log('URL to chevereto is "' + result.cheURL + '"');
  });

  //url_save
  var url_save = document.getElementById("url_save");
  url_save.addEventListener("click", function(){
    chrome.storage.sync.set({'cheURL' : url.value }, function(){
      alert('URL to chevereto is "' + url.value + '"');
    });
  });
}


document.addEventListener('DOMContentLoaded', function() {
    initialize_popup();
});
