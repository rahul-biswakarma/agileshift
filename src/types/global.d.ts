export {};

declare global{
    type TYPE_ISSUE={

    }
    type TYPE_TICKET={

    }
    type TYPE_PARTS={

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
        [key:string]:[{}];//to be changed
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
        issues:TYPE_ISSUE[];//to be changed
        ticket:TYPE_TICKET[];//to be changed
        tags:TYPE_TAGS[];
        parts:TYPE_PARTS[];//to be changed
        notifications:TYPE_NOTIFICATION[];
        tasks:TYPE_TASKS;
        
    }

    type TYPE_USER={
        id:string;
        email:string;
        avatar:string;//url of the avatar
        organisation:string[];//array of organisation ids
    }
}