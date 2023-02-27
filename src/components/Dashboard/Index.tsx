import React, { useState, useEffect } from "react";
import BuildQuadarnt from "../BuildQuadrant";
import { DocumentData } from "@firebase/firestore-types";

import {
  get_schema_data,
  get_data_by_column_name,
  get_all_columns_name,
  get_user_suggestions,
} from "../../Utils/Backend";

import Header from "./Header";
import TabHeader from "./TabHeader";
import { useAppSelector } from "../../redux/hooks";

export default function Dashboard() {
  get_user_suggestions("12rlNJU1m7o8tDuICs7B");
  const organizationId = useAppSelector((state) => state.auth.organisationId);
  const [selectedTab, setSelectedTab] = React.useState<string>("Dashboard");
  const [dataSchema, setDataSchema] = useState<TYPE_FIELD[]>();
  const [data, setData] = useState();

  useEffect(() => {
    get_schema_data(organizationId).then((data) => {
      if (data) setDataSchema(data.schemaData);
    });
  }, []);

  useEffect(() => {
    if (dataSchema)
      get_data_by_column_name(organizationId, dataSchema[0].name).then(
        (data) => {
          console.log("Dashboard: ", data, organizationId);
          setData(data);
        }
      );
  }, [dataSchema]);

  return (
    <div className="bg-background_color h-[100vh] font-dm_sans">
      <Header />
      {dataSchema && (
        <TabHeader
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          fieldsData={dataSchema}
        />
      )}
      {dataSchema && data && (
        <BuildQuadarnt fieldData={dataSchema[0]} datas={data} />
      )}
    </div>
  );
}
