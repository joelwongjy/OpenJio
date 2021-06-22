import React from 'react';

import JioCard from 'components/jioCard';
import { JioListData } from 'interfaces/models/jios';

interface OpenedJioListProps {
  openedJios: JioListData[];
}

const OpenedJioList: React.FunctionComponent<OpenedJioListProps> = ({
  openedJios,
}) => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
      {openedJios.map((jio) => (
        <div key={jio.id}>
          <JioCard jio={jio} />
        </div>
      ))}
    </div>
  );
};

export default OpenedJioList;
