import useSWR from 'swr';
import { CardWithPhoto } from './card';

const getPets = url => fetch(url).then(_ => _.json());

export const PetsListContainer = () => {
  const {data, error} = useSWR('/api/pets', getPets);
  console.log(data, error);
  if (error) return <div>Erro ao carregar os pets</div>
  if (!data) return <div>Carregando os pets</div>
  return (
    <CardWithPhoto />
  );
}
