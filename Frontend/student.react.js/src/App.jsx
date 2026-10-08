
import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // LOGIN
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  // CREATE NEW ACCOUNT
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [newUserId, setNewUserId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  // EXISTING DEMO USERS
  const defaultUsers = [
    {
      userId: "pavanreddy",
      password: "Pavan@123",
    },
    {
      userId: "studentuser",
      password: "Student@123",
    },
  ];

  // CREATE NEW ACCOUNT
  function handleCreateAccount(event) {
    event.preventDefault();

    const trimmedUserId = newUserId.trim();

    if (!trimmedUserId || !newPassword || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password must contain at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const savedUsers = JSON.parse(
      localStorage.getItem("studentAppUsers") || "[]"
    );

    const allUsers = [...defaultUsers, ...savedUsers];

    const userExists = allUsers.some(
      (user) =>
        user.userId.toLowerCase() === trimmedUserId.toLowerCase()
    );

    if (userExists) {
      alert("User ID already exists. Please choose another User ID.");
      return;
    }

    const newUser = {
      userId: trimmedUserId,
      password: newPassword,
    };

    localStorage.setItem(
      "studentAppUsers",
      JSON.stringify([...savedUsers, newUser])
    );

    alert("Account created successfully! Please login.");

    setNewUserId("");
    setNewPassword("");
    setConfirmPassword("");

    setUserId(trimmedUserId);
    setPassword("");
    setShowCreateAccount(false);
  }

  // LOGIN
  function handleLogin(event) {
    event.preventDefault();

    const savedUsers = JSON.parse(
      localStorage.getItem("studentAppUsers") || "[]"
    );

    const allUsers = [...defaultUsers, ...savedUsers];

    const validUser = allUsers.find(
      (user) =>
        user.userId === userId.trim() &&
        user.password === password
    );

    if (validUser) {
      setIsLoggedIn(true);
      alert("Login successful!");
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

    if (mobileNumber.length !== 10) {
      alert("Please enter a valid 10-digit mobile number");
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

      setStudents((previousStudents) => [
        ...previousStudents,
        newStudent,
      ]);

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
    setShowCreateAccount(false);
  }

  // LOGIN AND CREATE ACCOUNT PAGE
  if (!isLoggedIn) {
    return (
      <div className="login-page">
        <div className="login-box">

          {!showCreateAccount ? (
            <>
              <h1>Login Page</h1>

              <form onSubmit={handleLogin}>
                <label>User ID</label>

                <input
                  type="text"
                  placeholder="Enter User ID"
                  value={userId}
                  onChange={(event) =>
                    setUserId(event.target.value)
                  }
                  required
                />

                <label>Password</label>

                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  required
                />

                <button type="submit">Login</button>
              </form>

              <p>Don't have an account?</p>

              <button
                type="button"
                onClick={() => {
                  setShowCreateAccount(true);
                  setNewUserId("");
                  setNewPassword("");
                  setConfirmPassword("");
                }}
              >
                Create New Account
              </button>
            </>
          ) : (
            <>
              <h1>Create New Account</h1>

              <form onSubmit={handleCreateAccount}>
                <label>User ID</label>

                <input
                  type="text"
                  placeholder="Create User ID"
                  value={newUserId}
                  onChange={(event) =>
                    setNewUserId(event.target.value)
                  }
                  required
                />

                <label>Password</label>

                <input
                  type="password"
                  placeholder="Create Password"
                  value={newPassword}
                  onChange={(event) =>
                    setNewPassword(event.target.value)
                  }
                  minLength={6}
                  required
                />

                <label>Confirm Password</label>

                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  required
                />

                <button type="submit">
                  Create Account
                </button>
              </form>

              <p>Already have an account?</p>

              <button
                type="button"
                onClick={() => setShowCreateAccount(false)}
              >
                Back to Login
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // STUDENT PAGE
  return (
    <div className="student-page">
      <header>
        <h1>Student Management System</h1>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
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
            onChange={(event) =>
              setFirstName(event.target.value)
            }
          />

          <label>Last Name</label>

          <input
            type="text"
            placeholder="Enter Last Name"
            value={lastName}
            onChange={(event) =>
              setLastName(event.target.value)
            }
          />

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
          />

          <label>Age</label>

          <input
            type="number"
            placeholder="Enter Age"
            value={age}
            onChange={(event) =>
              setAge(event.target.value)
            }
          />

          <label>Mobile Number</label>

          <input
            type="text"
            placeholder="Enter 10-digit Mobile Number"
            value={mobileNumber}
            maxLength={10}
            onChange={(event) => {
              const value = event.target.value;

              if (/^\d*$/.test(value)) {
                setMobileNumber(value);
              }
            }}
          />

          <label>Gender</label>

          <select
            value={gender}
            onChange={(event) =>
              setGender(event.target.value)
            }
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
            onChange={(event) =>
              setCourse(event.target.value)
            }
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
                <strong>Name:</strong>{" "}
                {student.firstName} {student.lastName}
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
