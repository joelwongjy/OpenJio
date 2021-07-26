import React from 'react';

import { JioState } from 'interfaces/models/jios';
import { OrderData } from 'interfaces/models/orders';
import { totalCost } from 'utils/jioUtils';

interface AllOrdersListProps {
  jioUserId: number;
  jioState: JioState;
  orders: OrderData[];
}

const AllOrdersList: React.FunctionComponent<AllOrdersListProps> = ({
  jioUserId,
  jioState,
  orders,
}) => {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                {orders.map((order) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <tr
                    key={order.id}
                    className={`${
                      order.userId !== jioUserId &&
                      jioState === JioState.COST_ENTERED &&
                      (order.paid ? 'bg-green-100' : 'bg-red-100')
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-pre-wrap ">
                      <div className="text-sm font-medium text-gray-900">
                        {order.username}
                      </div>
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="text-sm text-gray-500 flex justify-between"
                        >
                          <div>
                            {item.quantity}x {item.name}
                          </div>
                          <div>${Number(item.cost).toFixed(2)}</div>
                        </div>
                      ))}
                      <div className="text-sm font-medium text-gray-900">
                        Total: ${totalCost(order).toFixed(2)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllOrdersList;
