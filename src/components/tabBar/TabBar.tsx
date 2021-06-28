import React from 'react';

import AllOrdersList from 'components/allOrdersList';
import OrderList from 'components/orderList';
import { OrderData, OrderMode } from 'interfaces/models/orders';

interface TabBarProps {
  orders: OrderData[];
  mode: OrderMode;
}

const TabBar: React.FunctionComponent<TabBarProps> = ({
  orders,
  mode,
  children,
}) => {
  const [openTab, setOpenTab] = React.useState(0);
  return (
    <div className="flex flex-wrap ">
      <ul
        className="flex mb-0 list-none flex-nowrap overflow-x-auto pt-3 pb-4 flex-row"
        role="tablist"
      >
        <li className="-mb-px flex-auto text-center">
          <a
            className={`text-xs font-bold uppercase px-5 py-3 shadow-sm rounded-md block leading-normal ${
              openTab === 0
                ? `text-white bg-orange-600`
                : `text-orange-600 bg-white`
            }`}
            onClick={(e) => {
              e.preventDefault();
              setOpenTab(0);
            }}
            data-toggle="tab"
            href="#link1"
            role="tablist"
          >
            {mode === OrderMode.NEW ? <span>Create </span> : <span>Edit </span>}
            order
          </a>
        </li>
        <li className="-mb-px ml-3 flex-auto text-center">
          <button
            type="button"
            className={`text-xs font-bold uppercase px-5 py-3 shadow-sm rounded-md block leading-normal focus:outline-none ${
              openTab === 1
                ? `text-white bg-orange-600`
                : `text-orange-600 bg-white`
            }`}
            onClick={(e) => {
              e.preventDefault();
              setOpenTab(1);
            }}
            data-toggle="tab"
            role="tablist"
          >
            All Orders
          </button>
        </li>
        {orders.map((order, index) => {
          return (
            <li key={order.id} className="-mb-px ml-3 flex-auto text-center">
              <a
                className={`text-xs font-bold uppercase px-5 py-3 shadow-sm rounded-md block leading-normal ${
                  openTab === index + 2
                    ? `text-white bg-orange-600`
                    : `text-orange-600 bg-white`
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(index + 2);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                {order.username}
              </a>
            </li>
          );
        })}
      </ul>

      <div className="w-full">
        <div className={openTab === 0 ? 'block' : 'hidden'}>{children}</div>
        {openTab !== 0 && (
          <div>
            <div className={openTab === 1 ? 'block' : 'hidden'}>
              {orders.length === 0 ? (
                <p className="font-semibold">There are currently no orders.</p>
              ) : (
                <AllOrdersList orders={orders} />
              )}
            </div>
            {orders.map((order, index) => {
              return (
                <div
                  key={order.id}
                  className={openTab === index + 2 ? 'block' : 'hidden'}
                >
                  <OrderList order={order} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TabBar;
