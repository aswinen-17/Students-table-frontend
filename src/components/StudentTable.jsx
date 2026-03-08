function StudentTable({ students, deleteStudent, setEditStudent }){
  return (

    <table>

      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>

        {students.map((student) => (

          <tr key={student.id}>

            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.age}</td>

            <td>

              <button className="edit-btn" onClick={() => setEditStudent(student)}>Edit
              </button>

              <button  className="delete-btn" onClick={() => deleteStudent(student.id)}>
                Delete
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  );

}

export default StudentTable;