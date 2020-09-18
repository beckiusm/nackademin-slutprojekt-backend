# Slutprojekt - Programmering BackEnd 2

## Arbetssätt
Planering och strukturering av arbetet sker i Trello, arbeta utefter Git Flow.

## Instruktioner
Utse en gruppledare som forkar det här repot och bjuder in de andra som collaborators.

Ni ska bygga en BackEnd till en webbshop med en färdig FrontEnd.

Repot innehåller en boilerplate för att komma igång.

Boilerplaten har en public folder och en minimal express app som servar de statiska filerna.

Starta servern och surfa in på den för att se FrontEnden.

## SINUS Webshop FrontEnd

SINUS Webshop är en onlinebutik som säljer skateboards och tillbehör.

Webshoppen ska ha 3 olika lägen
* Anonym besökare
* Inloggad Kund
* Inloggad Admin

### Anonym besökare
Anonyma besökare kan registrera sig och genomföra ordrar.

### Inloggad Kund
Inloggade besökare kan genomföra ordrar och se sin kontoinformation.

### Inloggad Admin
Administratörer har en extra view där hen kan administrera produkter.

### API Specifikation

| Resurs | Metod | Detaljer |
| ------ | ------ | ------ |
| /api/auth/ | POST | Authentiserar user med email & password. Returnerar en JWT-token som används vid varje anrop API:et i en Authorization-header. |
| /api/register/ | POST | Registrerar en user enligt User-modellen. |
| /api/products/ | GET | Returnerar en lista på samtliga produkter. |
| /api/products/:id | GET | Returnerar en enstaka produkt. |
| /api/products/ | POST | Skapar en ny produkt, se produkt-modell. Enbart tillgänglig för admins |
| /api/products/:id | PATCH | Uppdaterar produkt, se produkt-modell. Enbart tillgänglig för admins |
| /api/products/:id | DELETE | Tar bort en produkt med :id. Enbart tillgänglig för admins |
| /api/orders | GET | Returnerar en lista på samtliga ordrar för admins, och ägda orders för inloggad användare. |
| /api/orders | POST | Skapar en ny order, se order-modell. |

### Auth End-Point Response
```js
{
  token: "TJOSSAN",
  user: {
    email: "kdajsdaskj",
    name: "fkdjsofksj",
    role: "customer",
    adress: {
      street: "omg",
      zip: "shiet",
      city: "Smygehuk"
    }
  }
}
```

### Datamodeller

#### Product

```javascript
 {
    _id: '39y7gbbZk1u4ABnv',
    title: 'Gretas Fury',
    price: 999,
    shortDesc: 'Unisex',
    longDesc: 'Skate ipsum dolor sit amet...',
    imgFile: 'skateboard-greta.png'
} 
```

#### Order
```javascript
 {
    _id: 123,
    timeStamp: Date.now(), 
    status: 'inProcess',
    items: [ <productId1>, <productId2>, ... ],
    orderValue: 999
} 
```

#### User
```javascript
 {
    _id: '6b521d3f-3d15...' // add server side
    email: 'johan.kivi@zocom.se',
    password: '$$$hashed password$$$',
    name: 'Johan Kivi',
    role: 'admin', // or customer

    adress: {
        street: 'Tokitokvägen 3',
        zip: '123 45',
        city: 'Tokberga'
    },
    orderHistory: [ orderId1, orderId2, ... ]
} 
```


## Bedömning

### G-krav
* Git Flow
* MVC
* JWT och bcrypt
* RBAC
* Enhetstester och integrationstester för modeller och kontroller
* Github Action som kör testerna automagiskt

### VG-krav
* Staging miljö i Heroku med en Mongo Atlas databas

## Redovisning
Fredag 25/9 knyter vi ihop hela kursen med redovisningar.
