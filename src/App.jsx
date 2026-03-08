import { useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import { initialStudents } from "./data/students";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function App() {

  const [students, setStudents] = useState(initialStudents);
  const [editStudent, setEditStudent] = useState(null);

  const addStudent = (student) => {

    const newId = students.length + 1;

    const newStudent = {
      ...student,
      id: newId
    };
    setStudents([...students, newStudent]);
  };

  const deleteStudent = (id) => {

    if (window.confirm("Delete student?")) {

      setStudents(
        students.filter((student) => student.id !== id)
      );
    }
  };

  const updateStudent = (updatedStudent) => {

    setStudents(
      students.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
    setEditStudent(null);
  };

  const downloadExcel = () => {

    const dataForExcel = students.map((s) => ({
      ID: s.id,
      Name: s.name,
      Email: s.email,
      Age: s.age
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataForExcel);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });

    const file = new Blob([excelBuffer], {
      type: "application/octet-stream"
    });

    saveAs(file, "students.xlsx");

  };

  return (

    <div className="container">

      <div className="header">
        <h1 className="title">Students Table</h1>

        <button className="download-btn" onClick={downloadExcel}>
          Download Excel
        </button>
      </div>

      <StudentForm
        addStudent={addStudent}
        editStudent={editStudent}
        updateStudent={updateStudent}
      />

      <StudentTable
        students={students}
        deleteStudent={deleteStudent}
        setEditStudent={setEditStudent}
      />

    </div>
  );

}

export default App; 