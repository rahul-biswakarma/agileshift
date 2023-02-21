export {};

declare global{
    type TYPE_TICKETS_SCHEMA={
        [key:string]:string;
    }
    type TYPE_ISSUES_SCHEMA={
        [key:string]:string;
    }
    type TYPE_PARTS_SCHEMA={
        [key:string]:string;
    }
    type TYPE_TAGS={
        color:string;//hash code of color
        tagName:string;
    }
    type TYPE_NOTIFICATION={
        type:string;//issues, tickets, or parts.
        id:string;//id of ticket or issues mentioned in update
        message:string;
        isRead:boolean;
    }
    type TYPE_VISTA={
        [key:string]:string;
    }
    type TYPE_VISTAS={
        [key:string]:TYPE_VISTA[];//to be changed
    }
    type TYPE_TASK={
        id:string;
        taskName:string;
    }
    type TYPE_TASKS={
        [key:string]:TYPE_TASK[];
    }
    type TYPE_ORGANISATION={
        id:string;
        name:string;
        dateOfCreation:string;
        users:string[];
        profileImageUrl:string;
        vista:TYPE_VISTA;
        issues:undefined;
        issues_schema:TYPE_ISSUES_SCHEMA;
        tickets:undefined;
        ticket_schema:TYPE_TICKETS_SCHEMA;
        parts:undefined;
        parts_schema:TYPE_PARTS_SCHEMA;
        tags:TYPE_TAGS[];
        notifications:TYPE_NOTIFICATION[];
        tasks:TYPE_TASKS;
        
    }

    type TYPE_USER={
        id:string;
        name:string;
        email:string;
        avatar:string;//url of the avatar
        organisation:string[];//array of organisation ids
    }
}