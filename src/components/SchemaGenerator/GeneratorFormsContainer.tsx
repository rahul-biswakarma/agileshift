import { useState } from "react";
import OrganisationForm from "../ManageOrganization/OrganisationForm";
import { SchemaGenerator } from "./SchemaGenerator";

export const GeneratorFormsContainer = () => {
  const [ticketColumnList, setTicketColumnList] = useState<TYPE_TICKETS_SCHEMA[]>([
    { columnName: "Ticket Name", columnType: "string"},
    { columnName: "Created By", columnType: "user" },
    { columnName: "Tag", columnType: "tag" },
  ]);
  const [issueColumnList, setIssueColumnList] = useState<TYPE_ISSUES_SCHEMA[]>([
    { columnName: "Ticket Name", columnType: "string" },
    { columnName: "Created By", columnType: "user" },
    { columnName: "Tag", columnType: "tag" },
  ]);
  const [partColumnList, setPartColumnList] = useState<TYPE_PARTS_SCHEMA[]>([
    { columnName: "Ticket Name", columnType: "string" },
    { columnName: "Created By", columnType: "user" },
    { columnName: "Tag", columnType: "tag" },
  ]);

  return (
    <div className="w-screen h-screen flex divide-x divide-dark_gray">
      <OrganisationForm />
      <SchemaGenerator
        type="Tickets"
        list={ticketColumnList}
        setList={setTicketColumnList}
      />
      <SchemaGenerator
        type="Issues"
        list={issueColumnList}
        setList={setIssueColumnList}
      />
      <SchemaGenerator
        type="Parts"
        list={partColumnList}
        setList={setPartColumnList}
      />
    </div>
  );
};
