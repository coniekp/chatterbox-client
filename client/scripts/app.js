var app = {
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
  user: {
    username: window.location.search.slice(10),
    friend: []
  },
  
  init: function() {
    var submitButton = $('.submit');
    
    submitButton.on('click', function () {
      console.log('submitted');
      var text = $('#message').val();
      console.log(text);
      app.handleSubmit(text);
    });
    
    setInterval(function() {
      app.clearMessages();
      app.fetch();
    }, 30000);
  },
  
  send: function (message) {
    $.ajax({
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data) {     
        app.renderMessage(data);       
        console.log('chatterbox: Message sent: ', data);
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  
  fetch: function (callback) {
    $.ajax({
      url: app.server,
      type: 'GET',
      contentType: 'application/json',
      success: function(data) { 
        data.results.forEach(app.renderMessage);     
        console.log('chatterbox: Message fetched', data.results);
      },
      error: function (data) {
        console.error('chatterbox: Failed to fetch data', data);
      }
    });
  },
  
  clearMessages: function() {
    var chats = document.getElementById('chats');
    chats.innerHTML = '';
    
  },
  
  sanitize: function(string) {
    if (string) {
      if (string.includes('<script>') || string.includes('<SCRIPT>')){
        console.log('Found a string with bugs: ', string);
        return string.slice(8);
      }
      return string;
    }
  },
  
  renderMessage: function(message) {
    var cleanText = app.sanitize(message.text);
    var cleanUsername = app.sanitize(message.username);
    var cleanRoom = app.sanitize(message.roomname);
    var username = $('<span class="username">' + cleanUsername + '</span>');
    var text = $('<span class="text">' + cleanText + '</span>');
    var messageContainer = $('<div class="message-containter"></div>');
    messageContainer.append(username);
    messageContainer.append(text);
    $('#chats').append(messageContainer);
    
    username.on('click', function () {
      app.handleUsernameClick(message['username']);
    });
  },
  
  renderRoom: function(room) {
    var node = $('<a>' + room + '</a>');
    $('#roomSelect').append(node);
  },

  
  handleUsernameClick: function (username) {
    app.user.friend.push(username);
  },
  
  handleSubmit: function (text) {
    var message = {
      username: app.user.username,
      text: text,
      roomname: 'room'
    };
    console.log(message);
    app.send(message);
  }
};

$(document).ready(function() {
  app.init();
});
  
  

