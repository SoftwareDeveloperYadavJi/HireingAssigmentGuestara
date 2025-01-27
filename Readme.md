# Menu Management Backend Server

This project is a Node.js backend application for managing a menu, divided into three parts: Categories, Subcategories, and Items. The project uses **Express.js** for creating REST APIs and **MongoDB** for data storage.

---

## Features

### **Create**
- Create Categories
- Create Subcategories (under Categories)
- Create Items (under Categories or Subcategories)

### **Get**
- Get all Categories, Subcategories, and Items
- Get a single Category, Subcategory, or Item by ID or name
- Get Subcategories under a specific Category
- Get Items under a specific Category or Subcategory

### **Edit**
- Update the attributes of Categories, Subcategories, or Items

### **Search**
- Search Items by their name

---

## Installation and Setup

### **1. Clone the Repository**
```bash
git clone https://github.com/SoftwareDeveloperYadavJi/HireingAssigmentGuestara
```

### **2. Install Dependencies**
```bash
cd HireingAssigmentGuestara
npm install
```

### **3. Configure Environment Variables**
Create a `.env` file in the root of the project and configure the following variables:
```env
PORT=3000
MONGOURI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database-name>
```

### **4. Start the Server**
```bash
npm run dtart
```

### **5. Test the APIs**
Use **Postman** or any other API testing tool to test the routes. API documentation is provided below.

---

## API Endpoints

### **Category Routes**
| Method | Endpoint               | Description                      |
|--------|-------------------------|----------------------------------|
| POST   | `/api/v1/category/create`       | Create a new Category            |
| GET    | `/api/categories/all`       | Get all Categories               |
| GET    | `/api/categories/:id`   | Get a Category by ID             |
| GET    | `/api/v1/category/:name` | Get a Category by Name          |
| PUT    | `/api/v1/category/update/:id`   | Update a Category by ID          |
| Delete | `/api/v1/category/delete/:name`   | Delete a Category by ID          |

### **Subcategory Routes**
| Method | Endpoint                           | Description                                  |
|--------|-------------------------------------|----------------------------------------------|
| POST   | `/api/v1/subcategory/create`               | Create a new Subcategory under a Category    |
| GET    | `/api/subcategories/all`               | Get all Subcategories                        |
| GET    | `/api/subcategories/name:id`           | Get a Subcategory by ID                      |
| GET    | `/api/subcategories/category/:id`  | Get Subcategories under a specific Category  |
| PUT    | `/api/subcategories/:id`           | Update a Subcategory by ID                   |

### **Item Routes**
| Method | Endpoint                           | Description                                  |
|--------|-------------------------------------|----------------------------------------------|
| POST   | `/api/v1/item/create`                       | Create a new Item under a Category/Subcategory |
| GET    | `/api/v1/item/all`                       | Get all Items                                |
| GET    | `/api/items/:id`                   | Get an Item by ID                            |
| GET    | `/api/items/name/:name`            | Get an Item by Name                          |
| GET    | `/api/items/category/:id`          | Get Items under a specific Category          |
| GET    | `/api/items/subcategory/:id`       | Get Items under a specific Subcategory       |
| PUT    | `/api/v1/item/update/:id`                   | Update an Item by ID                         |
| DELETE | `/api/v1/item/delete/:name`                   | Delete an Item by Name                          |

---

## Database Design

### **Collections**
1. **Categories**: Stores data for categories.
2. **Subcategories**: Stores data for subcategories, references `Category`.
3. **Items**: Stores data for items, references `Category` or `Subcategory`.

---

## Questions

### **Which database have you chosen and why?**
I chose **MongoDB** for its flexibility in handling unstructured data and ease of integration with Node.js applications. Its document-based structure suits hierarchical relationships like Categories, Subcategories, and Items.

### **3 Things Learned from This Assignment**
1. Designing relationships between collections in MongoDB using `ObjectId` references.
2. Implementing efficient CRUD operations with Express.js.
3. Writing scalable and modular code for backend applications.

### **Most Difficult Part of the Assignment**
Ensuring that default values for Subcategory attributes (`taxApplicability`, `tax`) inherit values from their parent Category dynamically during creation.

### **What Would You Do Differently with More Time?**
1. Add proper authentication and authorization using JWT.
2. Implement pagination and filtering for large datasets.
3. Integrate caching mechanisms (e.g., Redis) to improve performance.

---

## How to Run the Application Locally

1. Clone the repository and install dependencies.
2. Set up your MongoDB database and add the connection string in `.env`.
3. Run the application using `npm start`.
4. Test the APIs using Postman or any other API testing tool.

---

## Documentation

Inline comments are provided throughout the code for clarity. A **Loom video** demonstrating all operations is available [here](#).  
The project is hosted on my [https://github.com/SoftwareDeveloperYadavJi/HireingAssigmentGuestara](#).

---

## Author
**Nitin Yadav**

Feel free to reach out for any queries or feedback. 🚀

