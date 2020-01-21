var ent = {};

ent.get = function(url){
  return new Promise(function(resolve, reject){
    $.ajax({
      url: url,
      dataType: 'json',
      success: function(data){
        resolve(data);
      },
      error: function(data){
        resolve("err");
      }
    });
  });
}
ent.getUserByUsername = function(username){
  return ent.get(`https://playentry.org/api/getUserByUsername/${username}`).then(function(d){
    console.log(d);
    if(d != "err"){
      return d;
    }else {
      return "none";
    }
  });
}
