import React from "react";

type props_type = {
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
};
export default function NavBar(props: props_type) {
  return (
    <nav className="flex flex-row bg-Secondary_background_color p-1 h-[50px]  rounded-[10px] flex-1 flex-grow gap-10 stroke-primary_font_color ">
      <section className=" p-1 flex ">
        <img
          className="flex flex-1 bg-red-400 mr-10 ml-2 rounded-[5px] "
          src={
            "https://lh3.googleusercontent.com/ogw/AAEL6sgCSglITl9CIP0MSPH2o2ZxRsfNLsLjR34h4_s=s32-c-mo"
          }
          alt=" avatar"
        />
      </section>

      <button
        onClick={() => props.setSelectedTab("Dashboard")}
        className={`hover:stroke-highlight_icon_color hover:bg-background_color ${
          props.selectedTab === "Dashboard"
            ? "bg-background_color stroke-highlight_icon_color text-white"
            : ""
        }   flex flex-row flex-1 items-center flex-grow gap-2  hover:text-white p-1 rounded-[5px] cursor-pointer min-w-fit ml-2 mr-2 px-4`}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className=" "
        >
          <g clipPath="url(#clip0_7_32)">
            <path
              d="M14 17.5C15.2887 17.5 16.3333 16.4553 16.3333 15.1667C16.3333 13.878 15.2887 12.8333 14 12.8333C12.7113 12.8333 11.6667 13.878 11.6667 15.1667C11.6667 16.4553 12.7113 17.5 14 17.5Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.6917 13.475L18.0833 11.0833"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.46667 23.3333C5.76117 21.9778 4.51956 20.1253 3.91391 18.0325C3.30825 15.9398 3.36854 13.7105 4.08642 11.6536C4.8043 9.59668 6.14422 7.81399 7.92048 6.55258C9.69675 5.29117 11.8214 4.61351 14 4.61351C16.1786 4.61351 18.3032 5.29117 20.0795 6.55258C21.8558 7.81399 23.1957 9.59668 23.9136 11.6536C24.6315 13.7105 24.6917 15.9398 24.0861 18.0325C23.4804 20.1253 22.2388 21.9778 20.5333 23.3333H7.46667Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_7_32">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <p className="text-[16px] font-medium">Dashboard</p>
      </button>
      <button
        onClick={() => props.setSelectedTab("Tickets")}
        className={` hover:stroke-[#ffe600]  ${
          props.selectedTab === "Tickets"
            ? "bg-background_color stroke-[#ffe600]  text-white"
            : ""
        }  items-center  flex flex-row  flex-1 flex-grow gap-2 hover:bg-background_color hover:text-white p-1 rounded-[5px] cursor-pointer min-w-fit ml-2 mr-2 px-4`}
      >
        <svg
          width="20"
          height="15"
          viewBox="0 0 23 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className=" "
        >
          <path
            d="M15 1V3.33333"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 8V10.3333"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 15V17.3333"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.33333 1H19.6667C20.2855 1 20.879 1.24583 21.3166 1.68342C21.7542 2.121 22 2.71449 22 3.33333V6.83333C21.3812 6.83333 20.7877 7.07917 20.3501 7.51675C19.9125 7.95434 19.6667 8.54783 19.6667 9.16667C19.6667 9.78551 19.9125 10.379 20.3501 10.8166C20.7877 11.2542 21.3812 11.5 22 11.5V15C22 15.6188 21.7542 16.2123 21.3166 16.6499C20.879 17.0875 20.2855 17.3333 19.6667 17.3333H3.33333C2.71449 17.3333 2.121 17.0875 1.68342 16.6499C1.24583 16.2123 1 15.6188 1 15V11.5C1.61884 11.5 2.21233 11.2542 2.64992 10.8166C3.0875 10.379 3.33333 9.78551 3.33333 9.16667C3.33333 8.54783 3.0875 7.95434 2.64992 7.51675C2.21233 7.07917 1.61884 6.83333 1 6.83333V3.33333C1 2.71449 1.24583 2.121 1.68342 1.68342C2.121 1.24583 2.71449 1 3.33333 1Z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <p className="text-[16px] font-medium">Tickets</p>
      </button>
      <button
        onClick={() => props.setSelectedTab("Issues")}
        className={` hover:stroke-red-400 items-center ${
          props.selectedTab === "Issues"
            ? "bg-background_color stroke-red-400 text-white"
            : ""
        }   flex flex-row flex-1 flex-grow gap-2 hover:bg-background_color hover:text-white p-1 rounded-[5px] cursor-pointer min-w-fit ml-2 mr-2 px-4`}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className=" "
        >
          <g clipPath="url(#clip0_7_70)">
            <path
              d="M10.5 10.5V9.33333C10.5 8.40508 10.8687 7.51484 11.5251 6.85846C12.1815 6.20208 13.0717 5.83333 14 5.83333C14.9283 5.83333 15.8185 6.20208 16.4749 6.85846C17.1313 7.51484 17.5 8.40508 17.5 9.33333V10.5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.33335 10.5H18.6667C19.3616 11.5414 19.7644 12.75 19.8334 14V17.5C19.8334 19.0471 19.2188 20.5308 18.1248 21.6248C17.0308 22.7188 15.5471 23.3333 14 23.3333C12.4529 23.3333 10.9692 22.7188 9.87523 21.6248C8.78127 20.5308 8.16669 19.0471 8.16669 17.5V14C8.2356 12.75 8.63849 11.5414 9.33335 10.5Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.5 15.1667H8.16667"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19.8333 15.1667H24.5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 23.3333V16.3333"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.66669 22.1667L8.57502 19.8333"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M23.3333 22.1667L19.425 19.8333"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.66669 8.16667L9.04169 10.9667"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M23.3333 8.16667L18.9583 10.9667"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_7_70">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <p className="text-[16px] font-medium">Issues</p>
      </button>
      <button
        onClick={() => props.setSelectedTab("Vistas")}
        className={` hover:stroke-[#668cff]  ${
          props.selectedTab === "Vistas"
            ? "bg-background_color stroke-[#668cff]  text-white"
            : ""
        }   items-center flex flex-row flex-1 flex-grow gap-1 hover:bg-background_color hover:text-white p-1 rounded-[5px] cursor-pointer min-w-fit ml-2 mr-2 px-4`}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className=" "
        >
          <g clipPath="url(#clip0_20_88)">
            <path
              d="M6.41667 5.83333H21.5833C21.7514 5.89226 21.9037 5.98886 22.0286 6.11574C22.1535 6.24262 22.2477 6.39641 22.304 6.56533C22.3603 6.73424 22.3772 6.91381 22.3534 7.09026C22.3296 7.26672 22.2657 7.43538 22.1667 7.58333L16.3333 14V22.1667L11.6667 18.6667V14L5.83334 7.58333C5.73428 7.43538 5.67039 7.26672 5.64659 7.09026C5.62278 6.91381 5.63967 6.73424 5.69598 6.56533C5.75228 6.39641 5.84651 6.24262 5.97143 6.11574C6.09635 5.98886 6.24865 5.89226 6.41667 5.83333Z"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_20_88">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <p className="text-[16px] font-medium">Vistas</p>
      </button>

      <button
        onClick={() => props.setSelectedTab("Parts")}
        className={` hover:stroke-[#37a45b] ${
          props.selectedTab === "Parts"
            ? "bg-background_color stroke-[#37a45b] text-white"
            : ""
        }   items-center flex flex-row flex-1 flex-grow gap-2 hover:bg-background_color hover:text-white p-1 rounded-[5px] cursor-pointer min-w-fit ml-2 mr-10 px-4 `}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className=" "
        >
          <g clipPath="url(#clip0_20_85)">
            <path
              d="M8.16665 10.5C8.16665 8.9529 8.78123 7.46917 9.87519 6.37521C10.9692 5.28125 12.4529 4.66667 14 4.66667C15.5471 4.66667 17.0308 5.28125 18.1248 6.37521C19.2187 7.46917 19.8333 8.9529 19.8333 10.5M22.1666 10.5L19.8333 21C19.7242 21.6687 19.431 22.2685 19.0046 22.6948C18.5783 23.1211 18.0459 23.3471 17.5 23.3333H10.5C9.95411 23.3471 9.42166 23.1211 8.99531 22.6948C8.56897 22.2685 8.27573 21.6687 8.16665 21L5.83331 10.5H22.1666Z"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_20_85">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <p className="text-[16px] font-medium">Parts</p>
      </button>
    </nav>
  );
}
