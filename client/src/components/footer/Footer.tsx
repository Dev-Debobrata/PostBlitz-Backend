const Footer = () => {
  return (
    <div className="backdrop-blur-sm  bg-gray-700/10 py-8">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-200">
              Address
            </h3>
            <div className="mt-4">
              <p className="text-sm text-gray-400">
                Kolkata.
                <br />
                West Bengal
                <br />
                India, Kol 700011
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-200">
              Quick Links
            </h3>
            <div className="mt-4">
              <ul className="list-none">
                <li>
                  <a
                    href="/about"
                    className="text-base text-gray-400 hover:text-white"
                  >
                    About Us
                  </a>
                </li>
                <li className="mt-2">
                  <a
                    href="/blogs"
                    className="text-base text-gray-400 hover:text-white"
                  >
                    Blog
                  </a>
                </li>
                <li className="mt-2">
                  <a
                    href="/write"
                    className="text-base text-gray-400 hover:text-white"
                  >
                    Write
                  </a>
                </li>
                <li className="mt-2">
                  <a
                    href="/contact"
                    className="text-base text-gray-400 hover:text-white"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-200">
              Contact
            </h3>
            <div className="mt-4">
              <p className="text-sm text-gray-400">
                Email: contact@debobrata.me
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            © 2021 All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
