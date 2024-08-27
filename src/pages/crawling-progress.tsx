// pages/crawling-progress.tsx
import { useWebSocket } from '../hooks/useWebSocket';
import { useState, useEffect } from 'react';
import styles from '../styles/Crawling.module.css';
import Link from 'next/link';

// Function to extract video ID from a YouTube URL
const extractVideoId = (url: string): string | null => {
  try {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get('v');
  } catch (error) {
    console.error("Invalid URL format", error);
    return null;
  }
};


const CrawlingProgress = () => {
  const { messages, status } = useWebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL);
  const [urls, setUrls] = useState<string[]>([]);
  const [progress, setProgress] = useState<{ id: string | null; url: string; status: string }[]>([]);

  useEffect(() => {
    const storedUrls = localStorage.getItem('youtubeUrls');
    if (storedUrls) {
      const parsedUrls = JSON.parse(storedUrls) as string[];
      setUrls(parsedUrls);

      const progressUpdates = parsedUrls.map((url: string) => ({
        id: extractVideoId(url),
        url: url,
        status: 'In Progress',
      }));

      setProgress(progressUpdates);
    }

  }, []);

  useEffect(() => {
    if (messages) {
      const updatedProgress = progress.map((item) => {
        if (messages.includes(item.id || '')) {
          return { ...item, status: 'Done' };
        }
        return item;
      });

      setProgress(updatedProgress);
    }
  }, [messages]);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Crawling Progress</h1>
      <Link href="/" className={styles.backButton}>Back to Home</Link>
      <div className={styles.progressContainer}>
        <h2 className="text-2xl font-semibold mb-4">Progress ({urls.length})</h2>
        <ul className={styles.progressList}>
          {progress.map((item, index) => (
            <li key={index} className={styles.progressItem}>
              <div className={styles.videoUrl}>{item.url}</div>
              <div className={`${styles.videoStatus} ${styles[`status-${item.status}`]}`}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CrawlingProgress;
