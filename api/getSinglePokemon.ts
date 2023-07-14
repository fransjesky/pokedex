import axios from 'axios';
import API_KEY from '@/services/api';

export default function getSinglePokemon(name: string) {
  return axios.get(`${API_KEY}/pokemon/${name}`);
}
