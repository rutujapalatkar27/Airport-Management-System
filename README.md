-----------------------------------------------------------------------------------------------------------------------------------------------------------
         **PROJECT:**   **Airport Management System**                                                                                                        
-----------------------------------------------------------------------------------------------------------------------------------------------------------

**Tools and Languages:**

- Frontend - ReactJS

- Backend - NodeJS

- Database – MySQL - AWS RDS

- UI Icons – MaterialUI, React Bootstrap 

- Postman - REST API client to test the developed APIs

- Deployment - Amazon Web Services (AWS) - EC2 (With Load balancing and Auto scaling) 

-----------------------------------------------------------------------------------------------------------------------------------------------------------

**Design Decisions:**

**Observer**</br>
             - To update multiple screens when there is change in single screen </br>
          

**Architecture-level:**

- ReactJS as Frontend because of ease and flexibility
- NodeJS as Backend 
- AWS as the cloud provider for deployment


----------------------------------------------------------------------------------------------------------------------------------------------------------

**Business- level:**


**Passengers (Customer) Features:**

- Retrieve flight details for arrivals and departures. 


**Airport Employee Features:**

- Sign up (only from backend).

- Login.

- Add, Retrieve and Update airport terminal details.

- Add and Retrieve gates associated with a particular airport terminal.

- Enable or disable one or more gates for maintenance.

- Add and Retrieve baggage carousel details for the airport.

- Assign Baggage Carousel number to Arriving flights.

- Free the baggage carousel once used.

**Airline Employee Features:**

- Sign up (only from backend).

- Login

- Retrieve flight arrivals and departures and Gate assignements details belonging to their airline.

- Add or update the schedule of flights belonging to their airline relevant to that airport

---------------------------------------------------------------------------------------------------------------------------------------------------------------
**Database Design (Tables):**

- user

- flight

- gate

- airline

- airport

- carousel

- terminal

----------------------------------------------------------------------------------------------------------------------------------------------------------


**ARCHITECTURE DIAGRAM:**

![image](https://user-images.githubusercontent.com/21690089/205013168-fa0ae701-210c-4b04-8653-228904ba3360.png)


----------------------------------------------------------------------------------------------------------------------------------------------------------------

**COMPONENT DIAGRAM:**

![image](https://user-images.githubusercontent.com/21690089/205187420-56618018-5d10-41a1-b895-6b5f57c8feba.png)


--------------------------------------------------------------------------------------------------------------------------------------------------------------

**DEPLOYMENT DIAGRAM:**

![image](https://user-images.githubusercontent.com/98144125/205183805-e296ac43-600d-4b70-b1fc-666f2cfee5d9.png)

------------------------------------------------------------------------------------------------------------------------------------------------------------------

**CLASS DIAGRAM:**

![image](https://user-images.githubusercontent.com/21690089/205180716-c11a2a4f-b5b5-4596-b177-ae15db5015ae.png)

------------------------------------------------------------------------------------------------------------------------------------------------------------------
**ACTIVITY DIAGRAM:**
![image](https://user-images.githubusercontent.com/98144125/205189173-35074e38-8eb0-4aa9-8b3a-79b3c1381c61.png)

------------------------------------------------------------------------------------------------------------------------------------------------------
**Source Code:** https://github.com/gopinathsjsu/team-project-mavericks-1


**Project board:** https://github.com/orgs/gopinathsjsu/projects/29 


**Project Journals:** https://github.com/gopinathsjsu/team-project-mavericks-1/tree/main/Documents 


**Sprint Task Sheet:** https://docs.google.com/spreadsheets/d/1bmb0uv2mT0FOlutbG54BV4boE80f4IvL/edit#gid=2016752456 

# team-project-mavericks-1
Use Case:

Implement an end2end Airport Management system that can be configured for a given airport (Web interface or Mobile app interface with supporting Backend APIs), that integrates Airline Flight Schedules, Gate Assignments, Baggage Claim assignment for arriving flights

The emphasis here is on team collaboration, so the points awarded will be based on individual contributions to the team and how the team performed overall.  

Components
APIs - input and output of API should be in JSON and should include error handling and validation of inputs
APIs will be demonstrated using a Web/mobile UI
UI is accessed by Passengers (Customers) and Airline employees and Airport employees (3 roles)
APIs should support following functionality:
Retrieve Flight arrivals and departures and Gate assignments - based on time durations (next hour, next 2 hours, next 4 hours) - this data will be displayed in multiple monitors throughout the airport - viewable by all users
Implement a Random Gate assignment for Arriving and Departing flights - designed to prevent conflicting assignments - allow for an hour for each flight to be at the gate (for arrivals and for departures)
Airport employees :
Enable or disable one or more gates for maintenance
Assign Baggage Carousel number to Arriving flights - the system should prevent conflicting assignments
Baggage Claim information will be displayed in multiple monitors in the Arrival area
Airline employees:
Add or update the schedule of flights belonging to their airline relevant to that airport (arrivals and departures)
APIs and UI functionality will be available based on Roles specified above
Assume Gates are distributed in multiple terminals (1, 2, 3 to keep it simple)
Assume Gates are labeled as A1-A32, B1-B32 and C1-C32
Deploy API to AWS in an Auto Scaled EC2 Cluster with Load Balancer (or another cloud provider)
Develop a Web or mobile UI that will make use of the APIs
Create your own database with mock data - use SFO or SJC as an example airport for your data
Requirements:

Each member must own at least one of the components in the Team project.
Keep a Project Journal on GitHub in markdown format to include:
Weekly Scrum Report (i.e. weekly version of daily scrum) which answers the three daily stand-up questions:
What tasks did I work on / complete?
What am I planning to work on next?
What tasks are blocked waiting on another team member?
Select two of the XP Core Values and keep a journal of how the team kept these values throughout the project.  Report this in your Project Journal with the weekly Scrum Report submissions:
Communication
Simplicity
Feedback
Courage
Respect
Maintain Weekly Scrum Task Board (in GitHub as a Project Board)
Update the Story on your Task Board
Keep track of remaining effort and progress on a Team Task Board.
Use (and modify) the Google Task Sheet Template at:
Click on this LINK (Links to an external site.)Links to an external site..  (Make adjustments to fit your team size)
Track your Team's Burndown Chart in this Sheet.
Maintain the project in an assigned Team GitHub Repo.
Create UI Wireframes
Create UI wireframes for each of the screen in your team’s solution
(this can be done by hand or electronically with a tool like “Pencil”)
Create an Overall Architecture Diagram showing:
Software Components and their Public Interfaces
The Dependencies between Components
The Relative Relationship of how these components are Deployed
Recommendation:  Use UML Deployment/Component Diagram Notation.
http://agilemodeling.com/artifacts/deploymentDiagram.htm (Links to an external site.)Links to an external site.
http://agilemodeling.com/artifacts/componentDiagram.htm (Links to an external site.)Links to an external site.
Maintain a README markdown file in the Team's GitHub Repo.
Include all Diagrams, Design decisions and the overall Feature Set of the project
Project Demo
Give a demo of your teams working prototype on "Demo Day"
Grading:
Teams will be be graded with a Team Score during Demo Day.
100 points
Individual deductions will be made to the Team Score based on contributions to be judged by:
Completeness and Functioning Demo of your Component (as noted on Demo Day)
Frequency and Quality of commits to the project Github. 
As such, it is expected that all contributions must be visible via Github.  See the following guidelines for how GitHub counts contributions:  https://help.github.com/articles/why-are-my-contributions-not-showing-up-on-my-profile/ (Links to an external site.)Links to an external site.
Rubric:

Architecture/Design: 10%

Implementation of requirements (working software): 70%

Agile Scrum Process  (includes Weekly commits and submitting Sprint artifacts, XP values): 20%

Github insights - expectation is that every member has similar amount of contributions to code-lesser contributions will result in individual deductions

Submission (One per Team): -include this information in the Readme section of the repo:
Your Team Name
The names of each team member
A summary of areas of contributions (for each team member)
Link to your team's GitHub Repo
Link to your team's Project Board (on GitHub)
Link to your team's Project Journal (on GitHub)
Link to your team's Google Sprint Task Sheet
Example Format for Weekly Stand-up (i.e. Daily Scrum) and Final Burn-down Chart & Task Board:

Sample Sprint Review.png 

## For Developers


### About the Repo
1. The repo consists of server folder which has all the backend and the middleware code for the application
2. In due time, the repo will also consist of client folder having all the code for the frontend part.

### Getting Started
1. Clone the repository, you can find command on the net.
2. Go to server folder and run ```npm instal```. 
   - This will install all required dependencies like mysql, cors, body-parser, express middleware, etc.
   - The way Node projects work is that all meta data and dependencies are present int the package.json. 
3. When all the dependencies are successfully installed run ```npm run start```.
   - This will start the backend server on port 5001

As of now the host of the database, password and few other important information is hard-coded in the code, which is NOT a good practice.
Later the project wil have .env files to protect such data. But for time being we can move ahead.

### Testing the local Server
1. Now since your server is running locally on port 5001, go to browser go to url http://localhost:5001/test/api
   - This should give you the output ```{"test":"API Testing","status":"OK"}```
2. To check Database connection, hit http://localhost:5001/test/db
   - This should give you the output ```{"test":"DB Testing","status":"OK","data":[{"name":"Rushil"},{"name":"Kavan"},{"name":"Rutuja"},{"name":"Aditya"}]}```

If both these tests are working, it indicates that server is up and running, ready to take requests and the connection to database(AWS RDS) is established and queries are running

Let me know if you are stuck anywhere....!!

## General API concensus
1. The code is structured such that it will have service, controllers and routes.
2. Every entity like gate, flight, terminal will have these three componenets. 
3. Controllers react with front end and are responsible for calling services
4. Routes directs control to specific controllers
5. Service will handle the business logic and talk to Database(RDS)
