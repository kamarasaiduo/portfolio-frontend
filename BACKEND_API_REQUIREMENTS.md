# Backend API Requirements for Admin Users Page

## Required Endpoints

Your Spring Boot backend needs to implement the following endpoints for the Admin Users page to work:

### 1. GET /api/users
**Purpose**: Fetch all users for admin management
**Method**: GET
**Headers**: 
- Accept: application/json
- Content-Type: application/json

**Response**: Array of user objects
```json
[
  {
    "id": 1,
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  },
  {
    "id": 2,
    "fullName": "Jane Admin",
    "email": "jane@example.com",
    "role": "ADMIN"
  }
]
```

### 2. POST /api/users
**Purpose**: Create a new user
**Method**: POST
**Headers**: 
- Accept: application/json
- Content-Type: application/json

**Request Body**:
```json
{
  "fullName": "New User",
  "email": "newuser@example.com",
  "password": "password123",
  "role": "USER"
}
```

**Response**: Created user object
```json
{
  "id": 3,
  "fullName": "New User",
  "email": "newuser@example.com",
  "role": "USER"
}
```

### 3. PUT /api/users/{id}
**Purpose**: Update an existing user
**Method**: PUT
**Headers**: 
- Accept: application/json
- Content-Type: application/json

**Request Body**:
```json
{
  "fullName": "Updated User",
  "email": "updated@example.com",
  "password": "newpassword123",
  "role": "ADMIN"
}
```

**Response**: Updated user object
```json
{
  "id": 1,
  "fullName": "Updated User",
  "email": "updated@example.com",
  "role": "ADMIN"
}
```

### 4. DELETE /api/users/{id}
**Purpose**: Delete a user
**Method**: DELETE
**Headers**: 
- Accept: application/json

**Response**: 204 No Content (successful deletion)

## Security Requirements

1. **Authentication**: All endpoints should require authentication
2. **Authorization**: Only ADMIN users should access these endpoints
3. **CORS**: Configure CORS to allow requests from `http://localhost:3000`

## Example Spring Boot Controller

```java
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(Authentication authentication) {
        // Check if user is admin
        if (!isAdmin(authentication)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user, Authentication authentication) {
        if (!isAdmin(authentication)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        
        User createdUser = userService.createUser(user);
        return ResponseEntity.ok(createdUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user, Authentication authentication) {
        if (!isAdmin(authentication)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        
        User updatedUser = userService.updateUser(id, user);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id, Authentication authentication) {
        if (!isAdmin(authentication)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    private boolean isAdmin(Authentication authentication) {
        // Implement your admin check logic here
        return authentication != null && 
               authentication.getAuthorities().stream()
                   .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"));
    }
}
```

## Current Issue

The error you're seeing occurs because:
1. The `/api/users` endpoint doesn't exist in your backend
2. The server is returning an HTML error page (404 or 500) instead of JSON
3. The frontend tries to parse HTML as JSON, causing the "Unexpected token '<'" error

## Quick Fix Options

### Option 1: Implement the Backend Endpoints
Implement the above endpoints in your Spring Boot application.

### Option 2: Use Mock Data (Temporary)
Uncomment the mock data lines in AdminUsers.jsx for development:
```javascript
setUsers([
  { id: 1, fullName: "Demo User", email: "demo@example.com", role: "USER" },
  { id: 2, fullName: "Demo Admin", email: "admin@example.com", role: "ADMIN" }
]);
```

### Option 3: Disable Admin Page Temporarily
Remove the Admin link from the Header component until the backend is ready.
