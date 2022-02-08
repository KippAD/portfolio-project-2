# **The Capitals of the World Quiz**

## **Brief**

The Capitals of the World Quiz is a multiple choice quiz game that tests a user's knowledge of nation capitals throughout the world. The quiz includes 243 questions spread across three quiz difficulties and aims to provide the user with an engaging and challenging game experience.
[Link to the live site]()

---

<p  align="center"><img  src="" alt="" width="75%"></p>

---

## Contents 
- [UX (User Experience)](#ux-user-experience)
    - [Objectives](#objectives)
    - [Target Audience](#target-audience)
    - [Action Plan](#action-plan)
- [Design](#design)
    - [Inspiration](#inspiration)
    - [Color Scheme](#color-scheme)
    - [Typography](#typography)
    - [Wireframes](#wireframes)
- [Features](#features)
    - [Current Features](#current-features)
    - [Future Features](#future-features)
- [Technology](#technology)
- [Testing](#testing)
- [Deployment](#deployment)
    - [To deploy the project](#to-deploy-the-project)
    - [To clone the project](#to-clone-the-project)
- [Credits](#credits)
    - [Code](#code)
    - [Media](#media)
    - [Acknowledgements](#acknowledgments)

---

## **UX (User Experience)**

### **Objectives**
The UX objectives of the project are:

1. The application interface is intuitive to a first time user, the function and purpose clear, and the navigation progressive and natural. The user enjoys using the site and actions are second nature to them.

2. To build an application with an aesthetically pleasing design that is responsive across multiple devices, and that elicits a positive emotional response from the user.

[Back to contents](#contents)

### **Target Audience**
The target audience for this project has the scope to be very broad. Some examples include: 

- Children/younger people using the game for education.
- Recreational/casual users playing for entertainment.
- Users that are serious about geography, playing to revise/test their knowledge.

[Back to contents](#contents)

### **Action Plan**
The Capitals of the World Quiz was designed to meet the UX objectives and ensure that each of these target demographics has a positive experience
 
1. Navigation is clear so that users of all ages are able to move through the game easily. Where a user can initiate an action it is obvious and clearly marked with buttons and icons. Feedback is given to user actions through modals, elements responding to mouse, tooltips and sound effects.

2. Questions are divided into different difficulties, enabling casual or younger users to work through the game incrementally without being overloaded with questions that are too difficult, and allowing more advanced users to test their knowledge of tougher questions. These difficulties can be unlocked when a user achieves a certain threshold of correct answers, adding an objective to the game and meaning that users will be able to settle on their level of difficulty through playing. 

3. The design is responsive to different devices and screen widths, maintaining its aesthetic throughout the application. This makes the user's time on the application more enjoyable and increases the likelihood of them returning.


[Back to contents](#contents)

## **Design**

### **Inspiratione**
---
The design of the application drew inspiration from old explorer maps from the 1800’s. The background was selected for its aged and haggard feeling, and the game panel is meant to look loosely like a telegram message that might have been found around the same time.

[Back to contents](#contents)

### **Color Scheme**
---
  
<p  align="center"><img  src="" alt="The color scheme developed for the Capitals of the World Quiz" width="75%"></p>

The colors on the application were generated with [**Coolors**](https://coolors.co/), and were chosen to complement the map and chosen aesthetic.

[Back to contents](#contents)

### **Typography**
---

<p  align="center"><img  src="" alt="An example of the inconsolata font" width="75%"></p>

**Inconsolata** is the only font used in the application. This particular font was chosen due to its resemblance to the sort of typography seen on a telegram.
  
[Back to contents](#contents)
 
### **Wireframes**
---

<p  align="center"><img  src="" alt="Wireframes of the capitals of the world quiz" width="75%"></p>

**Figma** was used to wireframe the design of the application.

[Back to contents](#contents)

## Features

### **Current Features**
---

### **Main Menu**
---

<p  align="center"><img  src="" alt="The Capitals of the World Quiz main menu" width="75%"></p> 

The main menu is the first thing that the user sees when loading the application and where they access all of the other areas.

- The main title and subheading prioritizes explaining the purpose of the application to the user.
- Menu buttons indicate navigation options to the user. (To initiate the game, to read the rules, and to check high scores).
- The icons for home, sound, and social media are fixed to the panel and accessible from anywhere on the site.
- The sound icon toggles game sounds on and off.

### **Username Input**
---

<p  align="center"><img  src="" alt="The username input area of the Capitals of the World Quiz" width="75%"></p>

From the main menu, the play button will take the user to a form area where a username and game difficulty is chosen.

- A user can log a username which will be stored in local storage.
- If a username exists, it will skip this area and take the user directly to the difficulty selection.
- The username is logged with a user's high scores, which allows users to track their game record by accessing the scores page from the main menu.

**Difficulty Selection**
---

<p  align="center"><img  src="" alt="The difficulty selection area of the Capitals of the World Quiz" width="75%"></p>
The difficulty of the questions in the game can be changed in the difficulty selection area.

- Three different levels of difficulty: Easy, Normal, Hard.
- Normal and Hard difficulties are locked by default and are unlocked if 75% of questions are answered correctly in a quiz of the preceding difficulty..
- Upon loading the form with the correct score, the padlock is removed and the next difficulty playable.
- The user can clear the existing name and its corresponding local data in order to revert back to the username input area.


### **Game Area**
---

<p  align="center"><img  src="" alt="The Capitals of the World Quiz game area" width="75%"></p>
Once a difficulty is chosen the game area is loaded, where the questions and answers are generated.

- The questions are shuffled ensuring that on each playthrough, the user will face a different selection of questions.
- The answer buttons are filled with randomly selected answers from the collection of questions.
- The correct answer replaces the content of a random answer button if it does not already exist.
- Correct and incorrect answers are signified by the button changing color when clicked upon by the user before the next question is automatically loaded.
- The counters on the page track the current question, the current count of correct answers, and the user's high score for that difficulty. (If the current score count exceeds the high score, then the high score counter is updated alongside the score counter).


### **High Scores**
---

<p  align="center"><img  src="" alt="The Capitals of the World Quiz high scores page" width="75%"></p>

The high score page is where a user can check their record on each of the game difficulties.
- The user’s high score count is displayed for each of the difficulty levels.
- A clear data button is included, allowing the user to wipe local data and return to the application’s main menu.

### **Sounds**
---

<p  align="center"><img  src="" alt="Sound toggle for the Capitals of the World Quiz" width="75%"></p> 

The game includes sound effects such as those that respond to user actions, or when modals appear to signify correct or incorrect answers. The icon appears at the top of the page through the application and controls the game’s sound effects.

- Sound effects are triggered by button clicks, toggling the sound icon, modals appearing, and for correct and incorrect answers.
- The sound icon is located at the top of the screen and is accessible to the user throughout the application.
- The sound icon enables the user to toggle the applications sounds on and off.

### **Modals**
---  

<p  align="center"><img  src="" alt="Modals that appear in the Capitals of the World Quiz" width="75%"></p>

Throughout the application modals pop up to respond to, and confirm, user actions.

- When choosing to wipe local data, both in the scores area and in the username input area, a modal appears asking the user to confirm the action.
- When clicking the home icon in the game area, a warning is presented to the user and asks for confirmation of the action.
- Upon completing a quiz a modal will appear with a button to the main menu, or if the user has answered 75% of the questions correctly, to the next quiz difficulty.
 
[Back to contents](#contents)

### **Future Features**
---

Here are some examples for features that could be included in further development of the game.

- **Multiple Users**: Multiple profiles can be stored on the game, meaning that two users can play on the same device without wiping the others data.

- **Choosing Quiz Length**: A user can choose longer or shorter quizzes to test themselves further.

- **Master Quiz**: A quiz of every question in the game across all difficulties.

- **Multiple Themes**: Different skins and color palettes so that a user can customize how the application looks.

- **Leaderboard**: A global leaderboard that logs and ranks the high scores of all users.

[Back to contents](#contents)

## **Technology** 
The Capitals of the World Quiz was built with the following technologies:

1.  [**HTML**](https://en.wikipedia.org/wiki/HTML5) - Used to give content and semantic meaning to the application.
2.  [**CSS**](https://en.wikipedia.org/wiki/CSS) - For styling and adding responsiveness to the application.
3.  [**JavaScript**](https://en.wikipedia.org/wiki/JavaScript) - Used to add interactivity and functionality to the application.
4.  [**Gitpod**](https://gitpod.io) - The IDE used to develop the application.
5.  [**Github**](https://github.com) - For hosting the repository and application, and for version control.
6.  [**Codepen**](https://codepen.io) - For prototyping features before their implementation.
7.  [**Figma**](https://figma.com/) - Used to wireframe the plan of the design.
8.  [**Font Awesome**](https://fontawesome.com/) - Library used to import icons to the site.
9.  [**Am I Responsive**](http://ami.responsivedesign.is/) - For responsive images of application in readme.
10. [**Coolors**](https://coolors.co/) - Used to generate color pallete for the application.

[Back to contents](#contents)

## **Testing**
The testing of the site can be found [**here**](TESTING.md)

[Back to contents](#contents)

## **Deployment**

### **To deploy the project**
Github pages was used to host the application:

1. In the selected repository, navigate to the **Settings** tab.
<p  align="center"><img  src="assets/readme-images/publish-1.jpg" alt="Repository main page with settings highlighted" width="75%"></p>

2. From the settings tab, click **Pages** in the bottom left hand corner of the screen.
<p  align="center"><img  src="assets/readme-images/publish-2.jpg" alt="Repository settings tab with pages button highlighted" width="75%"></p>

3. Once in the **Pages** tab expand the **none** drop down menu and select **main**, before finally clicking **save**.
<p  align="center"><img  src="assets/readme-images/publish-3.jpg" alt="Modals that appear in the Capitals of the World Quiz" width="75%"></p>

4. Once saved, the live link to the repositiory will appear.
<p  align="center"><img  src="assets/readme-images/publish-4.jpg" alt="Modals that appear in the Capitals of the World Quiz" width="75%"></p>

[Back to contents](#contents)

### **To clone the project**
The repository can be cloned and continued by other developers:

1. In the selected repository open the **Code** drop down menu.
<p  align="center"><img  src="assets/readme-images/clone-1.jpg" alt="Repository main page with settings highlighted" width="75%"></p>

2. Copy the https url located in the **clone** box.
<p  align="center"><img  src="assets/readme-images/clone-2.jpg" alt="Repository settings tab with pages button highlighted" width="75%"></p>

3. Open the IDE of preference and paste the url in to a **git clone** command within a **Git Bash** terminal.
<p  align="center"><img  src="assets/readme-images/clone-3.png" alt="Modals that appear in the Capitals of the World Quiz" width="75%"></p>

4. Once the command is run the IDE will populate with the cloned repository files.
<p  align="center"><img  src="assets/readme-images/clone-4.png" alt="Modals that appear in the Capitals of the World Quiz" width="75%"></p>

[Back to contents](#contents)

## **Credits**

### Code

[Back to contents](#contents)

### **Media**

[Back to contents](#contents)

### **Acknowledgments**  

[Back to contents](#contents)
