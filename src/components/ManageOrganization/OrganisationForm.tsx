import { useRef, useState } from "react";
import ArrowIcon from "../../assets/icons/arrow-icon.svg";
require("tailwindcss-writing-mode")({
  variants: ["responsive", "hover"],
});

type OrganisationFormPropTypes = {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

const OrganisationForm = ({
  activeTab,
  setActiveTab,
}: OrganisationFormPropTypes) => {
  const [toolTip, setToolTip] = useState<boolean>(false);
  const orgName = useRef<HTMLInputElement>(null);
  const orgURL = useRef<HTMLInputElement>(null);

  if (activeTab === "Organisation")
    return (
      <div className="bg-background_color h-screen w-screen flex items-center justify-center font-dm_sans">
        <div className="h-3/5 w-[350px] flex flex-col gap-5">
          <div className="text-highlight_font_color mb-5">
            <h3 className="flex gap-4 text-2xl mb-4">
              <img src={ArrowIcon} alt="Arrow Icon" className="w-8 h-8" />
              Create a new AgileShift Organisation
            </h3>
            {/* Change this to dynamic username */}
            <p className="text-primary_font_color text-lg">
              An organization is a workspace that helps your team collaborate
            </p>
          </div>
          <div className="text-highlight_font_color flex flex-col gap-5 mb-8">
            <div className="flex flex-col gap-1">
              <label
                htmlFor=""
                className="font-lg text-dark_gray font-semibold">
                Name
              </label>
              <input
                ref={orgName}
                type="text"
                className="font-lg rounded-lg px-4 bg-Secondary_background_color h-10 outline-none border border-dark_gray"
              />
            </div>
            <div className="relative flex flex-col gap-1">
              <label
                htmlFor=""
                className="font-lg text-dark_gray font-semibold">
                URL
              </label>
              <div className="flex rounded-lg border border-dark_gray items-center">
                <label htmlFor="" className="px-4">
                  app.devrev.ai/
                </label>
                <input
                  ref={orgURL}
                  onFocus={() => setToolTip(!toolTip)}
                  onBlur={() => setToolTip(!toolTip)}
                  type="text"
                  className="flex-1 font-lg rounded-lg px-4 bg-Secondary_background_color h-10 outline-none"
                />
              </div>
              {toolTip && (
                <div className="absolute left-[104%] bg-Secondary_background_color p-4 rounded-lg w-80 border border-dark_gray">
                  <h3>AgileOrg URL</h3>
                  <ul className="ml-5 list-disc text-sm">
                    <li>Should be 3-50 characters long.</li>
                    <li>Can have alphanumeric characters and hyphen</li>
                    <li>Should not start or end with hyphen</li>
                    <li>Cannot have two consecutive hyphens</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <button className="flex gap-4 items-center justify-center border border-dark_gray py-4 rounded-lg text-highlight_font_color">
            <img src={ArrowIcon} alt="Plus Icon" className="w-4 h-4" />
            Create new AgileOrg
          </button>
        </div>
      </div>
    );
  else
    return (
      <div className="h-screen w-28 flex flex-wrap text-primary_font_color  bg-Secondary_background_color">
        <button
          className="h-full w-full"
          onClick={() => setActiveTab("Organisation")}>
          <span className="[writing-mode:vertical-rl]">Organisation Form</span>
        </button>
      </div>
    );
};

export default OrganisationForm;
