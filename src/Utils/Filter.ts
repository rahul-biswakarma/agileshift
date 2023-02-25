export let dummyData = [
    {
      id: "TKT-1",
      title: "Add Responsiveness",
      owner: {
        name: "Rahul",
        avatar:
          "https://i.pinimg.com/236x/52/fe/87/52fe873be054e7f8345c65281b02c63b.jpg",
      },
      tag: [
        {
          color: "#FFFFFF",
          tagName: "Now",
        },
      ],
    },
    {
      id: "TKT-2",
      title: "Add Custom Theme",
      stage: "Queued",
      owner: {
        name: "Nikhil",
        avatar:
          "https://i.pinimg.com/236x/52/fe/87/52fe873be054e7f8345c65281b02c63b.jpg",
      },
      tag: [
        {
          color: "#000000",
          tagName: "Now",
        },
        {
          color: "#123456",
          tagName: "Now",
        },
        {
          color: "#943F43",
          tagName: "Now",
        },
      ],
    },
    {
      id: "TKT-3",
      title: "Add Responsiveness",
      stage: "Work In Progress",
      owner: {
        name: "Rahul",
        avatar:
          "https://i.pinimg.com/236x/52/fe/87/52fe873be054e7f8345c65281b02c63b.jpg",
      },
      tag: [
        {
          color: "#FFFFFF",
          tagName: "Next",
        },
      ],
    },
  ];
  
  let dummyFieldData = [
    {
      name: "Tickets",
      list: [
        { columnTitle: "id", columnType: "id" },
        { columnTitle: "title", columnType: "title" },
        { columnTitle: "stage", columnType: "string" },
        { columnTitle: "owner", columnType: "user" },
        { columnTitle: "tag", columnType: "tag" },
      ],
      color: "pink",
      icon: "confirmation_number",
      linkage: [],
    },
    {
      name: "Issues",
      list: [
        { columnTitle: "id", columnType: "id" },
        { columnTitle: "title", columnType: "title" },
        { columnTitle: "stage", columnType: "string" },
        { columnTitle: "owner", columnType: "user" },
        { columnTitle: "tag", columnType: "tag" },
      ],
      color: "amber",
      icon: "warning",
      linkage: [],
    },
    {
      name: "Bugs",
      list: [
        { columnTitle: "id", columnType: "id" },
        { columnTitle: "title", columnType: "title" },
        { columnTitle: "stage", columnType: "string" },
        { columnTitle: "owner", columnType: "user" },
        { columnTitle: "tag", columnType: "tag" },
      ],
      color: "lime",
      icon: "bug_report",
      linkage: [],
    },
  ];

