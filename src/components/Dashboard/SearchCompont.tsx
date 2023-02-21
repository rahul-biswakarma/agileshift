import React from "react";
// import notificationIcon from "../../assets/icons/notification.svg";

export default function SearchCompont() {
  return (
    <form className="flex flex-row items-center flex-grow gap-6  ">
      <div className="relative flex-grow  h-[100%]">
        <input
          type="search"
          id="default-search"
          className="block p-3 w-[100%]  pr-10 text-sm h-[100%]  text-primary_font_color focus:outline-none rounded-lg bg-Secondary_background_color"
          placeholder="Search Tickets, Issues and Parts"
          required
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </div>
      <>
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_6_14)">
            <path
              d="M12.5 6.25C12.5 5.58696 12.7634 4.95107 13.2322 4.48223C13.7011 4.01339 14.337 3.75 15 3.75C15.663 3.75 16.2989 4.01339 16.7678 4.48223C17.2366 4.95107 17.5 5.58696 17.5 6.25C18.9355 6.92878 20.1593 7.98541 21.0401 9.30662C21.9209 10.6278 22.4255 12.1638 22.5 13.75V17.5C22.5941 18.2771 22.8693 19.0213 23.3035 19.6727C23.7377 20.324 24.3188 20.8643 25 21.25H5C5.68117 20.8643 6.26226 20.324 6.69648 19.6727C7.13071 19.0213 7.40593 18.2771 7.5 17.5V13.75C7.57445 12.1638 8.07913 10.6278 8.95994 9.30662C9.84075 7.98541 11.0645 6.92878 12.5 6.25Z"
              stroke="#808080"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11.25 21.25V22.5C11.25 23.4946 11.6451 24.4484 12.3483 25.1517C13.0516 25.8549 14.0054 26.25 15 26.25C15.9946 26.25 16.9484 25.8549 17.6517 25.1517C18.3549 24.4484 18.75 23.4946 18.75 22.5V21.25"
              stroke="#808080"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_6_14">
              <rect width="30" height="30" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_7_18)">
            <path
              d="M10 10H5V15H10V10Z"
              stroke="#808080"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.5 5V10"
              stroke="#808080"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.5 15V25"
              stroke="#808080"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M17.5 17.5H12.5V22.5H17.5V17.5Z"
              stroke="#808080"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15 5V17.5"
              stroke="#808080"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15 22.5V25"
              stroke="#808080"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M25 6.25H20V11.25H25V6.25Z"
              stroke="#808080"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M22.5 5V6.25"
              stroke="#808080"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M22.5 11.25V25"
              stroke="#808080"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_7_18">
              <rect width="30" height="30" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </>
    </form>
  );
}
