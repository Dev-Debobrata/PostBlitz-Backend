export default function Navbar() {
  return (
    <div className="navbar sticky top-0 bg-neutral text-neutral-content z-50 lg:px-8">
      <div className="navbar-start">
        <div className="flex-none lg:hidden">
          <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <label
                htmlFor="my-drawer"
                className="btn btn-primary btn-ghost drawer-button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-5 h-5 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer" className="drawer-overlay"></label>
              <ul className="menu p-4 w-70 md:w-80 h-full bg-base-200 text-base-content">
                <li>
                  <a className="font-primary text-lg hover:font-bold">
                    About Us
                  </a>
                </li>
                <li>
                  <a className="font-primary text-lg hover:font-bold">Write</a>
                </li>
                <li>
                  <a className="font-primary text-lg hover:font-bold">
                    Sign In
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <a className="normal-case font-secondary font-bold text-2xl">
          Postblitz
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu-horizontal space-x-6 px-1">
          <li>
            <a className="font-primary text-lg hover:font-bold">About Us</a>
          </li>
          <li>
            <a className="font-primary text-lg hover:font-bold">Write</a>
          </li>
          <li>
            <a className="font-primary text-lg hover:font-bold">Sign In</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn rounded-lg bg-neutral text-white font-primary hover:bg-base-100 hover:text-neutral">
          Get Started
        </a>
      </div>
    </div>
  );
}
