import { useEffect, useState } from 'react';

export function useWebSocket(url: string) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string>('');
  const [status, setStatus] = useState<string>('Connecting...');

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      setStatus('Connected');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
     
      console.log("reason", data)
      setMessages(data);
    };

    ws.onclose = () => {
      setStatus('Disconnected');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setStatus('Error');
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [url]);

  return { socket, messages, status };
}
