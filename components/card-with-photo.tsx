import React from 'react';

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
          <img src={petImageUrl} alt="Placeholder image" loading="lazy" />
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
