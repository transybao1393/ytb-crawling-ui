// components/CrawlingProgress.tsx
import { useState, useEffect } from 'react';

interface VideoProgress {
  id: string;
  title: string;
  progress: number;
}

const CrawlingProgress = () => {
  const [progress, setProgress] = useState<VideoProgress[]>([]);

  useEffect(() => {
    // Create a new WebSocket connection
    const socket = new WebSocket('ws://localhost:4000');

    // Handle incoming messages
    socket.addEventListener('message', (event) => {
      const { type, data } = JSON.parse(event.data);
      if (type === 'update') {
        setProgress(data);
      }
    });

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <h1>Crawling Progress</h1>
      {progress.map((video) => (
        <div key={video.id} style={{ marginBottom: '10px' }}>
          <span>{video.title}: </span>
          <progress value={video.progress} max="100"></progress>
          <span>{video.progress}%</span>
        </div>
      ))}
    </div>
  );
};

export default CrawlingProgress;
