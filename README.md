# NestJS User Management System

A simple and clean **NestJS-based User Management API** that demonstrates:

- CRUD operations for users  
- Role-Based Access Control (RBAC)  
- Group-based user management  
- Permission Guard powered by predefined roles & permissions  
- Authorization using user ID from headers  

This project uses **in-memory data** (no database) to keep it easy to understand and run.

---

## 📌 Features

### ✅ User CRUD API  
- Create a user  
- Update a user  
- Delete a user  
- Fetch all users  

### ✅ Role-Based Permissions  
Roles:
- **ADMIN**
- **PERSONAL**
- **VIEWER**

Permissions:
- **CREATE**
- **VIEW**
- **EDIT**
- **DELETE**

Permission Mapping:
| Role      | Permissions                         |
|-----------|--------------------------------------|
| ADMIN     | CREATE, VIEW, EDIT, DELETE           |
| PERSONAL  | *(no explicit permissions)*          |
| VIEWER    | VIEW                                 |

### Endpoint Permission Control
| Endpoint              | Required Permission |
|----------------------|----------------------|
| POST `/users`        | CREATE              |
| GET `/users`         | VIEW                |
| PATCH `/users/:id`   | EDIT                |
| DELETE `/users/:id`  | DELETE              |
| GET `/users/managed/:id` | *(no permission required)* |

---

## 👥 Group-Based User Management

Admins can manage users **within the same groups**.

Examples:
- `GET /users/managed/5` → returns users in groups of user `id=5`  
- Non-admins → get an empty list  

---

## 🔐 Permission Guard

A custom **PermissionGuard** checks:
- Who is making the request  
- What permissions their roles contain  
- Whether they are allowed to access the endpoint  

The user is identified by:
