import { createContext, useContext, useEffect, useRef, useCallback, useState, ReactNode } from "react";
import { useSelector } from "react-redux";

import { RootState } from "src/store";

interface WebSocketContextType {
  addMessageListener: (listener: (message: any) => void) => void;
  removeMessageListener: (listener: (message: any) => void) => void;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const useWebSocket = (): WebSocketContextType | null => useContext(WebSocketContext);

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider = ({ children }: WebSocketProviderProps ) => {
  const [connectionStatus, setConnectionStatus] = useState<string>("Disconnected");
  const [webSocketError, setWebSocketError] = useState<string | null>(null);

  const userId = useSelector((state: RootState) => state.auth.userId);

  const ws = useRef<WebSocket | null>(null);
  const listeners = useRef<Array<(message: any) => void>>([]);

  const broadcastMessage = useCallback((message: any) => {
    listeners.current.forEach(listener => listener(message));
  }, []);

  useEffect(() => {
    if (!userId) return undefined;

    ws.current = new WebSocket(`ws://localhost:8080/websocket?userId=${userId}`);

    ws.current.onopen = () => setConnectionStatus("Connected");
    ws.current.onmessage = (event) => {
      broadcastMessage(event.data);
    };
    ws.current.onclose = () => setConnectionStatus("Disconnected");
    ws.current.onerror = (error: Event) => {
      setConnectionStatus("Disconnected");
      setWebSocketError((error as ErrorEvent).message);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
        ws.current = null;
      }
    };
  }, [userId, broadcastMessage]);

  const addMessageListener = useCallback((listener: (message: any) => void) => {
    listeners.current.push(listener);
  }, []);

  const removeMessageListener = useCallback((listener: (message: any) => void) => {
    listeners.current = listeners.current.filter(l => l !== listener);
  }, []);

  return (
    <WebSocketContext.Provider value={{ addMessageListener, removeMessageListener }}>
      { children }
    </WebSocketContext.Provider>
  );
};
