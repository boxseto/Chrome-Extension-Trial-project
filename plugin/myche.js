//TODO: add image to CHV.fn.uploader.files
//use CHV.fn.submit_image_edit
//use CHV.fn.before_image_edit
//CHV.fn.uploader.files
//
//
function apply_camanJS(filter, canvas){
  Caman(canvas, function(){
    this.revert();
    this.brightness(parseInt(filter[0].value));
    this.contrast(parseInt(filter[1].value));
    this.saturation(parseInt(filter[2].value));
    this.vibrance(parseInt(filter[3].value));
    this.exposure(parseInt(filter[4].value));
    this.render();
  });
}

function modal_create(file_index){
    console.log("calling modal... for file index: " + file_index);
  file_index--;
  //create modal
  var modal = document.createElement("div");
  modal.setAttribute("id","fullscreen-modal");
  modal.setAttribute("class","fullscreen soft-black");
  modal.setAttribute("style","display: block; opacity: 1");
  modal.setAttribute("style","display: block; opacity: 1");
  modal.innerHTML = '<div id="fullscreen-modal-box" class="clickable" style="transform: scale(1); opacity: 1; transition: all 250ms ease 0s;"><div id="fullscreen-modal-body"> <span class="modal-box-title">Edit image</span> <hr> <div class="modal-form"> <div class="image-preview"> <canvas class="canvas" id="canvas" width="512" height="512"></canvas> </div> <div id="Filters"> <div class="Filter"> <div class="FilterName"> <p>brightness</p> </div> <div class="FilterSetting"> <input type="range" min="-100" max="100" step="1" value="0"data-filter="brightness"> <span class="FilterValue">0</span> </div> </div> <div class="Filter"> <div class="FilterName"> <p>contrast</p> </div> <div class="FilterSetting"> <input type="range" min="-100" max="100" step="1" value="0" data-filter="contrast"> <span class="FilterValue">0</span> </div> </div> <div class="Filter"> <div class="FilterName"> <p>saturation</p> </div> <div class="FilterSetting"> <input type="range" min="-100" max="100" step="1" value="0" data-filter="saturation"> <span class="FilterValue">0</span> </div> </div> <div class="Filter"> <div class="FilterName"> <p>vibrance</p> </div> <div class="FilterSetting"> <input type="range" min="-100" max="100" step="1" value="0" data-filter="vibrance"> <span class="FilterValue">0</span> </div> </div> <div class="Filter"> <div class="FilterName"> <p>exposure</p> </div> <div class="FilterSetting"> <input type="range" min="-100" max="100" step="1" value="0" data-filter="exposure"> <span class="FilterValue">0</span> </div> </div> <div class="Clear"></div> </div> </div> </div> <div class="btn-container"> <button class="btn btn-input default" id="submitCaman" >Done</button> <button class="btn btn-input default" id="resetCaman" >Original Image</button> <button class="btn btn-input default" id="cancelCaman" >Cancel</button> <span class="btn-alt"></span> </div> <span class="close-modal icon-close" data-action="close-modal"></span> </div>';
  modal.querySelector('.close-modal').addEventListener("click", function(){
    modal.remove();
  });

  //manage modal
  //get image file
  var file_nodes = document.querySelectorAll(".preview .canvas");
  //get canvas
  var c = modal.querySelector(".canvas");

  //put photo
  c.width = file_nodes[file_index].width;
  c.height = file_nodes[file_index].height;
  c.getContext('2d').drawImage(file_nodes[file_index],0,0);

  //make modal show
  document.body.append(modal);

  //filter action
  var filter_list = document.querySelectorAll(".FilterSetting input");
  filter_list.forEach(function(element){
    element.addEventListener("change", function(event){
      event.target.nextElementSibling.innerHTML = event.target.value;
      apply_camanJS(filter_list, modal.querySelector(".canvas"));
    });
  });

  //submit
  var submit_caman = document.querySelector("#submitCaman");
  submit_caman.addEventListener("click", function(event){
    //var submittor = modal.createElement('script');
    //submittor.innerHTML = '';
    file_nodes[file_index].getContext('2d').drawImage(c,0,0);
    modal.remove();
  });
  //reset
  var reset_caman = document.querySelector("#resetCaman");
  reset_caman.addEventListener("click", function(event){
    filter_list.forEach(function(element){
      element.value = 0;
      var event = new Event('change');
      element.dispatchEvent(event);
    });
    //apply_camanJS(filter_list, modal.querySelector(".canvas"));
  });
  //cancel
  var cancel_caman = document.querySelector("#cancelCaman");
  cancel_caman.addEventListener("click", function(event){
    modal.remove();
  });
}

function load_original(i){
  /* load from CHV.fn.uploader.files
  var scriptor = document.createElement('script');
  scriptor.innerHTML = ' var item_list = document.querySelectorAll(\'.queue-item #original\'); item_list.forEach(function(element, i){ var reader = new FileReader(); reader.readAsDataURL(CHV.fn.uploader.files[i]); reader.onload = function(event){ if(event.target.readyState == FileReader.DONE){ var img = new Image(); img.src = event.target.result; img.onload = function(){ var canvas = element.getContext("2d"); canvas.height = parseInt(img.height); canvas.width = parseInt(img.width); canvas.drawImage(img,0,0); } } } });';
  document.body.append(scriptor);
  */
    console.log(i);
  var original = document.querySelectorAll("#original");
  var preview = original[i].closest('li').querySelector('.canvas');
  original[i].width = preview.originalWidth;
  original[i].height = preview.originalHeight;
  original[i].getContext('2d').drawImage(preview,0,0);
}

function initialize_crawler(){
  //to be observed
  var upload_queue = document.querySelector("#anywhere-upload-queue");
  //config of observer
  var config = {childList: true};
  //callback
  var modify_callback = function(mutationsList, observer) {
    for(var i = 0 ; i < mutationsList[0].target.childElementCount ; i++){
      var item = mutationsList[0].target.children[i].querySelectorAll('#editCamanJS');
      if(item.length == 0){//has to append node
        //create
        var camanJSnode = document.createElement("div");
        camanJSnode.setAttribute("class","edit");
        camanJSnode.setAttribute("style","background: #00FF00");
        camanJSnode.setAttribute("title","Edit Image with CamanJS");
        camanJSnode.setAttribute("id","editCamanJS");
        var nodespan = document.createElement("span");
        nodespan.setAttribute("class","icon icon-edit");
        camanJSnode.appendChild(nodespan);
        var canvas = document.createElement('canvas');
        canvas.setAttribute("id","original");
        canvas.setAttribute("class","original");
        canvas.setAttribute("style","display: none;");
        camanJSnode.appendChild(canvas);
        //add eventlistener
        camanJSnode.addEventListener("click", function(){
          //load_original(i);
          modal_create(i);
        });
        //append
        mutationsList[0].target.children[i].appendChild(camanJSnode);
      }
    }
  };
  //add observer
  var modify_observer = new MutationObserver(modify_callback);
  modify_observer.observe(upload_queue, config);
}

function fetchURL(){
  var url = "localhost/";
  chrome.storage.sync.get('cheURL', function(result){
    if(result.cheURL == undefined){
      chrome.storage.sync.set({'cheURL' : url });
    }else{
      url = result.cheURL;
    }
    console.log("url set is..."+url);
    if(window.location.href.includes(url)){
      initialize_crawler();
    }
  });
}

//****    main    *************************************************
//check load function
if(document.readyState !== 'loading'){
  fetchURL();
  //load_original();
}else{
  document.addEventListener('DOMContentLoaded', function() {
    fetchURL();
    //load_original();
  });
}
