import React from "react";

type Type_TicketIdComponentProps = {
	ticketId: string;
};

const TicketIdComponent = (props: Type_TicketIdComponentProps) => {
	return <div className="">{props.ticketId}</div>;
};

export default TicketIdComponent;
