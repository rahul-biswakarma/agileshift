import { doc, onSnapshot } from "firebase/firestore";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { db } from "../../../firebaseConfig";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setNewSidBar } from "../../../redux/reducers/SideBarSlice";
import { RootState } from "../../../redux/store";
import { get_data_byID } from "../../../Utils/Backend";
import CustomButton from "../../common/Button";
import Editor from "../../common/editor";
import { DisplayIdComponent } from "../../DataTable/displayIdComponentContainer";
import { MessageWrapperComponent } from "./MessageWrapperComponent";

type TYPE_Chat = {
	[key:string]:TYPE_MESSAGE[]
}

type TYPE_ConversationTabProps = {
	tabColaps: Boolean;
	setColapsTabBar: Function;
	sidebar: Type_SidebarState;
	index: number;
};

export default function ConversationsTab(props: TYPE_ConversationTabProps) {
	const organizationId = useAppSelector((state)=>state.auth.organisationId)
	const fieldColorMap = useAppSelector((state)=>state.datatable.fieldColorMap)
	const dispatch = useAppDispatch();
	const [sideBarList] = React.useState(
		useSelector((state: RootState) => state.sidebar.sideBarData)
	);

	const [chat, setChat] = React.useState<TYPE_Chat>({});
	const [fieldData, setFieldData] = React.useState<any>({});

	const fetchChatDataCallback = React.useCallback(() => {
		const fetchChatData = async () => {
			onSnapshot(
				doc(db, "conversations", props.sidebar.fieldId!), 
				(doc) => {
					setChat(doc.data() as TYPE_Chat);
				}
				);
			};
		if(props.sidebar.fieldId){
			const fetchFieldData = async () => {
				const fieldDataFromBackend = await get_data_byID(organizationId, props.sidebar.fieldId!)
				setFieldData(fieldDataFromBackend);
			}
			fetchFieldData()
		}
		fetchChatData();
	}, [props.sidebar.fieldId, organizationId]);

	React.useEffect(() => {
		fetchChatDataCallback();

		// Scroll to bottom of chat section
		if (chatRef.current) {
			chatRef.current.scrollTop = chatRef.current.scrollHeight;
		}
	}, [fetchChatDataCallback]);

	const handleClose = () => {
		dispatch(
			setNewSidBar(
				sideBarList.filter((sideBar, index) => 
					index !== props.index
				)
			)
		);
	};
	const chatRef = useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		// Scroll to bottom of chat section whenever chat data is updated
		if (chatRef.current) {
			chatRef.current.scrollTop = chatRef.current.scrollHeight;
		}
	}, [chat]);

	if (props.tabColaps) {
		return (
			<div
				className="[writing-mode:vertical-rl] border-r-2 border-brown-500 h-full w-[50px] flex justify-center items-center text-xl  cursor-pointer bg-background_color py-4"
				onClick={() => {
					props.setColapsTabBar(props.index);
				}}
			>
				<DisplayIdComponent
					displayId={fieldData.displayId}
					color={fieldColorMap[fieldData.field]}
					field={fieldData.field}
				/>
				<span className="mt-2">Conversations</span> 
			</div>
		);
	} else {
		return (
			<div
				className="flex flex-col w-[400px] h-full max-h-full bg-sidebar_bg backdrop-filter backdrop-blur-md bg-opacity-10 
					border-l border-[#444444]"
			>
				<CustomButton
					icon={"close"}
					onClick={handleClose}
					className="absolute right-0 top-0 flex items-center justify-center p-3 text-white hover:text-red-400"
				/>
				<p className="pl-4 py-3">Conversations</p>

				<div className="flex flex-1 items-end">
					<section
						ref={chatRef}
						className="max-h-[calc(100vh-50px-3rem)] px-4 h-auto overflow-y-auto w-full"
					>
						{chat &&
							Object.keys(chat).map((day: any, index: number) => {
								return (
									<MessageWrapperComponent key={index} index={index} chat={chat[day]} day={day}/>
								);
							})}
					</section>
				</div>

				<div className="sticky bottom-0 h-10 w-[100%] px-4 mb-4 flex items-center justify-center">
					<Editor id={props.sidebar.fieldId!} />
				</div>
			</div>
		);
	}
}
