import React, { useState } from "react";
import UserForm from "./Components/UserForm";
import UserList from "./Components/UserList";

function App() {
  const [users, setUsers] = useState([]);

  console.log(users);
  return (
    <div>
      <UserForm setUsers={setUsers} />
      <UserList users={users} />
    </div>
  );
}

export default App;
