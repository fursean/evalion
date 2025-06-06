import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "student",
    name: "",
    class: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:3001/api/users");
    setUsers(res.data);
  };

  const handleCreateUser = async () => {
    try {
      await axios.post("http://localhost:3001/api/users", newUser);
      setNewUser({ username: "", password: "", role: "student", name: "", class: "" });
      fetchUsers();
    } catch (err) {
      alert("Feil ved opprettelse: " + err.response?.data?.error);
    }
  };

  return (
    <div>
      <h3>Brukeroversikt</h3>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.username} ({u.role}) – {u.name}, {u.class}
          </li>
        ))}
      </ul>

      <h4>Ny bruker</h4>
      <input placeholder="Brukernavn" value={newUser.username} onChange={e => setNewUser({ ...newUser, username: e.target.value })} />
      <input placeholder="Passord" value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })} />
      <input placeholder="Navn" value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} />
      <input placeholder="Klasse" value={newUser.class} onChange={e => setNewUser({ ...newUser, class: e.target.value })} />
      <select value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })}>
        <option value="student">Elev</option>
        <option value="teacher">Lærer</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleCreateUser}>➕ Opprett bruker</button>
    </div>
  );
}
