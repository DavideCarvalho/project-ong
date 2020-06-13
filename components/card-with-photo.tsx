import React from 'react';

interface Props {
  imageUrl: string;
  name: string;
  description: string;
}

export const CardWithPhoto: React.FC<Props> = ({
  description,
  imageUrl,
  name,
}) => {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={imageUrl} alt="Placeholder image" />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img
                src="https://bulma.io/images/placeholders/96x96.png"
                alt="Placeholder image"
              />
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-4">{name}</p>
          </div>
        </div>

        <div className="content">{description}</div>
      </div>
    </div>
  );
};
