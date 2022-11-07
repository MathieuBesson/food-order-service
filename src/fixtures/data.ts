export const foods = [
    {
        name: "steak",
        type: "viande",
        quantity: 15,
        date: new Date("2022-10-24T10:27:23.906+00:00"),
    },
    {
        name: "frite",
        type: "féculent",
        quantity: 20,
        date: new Date("2022-10-24T10:27:23.906+00:00"),
    },
    {
        name: "carrote",
        type: "légume",
        quantity: 25,
        date: new Date("2022-10-24T10:27:23.906+00:00"),
    },
    {
        name: "poirreau",
        type: "légume",
        quantity: 25,
        date: new Date("2022-10-24T10:27:23.906+00:00"),
    },
    {
        name: "saucisse",
        type: "viande",
        quantity: 10,
        date: new Date("2022-10-24T10:27:23.906+00:00"),
    },
    {
        name: "riz",
        type: "féculent",
        quantity: 20,
        date: new Date("2022-10-24T10:27:23.906+00:00"),
    },
    {
        name: "pain burger",
        type: "féculent",
        quantity: 20,
        date: new Date("2022-10-24T10:27:23.906+00:00"),
    },
    {
        name: "tomate",
        type: "fruit",
        quantity: 20,
        date: new Date("2022-10-24T10:27:23.906+00:00"),
    },
    {
        name: "mozza",
        type: "fromage",
        quantity: 20,
        date: new Date("2022-10-24T10:27:23.906+00:00"),
    },
    {
        name: "salade",
        type: "legume",
        quantity: 20,
        date: new Date("2022-10-24T10:27:23.906+00:00"),
    },
    {
        name: "sauce aziat",
        type: "sauce",
        quantity: 20,
        date: new Date("2022-10-24T10:27:23.906+00:00"),
    },
    {
        name: "boulette de viande",
        type: "viande",
        quantity: 20,
        date: new Date("2022-10-24T10:27:23.906+00:00"),
    },
];

export const dishs = [
    {
        name: "burger & frites",
        foods: [
            {
                quantity: 1,
                fixtureId: 0,
            },
            {
                quantity: 1,
                fixtureId: 1,
            },
            {
                quantity: 2,
                fixtureId: 6,
            },
            {
                quantity: 2,
                fixtureId: 7,
            },
        ],
        type: "plat de resistance",
        date: new Date("2022-10-24T10:27:23.906+00:00"),
    },
    {
        name: "salade fromagère",
        foods: [
            {
                quantity: 2,
                fixtureId: 7,
            },
            {
                quantity: 2,
                fixtureId: 8,
            },
            {
                quantity: 2,
                fixtureId: 1,
            },
        ],
        type: "entrée",
        date: new Date("2022-10-24T10:27:23.906+00:00"),
    },
    {
        name: "soupe de légumes",
        foods: [
            {
                quantity: 2,
                fixtureId: 2,
            },
            {
                quantity: 2,
                fixtureId: 3,
            },
            {
                quantity: 2,
                fixtureId: 7,
            },
        ],
        type: "entrée",
        date: new Date("2022-10-24T10:27:23.906+00:00"),
    },
    {
        name: "salade japonaise",
        foods: [
            {
                quantity: 2,
                fixtureId: 5,
            },
            {
                quantity: 1,
                fixtureId: 10,
            },
            {
                quantity: 2,
                fixtureId: 11,
            },
        ],
        type: "entrée",
        date: new Date("2022-10-24T10:27:23.906+00:00"),
    },
];

export const users = [
    {
        login: "admin",
        password: "admin",
        date: new Date("2022-10-24T10:27:23.906+00:00"),
    },
];
