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
    type TYPE_ORGANISATION={
        id:string;
        name:string;
        dateOfCreation:string;
        users:string[];
        profileImageUrl:string;
        vista:{};//to be changed
        issues:TYPE_ISSUE[];//to be changed
        ticket:TYPE_TICKET[];//to be changed
        tags:TYPE_TAGS[];
        parts:TYPE_PARTS[];
    }
}