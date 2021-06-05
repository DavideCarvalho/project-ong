import useSWR from 'swr';
import React from 'react';
import Select from 'react-select';
import PubSub from 'pubsub-js';
import axios from 'axios';

const getCities = (url): Promise<string[]> =>
  axios.get(url).then(({ data }) => data);

export const SearchForm = () => {
  const { data: cities = [], error } = useSWR<string[]>(
    '/api/v1/city',
    getCities
  );
  let selectOptions: { label: string; value: string }[] = [];
  for (const city of cities) {
    selectOptions = [
      ...selectOptions,
      { label: city, value: city.toLowerCase() },
    ];
  }

  const onChangeCitiesSelectHandler = (e: any[]) => {
    let cities = [];
    for (const city of e) {
      cities = [...cities, city.value];
    }

    PubSub.publish('[PETS DASHBOARD] Change Cities', cities);
  };

  if (error)
    return (
      <div className="has-text-centered">
        <p>Erro ao buscar as cidades</p>
      </div>
    );

  return (
    <div className="has-text-centered">
      <Select
        isLoading={cities == null}
        loadingMessage={() => 'Carregando as cidades'}
        options={selectOptions}
        isMulti
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={onChangeCitiesSelectHandler}
      />
    </div>
  );
};
