import { ROLE } from "../../src/user/user.type";

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
        quantity: 0,
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
        image: "https://www.aucoindemarue.fr/wp-content/uploads/2020/06/Au-Coin-De-Ma-Rue-courses-en-ligne-Burger-frites-1200x900.jpg",
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
        image: "https://s3.eu-central-1.amazonaws.com/media.quitoque.fr/recipe_w1536_h1024/recipes/images/salade-romaine-poulet-roti-pates-rigate-tomate-cerise-comte-sauce-fromagere/salade-romaine-poulet-roti-pates-rigate-tomate-cerise-comte-sauce-fromagere-1.jpg",
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
        image: "https://assets.afcdn.com/recipe/20130204/35645_w1024h1024c1cx1250cy1875.jpg",
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
        image: "https://img-global.cpcdn.com/recipes/adbca7ee9bb8c162/680x482cq70/salade-de-chou-a-la-japonaise-photo-principale-de-la-recette.jpg",
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

export const orders = [
    {
        dishs: [
            {
                quantity: 1,
                fixtureId: 0,
            },
            {
                quantity: 1,
                fixtureId: 1,
            },
        ],
        transmitted: false,
        date: new Date("2022-10-24T10:27:23.906+00:00"),
    },
    {
        dishs: [
            {
                quantity: 2,
                fixtureId: 1,
            },
            {
                quantity: 3,
                fixtureId: 2,
            },
        ],
        transmitted: false,
        date: new Date("2022-10-24T10:27:23.906+00:00"),
    },
];

export const users = [
    {
        login: "admin",
        password: "azerty1234",
        roles: [ROLE.ADMIN, ROLE.CLIENT],
        date: new Date("2022-10-24T10:27:23.906+00:00"),
    },
];
