// generate an access token in the Twilio Account Portal - https://www.twilio.com/user/account/video/testing-tools
window.accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1zYXQ7dj0xIn0.eyJqdGkiOiJTS2ZjMTNkZTcxNjRhY2U5MmYwNmJhODcxNTE2YmIwYzFiLTE0MzcyODU2MTUiLCJpc3MiOiJTS2ZjMTNkZTcxNjRhY2U5MmYwNmJhODcxNTE2YmIwYzFiIiwic3ViIjoiQUNjZGE4Yjk1NTgwYzkwYWI4OTY2ZGNkNjA1NTk4MzYyNCIsIm5iZiI6MTQzNzI4NTYxNSwiZXhwIjoxNDM3MzcyMDE1LCJncmFudHMiOlt7InJlcyI6Imh0dHBzOlwvXC9hcGkudHdpbGlvLmNvbVwvMjAxMC0wNC0wMVwvQWNjb3VudHNcL0FDY2RhOGI5NTU4MGM5MGFiODk2NmRjZDYwNTU5ODM2MjRcL1Rva2Vucy5qc29uIiwiYWN0IjpbIlBPU1QiXX0seyJyZXMiOiJzaXA6dGVzdDFAQUNjZGE4Yjk1NTgwYzkwYWI4OTY2ZGNkNjA1NTk4MzYyNC5lbmRwb2ludC50d2lsaW8uY29tIiwiYWN0IjpbImxpc3RlbiIsImludml0ZSJdfV19.BOftJUtfF1wn18Ke6CYFXhYt1HpoAQo9WEYjvbo2ZXg";

var endpoint;

$(function(){
  $('#end-chat').removeClass('hidden');
  $('#start-chat').addClass('hidden');
  $('#clear-drawing').removeClass('hidden');
});

// check for WebRTC
if (!navigator.webkitGetUserMedia && !navigator.mozGetUserMedia) {
  alert('WebRTC is not available in your browser.');
}

// create an Endpoint and connect to Twilio
endpoint = new Twilio.Endpoint(accessToken);
endpoint.listen().then(
  endpointConnected,
  function (error) {
    log('Could not connect to Twilio: ' + error.message);
  }
);

endpoint.on('invite', function(invite) {
  console.log('Received Invite to join a Conversation with ' + invite.from);
   invite.accept().then(conversationStarted);
});

previewMedia = new Twilio.LocalMedia();
Twilio.getUserMedia().then(
  function (mediaStream) {
    previewMedia.addStream(mediaStream);
    previewMedia.attach('#remoteVideos');
  },
  function (error) {
    console.error('Unable to access local media', error);
    console.log('Unable to access Camera and Microphone');
  }
);

// successfully connected!
function endpointConnected() {
  document.getElementById('invite-controls').style.display = 'block';
  console.log("Connected to Twilio. Listening for incoming Invites as '" + endpoint.address + "'");
};


// conversation is live
function conversationStarted(conversation) {
  console.log("In an active Conversation");
  // when a participant joins, draw their video on screen
  conversation.on('participantConnected', function (participant) {
    console.log("Participant '" + participant.address + "' connected");
    participant.media.attach('#allVideos');
    drawFunction();
  });
  // when a participant disconnects, note in log
  conversation.on('participantDisconnected', function (participant) {
    console.log("Participant '" + participant.address + "' disconnected");
  });
  // when the conversation ends, stop capturing local video
  conversation.on('ended', function (conversation) {
    console.log("Connected to Twilio. Listening for incoming Invites as '" + endpoint.address + "'");
    conversation.localMedia.stop();
    conversation.disconnect();
    $('.video-overlay').removeClass('hidden');
    location.href = '/payment';
  });
};

$('#enter-btn').on('click',function(){
  $('.video-overlay').addClass('hidden');
});
