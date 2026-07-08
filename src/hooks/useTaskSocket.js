import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

// Connects to Spring Boot's /ws STOMP endpoint and subscribes to task updates.
export default function useTaskSocket(onTaskEvent) {
  const clientRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const socket = new SockJS("http://localhost:8080/v1/api/ws-task-tracker");

    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: token ? { Authorization: `Bearer ${token}` } : {},
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe("/topic/tasks", (message) => {
          try {
            onTaskEvent(JSON.parse(message.body));
          } catch {
            
          }
        });
      },
    });

    client.activate();
    clientRef.current = client;

    return () => client.deactivate();
    
  }, []);
}
