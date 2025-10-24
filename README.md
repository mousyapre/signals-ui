# Signals UI project
## JAVA full stack project


# **Project Documentation: User Management System**

## **1. Overview**

This project is a **User Management System** with authentication and role-based features. The frontend is built in **Angular**, and the backend is implemented using **Spring Boot** with **JWT security**. Users can be listed, viewed, and managed via the frontend.

---

## **2. Backend: Spring Boot Service**

### **2.1 Project Setup**

* **Spring Boot Starter Project** created via Spring Tools Suite (STS).
* Dependencies added in `pom.xml`:

  * Spring Web
  * Spring Security (for JWT authentication)
  * Spring Data JPA
  * MySQL Driver (or other DB)
  * Lombok
  * Resilience4j (Circuit Breaker)

---

### **2.2 Security**

* JWT-based authentication implemented.
* Endpoints secured based on roles.
* Login endpoint returns JWT token.
* Backend validates token for authorized requests.
* Roles:

  * `ADMIN`
  * `USER`

---

### **2.3 Entities**

* **User Entity**

```java
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private String username;
    private String email;
    private String password;
    private String role; // ADMIN or USER
}
```

---

### **2.4 Repositories**

* `UserRepository` extends `JpaRepository<User, Long>`
* Provides basic CRUD operations.

---

### **2.5 Services**

* `UserService`

  * `getAllUsers()`: Returns all users.
  * `getUserById(Long id)`: Returns user details by ID.
  * `saveUser(User user)`: Saves a new user.
  * `deleteUser(Long id)`: Deletes a user.

---

### **2.6 Controllers**

* `UserController`

  * `GET /users` → Fetch all users.
  * `GET /users/{id}` → Fetch user by ID.
  * `POST /users` → Create new user.
  * `DELETE /users/{id}` → Delete user.
* Handles requests from Angular frontend.

---

### **2.7 JWT Authentication Flow**

1. User sends username/password to `/login`.
2. Backend validates credentials.
3. JWT token is returned.
4. Angular frontend stores token (localStorage/sessionStorage).
5. JWT token included in Authorization header for secured requests.

---

### **2.8 Additional Backend Features**

* **Resilience4j Circuit Breaker** (optional)
* Service-level resilience to prevent calling downed services.

---

## **3. Frontend: Angular Application**

### **3.1 Project Setup**

* Angular project created with CLI.
* Dependencies used:

  * Angular Material / Material Icons
  * RxJS for reactive programming
  * Angular Forms (Template-driven & Reactive)
  * Angular Router for navigation

---

### **3.2 Components**

#### **3.2.1 Navbar**

* Shows:

  * Home icon (left)
  * Application name (center)
  * Login / User icon (right, depends on authentication state)
* Uses Angular Material icons.
* Responsive design.

#### **3.2.2 Footer**

* Contains:

  * Social media links
  * Contact info
  * Application description

#### **3.2.3 Home Component**

* Full-page background image
* Description about the application
* “Get Started” button → navigates to Login page

#### **3.2.4 Login Component**

* Form with:

  * Username
  * Password
* Uses **Reactive Forms** (FormGroup, FormControl)
* On submit → calls Spring Boot login endpoint
* Stores JWT token on success

#### **3.2.5 User List Component**

* Displays list of all users in a table:

  * Columns: ID, Username, Email, Role, Profile Link
* Uses `*ngIf` for loading states:

  * Shows “Loading users...” until data is fetched
* Clicking **Profile Icon** navigates to **Profile Component** (or attempted, currently redirects to home due to routing issue)
* Fetches users from backend `/users` endpoint via **HttpClient**

#### **3.2.6 Profile Component**

* Displays detailed information of a single user
* Fetches user by ID from route param (`ActivatedRoute`)
* Currently facing **snapshot undefined** error (needs fix)

---

### **3.3 Services**

#### **3.3.1 AuthService**

* Handles login API call
* Stores JWT token
* Checks if user is logged in

#### **3.3.2 UserService**

* `getUsers()` → Fetch all users
* `getUserById(id)` → Fetch user by ID
* Provides data to User List and Profile components

---

### **3.4 Routing**

* **Routes**

  * `/home` → HomeComponent
  * `/login` → LoginComponent
  * `/users` → UserListComponent
  * `/profile/:id` → ProfileComponent
* **Route Guards** not implemented yet (future improvement)

---

## **4. Features & Functionalities**

* User Authentication (JWT)
* Role-based access (Admin / User)
* User List & Profile
* Frontend components: Navbar, Footer, Home, Login, User List, Profile
* Full-page background and styling for Home
* Material icons integration
* Reactive forms for login
* API integration between Angular frontend and Spring Boot backend
* Circuit breaker available via Resilience4j for backend services

---

## **5. Known Issues / Next Steps**

* **Profile route** redirects to home → needs proper route handling
* **Snapshot error** in Profile component
* Implement **Route Guards** to restrict access based on roles
* Add **Create/Update/Delete User** functionality in frontend
* Improve **error handling** on frontend
* Add **loading spinner** for better UX
* Optimize JWT token handling

