console.log("ddddd");
$(document).ready(function(){

  console.log("it is work!");
  let url = window.location.href;
  var username = url.substring(22,url.indexOf("#!/"));
  console.log(`m-${username}`);
  chrome.storage.sync.get("m_projects", function(data){
    ent.getUserByUsername(username).then(function(d){
      if(d !== "none" && d.created != undefined){
        if(data.m_projects == undefined){
          chrome.storage.sync.set({"m_projects": []}, function(){
            console.log(data.m_projects);
            ui(data.m_projects);
          });
        }else{
          console.log(data.m_projects);
          ui(data.m_projects);
        }
      }
    });
  });
});

var link = {};
var objects = {};

function ui(pjt){
  var projects = document.querySelectorAll("div .projectInfoBox");
  for(var i in projects){
    if(i=="length"){
      break;
    }
    console.log($(projects[i]).children(".projectInfoDetail").children().first().text());
    addBtn(projects[i], pjt.includes($(projects[i]).children(".projectInfoDetail").children().first().text()));

  }
  console.log("eeee");
  setBtn();
}

function addBtn(project, isOpen){
  if(isOpen){
    $(project).append(`<div class="m_btn m_on"><div class='m_text'>on</div></div>`);
    console.log("it is open");
    share($(project).children(".m_btn"));
  }else{
    $(project).append(`<div class="m_btn m_off"><div class='m_text'>off</div></div>`);
  }
}
function setBtn(){
  console.log("setBtn");
  $('.m_btn').click(function(){
    var a = $(this);
    var projectName = a.parent().children(".projectInfoDetail").children().first().text();

    console.log(projectName);
    if(a.hasClass("m_on")){
      chrome.storage.sync.get("m_projects", function(data){
        console.log(data);
        if(data.m_projects.includes(projectName)){
          var ee = data.m_projects.splice(data.m_projects.indexOf(projects), 1);
          console.log(data.m_projects);
          chrome.storage.sync.set({"m_projects": data.m_projects});
        }
      });
      a.attr("class", "m_btn m_off");
      a.html("<div class='m_text'>off</div>");
    }else {
      chrome.storage.sync.get("m_projects", function(data){
        console.log(data.m_projects);
        if(!data.m_projects.includes(projectName)){
          data.m_projects.push(projectName);

          chrome.storage.sync.set({"m_projects": data.m_projects});
        }
      });
      a.attr("class", "m_btn m_on");
      a.html("<div class='m_text'>on</div>");
    }
    share(a);
  });
}
function share(a){

  var style = a.parent().parent().children().first().attr("style");
  var projectName = a.parent().children(".projectInfoDetail").children().first().text();
  console.log(style);
  var projectId = style.substring(style.lastIndexOf("/")+1, style.indexOf(".png"));
  m(projectId, projectName, a.hasClass("m_on"));
}
function m(id, name, isOpen){
  if(isOpen){
    objects[id] = object(id, name);
  }else{
    clearInterval(link[id]);
  }
}
function object(pjtid, pjtname){

  var id = pjtid;
  var name = pjtname;
  start(id, name);
  for(var b in link){
    console.log(link[b]);
  }
  link[id] = setInterval(
    function(){
      console.log(id);
      start(id, name);
    }, 120000+Math.floor(Math.random()*80000)
  );
}
function start(id, name){
  $.ajax({
    url: "https://playentry.org/api/project/"+id,
    type: "PUT",
    data: {"category":"기타", "name":name, "isopen":true, "group":[]},
    success: function(data){
      console.log(data);
    }
  });
}
// 120000+Math.floor(Math.random()*80000)
