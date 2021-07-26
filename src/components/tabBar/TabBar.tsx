import React from 'react';

import AllOrdersList from 'components/allOrdersList';
import OrderList from 'components/orderList';
import { useUser } from 'contexts/UserContext';
import { JioState } from 'interfaces/models/jios';
import { OrderData, OrderMode } from 'interfaces/models/orders';

interface TabBarProps {
  jioUserId: number;
  jioState: JioState;
  orders: OrderData[];
  mode: OrderMode;
}

const TabBar: React.FunctionComponent<TabBarProps> = ({
  jioUserId,
  jioState,
  orders,
  mode,
  children,
}) => {
  const { user } = useUser();
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <div className="flex flex-wrap ">
      <ul
        className="flex mb-0 list-none flex-nowrap overflow-x-auto pt-3 pb-4 flex-row"
        role="tablist"
      >
        {user && jioState === JioState.OPEN && (
          <li className="-mb-px mr-3 flex-auto text-center">
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
              {mode === OrderMode.NEW ? (
                <span>Create </span>
              ) : (
                <span>Edit </span>
              )}
              order
            </a>
          </li>
        )}
        <li className="-mb-px mr-3 flex-auto text-center">
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
            <li key={order.id} className="-mb-px mr-3 flex-auto text-center">
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
        {jioState === JioState.OPEN && (
          <div className={openTab === 0 ? 'block' : 'hidden'}>{children}</div>
        )}
        {openTab !== 0 && (
          <div>
            <div className={openTab === 1 ? 'block' : 'hidden'}>
              {orders.length === 0 ? (
                <p className="font-semibold">There are currently no orders.</p>
              ) : (
                <AllOrdersList
                  jioUserId={jioUserId}
                  jioState={jioState}
                  orders={orders}
                />
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
