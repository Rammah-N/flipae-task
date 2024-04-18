# Challenge Title: Employee Management UI

Challenge Description:
You are tasked with building a user-friendly web interface for an Employee Management
System. This system allows users to add employees, assign supervisors, and view the chain of
command within the organization. The focus of this challenge is on creating a dynamic and
intuitive front-end application.
Requirements:
Front-End (Client-Side):

1. Develop a responsive web interface that allows users to:
   • Add a new employee.
   • Delete an employee.
   • Set the supervisor for an employee.
   • View the hierarchical structure of employees.
2. Utilize a modern JavaScript framework or library such as React, Angular, or Vue.js for
   front-end development.
3. Implement user interface features to provide feedback, such as success or error
   messages when actions are performed (e.g., employee added successfully, supervisor
   assigned).
   General Requirements:
   • Ensure the user interface is intuitive and easy to navigate.
   • Handle edge cases gracefully, such as preventing an employee from being assigned as
   their own supervisor or breaking the hierarchical structure.
   • Provide clear instructions within the UI for performing each action.
   Bonus (Optional):
   • Implement animations or transitions to enhance the user experience.
   • Add search or filtering functionality to easily locate employees.
   • Incorporate drag-and-drop functionality for rearranging the hierarchy.
   • Deploy the application to a hosting platform like Heroku, AWS, or Vercel.
   • Implement unit tests to ensure the reliability and correctness of the application.

## Evaluation

Candidates will be evaluated based on the functionality, user interface design, responsiveness,
error handling, and overall completeness of the front-end application.

## Submission Requirements

• Deadline for submission: Tuesday, April 23, 2024.
• Submit the solution as a Git repository.
• The repository should include clear documentation on how to run the application locally.
• Candidates are encouraged to showcase their experience and skills in their solution.\

Helping Material:
Example JSON structure:
{
"employees": [
{
"name": "Ali",
"supervisor": null,
},
{
"name": "Wafeeq",
"supervisor": "Ali",
},
{
"name": "Aysar",
"supervisor": Wafeeq,
},
{
"name": "Moied",
"supervisor": "Aysar",
}
]
}
Feel free to adjust any details or requirements as needed for your specific needs.
