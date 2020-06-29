import useSWR from 'swr';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import PubSub from 'pubsub-js';
import axios from 'axios';

const getCities = (url): Promise<string[]> =>
  axios.get(url).then((res) => res.data);

export const SearchForm = () => {
  const { data, error } = useSWR<string[]>('/api/v1/city', getCities);
  let [options, setOptions] = useState([]);
  useEffect(() => {
    if (!data || error || !data.length) {
      setOptions([]);
      return;
    }
    let cityOptions = [];
    for (const city of data) {
      cityOptions = [
        ...cityOptions,
        { label: city, value: city.toLowerCase() },
      ];
    }
    setOptions(() => cityOptions);
  }, [data, error]);

  const onChangeCitiesSelectHandler = (e: any[]) => {
    let cities = [];
    for (const city of e) {
      cities = [...cities, city.value];
    }

    PubSub.publish('[PETS DASHBOARD] Change Cities', cities);
  };

  return (
    <div className="has-text-centered">
      <Select
        options={options}
        isMulti
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={onChangeCitiesSelectHandler}
      />
    </div>
  );
};
