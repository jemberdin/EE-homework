## CRUD application 

### Used Tech Stack
* Back-end: Java, Spring Boot, Spring, JUnit5
* Front-end: React, Ant Design (antd) and Formik libraries

### Application running
* Download and import application to IDE
* Run `CrudApplication.java` file in `crud/src/main/java/com/jemberdin/crud`
* When Spring Boot app is running (Started CrudApplication in console) open Command Prompt or Terminal 
and navigate to `crud/src/js/` - this is React application. 
Make sure you have Node and Node Package Manager (npm) installed on your computer.
"node -v" and "npm -v" is commands to see if Node and npm is installed.
Type "npm start", hit `Enter`. React application should start.
Open http://localhost:3000/ in your browser and test application.

### Additional information
* All functional and non-functional requirements are implemented
* You can read data from back-end, add, change and delete user information
* You can sort users by each column
* Unique combination of users first and last name is cheking on back-end side, you will receive a 
notification on front-end if entered data is not unique
* Users email validation is done both on front-end and on back-end sides
* Auto-complete is done using `antd`
