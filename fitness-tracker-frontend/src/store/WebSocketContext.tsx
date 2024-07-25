import { createContext, useContext, useEffect, useRef, useCallback, useState, ReactNode } from "react";
import { useSelector } from "react-redux";

import { RootState } from "src/store";
import { WEBSOCKET_BASE_URL } from "src/constants";

interface WebSocketContextType {
  addMessageListener: (listener: (message: any) => void) => void;
  removeMessageListener: (listener: (message: any) => void) => void;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const useWebSocket = (): WebSocketContextType | null => useContext(WebSocketContext);

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
  const [connectionStatus, setConnectionStatus] = useState<string>("Disconnected");
  const ws = useRef<WebSocket | null>(null);
  const listeners = useRef<Array<(message: any) => void>>([]);
  
  const userId = useSelector((state: RootState) => state.auth.userId);

  const broadcastMessage = useCallback((message: any) => {
    console.log("Broadcasting message:", message);
    listeners.current.forEach(listener => listener(message));
  }, []);

  useEffect(() => {
    if (userId) {
      console.log("Initializing WebSocket connection for user:", userId);
      // ws.current = new WebSocket(`ws://localhost:8080/websocket?userId=${userId}`);
      ws.current = new WebSocket(`${WEBSOCKET_BASE_URL}?userId=${userId}`);
      ws.current.onopen = () => {
        console.log("WebSocket connected for user:", userId);
        setConnectionStatus("Connected");
      };
      ws.current.onmessage = (event) => {
        console.log("WebSocket message received:", event.data);
        broadcastMessage(event.data);
        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({
            type: 'NEW_MESSAGE',
            data: event.data
          });
        }
      };
      ws.current.onclose = () => {
        console.log("WebSocket disconnected for user:", userId);
        setConnectionStatus("Disconnected");
      };
      ws.current.onerror = (error) => {
        console.log("WebSocket error for user:", userId, error);
        setConnectionStatus("Disconnected");
      };

      return () => {
        console.log("Closing WebSocket connection for user:", userId);
        ws.current?.close();
      };
    }
  }, [broadcastMessage, userId]);

  const addMessageListener = useCallback((listener: (message: any) => void) => {
    console.log("Adding message listener");
    listeners.current.push(listener);
  }, []);

  const removeMessageListener = useCallback((listener: (message: any) => void) => {
    console.log("Removing message listener");
    listeners.current = listeners.current.filter(l => l !== listener);
  }, []);

  return (
    <WebSocketContext.Provider value={{ addMessageListener, removeMessageListener }}>
      {children}
    </WebSocketContext.Provider>
  );
};
