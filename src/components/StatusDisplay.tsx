import React from 'react';

interface StatusDisplayProps {
  taskId: string | null;
  status: string | null;
  videosCrawled: number;
}

const StatusDisplay: React.FC<StatusDisplayProps> = ({ taskId, status, videosCrawled }) => {
  if (!taskId) return <div>No task ID provided.</div>;

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">Task Status: {status || 'Loading...'}</h2>
      {status === 'in_progress' && (
        <p>Videos Crawled: {videosCrawled}</p>
      )}
      {status === 'completed' && (
        <p>All videos have been crawled. Total: {videosCrawled}</p>
      )}
      {status === 'not_found' && (
        <p>Task not found. Please check the task ID.</p>
      )}
    </div>
  );
};

export default StatusDisplay;
