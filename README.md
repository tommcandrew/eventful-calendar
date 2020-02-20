[<p align="center"><img src="./client/src/5-images/calendar-icon.png" width="200px"></p>](http://eventful-calendar.co.uk/)

<h1 style="text-align: center">Eventful</h1>

<h2 style="text-align: center">A calendar app built with React, Node.js, Express and MongoDB.</h2>

---

### FEATURES OVERVIEW

- Authentication system with password encryption and JSON web tokens
- Add, Edit, Delete events
- Drag and drop events
- Add time and/or emoji to events &#128054;
- Toast alerts when event saved/deleted
- Automatic chronological ordering of events
- Automatic fetching of national holidays and festival based on user’s location
- Light and dark mode &#127774; &#127768;
- Choice of four languages - English, Spanish, French and Turkish
- Choice of over 200 countries for national holidays &#127757;
- Settings preferences saved in local storage
- Responsive design
- Printable

### CONTENTS

- [Installation](#installation)
- [Technologies](#technologies)
- [APIs](#apis)
- [How it works](#howitworks)
  - [Authentication](#authentication)
  - [Adding events](#adding-events)
  - [Editing events](#editing-events)
  - [Deleting events](#deleting-events)
  - [Drag and drop](#drag-and-drop)
  - [Events bars](#event-bars)
  - [Ordering of events](#ordering-of-events)
  - [Light and dark mode](#light-and-dark)
  - [Languages](#languages)
  - [Holidays](#holidays)
  - [Responsive design](#responsive)
  - [Printing](#printing)
  - [Changing the date](#changing-date)

### INSTALLATION

<span id="installation" />
To run this project on your own computer:

1. Clone/download the repo
2. Run npm install in both the root directory and the client directory
3. In the following files in client/src/2-context, delete "/api" from the beginning of the urls passed into the axios calls and replace it with “http://localhost:5000”:

- AuthContext.js
- HolidaysContext.js
- EventsContext.js

4. Sign up to [OpenCageData](https://opencagedata.com/api) and [Calendarific](https://calendarific.com) (for free) to get your own API keys and include them in server.js or put them in a .env file.
5. In the parent directory, run npm run dev (this starts the server with Nodemon and starts the React project simultaneously)

### TECHNOLOGIES

<span id="technologies" />

- [React](https://github.com/facebook/react) - frontend framework
- [Node.js](https://github.com/nodejs/node) - JavScript runtime environment for the backend REST API
- [Express](https://github.com/expressjs/express) - framework for Node.js
- [MongoDB](https://www.mongodb.com/) - database
- [Mongoose](https://github.com/Automattic/mongoose) - framework for interacting with MongoDB
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme) - for encryption of user passwords
- [Axios](https://github.com/axios/axios) - for calls to backend and APIs
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme) - tokens for authentication
- [UUID](https://github.com/uuidjs/uuid) - for random ids (used for events)
- [React Router](https://github.com/ReactTraining/react-router) - for routing
- [Font Awesome](https://github.com/FortAwesome/Font-Awesome) - for icons
- [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) - for drag and drop functionality

### APIs

<span id="apis" />

- [Calendarific](https://calendarific.com) - for data on holidays/festivals
- [OpenCage Geocoder](https://opencagedata.com/) - to identify country based on coordinates

### HOW IT WORKS

<span id="howitworks" />

#### AUTHENTICATION

<img src="./gifs/login.gif" width="600" id="authentication">

The app uses the built-in HTML5 form validation during registration but also custom validation to ensure that the email address ends with a TLD and that the passwords match. Custom styling is also used to indicate whether a form input has been filled with valid data (green background if valid, red if not).
If the user attempts to register with invalid data, or if the email address is already registered, the validation system on the backend will return a custom error message.

If all data is valid, the password will be hashed with bcrypt and the new user will be saved in the database. After registration (or logging in) successfully, a JSON web token will be signed (using the jsonwebtoken package) and returned to the frontend where it will be saved in local storage. Also, the authenticated value in app context will be set to true and the user will be redirected to the main calendar page.

When the user attempts to perform any CRUD operation, a middleware function runs which verifies the token sent along with the request.

The user can log out of the app by clicking on the My Account icon in the top right of the screen and clicking the log out button. When they do this, authenticated will be set to false, the token in local storage will be deleted and they will be redirected to the home screen.

#### ADDING EVENTS

<img src="./gifs/add-event.gif" width="600" id="adding-events">

When a day in the calendar is clicked, the Day Events modal opens showing a list of events on that day, if there are any. The Add Event button opens another modal which has a text input for the event title (required) as well as buttons that open menus to add a time and emojis (optional). All CRUD operations are managed in the EventContext file. To ensure high performance, updates are made optimistically, so the app state is updated first and the database is updated after this.

When the database has been updated, a toast alert appears from the top of the screen. A toast alert will also appear if the update failed. The message that appears in the alert is set in the context file. A timeout is also set in this file so that the alert disappears after a few seconds.

#### EDITING EVENTS

<span id="editing-events" />

To edit an event's info, the user just clicks on the event and then clicks the Edit button. This opens the same form used when first adding the event but each input will be populated with the event's info, including the time and emoji inputs. The user can edit or remove these before re-saving the event. If the user wants to move the event to a different date, they can do this by dragging and dropping (see below).

#### DELETING EVENTS

<span id="deleting-events" />

Events can be deleted with the delete button which is next to the Edit button in the Day Events modal.

#### DRAG AND DROP

<img src="./gifs/move-event.gif" width="600" id="drag-and-drop">

Thanks to the react-beautiful-dnd library, events can be easily dragged and dropped in a different day. The event will then be updated in the database. This library provides a Draggable component (the events) and a Droppable component (the days). Droppables require a unique id. A date string has been used for these ids. This way, when an event is dropped, the date of the destination day can be extracted from the Droppable id in the onDragEnd function and the event data can be updated accordingly.

#### EVENT BARS

<span id="event-bars" />

Events are represented in the calendar as 'bars' with the title as well as any emoji or time that user has also added. These bars stack on top of each other in the day cells. Obviously, space is limited, so if a single day has more than 4 events, just a single bar is displayed which says the number of events there are. The user can click on the day to see the list of events.

#### ORDERING OF EVENTS

<span id="ordering-of-events" />

In the Utils folder, there is a sorting function called sortEvents. This is used to order events chronologically in each day, in the My Events modal (which lists all events in each year) as well as in the Day Events modal. It works by first comparing the years of events, then months, then days and so on, until the order can be determined. Events are left in the same order as in the database if there is no difference in time.

#### LIGHT AND DARK MODE

<img src="./gifs/change-theme.gif" width="600" id="light-and-dark">

One of the options in settings is to choose between a light mode and dark mode. Light mode is the default and, with this set, days and modals will have a white background. In dark mode, the background color of days and modals is dark blue/purple. The styling is controlled using the Context API which tells each component which mode is currently set. This is then used to conditionally add classNames, e.g. month--dark. When the user changes this setting, the new preference is saved in local storage so it will be the same the next time they log in.

#### LANGUAGES

<span id="languages" />

Users can choose between four languages - English (default), French, Spanish and Turkish. The file siteText.js contains translations of each piece of text used in the app in the four languages. The correct option is retrived using bracket notation with the language value passed down from LanguageContext. There are separate files for the months and weekdays, also in the the four languages.

#### HOLIDAYS

<img src="./gifs/location.gif" width="600" id="holidays">

On authentication, the app makes a call to the Calenderific API to get a list of supported countries (if not already saved in local storage). These are then used to populate the location menu in settings. Also, the app checks local storage for the user's preference for holidays - whether they should be displayed in the calendar or not. If nothing is found, it's set to the default - 'Show'.

Whenever the holidays preference changes, the new preference is saved in local storage. If it's being changed from 'Hide' to 'Show', the app checks local storage for a saved location object. If found, it sets state with it, if not found, it attempts to get the user's location. This is done with the Geolocation API and specifically the getCurrentPosition() method. If permission is given, the coordinates obtained are then used in a call to the OpenCage API which sends back the name of the country the user is located in as well as the country code. These are then saved in state in the HolidaysContext file. If permission is not given to access the user's location, the United Kingdom is set as the default.

Whenever the location object in HolidaysContext state changes, the country object is saved to local storage. Before making an API call to get holidays for that country, the app checks the storedHolidays array to see if they've already been saved there and, if not, it checks local storage. If the correct holidays are not found in either, it makes the API call.

fetchHolidays() makes a call to the backend which in turn makes a call to the Calendarific API. The holidays in the response are filtered for national holidays, common local holidays and observances. These are then saved to state and are in turn passed down to other components so they can be displayed in the calendar as well as in the Day Events modal.

Although the app's location will be set to the user's location if they grant access, they can easily change it if they would like to see holidays from a different country. In settings under Language, there is a text input, the value of which will be whatever the current location is set to. To change it, the user can simply delete the value in the input field and type the name of a different country. This input has auto-complete functionality so, after starting to type, the user will see a list of all the matching options.

#### RESPONSIVE DESIGN

<img src="./gifs/mobile.gif" width="200" id="responsive">

On mobile screens, only month-view is available. Also, the row of icons for My Account, My Events, Settings and Print does not appear in the header. Instead, there is a hamburger menu icon which opens an expanding menu with links to these components.

#### PRINTING

<span id="printing" />

A printer icon is in the top right of the screen. When clicked, it will open the print window on the user's computer ready to print whatever screen they were looking at (either whole year-view or single month-view). The orientation of the page will be set to landscape automatically. This is achieved with a media query.

#### CHANGING THE DATE

<span id="changing-date" />

There are three ways to change the current date of the calendar. In month view, the user can click the arrows to go forward or back one month. The setMonth function which is triggered checks to see whether the new month index is either -1 or 12, meaning that the user has moved into the previous or following year respectively, and updates the year accordingly.

In year view, there are also arrows which change the year either forward or back. A faster alternative to the arrows (if changing more than just a few years (is to click on the date at in the calendar header in month-view. A drop down menu will appear with two scrollable lists - one for months and the other for years. The user can quickly jump to any month/year in the last century.

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
