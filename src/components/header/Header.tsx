import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { Popover, Transition } from '@headlessui/react';
import {
  CogIcon,
  CursorClickIcon,
  MenuIcon,
  PhoneIcon,
  PlayIcon,
  UserAddIcon,
  ViewGridIcon,
  XIcon,
} from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';

import { CREATE, HOME, JIOS, JOIN } from 'constants/routes';
import { useAuth } from 'contexts/AuthContext';
import { useUser } from 'contexts/UserContext';

const Header: React.FC = () => {
  const { user } = useUser();
  const { logout } = useAuth();
  const history = useHistory();

  const login = () => {
    history.push('/login');
  };

  const jios = [
    {
      name: 'Create OpenJio',
      description: 'Create a new OpenJio',
      href: `${JIOS}${CREATE}`,
      icon: UserAddIcon,
    },
    {
      name: 'Join OpenJio',
      description: 'Join an existing OpenJio',
      href: `${JIOS}${JOIN}`,
      icon: CursorClickIcon,
    },
    {
      name: 'View Past OpenJios',
      description: 'View past jios and orders',
      href: '#',
      icon: ViewGridIcon,
    },
  ];
  const callsToAction = [{ name: 'Watch Tutorial', href: '#', icon: PlayIcon }];
  const resources = [
    {
      name: 'Manage my Account',
      description: 'View and edit account details and payment number.',
      href: '#',
      icon: CogIcon,
    },
    {
      name: 'Contact Us',
      description: 'Need help or found a bug? Contact us.',
      href: '#',
      icon: PhoneIcon,
    },
  ];

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <header className="sticky top-0 z-50">
      <Popover className="relative bg-white">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
                <div className="flex justify-start lg:w-0 lg:flex-1">
                  <a href={`${HOME}`}>
                    <span className="sr-only">Workflow</span>
                    <img
                      className="h-8 w-auto sm:h-10"
                      src="/images/hamburger.svg"
                      alt=""
                    />
                  </a>
                </div>
                {user && (
                  <div className="-mr-2 -my-2 md:hidden">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500">
                      <span className="sr-only">Open menu</span>
                      <MenuIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                )}
                {user && (
                  <Popover.Group as="nav" className="hidden md:flex space-x-10">
                    <Popover className="relative">
                      {({ open }) => (
                        <>
                          <Popover.Button
                            className={classNames(
                              open ? 'text-gray-900' : 'text-gray-500',
                              'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
                            )}
                          >
                            <span>OpenJio</span>
                            <ChevronDownIcon
                              className={classNames(
                                open ? 'text-gray-600' : 'text-gray-400',
                                'ml-2 h-5 w-5 group-hover:text-gray-500'
                              )}
                              aria-hidden="true"
                            />
                          </Popover.Button>

                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                          >
                            <Popover.Panel
                              static
                              className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                            >
                              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                  {jios.map((item) => (
                                    <a
                                      key={item.name}
                                      href={item.href}
                                      className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                                    >
                                      <item.icon
                                        className="flex-shrink-0 h-6 w-6 text-orange-600"
                                        aria-hidden="true"
                                      />
                                      <div className="ml-4">
                                        <p className="text-base font-medium text-gray-900">
                                          {item.name}
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500">
                                          {item.description}
                                        </p>
                                      </div>
                                    </a>
                                  ))}
                                </div>
                                <div className="px-5 py-5 bg-gray-50 space-y-6 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
                                  {callsToAction.map((item) => (
                                    <div key={item.name} className="flow-root">
                                      <a
                                        href={item.href}
                                        className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                                      >
                                        <item.icon
                                          className="flex-shrink-0 h-6 w-6 text-gray-400"
                                          aria-hidden="true"
                                        />
                                        <span className="ml-3">
                                          {item.name}
                                        </span>
                                      </a>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>

                    <a
                      href={`${HOME}`}
                      className="text-base font-medium text-gray-500 hover:text-gray-900"
                    >
                      Payment
                    </a>

                    <Popover className="relative">
                      {({ open }) => (
                        <>
                          <Popover.Button
                            className={classNames(
                              open ? 'text-gray-900' : 'text-gray-500',
                              'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
                            )}
                          >
                            <span>Account</span>
                            <ChevronDownIcon
                              className={classNames(
                                open ? 'text-gray-600' : 'text-gray-400',
                                'ml-2 h-5 w-5 group-hover:text-gray-500'
                              )}
                              aria-hidden="true"
                            />
                          </Popover.Button>

                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                          >
                            <Popover.Panel
                              static
                              className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0"
                            >
                              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                  {resources.map((item) => (
                                    <a
                                      key={item.name}
                                      href={item.href}
                                      className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                                    >
                                      <item.icon
                                        className="flex-shrink-0 h-6 w-6 text-orange-600"
                                        aria-hidden="true"
                                      />
                                      <div className="ml-4">
                                        <p className="text-base font-medium text-gray-900">
                                          {item.name}
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500">
                                          {item.description}
                                        </p>
                                      </div>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  </Popover.Group>
                )}
                <div
                  className={`${
                    user && 'hidden'
                  } md:flex items-center justify-end md:flex-1 lg:w-0`}
                >
                  <button
                    type="submit"
                    onClick={user ? logout : login}
                    className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-600 hover:bg-orange-700"
                  >
                    {user ? 'Logout' : 'Login'}
                  </button>
                </div>
              </div>
            </div>

            {user && (
              <Transition
                show={open}
                as={Fragment}
                enter="duration-200 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel
                  focus
                  static
                  className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                >
                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                    <div className="pt-5 pb-6 px-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <img
                            className="h-8 w-auto"
                            src="/images/hamburger.svg"
                            alt="Workflow"
                          />
                        </div>
                        <div className="-mr-2">
                          <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500">
                            <span className="sr-only">Close menu</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </Popover.Button>
                        </div>
                      </div>
                      <div className="mt-6">
                        <nav className="grid gap-y-8">
                          {jios.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                            >
                              <item.icon
                                className="flex-shrink-0 h-6 w-6 text-orange-600"
                                aria-hidden="true"
                              />
                              <span className="ml-3 text-base font-medium text-gray-900">
                                {item.name}
                              </span>
                            </a>
                          ))}
                        </nav>
                      </div>
                    </div>
                    <div className="py-6 px-5 space-y-6">
                      <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                        <a
                          href={`${HOME}`}
                          className="text-base font-medium text-gray-900 hover:text-gray-700"
                        >
                          Payment
                        </a>

                        {resources.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="text-base font-medium text-gray-900 hover:text-gray-700"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                      <div>
                        <button
                          type="submit"
                          onClick={logout}
                          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-600 hover:bg-orange-700"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            )}
          </>
        )}
      </Popover>
    </header>
  );
};

export default Header;
