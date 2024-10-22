# YASmini: Yet Another Shop Mini

[![Build and Deploy Production](https://github.com/duongminhhieu/YasMini-Frontend/actions/workflows/production-cicd.yml/badge.svg)](https://github.com/duongminhhieu/YasMini-Frontend/actions/workflows/production-cicd.yml)

YASmini is a pet project aimed to practice building a typical Spring Boot application in Java and React JS

<div style="text-align: center;">
    <img width="315" alt="Screenshot 2024-06-02 at 23 47 57" src="https://github.com/duongminhhieu/YasMiniShop/assets/76527212/936dabf5-2935-4335-95ec-cae392da309d">
</div>

# Technologies
- React JS
- Redux Toolkit
- Ant Design
- Tailwind CSS
- TypeScript
- Vite

# Architecture

<img width="1399" alt="Screenshot 2024-06-02 at 23 44 13" src="https://github.com/duongminhhieu/YasMini-Frontend/assets/76527212/9c326965-1c46-4ab5-861b-0f37d5497f09">


# Use Case

![YasMini drawio (6)](https://github.com/duongminhhieu/YasMini-Frontend/assets/76527212/6e53a85b-f062-419c-bfb6-182092881841)


## Overview

Yas Mini is an e-commerce platform that allows public users, customers, and admin users to interact with various functionalities such as viewing products, managing orders, and handling customer data. The system is divided into modules for public users, registered customers, and administrators.

## Actors

- **Public User**: Anyone who visits the site without logging in.
- **Customer**: A registered user who can purchase products.
- **Admin**: A user with administrative privileges to manage products, orders, customers, and other administrative tasks.

## Use Cases Summary

| Use Case              | Description                                                             | Actor        | Preconditions                   | Postconditions                     |
|-----------------------|-------------------------------------------------------------------------|--------------|----------------------------------|------------------------------------|
| **View Products**     | View product details, featured products, and products by category       | Public User  | None                             | None                               |
| **Search Products**   | Search for products based on various criteria                           | Public User  | None                             | Display search results             |
| **Register**          | Create a new user account                                               | Public User  | None                             | User account created               |
| **Add to Cart**       | Add products to shopping cart                                           | Customer     | User must be logged in           | Product added to cart              |
| **Order Product**     | Place an order for products in the cart                                 | Customer     | Products in cart, user logged in | Order placed                       |
| **View My Orders**    | View past and current orders                                            | Customer     | User must be logged in           | Display order list                 |
| **Search by Image with AI** | Upload an image to search for similar products using AI           | Customer     | User must be logged in           | Display search results             |
| **Rate Product**      | Rate products (one rating per product)                                  | Customer     | User must be logged in, not rated before | Rating submitted           |
| **Manage Orders**     | View, paginate, and change order status                                 | Admin        | Admin must be logged in          | Order statuses updated             |
| **Manage Products**   | Create, read, update, delete, and filter products                       | Admin        | Admin must be logged in          | Product list updated               |
| **Manage Categories** | Create, update, and delete product categories                           | Admin        | Admin must be logged in          | Category list updated              |
| **Manage Customers**  | View, activate, deactivate, and paginate customer records               | Admin        | Admin must be logged in          | Customer list updated              |
| **View Statistics**   | View platform performance metrics and statistics                        | Admin        | Admin must be logged in          | Display statistics                 |
| **Authentication**    | Handle user login, logout, and session management 

# Setting Up and Running at Local

## Configuration


1. Set up library:

    - Clone the repository to your local machine
    - Install packages
    ```bash
    npm install
    ```

2. Set up env:

    - At **.env** file, change the URL backend.
   ```bash
   VITE_BACKEND_URL = http://localhost:8080/api/v1
   ```
    
## Run
Run the application use cmd
```bash
npm run dev
```

# Contact
* Skype: live:duongminhhieu2082002
* Please ping me if you can't run the app.

# References
1. [JPA & JWT (Hoang Nguyen)] (https://github.com/hoangnd-dev/rookies-java)
2. [Springboot Demo (Phu Le)] (https://github.com/phulecse2420/demo)
3. [Devteria] (https://github.com/devteria/identity-service.git)
4. [Yas real] (https://github.com/nashtech-garage/yas)
5. NashTech Slide
6. GitHub Copilot
