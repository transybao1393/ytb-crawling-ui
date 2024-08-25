// pages/index.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css'; // Import custom styles

const Home = () => {
  const [urls, setUrls] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const urlList = urls.split('\n').map(url => url.trim()).filter(url => url);
    if (urlList.length === 0) {
      setError('Please enter at least one URL.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/crawl/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(urlList),
      });

      if (!response.ok) {
        throw new Error('Failed to submit URLs');
      }

      localStorage.setItem('youtubeUrls', JSON.stringify(urlList));
      router.push('/crawling-progress');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
    // localStorage.setItem('youtubeUrls', JSON.stringify(urlList));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>YouTube URL Submission</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <textarea
          rows={10}
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
          placeholder="Enter YouTube URLs, one per line"
          className={styles.textarea}
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button type="submit" className={styles.button}>
          {isLoading ? 'Submitting...' : 'Submit URLs'}
        </button>
      </form>
    </div>
  );
};

export default Home;
