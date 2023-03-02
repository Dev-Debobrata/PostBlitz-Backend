"use client";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";
import { useState } from "react";

const navigation = [
  { name: "Explore", href: "#" },
  { name: "Create", href: "#" },
  { name: "About", href: "#" },
];

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="isolate bg-transparent">
      {/* <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
        // Logo
      </div> */}
      <div className="px-6 pt-6 lg:px-8">
        <nav className="flex items-center justify-between" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 flex items-center">
              <span className="sr-only">Your Company</span>
              <h3 className="font-logo text-white text-3xl font-extrabold lg:text-6xl">
                Postblitz
              </h3>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setIsOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <Bars3Icon className="h-6 w-6 text-white hidden" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-lg font-semibold leading-6 text-white hover:text-accent"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <button>
              <a
                href="#"
                className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-white bg-quaternary hover:bg-accent-hover transition-all ease-in-out duration-150"
              >
                Get Started
              </a>
            </button>
          </div>
        </nav>
        <Dialog open={isOpen} onClose={setIsOpen}>
          <Dialog.Panel className="fixed inset-0 z-10 overflow-y-auto px-6 py-6 lg:hidden  bg-accent">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <h3 className="font-logo text-white text-3xl font-extrabold lg:text-6xl">
                  Postblitz
                </h3>
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg py-2 px-3 text-base font-heading font-semibold leading-7 text-white hover:text-accent-hover transition-all"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <button className="p-6 m-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-white bg-primary hover:bg-accent-hover transition-all ease-in-out duration-150"
                  >
                    Get Started
                  </a>
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </div>
    </div>
  );
}

export default NavBar;
