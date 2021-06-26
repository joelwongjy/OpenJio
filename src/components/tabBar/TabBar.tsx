import React from 'react';

import { OrderData } from 'interfaces/models/orders';

interface TabBarProps {
  orders: OrderData[];
}

const TabBar: React.FunctionComponent<TabBarProps> = ({ orders }) => {
  const [openTab, setOpenTab] = React.useState(0);
  return (
    <div className="flex flex-wrap ">
      <div className="w-full">
        <ul
          className="flex mb-0 list-none flex-nowrap overflow-x-auto pt-3 pb-4 flex-row"
          role="tablist"
        >
          {orders.map((order, index) => {
            return (
              <li
                key={order.id}
                className="-mb-px mr-2 last:mr-0 flex-auto text-center"
              >
                <a
                  className={`text-xs font-bold uppercase px-5 py-3 shadow-sm rounded block leading-normal ${
                    openTab === index
                      ? `text-white bg-orange-600`
                      : `text-orange-600 bg-white`
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(index);
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                >
                  Profile
                </a>
              </li>
            );
          })}
        </ul>
        <div className=" flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-sm rounded">
          <div className="px-4 py-5 flex-auto">
            <div className="tab-content tab-space">
              {orders.map((order, index) => {
                return (
                  <div
                    key={order.id}
                    className={openTab === index ? 'block' : 'hidden'}
                  >
                    <p>
                      Collaboratively administrate empowered markets via
                      plug-and-play networks. Dynamically procrastinate B2C
                      users after installed base benefits.
                      <br />
                      <br /> Dramatically visualize customer directed
                      convergence without revolutionary ROI.
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabBar;
