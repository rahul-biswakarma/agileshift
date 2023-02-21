import { useState } from "react";
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
  return (
    <div className="w-screen h-screen flex divide-x divide-dark_gray">
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
