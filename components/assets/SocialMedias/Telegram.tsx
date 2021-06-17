import React from 'react';

interface TelegramProps {
  className?: string;
}

const Telegram: React.FC<TelegramProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fillRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit="1.414"
    clipRule="evenodd"
    viewBox="0 0 24 24"
  >
    <path d="M18.384 22.779a1.19 1.19 0 001.107.145 1.16 1.16 0 00.724-.84C21.084 18 23.192 7.663 23.983 3.948a.78.78 0 00-.26-.758.8.8 0 00-.797-.14C18.733 4.602 5.82 9.447.542 11.4a.827.827 0 00-.542.799c.012.354.25.661.593.764 2.367.708 5.474 1.693 5.474 1.693s1.452 4.385 2.209 6.615c.095.28.314.5.603.576a.866.866 0 00.811-.207l3.096-2.923s3.572 2.619 5.598 4.062zm-11.01-8.677l1.679 5.538.373-3.507 10.185-9.186a.277.277 0 00.033-.377.284.284 0 00-.376-.064L7.374 14.102z"></path>
  </svg>
);

export default Telegram;
