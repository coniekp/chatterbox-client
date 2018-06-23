var app = {
  user: {
    username: window.location.search.slice(10),
    friend: []},
  init: function() {
  
    var submitButton = $('.submit');
    
    submitButton.on('click', function () {
      console.log('submitted');
      var text = $('#message').val();
      console.log(text);
      app.handleSubmit(text);
    });
  },
  
  send: function (message) {
    $.ajax({
      url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  
  // fetch('http://parse.sfm6.hackreactor.com/chatterbox/classes/messages');
  fetch: function (url) {
    $.ajax({
      url: url,
      type: 'GET',
      contentType: 'application/json',
      success: function(data) {
        console.log('chatterbox: Message fetched', data);
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
  
  renderMessage: function(message) {
    var username = $('<span class="username">' + message.username + '</span>');
    var text = $('<span class="text">' + message.text + '</span>');
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
    $('.dropdown-content').append(node);
  },

  
  handleUsernameClick: function (username) {
    app.user.friend.push(username);
  },
  
  handleSubmit: function (message) {
    var obj = {
      message: message,
      username: app.user.username,
      roomname: 'room'
    };
    app.send(obj);
  }
  
  
};
  
  

