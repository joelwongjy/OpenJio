import React from 'react';

import JioCard from 'components/jioCard';
import { JioListData } from 'interfaces/models/jios';

interface JioListProps {
  jios: JioListData[];
}

const JioList: React.FunctionComponent<JioListProps> = ({ jios }) => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
      {jios.length ? (
        jios.map((jio) => (
          <div key={jio.id}>
            <JioCard jio={jio} />
          </div>
        ))
      ) : (
        <h4>It&apos;s quiet around here</h4>
      )}
    </div>
  );
};

export default JioList;
