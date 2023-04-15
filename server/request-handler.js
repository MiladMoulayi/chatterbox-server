var utils = require('./utils');

var messageIdCounter = 1;
var messages = [
  // Note: an initial message is useful for debugging purposes.
  /*
  {
    text: 'hello world',
    username: 'fred',
    message_id: objectIdCounter
  }
  */
];

var actions = {
  'GET': function(request, response) {
    if (request.url === '/classes/messages') {
      utils.sendResponse(response, messages);
    } else {
      utils.sendResponse(response, null, 404);
    }
  },
  'POST': function(request, response) {
    utils.collectData(request, function(message) {
      message.message_id = ++messageIdCounter;
      messages.push(message);
      utils.sendResponse(response, [{message_id: message.message_id}], 201);
    });
  },
  'OPTIONS': function(request, response) {
    utils.sendResponse(response, null);
  }
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization',
  'access-control-max-age': 10 // Seconds.
};

module.exports.requestHandler = requestHandler;
exports.requestHandler = utils.makeActionHandler(actions);
