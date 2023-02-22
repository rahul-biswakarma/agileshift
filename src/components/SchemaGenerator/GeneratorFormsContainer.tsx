import { useState } from "react";
import OrganisationForm from "../ManageOrganization/OrganisationForm";
import { SchemaGenerator } from "./SchemaGenerator";

export const GeneratorFormsContainer = () => {
  const [ticketColumnList, setTicketColumnList] = useState<
    TYPE_TICKETS_SCHEMA[]
  >([
    { columnName: "Ticket Name", columnType: "string" },
    { columnName: "Created By", columnType: "user" },
    { columnName: "Tag", columnType: "tags" },
  ]);
  const [issueColumnList, setIssueColumnList] = useState<TYPE_ISSUES_SCHEMA[]>([
    { columnName: "Ticket Name", columnType: "string" },
    { columnName: "Created By", columnType: "user" },
    { columnName: "Tag", columnType: "tags" },
  ]);
  const [partColumnList, setPartColumnList] = useState<TYPE_PARTS_SCHEMA[]>([
    { columnName: "Ticket Name", columnType: "string" },
    { columnName: "Created By", columnType: "user" },
    { columnName: "Tag", columnType: "tags" },
  ]);

  const [activeTab, setActiveTab] = useState("Organisation");

  return (
    <div className="w-screen h-screen flex divide-x divide-dark_gray">
      <OrganisationForm activeTab={activeTab} setActiveTab={setActiveTab} />
      <SchemaGenerator
        type="Tickets"
        list={ticketColumnList}
        setList={setTicketColumnList}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <SchemaGenerator
        type="Issues"
        list={issueColumnList}
        setList={setIssueColumnList}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <SchemaGenerator
        type="Parts"
        list={partColumnList}
        setList={setPartColumnList}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};
