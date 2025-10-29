
// import { useAuth } from "../context/AuthContext";

// export default function Users() {
//   const { user } = useAuth();

//   // Placeholder users list — in a real app you'd fetch an admin API
//   const users = [
//     { id: 1, name: "Alice", email: "alice@example.com" },
//     { id: 2, name: "Bob", email: "bob@example.com" },
//   ];

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">User Management</h1>
//       <p className="text-sm text-gray-600 mb-6">Admin: {user?.email}</p>

//       <div className="bg-white shadow rounded-lg overflow-hidden">
//         <table className="w-full table-auto">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="text-left px-4 py-2">ID</th>
//               <th className="text-left px-4 py-2">Name</th>
//               <th className="text-left px-4 py-2">Email</th>
//               <th className="text-left px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((u) => (
//               <tr key={u.id} className="border-t">
//                 <td className="px-4 py-2">{u.id}</td>
//                 <td className="px-4 py-2">{u.name}</td>
//                 <td className="px-4 py-2">{u.email}</td>
//                 <td className="px-4 py-2">
//                   <button className="text-sm text-red-600 hover:underline">Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
