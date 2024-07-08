import { useEffect, useState } from "react";
import { Alert, Box } from "@mui/material";

import { useWebSocket } from "src/store/WebSocketContext";

const Notifications = () => {
  const webSocketContext = useWebSocket();

  if (!webSocketContext) {
    return null;
  }

  const { addMessageListener, removeMessageListener } = webSocketContext;

  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const handleMessage = (message: any) => {
      try {
        console.log("Incoming message: ", message); 

        const newNotification = { id: Date.now(), message };

        setNotifications((prevNotifications) => [
          ...prevNotifications,
          newNotification,
        ]);
      } catch (error: any) {
        console.error("Error handling incoming message:", error.message);
      }
    };

    addMessageListener(handleMessage);

    return () => {
      removeMessageListener(handleMessage);
    };
  }, [addMessageListener, removeMessageListener]);

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
      { notifications.map((notification: any) => (
        <Alert
          severity='info'
          key={ notification.id }
          onClose={() => handleClose(notification.id)}
          sx={{ mb: 2 }}
        >
          { notification.message }
        </Alert>
      )) }
    </Box>
  );
};

export default Notifications;
