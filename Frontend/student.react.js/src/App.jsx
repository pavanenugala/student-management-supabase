import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // LOGIN
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  // STUDENT FORM
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState("");

  // REGISTERED STUDENTS
  const [students, setStudents] = useState([]);

  // API URL
  const API_URL = "https://localhost:7043/api/Students";

  // LOGIN
  function handleLogin(event) {
    event.preventDefault();

    if (userId === "pavanreddy" && password === "Pavan@123") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid User ID or Password");
    }
  }

  // REGISTER STUDENT
  async function handleRegister(event) {
    event.preventDefault();

    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      age === "" ||
      mobileNumber === "" ||
      gender === "" ||
      course === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    const newStudent = {
      id: 0,
      firstName: firstName,
      lastName: lastName,
      email: email,
      age: Number(age),
      mobileNumber: mobileNumber,
      gender: gender,
      course: course,
    };

    try {
      const response = await axios.post(API_URL, newStudent);

      console.log("Student saved:", response.data);

      alert("Student registered successfully!");

      setStudents([...students, newStudent]);

      // CLEAR FORM
      setFirstName("");
      setLastName("");
      setEmail("");
      setAge("");
      setMobileNumber("");
      setGender("");
      setCourse("");
    } catch (error) {
      console.error("Error saving student:", error);

      alert("Student registration failed. Please check the API.");
    }
  }

  // LOGOUT
  function handleLogout() {
    setIsLoggedIn(false);
    setUserId("");
    setPassword("");
  }

  // LOGIN PAGE
  if (!isLoggedIn) {
    return (
      <div className="login-page">
        <div className="login-box">
          <h1>Login Page</h1>

          <form onSubmit={handleLogin}>
            <label>User ID</label>

            <input
              type="text"
              placeholder="Enter User ID"
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
            />

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }

  // STUDENT PAGE
  return (
    <div className="student-page">
      <header>
        <h1>Student Management System</h1>

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="student-form">
        <h2>Student Registration</h2>

        <form onSubmit={handleRegister}>
          <label>First Name</label>
          <input
            type="text"
            placeholder="Enter First Name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />

          <label>Last Name</label>
          <input
            type="text"
            placeholder="Enter Last Name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label>Age</label>
          <input
            type="number"
            placeholder="Enter Age"
            value={age}
            onChange={(event) => setAge(event.target.value)}
          />

          <label>Mobile Number</label>

<input
  type="text"
  placeholder="Enter 10-digit Mobile Number"
  value={mobileNumber}
  maxLength={10}
  onChange={(event) => {
    const value = event.target.value;

    // Allow numbers only
    if (/^\d*$/.test(value)) {
      setMobileNumber(value);
    }
  }}
/>

          <label>Gender</label>
          <select
            value={gender}
            onChange={(event) => setGender(event.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <label>Course</label>
          <input
            type="text"
            placeholder="Enter Course"
            value={course}
            onChange={(event) => setCourse(event.target.value)}
          />

          <button type="submit">Register</button>
        </form>
      </div>

      <div className="student-list">
        <h2>Registered Students</h2>

        {students.length === 0 ? (
          <p>No students registered yet.</p>
        ) : (
          students.map((student, index) => (
            <div className="student-card" key={index}>
              <p>
                <strong>Name:</strong> {student.firstName} {student.lastName}
              </p>

              <p>
                <strong>Email:</strong> {student.email}
              </p>

              <p>
                <strong>Age:</strong> {student.age}
              </p>

              <p>
                <strong>Mobile:</strong> {student.mobileNumber}
              </p>

              <p>
                <strong>Gender:</strong> {student.gender}
              </p>

              <p>
                <strong>Course:</strong> {student.course}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;