import { useEffect, useState } from 'react';

export function useWebSocket(url: string) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<number>(0);
  const [status, setStatus] = useState<string>('Connecting...');

  useEffect(() => {
    const ws = new WebSocket(url);

    const storedUrls = localStorage.getItem('youtubeUrls');
    const urls = JSON.parse(storedUrls)

    ws.onopen = () => {
      setStatus('Connected');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      let n = 0
      let number = +data
      if (number> 0) {
        n = number * 100 / urls.length;
      }

      console.log("nnnnnn", n)
      console.log("urls.length", urls.length)
      setMessages(n);
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
