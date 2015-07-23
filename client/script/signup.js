var init = function() {
  loadScript();
  initKeyBindings();
};

var loadScript = function(){
  if(typeof $ == 'undefined') { window.$ = window.jQuery = require('./vendor/jquery/dist/jquery.js'); }
};

var initKeyBindings = function(){
  $('#username, #email, #password, #confirmPassword').keyup(function (e) {
    if (e.keyCode == 13) {
      submitData();
    }
  });
};

var submitData = function(){
  $.ajax({
    url:'http://localhost:3000/create',
    type:'POST',
    datatype:'json',
    data:{username:$('#username').val(),password:$('#password').val(),email:$('#email').val()},
    success: function(data){
      window.location.replace('index.html');
    }
  });
};