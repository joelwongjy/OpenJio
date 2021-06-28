import React from 'react';

import { OrderData } from 'interfaces/models/orders';

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
                  // eslint-disable-next-line react/no-array-index-key
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-pre-wrap ">
                      <div className="text-sm font-medium text-gray-900">
                        {item.quantity}x {item.name}
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

export default OrderList;
