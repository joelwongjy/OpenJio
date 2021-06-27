import React, { useReducer } from 'react';
import { TrashIcon } from '@heroicons/react/outline';

import { JIOS, ORDERS } from 'constants/routes';
import { useUser } from 'contexts/UserContext';
import { JioData, JioPatchData } from 'interfaces/models/jios';
import { OrderData, OrderMode, OrderPatchData } from 'interfaces/models/orders';
import ApiService from 'services/apiService';

export interface OrderFormState extends OrderPatchData {
  id: number | null;
  userId?: number;
}

interface OrderFormProps {
  mode: OrderMode;
  jio: JioData;
  order?: OrderData;
  jioCallback: (jio: JioData) => void;
  alertCallback: (
    isAlertOpen: boolean,
    hasConfirm: boolean,
    alertHeader: string,
    alertMessage: string,
    confirmHandler: undefined | (() => void),
    cancelHandler: undefined | (() => void)
  ) => void;
}

const OrderForm: React.FunctionComponent<OrderFormProps> = ({
  mode,
  jio,
  order,
  jioCallback,
  alertCallback,
}) => {
  const { user } = useUser();

  const [state, setState] = useReducer(
    (s: OrderFormState, a: Partial<OrderFormState>) => ({
      ...s,
      ...a,
    }),
    {
      id: order?.id ?? null,
      userId: order?.userId ?? user!.id,
      paid: false,
      items: order?.items ?? [{ id: 0, name: '', quantity: 1 }],
    }
  );

  const getJio = async () => {
    const response = await ApiService.get(`${JIOS}/${jio.joinCode}`);
    return response.data as JioData;
  };

  const handleEdit = async (id: number) => {
    try {
      const response = await ApiService.patch(`${ORDERS}/${id}`, {
        paid: state.paid,
        items: state.items,
      });
      if (response.status === 200) {
        alertCallback(
          true,
          true,
          'Wooo!',
          'Your order is successfully added.',
          undefined,
          undefined
        );
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      // TODO: Add error handling here
    }
  };

  const handleAddOrder = async () => {
    try {
      const newOrders: JioPatchData['orders'] = jio.orders
        .slice()
        .map((order) => {
          return {
            id: order.id,
            userId: order.userId,
            paid: order.paid,
            items: order.items,
          };
        });
      newOrders.push({
        userId: state.userId,
        paid: state.paid,
        items: state.items,
      });

      const jioPatchData: JioPatchData = {
        orders: newOrders,
      };
      const response = await ApiService.patch(
        `${JIOS}/${jio.id}`,
        jioPatchData
      );
      if (response.status === 200) {
        const newJio = await getJio();
        const newOrderId = newJio.orders.find(
          (order) =>
            !jio.orders
              .slice()
              .map((o) => o.id)
              .includes(order.id)
        )!.id;
        await handleEdit(newOrderId).then(async () => {
          jioCallback(await getJio());
        });
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      // TODO: Add error handling here
    }
  };

  const addItem = (): void => {
    const newItems = [
      ...state.items,
      { id: state.items.length, name: '', quantity: 1 },
    ];
    setState({ items: newItems });
  };

  const deleteItem = (index: number) => {
    if (!state.items[index] || state.items[index].name!.length === 0) {
      const newItems = [...state.items];
      newItems.splice(index, 1);
      setState({ items: newItems });
    } else {
      alertCallback(
        true,
        true,
        'Confirm delete?',
        'You will not be able to retrieve the deleted item.',
        () => {
          const newItems = [...state.items];
          newItems.splice(index, 1);
          setState({ items: newItems });
        },
        undefined
      );
    }
  };

  const updateItem = (name: string, quantity: number, index: number) => {
    const newItems = [...state.items];
    const updatedItem = {
      id: index,
      name,
      quantity,
    };
    newItems[index] = updatedItem;
    setState({ items: newItems });
  };

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
                    Your Items
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {state.items.map((item, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-pre-wrap ">
                      <div className="text-sm text-gray-900">
                        <label
                          className="text-gray-700 dark:text-gray-200 font-semibold"
                          htmlFor="orderName"
                        >
                          Item
                        </label>
                        <input
                          id="orderName"
                          type="text"
                          required
                          className="block w-50 px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                          value={item.name}
                          onChange={(e) =>
                            updateItem(
                              e.target.value,
                              item.quantity ?? 1,
                              index
                            )
                          }
                        />
                      </div>
                    </td>
                    <td>
                      <div className="text-sm text-gray-500">
                        <label
                          className="text-gray-700 dark:text-gray-200 font-semibold"
                          htmlFor="quantity"
                        >
                          Quantity
                        </label>
                        <input
                          id="quantity"
                          type="number"
                          required
                          className="block w-full px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                          value={item.quantity ?? 1}
                          onChange={(e) =>
                            updateItem(
                              item.name ?? '',
                              parseInt(e.target.value, 10),
                              index
                            )
                          }
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        type="button"
                        className="text-orange-500 focus:outline-none hover:text-orange-600"
                        onClick={() => deleteItem(index)}
                      >
                        <TrashIcon className="h-6 w-6 mt-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 flex items-center justify-between border-gray-200 sm:px-6">
        <button
          type="button"
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          onClick={addItem}
        >
          Add Item
        </button>
        {mode === OrderMode.NEW ? (
          <button
            type="button"
            className="relative inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            onClick={() => {
              handleAddOrder();
            }}
          >
            Submit Order
          </button>
        ) : (
          <button
            type="button"
            className="relative inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            To be built
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderForm;
