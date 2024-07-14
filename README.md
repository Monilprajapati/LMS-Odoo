
# Library Management System Odoo
 
Library Management System is a comprehensive full-stack application designed to help users manage book inventories, track borrower details, and handle transactions efficiently. This platform caters to libraries of all sizes, providing tools and resources to streamline library operations and enhance user experience.
# Features

## Core Features

**1. User Authentication and Authorization**

- **Login/Logout Functionality**: Secure login and logout for Admin and Users.
- **Role-Based Access Control**: Different roles including Admin, Librarian, and User with specific access and functionalities.

**2. Book Inventory Management**

- **CRUD Operations :** Add, update, delete, and search for books.
- **Detailed Book Information :** Manage book details such as ISBN, title, author, publisher, year, genre, and quantity.
- **Real-Time Availability :** Track and display the real-time availability status of books. 
- **Google Books API Integration :** Fetch book details using ISBN from Google Books API.

**3. Borrowing System**

- **Checkout Process:** Workout plans are tailored based on user profiles and fitness goals.

**4. Notifications and Alerts**

- **Email/SMS Notifications:** Send notifications for due dates, new arrivals, and more.
- **Alerts:**: Alert users about overdue books and outstanding fees.

**6. Reporting**

- **Reports:** Generate reports on book usage, overdue items, user activity, etc.
- **Dashboard:** Admins and librarians can view real-time statistics on the dashboard.
## Tech Stack
LMS Odoo utilizes the following technologies:

**Frontend:**
- React.js
- Material UI
- Tailwind css
- Frammer Motion

**Backend:**
- Node.js
- Express.js
-  EMailJs
- MongoDB (using Mongoose ORM for database operations)
 
# Installation

## To set up the project locally, follow these steps:
Install npm Packages

```bash
  npm install
```
**1. Clone the repository:**

```bash
git clone https://github.com/Monilprajapati/LMS-Odoo
```

**2. Navigate to the server directory:**
```bash
cd server
```
**3. Install dependencies for the server:**
```bash
npm install
node start
```
**4. Navigate to the client directory:**
```bash
cd client
```
**5. Install dependencies for the client:**
```bash
npm run dev
```

**1. Set up environment variables:**

- Create a .env file in the root directory of server.
- Add your MongoDB URI, and any other necessary environment variables to the `.env ` file.
**2. Run the development server:**
```bash
npm run dev
```
## Contributing

Contributions are always welcome!


# How to Contribute
**1. Fork the Repository:** Start by forking the repository to your own GitHub account.

**2. Clone the Repository:** Clone the forked repository to your local machine using the following command:
```bash
git clone https://github.com/Monilprajapati/LMS-Odoo
```
**3. Create a Branch:** Create a new branch to work on your feature or bug fix:
```bash
git checkout -b feature/your-feature-name
```
Replace `your-feature-name` with a descriptive name for your feature or bug fix.

**4. Make Changes:** Make your desired changes to the codebase.

**5. Commit Changes:** Once you've made your changes, commit them with a descriptive commit message:

```bash
git commit -m 'Add feature: your feature description'
```

**6. Push Changes:** Push your changes to your forked repository:
```bash
git push origin feature/your-feature-name
```
**7. Submit a Pull Request (PR):** Go to the GitHub page of your forked repository and submit a pull request to the `main` branch of the original repository. Provide a clear title and description for your pull request, explaining the changes you've made.

# Code Style

- Follow the existing code style and conventions used in the project.
- Ensure your code is well-documented and easy to understand.
- Use meaningful variable names and function names.
# Testing
- If you're adding new features or making significant changes, please include tests to ensure the functionality works as expected.
- Run existing tests to ensure you haven't broken any existing functionality.

# Review Process
- Pull requests will be reviewed by project maintainers.
- Constructive feedback may be provided to help improve your code.
- Once your pull request is approved, it will be merged into the main codebase.

Thank you for your contributions! 🎉 Let's make LMS even better together! If you have any questions, feel free to reach out to the project maintainers.
