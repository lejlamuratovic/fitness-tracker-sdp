// listens for 'push' events to handle incoming push notifications.
self.addEventListener('push', function(event) {
  const data = event.data.json();
  const title = data.title || "New Message";
  const options = {
    body: data.message
  };

  // shows the notification using the title and options defined
  event.waitUntil(self.registration.showNotification(title, options));
});

// handles 'message' events
self.addEventListener('message', function(event) {
  console.log("Message received in service worker:", event.data);

  if (event.data && event.data.type === 'NEW_MESSAGE') {
    const options = {
      body: event.data.data
    };

    self.registration.showNotification("New WebSocket Message", options);
  }
});

// handles clicks on notifications.
self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(function(clientList) {

      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        
        if (client.url === 'http://localhost:5173' && 'focus' in client)
          return client.focus();
      }
      if (client.openWindow)
        return client.openWindow('http://localhost:5173');
    })
  );
});
