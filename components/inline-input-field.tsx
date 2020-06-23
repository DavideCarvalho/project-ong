import React from 'react';

interface Props {
  label: string;
  value: string | number;
  name: string;
  type: string;
  error: string | undefined;
  handleChange: (
    eventOrPath: string | React.ChangeEvent<any>
  ) => void | ((eventOrTextValue: string | React.ChangeEvent<any>) => void);
}

export const InlineInputField: React.FC<Props> = ({
  label,
  name,
  value,
  error,
  type,
  handleChange,
}: Props) => {
  return (
    <div>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">{label}</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <input
                className={`input ${error ? 'is-danger' : ''}`}
                type={type}
                name={name}
                value={value}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
      <p className="help is-danger">{error}</p>
    </div>
  );
};
