import React, { ChangeEvent } from "react";

type UploadJSONPropTypes = {
  type: string;
  setList: (this: any, list: TYPE_SCHEMA[]) => void;
};

const UploadJSON = ({ type, setList }: UploadJSONPropTypes) => {
  function createTypes(content: TYPE_SCHEMA[]) {
    setList(content);
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const contents = event.target?.result as string;
        createTypes(JSON.parse(contents));
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <div
        className="flex items-center justify-center 
                        bg-grey-lighter">
        <label
          className="flex items-center px-4 py-2 bg-Secondary_background_color justify-center
                            text-highlight_font_color rounded-lg shadow-lg tracking-wide uppercase gap-3
                            border border-dark_gray cursor-pointer">
          <svg
            className="w-6 h-6"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20">
            <path
              d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 
                    8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
            />
          </svg>
          <span className="text-md leading-normal text-center">
            Upload JSON
          </span>
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>
      </div>
    </div>
  );
};

export default UploadJSON;
