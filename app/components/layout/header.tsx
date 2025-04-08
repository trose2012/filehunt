export const Header = () => {
  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center space-x-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={40}
          height={40}
          viewBox="0 0 24 24"
          className="text-transparent fill-transparent"
        >
          <g
            stroke="url(#gradient)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          >
            <path
              strokeDasharray={40}
              strokeDashoffset={40}
              d="M10.76 13.24c-2.34 -2.34 -2.34 -6.14 0 -8.49c2.34 -2.34 6.14 -2.34 8.49 0c2.34 2.34 2.34 6.14 0 8.49c-2.34 2.34 -6.14 2.34 -8.49 0Z"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                dur="1s"
                values="40;0"
              />
            </path>
            <path
              strokeDasharray={12}
              strokeDashoffset={12}
              d="M10.5 13.5l-7.5 7.5"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                begin="1s"
                dur="0.4s"
                values="12;0"
              />
            </path>
          </g>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#9333EA" />
            </linearGradient>
          </defs>
        </svg>
        <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          FileHunt
        </span>
      </div>
      <p className="text-gray-400 text-lg">
        Search query builder for finding sensitive files on the web
      </p>
    </div>
  );
};
