// pages/api/submit-urls.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    try {
      const { urls } = req.body;

      // Perform backend operations here
      // For example, save URLs to a database, start crawling, etc.
      console.log('Received URLs:', urls);

      // Respond with a success message
      res.status(200).json({ message: 'URLs submitted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
