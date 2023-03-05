// import React, { useState, useEffect, useRef } from "react";

// import { Message } from "../../types";

// import Editor from "./editor";
// import SingleMessage from "./singleMessage";

// type ChatModuleType = { messageData: any };

// export default function ChatModule(props: any) {
// 	const [currentDate, setCurrentDate] = useState("");
// 	const messagesEndRef = useRef<HTMLDivElement>(null);

// 	useEffect(() => {
// 		if (messagesEndRef.current) {
// 			messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
// 		}
// 	}, [props.conversations]);

// 	useEffect(() => {
// 		if (props.conversations[0].dateOfCreation) {
// 			let currentDate = new Date(
// 				props.conversations[0].dateOfCreation
// 			).toLocaleDateString();

// 			setCurrentDate(currentDate);
// 		}
// 	}, []);

// 	return (
// 		<div
// 			id="messages-container-channel"
// 			className="w-full"
// 		>
// 			{props.conversations.map((message: any, index: number) => {
// 				return (
// 					<SingleMessage
// 						key={index}
// 						messageIndex={index}
// 						messageData={message}
// 						currentDate={currentDate}
// 						setCurrentDate={setCurrentDate}
// 					/>
// 				);
// 			})}
// 			<div ref={messagesEndRef}></div>
// 			<Editor
// 				channelId={props.channelId}
// 				userId={props.userId}
// 			/>
// 		</div>
// 	);
// }

import React from "react";

export default function index() {
  return <div>index</div>;
}
