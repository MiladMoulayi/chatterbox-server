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

exports.requestHandler = utils.makeActionHandler(actions);
