var init = function() {
  loadScript();
  autoLogin();
  initKeyBindings();
};

var autoLogin = function(){
  if(getCookie('token') != false && getCookie('token') != 'undefined' && getCookie('token') != '' && getCookie('token') != null
    && getCookie('uname') != false && getCookie('uname') != 'undefined' && getCookie('uname') != '' && getCookie('uname') != null) {
    $.ajax({
      url:'http://localhost:3000/session',
      type:'POST',
      datatype:'json',
      data:{username:getCookie('uname'),token: getCookie('token')},
      success: function(data){
        localStorage.setItem('uname', data.uname);
        localStorage.setItem('token', data.token);
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
      localStorage.setItem('uname', data.uname);
      localStorage.setItem('token', data.token);
      window.location.replace('app.html');
    }
  });
};

var getCookie = function(cname) {
  var result = localStorage.getItem(cname);
  if(result == 'undefined')
  {
    result = '';
  }
  return result;
}