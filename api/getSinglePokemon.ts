import axios from 'axios';
import API_KEY from '@/services/api';

export default function getSinglePokemon(id: string) {
  try {
    const res = axios.get(`${API_KEY}/pokemon/${id}`);
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
