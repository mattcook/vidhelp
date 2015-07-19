var endpoint;
var activeConversation;
var previewMedia;

// check for WebRTC
if (!navigator.webkitGetUserMedia && !navigator.mozGetUserMedia) {
  alert('WebRTC is not available in your browser.');
}

// generate an access token in the Twilio Account Portal - https://www.twilio.com/user/account/video/testing-tools
window.accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1zYXQ7dj0xIn0.eyJqdGkiOiJTS2ZjMTNkZTcxNjRhY2U5MmYwNmJhODcxNTE2YmIwYzFiLTE0MzcyNzEzOTEiLCJpc3MiOiJTS2ZjMTNkZTcxNjRhY2U5MmYwNmJhODcxNTE2YmIwYzFiIiwic3ViIjoiQUNjZGE4Yjk1NTgwYzkwYWI4OTY2ZGNkNjA1NTk4MzYyNCIsIm5iZiI6MTQzNzI3MTM5MSwiZXhwIjoxNDM3MzU3NzkxLCJncmFudHMiOlt7InJlcyI6Imh0dHBzOlwvXC9hcGkudHdpbGlvLmNvbVwvMjAxMC0wNC0wMVwvQWNjb3VudHNcL0FDY2RhOGI5NTU4MGM5MGFiODk2NmRjZDYwNTU5ODM2MjRcL1Rva2Vucy5qc29uIiwiYWN0IjpbIlBPU1QiXX0seyJyZXMiOiJzaXA6cXVpY2tzdGFydEBBQ2NkYThiOTU1ODBjOTBhYjg5NjZkY2Q2MDU1OTgzNjI0LmVuZHBvaW50LnR3aWxpby5jb20iLCJhY3QiOlsibGlzdGVuIiwiaW52aXRlIl19XX0.45HoVlB9PcuqLkadwfy4BobIdgqIMFdGPMYTTmVJZIg";

// create an Endpoint and connect to Twilio
endpoint = new Twilio.Endpoint(accessToken);
endpoint.listen().then(
  endpointConnected,
  function (error) {
    log('Could not connect to Twilio: ' + error.message);
  }
);

$(function(){
  previewMedia = new Twilio.LocalMedia();
  Twilio.getUserMedia().then(
    function (mediaStream) {
      previewMedia.addStream(mediaStream);
      previewMedia.attach('#allVideos');
    },
    function (error) {
      console.error('Unable to access local media', error);
      log('Unable to access Camera and Microphone');
    }
  );
});

// successfully connected!
function endpointConnected() {
  document.getElementById('invite-controls').style.display = 'block';
  log("Connected to Twilio. Listening for incoming Invites as '" + endpoint.address + "'");

  endpoint.on('invite', function (invite) {
    log('Incoming invite from: ' + invite.from);
    invite.accept().then(conversationStarted);
  });

  // bind button to create conversation
  document.getElementById('button-invite').onclick = function () {
    var inviteTo = document.getElementById('invite-to').value;

    if (activeConversation) {
      // add a participant
      activeConversation.invite(inviteTo);
    } else {
      // create a conversation
      var options = {};
      if (previewMedia) {
        options.localMedia = previewMedia;
      }
      endpoint.createConversation(inviteTo, options).then(
        conversationStarted,
        function (error) {
          log('Unable to create conversation');
          console.error('Unable to create conversation', error);
        }
      );
    }
  };
};
