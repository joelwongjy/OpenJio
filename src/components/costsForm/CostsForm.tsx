import React, { useState } from 'react';

import { ITEMS, JIOS } from 'constants/routes';
import { ItemListData } from 'interfaces/models/items';
import { JioData, JioState } from 'interfaces/models/jios';
import ApiService from 'services/apiService';
import { costsEntered, getItems } from 'utils/jioUtils';

interface CostsFormProps {
  jio: JioData;
  callback: () => void;
  alertCallback: (
    isAlertOpen: boolean,
    hasConfirm: boolean,
    alertHeader: string,
    alertMessage: string,
    confirmHandler: undefined | (() => void),
    cancelHandler: undefined | (() => void)
  ) => void;
}

export interface CostsFormState {
  items: ItemListData[];
}

const CostsForm: React.FC<CostsFormProps> = ({
  jio,
  alertCallback,
  callback,
}) => {
  const [items, setItems] = useState(getItems(jio));

  const updateItem = (cost: number, index: number) => {
    const newItems = [...items];
    newItems[index].cost = cost;
    setItems(newItems);
  };

  const handleCancel = () => {
    alertCallback(
      true,
      true,
      'Are you sure?',
      'The information will not be saved.',
      callback,
      undefined
    );
  };

  const handleEdit = async () => {
    try {
      await Promise.all(
        items.map(async (item) => {
          await ApiService.patch(`${ITEMS}/${item.id}`, { cost: item.cost });
        })
      );
      const updatedJio = {
        ...jio,
        jioState: costsEntered(jio) ? JioState.COST_ENTERED : JioState.CLOSED,
        deliveryCost: 3.2,
        discount: 1.3,
      };
      await ApiService.patch(`${JIOS}/${jio.id}`, updatedJio);
      callback();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      // TODO: Add error handling here
    }
  };

  return (
    <div className="flex flex-col">
      <div className="-my-2 sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="rounded-md shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Items
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((item, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <tr key={item.name}>
                    <td className="px-6 py-4 whitespace-pre-wrap ">
                      <div className="text-sm font-medium text-gray-900">
                        {item.name}
                      </div>
                    </td>
                    <td>
                      <div className="text-sm text-gray-500">
                        <label
                          className="text-gray-700 dark:text-gray-200 font-semibold"
                          htmlFor="Cost"
                        >
                          Cost
                        </label>
                        <input
                          id="cost"
                          type="number"
                          required
                          className="block w-full px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                          value={item.cost ?? 0}
                          onChange={(e) =>
                            updateItem(parseFloat(e.target.value), index)
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 flex items-center justify-between border-gray-200 sm:px-6">
        <div className="grid grid-cols-2 gap-4 mt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="h-12 group relative w-full inline-flex items-center justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleEdit}
            className="h-12 group relative w-full inline-flex items-center justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default CostsForm;
