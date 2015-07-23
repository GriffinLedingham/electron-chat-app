var socket = null;

var init = function(){
  socket = io('http://localhost:3000');

  loadScript();
  initTemplates();
  initKeyBindings();
  initSockBindings();
  authUser(socket);
};

var authUser = function(socket){
  if(getCookie('token') != false && getCookie('token') != 'undefined'
    && getCookie('uname') != false && getCookie('uname') != 'undefined')
  {
    socket.emit('auth', {uname: getCookie('uname'), token: getCookie('token')});
  }
};

var loadTemplate = function(key, vars){
    if(typeof vars == 'undefined') { vars = {}; }
    var temp = Handlebars.compile($('#'+key).html());
    return temp(vars);
};

var initKeyBindings = function(){
  $('#chatInput').keyup(function (e) {
    if (e.keyCode == 13 && socket != null) {
      socket.emit('send', $('#chatInput').val());
      $('#chatInput').val('');
    }
  });
};

var initSockBindings = function(){
  socket.on('rcv', function(msg){
    $('#msgContainer').append(loadTemplate('msgTemplate', msg));
  });
};

var loadScript = function(){
  if(typeof $ == 'undefined') { window.$ = window.jQuery = require('./vendor/jquery/dist/jquery.js'); }
};

var initTemplates = function(){
  $.ajax({
    url: './templates/chat.html',
    type: 'GET',
    async: false,
    complete: function(response) {
      $('#templates').append(response.responseText);
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