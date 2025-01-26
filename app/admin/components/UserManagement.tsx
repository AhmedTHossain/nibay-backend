// import { useUserContext } from "@/app/contexts/UserContext";
// import { TUser } from "@/utils/types/user";
// import { useState, useEffect } from "react";

// export default function UserManagement() {
//   const { users, addUser, updateUser, deleteUser } = useUserContext();
//   const [newUser, setNewUser] = useState<TUser>({
//     name: "",
//     email: "",
//     _id: "",
//     role: "",
//     applicationStatus: "PENDING",
//     password: "",
//     phone: "",
//     nidNumber: "",
//     nidCopy: "",
//     drivingLicense: "",
//     drivingLicenseCopy: "",
//     maxEducationLevel: "",
//     maxEducationLevelCertificateCopy: "",
//     chairmanCertificateCopy: "",
//     portEntryPermitCopy: "",
//     yearsOfExperience: "",
//     address: "",
//     division: "",
//     district: "",
//     profilePhoto: "",
//     organizationType: "",
//     organizationContactPerson: "",
//     otpCode: "",
//     deviceID: "",
//     createdAt: new Date(),
//     birthCertificate: "",
//     portEntryPermit: "",
//     updatedAt: new Date(),
//     jobsApplied: [],
//     following: [],
//     followers: [],
//     reviews_for_employees: [],
//     reviews_from_employers: [],
//     id: "",
//     job: "",
//     applicant: ""
//   });

//   const handleAddUser = () => {
//     addUser(newUser);
//     setNewUser({
//       name: "",
//       email: "",
//       _id: "",
//       role: "",
//       applicationStatus: "PENDING",
//       password: "",
//       phone: "",
//       nidNumber: "",
//       nidCopy: "",
//       drivingLicense: "",
//       drivingLicenseCopy: "",
//       maxEducationLevel: "",
//       maxEducationLevelCertificateCopy: "",
//       chairmanCertificateCopy: "",
//       portEntryPermitCopy: "",
//       yearsOfExperience: "",
//       address: "",
//       division: "",
//       district: "",
//       profilePhoto: "",
//       organizationType: "",
//       organizationContactPerson: "",
//       otpCode: "",
//       deviceID: "",
//       createdAt: new Date(),
//       birthCertificate: "",
//       portEntryPermit: "",
//       updatedAt: new Date(),
//       jobsApplied: [],
//       following: [],
//       followers: [],
//       reviews_for_employees: [],
//       reviews_from_employers: [],
//       id: "",
//       job: "",
//       applicant: ""
//     });
//   };

//   return (
//     <div>
//       <h2>User Management</h2>
//       <input
//         type="text"
//         placeholder="User Name"
//         value={newUser.name}
//         onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
//       />
//       <input
//         type="email"
//         placeholder="User Email"
//         value={newUser.email}
//         onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
//       />
//       <button onClick={handleAddUser}>Add User</button>
//       <ul>
//         {/* {users.map((user) => (
//           <li key={user.id}>
//             {user.name} - {user.email}
//             <button onClick={() => updateUser(user.id)}>Edit</button>
//             <button onClick={() => deleteUser(user.id)}>Delete</button>
//           </li>
//         ))} */}
//         <li key={"1"}>
//           {"User Name"} - {"User Email"}
//           <button
//             onClick={() =>
//               updateUser("1", {
//                 name: "Updated Name",
//                 email: "updated@example.com",
//                 _id: "",
//                 role: "",
//                 applicationStatus: "PENDING",
//                 password: "",
//                 phone: "",
//                 nidNumber: "",
//                 nidCopy: "",
//                 drivingLicense: "",
//                 drivingLicenseCopy: "",
//                 maxEducationLevel: "",
//                 maxEducationLevelCertificateCopy: "",
//                 chairmanCertificateCopy: "",
//                 portEntryPermitCopy: "",
//                 yearsOfExperience: "",
//                 address: "",
//                 division: "",
//                 district: "",
//                 profilePhoto: "",
//                 organizationType: "",
//                 organizationContactPerson: "",
//                 otpCode: "",
//                 deviceID: "",
//                 createdAt: new Date(),
//                 birthCertificate: "",
//                 portEntryPermit: "",
//                 updatedAt: new Date(),
//                 jobsApplied: [],
//                 following: [],
//                 followers: [],
//                 reviews_for_employees: [],
//                 reviews_from_employers: [],
//                 id: "",
//                 job: "",
//                 applicant: ""
//               })
//             }
//           >
//             Edit
//           </button>
//           <button onClick={() => deleteUser("1")}>Delete</button>
//         </li>
//         <li key={"2"}>
//           {"User Name"} - {"User Email"}
//           <button
//             onClick={() =>
//               updateUser("2", {
//                 name: "Updated Name",
//                 email: "updated@example.com",
//                 _id: "",
//                 role: "",
//                 applicationStatus: "PENDING",
//                 password: "",
//                 phone: "",
//                 nidNumber: "",
//                 nidCopy: "",
//                 drivingLicense: "",
//                 drivingLicenseCopy: "",
//                 maxEducationLevel: "",
//                 maxEducationLevelCertificateCopy: "",
//                 chairmanCertificateCopy: "",
//                 portEntryPermitCopy: "",
//                 yearsOfExperience: "",
//                 address: "",
//                 division: "",
//                 district: "",
//                 profilePhoto: "",
//                 organizationType: "",
//                 organizationContactPerson: "",
//                 otpCode: "",
//                 deviceID: "",
//                 createdAt: new Date(),
//                 birthCertificate: "",
//                 portEntryPermit: "",
//                 updatedAt: new Date(),
//                 jobsApplied: [],
//                 following: [],
//                 followers: [],
//                 reviews_for_employees: [],
//                 reviews_from_employers: [],
//                 id: "",
//                 job: "",
//                 applicant: ""
//               })
//             }
//           >
//             Edit
//           </button>
//           <button onClick={() => deleteUser("2")}>Delete</button>
//         </li>
//       </ul>
//     </div>
//   );
// }