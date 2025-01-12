import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export const fetchTasks = async () => {
  const data = await axios.get(`${process.env.BASE_URL}/tasks`);
  const [response] = await Promise.all([data]);
  return response;
};

export const save = async (name: string, isCompleted: boolean, date: Date) => {
  const data = await axios.post(`${process.env.BASE_URL}/tasks`, {
    name,
    isCompleted,
    date,
  });
  const [response] = await Promise.all([data]);
  return response;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name, isCompleted, date } = req.body;
    const result = await save(name, isCompleted, date);
    res.status(200).json(result.data);
  } else {
    const result = await fetchTasks();
    res.status(200).json(result.data);
  }
}
