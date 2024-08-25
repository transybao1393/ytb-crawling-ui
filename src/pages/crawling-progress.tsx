// pages/crawling-progress.tsx
import { useWebSocket } from '../hooks/useWebSocket';
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css'; // Import custom styles

interface VideoProgress {
  id: string;
  title: string;
  progress: number;
}

const CrawlingProgress = () => {
  const { messages, status } = useWebSocket('ws://localhost:8000/ws');
  // const [progress, setProgress] = useState<number>(0);
  const [urls, setUrls] = useState<string[]>([]);

  console.log("messagesmessagesmessages: ", messages)

  useEffect(() => {
    const storedUrls = localStorage.getItem('youtubeUrls');
    if (storedUrls) {
      setUrls(JSON.parse(storedUrls));
    }

    // setProgress(messages);

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
                {/* <span className="w-1/3 text-gray-700">{title}:</span> */}
                <div className="relative w-2/3">
                  <div className={styles.progressBar} style={{ width: `${messages}%`, backgroundColor: '#0070f3' }}></div>
                </div>
                <span className="ml-2 text-gray-700">{messages}%</span>
              </li>
          </ul>
        {/* )} */}
      </div>
    </div>
  );
};

export default CrawlingProgress;
