### TDDC88 2022 
# API Documentation
Documentation of the API used by companies in the course TDDC88 2022.

API hosted at: https://tddc88-2022.gitlab-pages.liu.se/api/api-documentation/

### Technical Specification  
The API uses the Open API framework.
Documentation: https://swagger.io/docs/specification/about/

API documenation powered by: https://redocly.com/redocly-cli/
# API Specification
This is a joined API specification between all four companies. It will work as a collection of information, guidelines and examples that will help all employees, but mostly the developers to use the API documentation.
## 1. The Integrators
If you have any questions or regards, please contact the integrator of your company. See information in table 1.
|     Name    |     Company    |     Mail    |
|---|---|---|
|     Axel Falk    |     1    |     axefa876@student.liu.se    |
|     Philip Folkunger    |     2    |     phifo334@student.liu.se    |
|     Louise Andersson    |     3    |     louan927@student.liu.se    |
|     Wilma Adelsköld    |     3    |     wilad522@student.liu.se    |
|     Filip Kindell    |     4    |     filki478@student.liu.se  |
## 2. Access the API documentation

The link below will direct you to the API documentation.
https://tddc88-2022.gitlab-pages.liu.se/api/api-documentation/
## 3. API Guidelines
The API guidelines consist of an explanation about how we handle our version handling, instructions for how to use the API and what to do if you discover a missing route.
### 3.1 Version handling
The API will be divided into two versions. This is because we want to allow the developers to start as soon as possible with their work. Version 1 will contain a few of the most basic routes to set up a base and structure for the developers. This will help them in their work and allow them to start coding as soon as possible. The version 2 will complement version 1 with the more advanced routes. If there are still routes missing after version 2, a version 3 of the API will be released with complementary routes.

The API documentation will be updated when needed.
#### 3.1.1 Version 1
Table 2 represents the routes that are included in version 1. This is an overall view of what the different versions contain. The full description of the routes can be found in Gitlab.
| *v1* |
| --- |
  |     ***Authentication***    |
|     Login    |
|     ***Users***    |
|     Get users    |
|     Create user    |
|     Get user with ID    |
|     Edit user with ID    |
|     Delete user    |
|     ***Articles***    |
|     Get articles    |
|     Create articles    |
|     Get article by QR code    |
|     Edit article with LIO-nr    |
|     Delete article    |
|     Get storage by ID    |
|     ***Storages***    |
|     Get storages    |
|     Create storages    |
|     Edit storage with ID    |
|     Delete storage    |
|     ***Compartments***    |
|     Get compartment by ID    |

#### 3.1.2 Version 2
| ***v2*** |
|---|
|     ***Authentication***    |
|     ***Users***    |
|     ***Articles***    |
|     ***Products***    |
|     ***Storages***    |
|     ***Compartments***    |

### 3.2 How to use the API documentation

This API documentation serves as a guide for how to use the API to be able to communicate between the front-ends and back-ends. Here you can see what endpoints we have, what requests the API contains and how to apply these.

#### 3.2.1 Content

##### 3.2.1.1 Resource description

The resources are the various categories of information the API should be able to handle requests and responses about. You can easily find what endpoint is appropriate for your request based on the resources and their description. For example, in version 1 we have the resources, authentication, users and articles.

##### 3.2.1.2 Endpoints and methods

The endpoints indicate how you access the resource. The methods specify what interactions (e.g. GET, POST) are allowed with the resource. You can also see the path to the resource URL (e.g. GET/users). If you provide path parameters in the endpoint, these should be represented by curly braces (e.g. GET/users/{userId}).

##### 3.2.1.3 Parameters

For some requests, parameters are necessary. The parameters required for the specific paths are specified in the API specification and are necessary for the front-end to send with their request to the back-end and contains information about what resource you want to apply the method to.

###### 3.2.1.4 Request body

For some requests, mainly POST and PUT, you have to send a request body along with the request. This is a json containing information about what the front-end would like to send to the back-end. If this is required for the endpoint and method, you will see this in the API specification as well as an example json or the required schema for the request.

##### 3.2.1.5 Responses

The response codes describe how the request managed to perform. The specific response codes for each endpoint and method are specified with information in the API specification. Examples for response codes are 200 if the request executed as hoped, 400 if it is a bad request or 404 if the resource could not be found. For some responses, a response body is required. This is a json containing information that is sent from the back-end to the front-end. Examples for what these json contains are specified for each endpoint and method in the API specification. You can use the API specification to change if you would like to see an example value for the json or the schema.

##### 3.2.1.6 Schemas

At the bottom you can see all schemas which are data for how our data is structured and what our resources contain.

#### 3.2.2 Try it out

In the API documentation, there are smart ways to try out the different endpoints and methods. You can use this by clicking the endpoint and method you would like to try and then press the “Try it out” button on the right side below the path. You can then enter necessary parameters and press “Execute”. This will show you the curl and the request URL as well as the responses. This shows an example of how the requests are performed in a more concrete way.

### 3.3 Missing API route

The integrators are consciously working on improving the API specification and we are aspiring that the next version will have a more substantial set of routes. If you as an employee of company X discovers that an API route is missing that you want us to implement, please contact your company’s integrator. The integrator will then raise the issue with a missing route with the other integrators at earliest convenience. The integrators will then decide if the route is necessary or not. If it is, the route will be implemented for the next version. If it is not, it will not be implemented. Either way the integrator will get back to you and update you on the matter.
