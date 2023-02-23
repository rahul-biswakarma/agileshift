import { useRef, useState, ChangeEvent } from "react";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import {
  add_organisation_to_user,
  create_organization,
} from "../../Utils/Backend";
require("tailwindcss-writing-mode")({
  variants: ["responsive", "hover"],
});

type OrganisationFormPropTypes = {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

export const OrganisationForm = ({
  activeTab,
  setActiveTab,
}: OrganisationFormPropTypes) => {
  const [toolTip, setToolTip] = useState<boolean>(false);
  const [orgNameErrorMessage, setOrgNameErrorMessage] = useState<string>("");
  const [orgUrlErrorMessage, setOrgUrlErrorMessage] = useState<string>("");
  const orgName = useRef<HTMLInputElement>(null);
  const orgURL = useRef<HTMLInputElement>(null);
  const userId = useAppSelector((state: RootState) => state.auth.userId);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    switch (name) {
      case "org-name":
        if (value.length < 3) {
          setOrgNameErrorMessage(
            "AgileOrg name requires a minimum length of 3."
          );
        } else {
          setOrgNameErrorMessage("");
        }
        break;
      case "org-url":
        if (value.length < 3) {
          setOrgUrlErrorMessage("AgileOrg URL requires a minimum length of 3.");
        } else if (value.startsWith("-") || value.endsWith("-")) {
          setOrgUrlErrorMessage(
            "AgileOrg URL should not start or end with hyphen"
          );
        } else if (value.includes("--")) {
          setOrgUrlErrorMessage(
            "AgileOrg URL cannot have two consecutive hyphens"
          );
        } else {
          setOrgUrlErrorMessage("");
        }
        break;
    }
  };

  const addOrganisation = () => {
    console.log(orgName.current!.value);
    console.log(orgURL.current!.value);
    console.log(userId);

    create_organization(
      userId,
      orgName.current!.value,
      orgURL.current!.value
    ).then((id) => add_organisation_to_user(userId, id));
  };

  if (activeTab === "Organisation")
    return (
      <div className="bg-background_color h-screen w-screen flex items-center justify-center font-dm_sans">
        <div className="h-3/5 max-w-[550px] w-full flex flex-col gap-5 p-[0_2rem]">
          <div className="text-highlight_font_color mb-5">
            <h3 className="flex gap-4 text-[20px] mb-4 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="#2c3e50"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                className="w-6 h-6 stroke-white"
                viewBox="0 0 24 24">
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M5 12h14M5 12l6 6m-6-6 6-6" />
              </svg>
              Create a new AgileShift Organisation
            </h3>
            {/* Change this to dynamic username */}
            <p className="text-primary_font_color text-lg">
              An organization is a workspace that helps your team collaborate
            </p>
          </div>
          <div className="text-highlight_font_color flex flex-col gap-5 mb-8">
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="font-lg text-dark_gray font-[500]">
                Name
              </label>
              <input
                ref={orgName}
                onChange={(e) => handleChange(e)}
                name="org-name"
                type="text"
                placeholder="Enter Org. Name"
                className="font-lg font-fira_code rounded-lg px-4 bg-Secondary_background_color h-10 outline-none border-dark_gray placeholder:text-white/20"
              />
              {orgNameErrorMessage.length > 0 && (
                <p className="text-red-400 text-sm ml-1 mt-1">
                  {orgNameErrorMessage}
                </p>
              )}
            </div>
            <div className="relative flex flex-col gap-1">
              <label htmlFor="" className="font-lg text-dark_gray font-[500]">
                URL
              </label>
              <div className="flex rounded-lg border-[2px] border-white/5 items-center">
                <label htmlFor="" className="px-4 text-white/30">
                  app.agileshift.ai/
                </label>
                <input
                  ref={orgURL}
                  onChange={(e) => handleChange(e)}
                  name="org-url"
                  onFocus={() => setToolTip(!toolTip)}
                  onBlur={() => setToolTip(!toolTip)}
                  type="text"
                  className="flex-1 font-fira_code font-lg rounded-r-lg px-4 bg-Secondary_background_color h-10 outline-none"
                />
              </div>
              {orgUrlErrorMessage.length > 0 && (
                <p className="text-red-400 text-sm ml-1 mt-1">
                  {orgUrlErrorMessage}
                </p>
              )}
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
          <button
            className="flex gap-4 items-center justify-center py-4 rounded-lg border-[2px] border-Secondary_background_color text-white/40 stroke-white/40 hover:bg-amber-400 hover:text-amber-800 hover:border-amber-400 hover:stroke-amber-800 transition-all"
            onClick={addOrganisation}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="#2c3e50"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              className="w-4 h-4 stroke-inherit"
              viewBox="0 0 24 24">
              <path stroke="none" d="M0 0h24v24H0z" />
              <path d="M12 5v14m-7-7h14" />
            </svg>
            Create new AgileOrg
          </button>
        </div>
      </div>
    );
  else
    return (
      <div className="h-screen w-12 flex flex-wrap text-primary_font_color  bg-Secondary_background_color">
        <button
          className="h-full w-full"
          onClick={() => setActiveTab("Organisation")}>
          <span className="[writing-mode:vertical-rl] text-sm font-bold uppercase">
            Organisation Form
          </span>
        </button>
      </div>
    );
};
