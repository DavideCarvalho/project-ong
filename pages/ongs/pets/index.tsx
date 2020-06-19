import React from 'react';
import {OngPetsListContainer} from "../../../containers/ongs/ong-pet-list";
import {NextPage} from "next";

interface Props {
  tokenId: string;
}


const OngPetsPage: NextPage<Props> = ({ tokenId }) => {
  return (
    <div className="container">
      <div className="has-text-centered" style={{ marginTop: '5%' }}>
        <h1 className="title is-1">Seus bichanos</h1>
        <OngPetsListContainer tokenId={tokenId} />
      </div>
    </div>
  );
};

OngPetsPage.getInitialProps = async(context) => {
  return { tokenId: context.query.tokenId as string };
};

export default OngPetsPage;
