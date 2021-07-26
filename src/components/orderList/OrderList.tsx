import React from 'react';

import { OrderData } from 'interfaces/models/orders';
import { totalCost } from 'utils/jioUtils';

interface OrderListProps {
  order: OrderData;
}

const OrderList: React.FunctionComponent<OrderListProps> = ({ order }) => {
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
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-pre-wrap ">
                      <div className="text-sm text-gray-500 flex justify-between">
                        <div className="text-sm font-medium text-gray-900">
                          {item.quantity}x {item.name}
                        </div>
                        <div>${Number(item.cost).toFixed(2)}</div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase"
                  >
                    Total: ${totalCost(order).toFixed(2)}
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
