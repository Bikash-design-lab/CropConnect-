# Build Frontend/Client side page
## :file_folder: Page Structure (Client Side Flow)
```
| Page Name              | Accessible By    | Purpose                           |
|------------------------|------------------|-----------------------------------|
| **Landing Page**        | All              | Entry point, navigation           |
| **Signup Page**         | All              | Register new users                |
| **Login Page**          | All              | Auth for existing users           |
| **Create Profile Page** | Logged-in users  | Set up buyer/farmer profile       |
| **Farmer Dashboard**    | Farmers          | Manage products/orders            |
| **Buyer Dashboard**     | Buyers           | Browse/purchase products          |
| **Add Product Page**    | Farmers          | Post new products                 |
| **My Products Page**    | Farmers          | View/manage posted products       |
| **Browse Products Page**| Buyers           | Discover products                 |
| **Cart Page**           | Buyers           | Finalize purchase                 |
| **My Orders Page**      | Buyers           | Track orders                      |
| **Orders Received Page**| Farmers          | See orders from buyers            |
| **Edit Profile Page**   | All              | Update profile info               |
| **Logout**              | All              | End session and logout            |
```
## Client Side Folder & File Structure (Based on Your Backend Logic)
```
:package: client/
├── :file_folder: public/
│   └── index.html
├── :file_folder: src/
│
│   ├── :file_folder: assets/                     # Logos, icons, images
│
│   ├── :file_folder: components/                # Reusable UI elements
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── ProductCard.jsx
│   │   └── OrderCard.jsx
│
│   ├── :file_folder: features/                  # Grouped by domain feature
│   │
│   │   ├── :file_folder: auth/                  # Authentication
│   │   │   ├── Signup.jsx
│   │   │   ├── Signin.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   └── ResetPassword.jsx
│   │
│   │   ├── :file_folder: profile/               # Common for Buyer & Farmer
│   │   │   ├── FarmerProfileForm.jsx    # Add/Edit in one
│   │   │   ├── BuyerProfileForm.jsx     # Add/Edit in one
│   │   │   ├── useFarmerProfile.js      # Custom hook for data
│   │   │   └── useBuyerProfile.js       # Custom hook for data
│   │
│   │   ├── :file_folder: farmer/                # Farmer features
│   │   │   ├── FarmerDashboard.jsx
│   │   │   ├── ProductForm.jsx          # Add/Edit form shared
│   │   │   ├── MyProducts.jsx
│   │   │   └── useFarmerProducts.js     # Hook for product logic
│   │
│   │   ├── :file_folder: buyer/                 # Buyer features
│   │   │   ├── BuyerDashboard.jsx
│   │   │   ├── BrowseProducts.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── MyOrders.jsx
│   │   │   ├── OrderActions.jsx         # Cancel or update inline
│   │   │   └── useBuyerOrders.js        # Hook for order logic
│   │
│   │   ├── :file_folder: common/
│   │   │   ├── Home.jsx
│   │   │   └── NotFound.jsx
│
│   ├── :file_folder: services/                 # API interactions
│   │   ├── authService.js
│   │   ├── profileService.js
│   │   ├── productService.js
│   │   └── orderService.js
│
│   ├── :file_folder: context/
│   │   └── AuthContext.jsx
│
│   ├── :file_folder: routes/
│   │   └── AppRoutes.jsx
│
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
```
