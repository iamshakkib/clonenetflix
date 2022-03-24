# Cloning Netflix using Springboot, React and MongoDB. 

## Here, I have cloned Netflix using Springboot, React and MongoDB lets understand why ?

### This is the most emotional reason which motivated me for developing this project is :- I didnt find tutorial for Netflix-Clone using Springboot in YouTube sadly ! So i created on my own.

## Moving on to the practical reasons

1. I wanted to showcase my skills, I have used Springboot because I wanted to use the best coding practices and made it as **loosely coupled** as possible and wanted to implement the solid design principles and Aspect Oriented Programming. As I have used for handling Exceptions I know it is not core AOP but springboot have a wrapper on it. I have followed the Single Responsibilty Principle and also the Interface Segregation principle.

2. I have used React here because it is simple one page frontend.I have created this netflix clone by taking help in developing the frontend part from kim and it is running fine, login is perfect but userlist for saved movie is not working because through frontend I am not able to provide the data required to fetch for a user .

3. I have used mongodb here because I am consuming the external apis and I dont know how the schemaa would look like, this is why I have not used sql here. In my previous projects in live_coding_cart_service I have used relational database

## I have gave my reasons to use these tech-stacks now let see the documentation

1. Backend is will run on the port 7777 and I have removed my mongodb cluster db string in your your case create it and paste on the demo one

2. Run it on any IDE (I prefer IntelliJ even you could run it on VScode).

3. Swagger UI is used so when the application will run on port 7777 the swagger api documentation will be available. For you, I have pasted the link :- http://localhost:7777/swagger-ui.html#

4. Exception Handled using wrapper of springboot AOP @ControllerAdvice for exceptions.

## How to make the frontend run

1. You need to type **yarn install**.

2. After that **yarn start**.
