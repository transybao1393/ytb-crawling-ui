// pages/crawling-progress.tsx
import { useWebSocket } from '../hooks/useWebSocket';
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

const CrawlingProgress = () => {
  const { messages, status } = useWebSocket('ws://localhost:8000/ws');
  const [urls, setUrls] = useState<string[]>([]);

  console.log("messages: ", messages)

  useEffect(() => {
    const storedUrls = localStorage.getItem('youtubeUrls');
    if (storedUrls) {
      setUrls(JSON.parse(storedUrls));
    }

  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Crawling Progress</h1>
      <div className={styles.progressContainer}>
        <h2 className="text-2xl font-semibold mb-4">Progress ({urls.length})</h2>
        {/* {progress === 0 ? (
          <p className="text-gray-500">No progress data available.</p>
        ) : ( */}
          <ul className="list-disc pl-5 space-y-2">
              <li key="video" className="flex items-center">
                {/* <div className="relative w-2/3">
                  <div className={styles.progressBar} style={{ width: `${messages}%`, backgroundColor: '#0070f3' }}></div>
                </div> */}
                <span className="ml-2 text-gray-700">{messages}</span>
              </li>
          </ul>
        {/* )} */}
      </div>
    </div>
  );
};

export default CrawlingProgress;
