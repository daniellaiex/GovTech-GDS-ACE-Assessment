# GovTech-GDS-ACE-Assessment
## Project Title: Gift Redemption System (GDS)

<img width="1118" alt="image" src="https://github.com/daniellaiex/GovTech-GDS-ACE-Assessment/assets/88719093/e53955f3-6a50-494d-99c7-3b4948f5d2be">

### Description
Welcome to the Gift Redemption System – an efficient solution for distributing gifts to teams. This system simplifies the process by allowing each team to send a representative to redeem their gift, ensuring that each gift is claimed only once. The system keeps track of redemption data and provides a user-friendly interface for administrators to manage the process seamlessly.

### Workflow 🔄

- **Search**: Admin (Santa 🎅) efficiently searches for staff by using their staff pass ID. No need to input the whole ID; the system continuously filters results as the admin types.

- **Check**: Admin checks if the staff's team has already redeemed the gift. If so, the admin informs the staff when it was collected, and the process concludes.

- **Process**: If the staff's team hasn't redeemed yet, Admin clicks the "Redeem" button, confirming that the staff has collected on their team's behalf.

### Features 🚀

- **Admin Login Authentication**: Ensures the system is protected with secure login credentials.

- **Session Storage**: Implements session storage for added security.

- **Easy Search Filtering**: Provides a quick check without typing the entire staff pass ID.

- **Pagination**: Organizes the staff list with pagination to optimize page loading and maintain a clean look.

- **Automated Checks with Github Actions**: Utilizes Github Actions, especially for Typescript, to automate checks and maintain code quality.

### Thought Processes 💡

- **NoSQL Database Choice**: Chose MongoDB for its simplicity, given the assumption that this system has minimal relations between data, mainly relying on the team_name. A simplified database is easy to understand and scalable for developers. Additionally, NoSQL is a good fit for handling unstructured data efficiently.

- **Security Measures**: Implemented authentication and session limits to safeguard sensitive employee information stored in the Gift Redemption System.

### Future Improvements 🚧

- **Dashboard for Analytics**: Create a dashboard to track analytics, providing insights into how many people/teams have not collected at a glance.

- **CSV Downloads**: Enable downloading lists of collected and uncollected gifts into CSV for versatile data usage.

- **Un-redeem Functionality**: Introduce a function to un-redeem gifts for various purposes.

### Tech Stack 🛠️

- MongoDB 🍃
- Express ⚙️
- React ⚛️
- Docker 🐳

### Running Locally 🏃🏻‍♀️

Before running the application locally:

- Ensure Docker is installed.
- Create a `.env` file in the root directory of the backend folder with the following keys:

```env
MONGO_CONNECTION_STRING=...
PORT=...
SESSION_SECRET=...
```

- Once the .env file is set, navigate to the root project folder "GovTech-GDS-ACE-Assessment" and run:
```
docker compose up
```

Containers running should be the following:
- mongodb: Port 27017
- mongo-express: Port 8081
- backend: Port 5000
- frontend: Port 5173

### Testing Locally 🧪

Used Jest and Supertest for testing. 
I was unable to run the tests successfully due to some impediments with my NodeJS versioning, but I cross-checked documentation to see how testing should be done and the code would likely be able to work.

To run tests:
Navigate to the "backend" folder and run:

```
npm run test
```
