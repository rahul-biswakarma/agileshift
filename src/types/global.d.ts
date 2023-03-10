export {};

declare global {
	type TYPE_SCHEMA = {
		[key: string]: string;
	};
	type Type_SIDEBARSTATE = {
		displayId: string;
		fieldId?: string;
		type: string;
		createModeCalledByField?: string; // this is the field that called the create mode
		linkedCalledByID?: string; // this is the id of the field that called the link
		fieldName?: string;
		id?: string;
		linkedData?: string[];
		columnName?: string;
		columnType?: string;
		parentId?: string;
		displayId?: string;
		modeOfCall?: string;
	};
	type TYPE_TAG = {
		color: string; //hash code of color
		tagName: string;
	};
	type TYPE_NOTIFICATION = {
		dateOfCreation: string;
		isSeen: boolean;
		notificationData: string;
		notificationId: string;
		data?:{
			dataId: string;
			field: string;
			color: string;
			displayId:string
		}
	};
	type TYPE_VISTA = {
		[key: string]: string;
	};
	type TYPE_VISTAS = {
		[key: string]: TYPE_VISTA[]; //to be changed
	};
	type TYPE_TASK = {
		id: string;
		taskName: string;
	};
	type TYPE_TASKS = {
		[key: string]: TYPE_TASK[];
	};
	type TYPE_FIELD = {
		name: string;
		list: TYPE_SCHEMA[];
		color: string;
		icon: string;
		linkage: string[];
		parentId?: string;
	};
	type TYPE_ORGANISATION = {
		id: string;
		name: string;
		dateOfCreation: string;
		users: string[];
		profileImageUrl: string;
		vista: TYPE_VISTA;
		issues: undefined;
		issues_schema: TYPE_ISSUES_SCHEMA[];
		tickets: undefined;
		ticket_schema: TYPE_TICKETS_SCHEMA[];
		parts: undefined;
		parts_schema: TYPE_PARTS_SCHEMA[];
		tags: TYPE_TAG[];
		notifications: TYPE_NOTIFICATION[];
		tasks: TYPE_TASKS;
	};
	type TYPE_USER = {
		id: string;
		name: string;
		email: string;
		avatar: string; //url of the avatar
		organisation: string[]; //array of organisation ids
	};
	type TYPE_FIELD = {
		name: string;
		list: TYPE_SCHEMA[];
		color: string;
		icon: string;
		linkage: string[];
	};

	type TYPE_MESSAGE = {
		email:string,
		message:string,
		name:string,
		senderId:string,
		senderImg:string,
		timeStamp:number
	}
	type TYPE_LINKED_DATA = {
		id: string;
		displayId: string;
		color: string;
		fieldName:string
	}
}
