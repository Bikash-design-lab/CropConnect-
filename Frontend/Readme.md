# Build Frontend/Client side page

# Folder structure
Frontend
└──
    src/
    │└── components/
    │    ├── common/             # Reusable UI components (e.g., Button, Input)
    │    │   ├── Button/
    │    │   
    │    │   
    │    ├── layout/             # Structural layout components (e.g., Header, Footer, Sidebar)
    │    │   ├── Header/
    │    │   ├── Footer/
    │    │   └── Sidebar/
    │    │
    │    ├── pages/              # Route-level components
    │    │   ├── Home/
    │    │   │   ├── Home.jsx
    │    │   │   └── Home.css
    │    │   ├── Login/
    │    │   ├── Register/
    │    │   └── Dashboard/
    │    │
    │    ├── features/           # Domain-specific features (modular blocks)
    │    │   ├── ProductList/
    │    │   ├── Cart/
    │    │   └── FilterPanel/
    │
    ├── app.jsx           
    └── main.jsx            
