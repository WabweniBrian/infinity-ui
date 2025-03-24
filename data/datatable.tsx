export interface Column<T> {
  id: string;
  header: string;
  accessorKey: keyof T;
  cell?: (info: { row: T }) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  visible?: boolean;
}

export const data: any[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2023-05-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Editor",
    status: "Active",
    lastLogin: "2023-05-14",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Viewer",
    status: "Inactive",
    lastLogin: "2023-04-28",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    role: "Editor",
    status: "Active",
    lastLogin: "2023-05-12",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2023-05-15",
  },
  {
    id: 6,
    name: "Diana Miller",
    email: "diana@example.com",
    role: "Viewer",
    status: "Pending",
    lastLogin: "2023-05-10",
  },
  {
    id: 7,
    name: "Edward Davis",
    email: "edward@example.com",
    role: "Editor",
    status: "Active",
    lastLogin: "2023-05-11",
  },
  {
    id: 8,
    name: "Fiona Clark",
    email: "fiona@example.com",
    role: "Viewer",
    status: "Inactive",
    lastLogin: "2023-04-25",
  },
  {
    id: 9,
    name: "George White",
    email: "george@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2023-05-13",
  },
  {
    id: 10,
    name: "Hannah Green",
    email: "hannah@example.com",
    role: "Editor",
    status: "Active",
    lastLogin: "2023-05-14",
  },
  {
    id: 11,
    name: "Ian Taylor",
    email: "ian@example.com",
    role: "Viewer",
    status: "Pending",
    lastLogin: "2023-05-09",
  },
  {
    id: 12,
    name: "Julia Adams",
    email: "julia@example.com",
    role: "Editor",
    status: "Active",
    lastLogin: "2023-05-12",
  },
];

export const initialColumns = [
  {
    id: "name",
    header: "Name",
    accessorKey: "name",
    sortable: true,
    filterable: true,
  },
  {
    id: "email",
    header: "Email",
    accessorKey: "email",
    sortable: true,
    filterable: true,
  },
  {
    id: "role",
    header: "Role",
    accessorKey: "role",
    sortable: true,
    filterable: true,
    cell: ({ row }: { row: any }) => (
      <span
        className={`rounded-full px-2 py-1 text-xs font-medium ${
          row.role === "Admin"
            ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
            : row.role === "Editor"
              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
        }`}
      >
        {row.role}
      </span>
    ),
  },
  {
    id: "status",
    header: "Status",
    accessorKey: "status",
    sortable: true,
    filterable: true,
    cell: ({ row }: { row: any }) => (
      <span
        className={`rounded-full px-2 py-1 text-xs font-medium ${
          row.status === "Active"
            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
            : row.status === "Inactive"
              ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
        }`}
      >
        {row.status}
      </span>
    ),
  },
  {
    id: "lastLogin",
    header: "Last Login",
    accessorKey: "lastLogin",
    sortable: true,
    filterable: true,
  },
];

export const products: any[] = [
  {
    id: 1,
    name: "Premium Laptop",
    category: "Electronics",
    price: 1299.99,
    stock: 15,
    rating: 4.8,
    featured: true,
  },
  {
    id: 2,
    name: "Wireless Headphones",
    category: "Audio",
    price: 199.99,
    stock: 42,
    rating: 4.5,
    featured: false,
  },
  {
    id: 3,
    name: "Smartphone",
    category: "Electronics",
    price: 899.99,
    stock: 28,
    rating: 4.7,
    featured: true,
  },
  {
    id: 4,
    name: "Coffee Maker",
    category: "Kitchen",
    price: 79.99,
    stock: 36,
    rating: 4.2,
    featured: false,
  },
  {
    id: 5,
    name: "Fitness Tracker",
    category: "Wearables",
    price: 129.99,
    stock: 51,
    rating: 4.4,
    featured: false,
  },
  {
    id: 6,
    name: "Wireless Speaker",
    category: "Audio",
    price: 149.99,
    stock: 22,
    rating: 4.6,
    featured: true,
  },
  {
    id: 7,
    name: "Tablet",
    category: "Electronics",
    price: 499.99,
    stock: 19,
    rating: 4.5,
    featured: false,
  },
  {
    id: 8,
    name: "Smart Watch",
    category: "Wearables",
    price: 249.99,
    stock: 33,
    rating: 4.3,
    featured: true,
  },
  {
    id: 9,
    name: "Blender",
    category: "Kitchen",
    price: 69.99,
    stock: 47,
    rating: 4.1,
    featured: false,
  },
  {
    id: 10,
    name: "Wireless Mouse",
    category: "Accessories",
    price: 39.99,
    stock: 68,
    rating: 4.4,
    featured: false,
  },
  {
    id: 11,
    name: "External Hard Drive",
    category: "Storage",
    price: 129.99,
    stock: 24,
    rating: 4.6,
    featured: false,
  },
  {
    id: 12,
    name: "Gaming Console",
    category: "Gaming",
    price: 499.99,
    stock: 12,
    rating: 4.9,
    featured: true,
  },
];

export const productColumns = [
  {
    id: "name",
    header: "Product Name",
    accessorKey: "name",
    sortable: true,
    filterable: true,
  },
  {
    id: "category",
    header: "Category",
    accessorKey: "category",
    sortable: true,
    filterable: true,
    cell: ({ row }: { row: any }) => (
      <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
        {row.category}
      </span>
    ),
  },
  {
    id: "price",
    header: "Price",
    accessorKey: "price",
    sortable: true,
    filterable: true,
    cell: ({ row }: { row: any }) => (
      <span className="font-medium">${row.price.toFixed(2)}</span>
    ),
  },
  {
    id: "stock",
    header: "Stock",
    accessorKey: "stock",
    sortable: true,
    filterable: true,
    cell: ({ row }: { row: any }) => (
      <span
        className={`${
          row.stock < 20
            ? "text-red-600 dark:text-red-400"
            : row.stock < 50
              ? "text-yellow-600 dark:text-yellow-400"
              : "text-green-600 dark:text-green-400"
        }`}
      >
        {row.stock} units
      </span>
    ),
  },
  {
    id: "rating",
    header: "Rating",
    accessorKey: "rating",
    sortable: true,
    filterable: true,
    cell: ({ row }: { row: any }) => (
      <div className="flex items-center">
        <span className="mr-1">{row.rating}</span>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(row.rating)
                  ? "text-yellow-400"
                  : i < Math.ceil(row.rating)
                    ? "text-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "featured",
    header: "Featured",
    accessorKey: "featured",
    sortable: true,
    filterable: true,
    cell: ({ row }: { row: any }) => (
      <span
        className={`rounded-full px-2 py-1 text-xs font-medium ${
          row.featured
            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
        }`}
      >
        {row.featured ? "Featured" : "Standard"}
      </span>
    ),
  },
];
