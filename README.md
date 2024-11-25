## Overview
This application is a mock backend for a fictional business, built with **Javascript**, **Node.js**, **Express**, and **MySQL**. It provides APIs for managing products, orders, user and admin operations. The application uses JWT-based authentication and includes role-based access control for admin endpoints.


## Setup and installation

### Required
- Node.js
- MySQL server running
- Postman or similar for endpoint testing

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/username/repository.git
   cd repository
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the following variables:
   ```env
   DB_HOST=localhost
   DB_USER=student
   DB_PASSWORD=your_password
   DB_NAME=db_eksamen_odd_grimholt
   JWT_SECRET=your_secret_key
   PORT=3000
   ```

4. Import the database schema:
   - Use the provided `setup.sql` file to create the necessary tables and relationships.
   ```bash
   mysql -u student -p path/to/db_eksamen_odd_grimholt < setup.sql
   ```

5. Start the server:
   ```bash
   npm start
   ```
   The server will run on the port specified in the `.env` file (default: 3000).


## Testing with Postman
### Environment Setup
1. Configure the following environment variables in Postman:
   - `base_url`: `http://localhost:3000`
   - `admin_token`: `The token in the response after logging in as an admin user.`

2. Use this [Postman collection](https://api.postman.com/collections/33585276-cc03808a-ecd3-413d-99f4-14068bcffd8f?access_key=PMAT-01JDGZ5DSJCR9VYC7HS52NAF6Y) to simplify testing 

### Example Usage
- **Unrestricted example**:
  - URL: `{{base_url}}/api/register`
  - Method: `POST`
  - Body (JSON):
    ```json
    {
      "username": "testuser",
      "password": "testpassword",
      "role": "user"
    }
    ```

- **Admin example**:
  - URL: `{{base_url}}/api/admin/products`
  - Method: `POST`
  - Headers:
    - Authorization: `Bearer {{admin_token}}`
  - Body (JSON):
    ```json
    {
      "name": "Product Name",
      "description": "Product Description",
      "price": 100,
      "stock": 50
    }
    ```

## Notes

- Ensure that the database contains data before testing.

