import { useState, useEffect } from "react";

import { Alert, Box } from "@mui/material";

const Notifications = () => {
  const token = localStorage.getItem("userToken");
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (!token) {
      console.error("User token not found");
      return;
    }

    const socketUrl = `ws://localhost:8080/websocket?token=${token}`;
    const socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      try {
        const message = event.data;
        const newNotification = { id: Date.now(), message };

        setNotifications((prevNotifications) => [
          ...prevNotifications,
          newNotification,
        ]);
        console.log("Incoming message:", message);
      } catch (error: any) {
        console.error("Error handling incoming message:", error.message);
      }
    };

    socket.onclose = (event: any) => {
      console.log("WebSocket closed:", event.reason, "Code:", event.code);
    };

    socket.onerror = (error: any) => {
      console.error("WebSocket error:", error.message);
    };

    // cleanup socket when unmounting component
    return () => {
      socket.close();
    };
  }, [token]);

  const handleClose = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 100,
        right: 50,
        width: "300px",
        zIndex: 5,
      }}
    >
      {notifications.map((notification) => (
        <Alert
          severity='info'
          key={notification.id}
          onClose={() => handleClose(notification.id)}
          sx={{ mb: 2 }}
        >
          {notification.message}
        </Alert>
      ))}
    </Box>
  );
};

export default Notifications;
