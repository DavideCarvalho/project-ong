import React, { PropsWithChildren } from 'react';

interface Props {
  label: string;
  error: string | undefined;
}

export const InlineField: React.FC<Props> = ({
  label,
  error,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <div>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">{label}</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">{children}</div>
          </div>
        </div>
      </div>
      <p className="help is-danger">{error}</p>
    </div>
  );
};
