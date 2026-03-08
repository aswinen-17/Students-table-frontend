import { useState, useEffect } from "react";

function StudentForm({ addStudent, editStudent, updateStudent }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!name || !email || !age) {
      alert("All fields required");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(email)) {
      alert("Invalid Email");
      return;
    }

    const studentData = {
      id: editStudent ? editStudent.id : Date.now(),
      name,
      email,
      age
    };

    if (editStudent) {
      updateStudent(studentData);
    } else {
      addStudent(studentData);
    }

    setName("");
    setEmail("");
    setAge("");

  };

  useEffect(() => {

    if (editStudent) {

      setName(editStudent.name);
      setEmail(editStudent.email);
      setAge(editStudent.age);

    }

  }, [editStudent]);

  return (
    <form onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <button className="submit-btn" type="submit">
        {editStudent ? "Update Student" : "Add Student"}
      </button>

    </form>
  );
}

export default StudentForm;