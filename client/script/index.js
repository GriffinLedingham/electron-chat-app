var init = function() {
  loadScript();
  autoLogin();
  initKeyBindings();
};

var autoLogin = function(){
  if(getCookie('token') != '' && getCookie('uname') != '') {
    $.ajax({
      url:'http://localhost:3000/session',
      type:'POST',
      datatype:'json',
      data:{username:getCookie('uname'),token: getCookie('token')},
      success: function(data){
        console.log(data);
        window.location.replace('app.html');
      }
    });
  }
}

var loadScript = function(){
  if(typeof $ == 'undefined') { window.$ = window.jQuery = require('./vendor/jquery/dist/jquery.js'); }
};

var initKeyBindings = function(){
  $('#username, #password').keyup(function (e) {
    if (e.keyCode == 13) {
      submitData();
    }
  });
};

var submitData = function(){
  $.ajax({
    url:'http://localhost:3000/login',
    type:'POST',
    datatype:'json',
    data:{username:$('#username').val(),password:$('#password').val()},
    success: function(data){
      window.location.replace('app.html');
    }
  });
};

var getCookie = function(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1);
      if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
  }
  return "";
}