import React from 'react';
import Image from 'next/image';

interface Props {
  petImageUrl: string;
  petName: string;
  petDescription: string;
  ongName: string;
  ongPhone: string;
}

export const CardWithPhoto: React.FC<Props> = ({
  petDescription,
  petImageUrl,
  petName,
  ongName,
  ongPhone,
}) => {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
          <Image
            src={petImageUrl}
            alt="Dog Image"
            loading="lazy"
            width={500}
            height={500}
          />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">
              {petName} - {ongName}
            </p>
          </div>
        </div>

        <div className="content">{petDescription}</div>
        <div className="content">Telefone: {ongPhone}</div>
      </div>
    </div>
  );
};
