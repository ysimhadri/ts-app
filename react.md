import { useState, useEffect, createContext, useContext } from "react";
import { configureStore } from "@reduxjs/toolkit";

// ========== Theme Context ==========
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        style={{
          backgroundColor: theme === "dark" ? "#1a1a1a" : "#ffffff",
          color: theme === "dark" ? "white" : "black",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

// ========== Components Using Theme ==========
function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: theme === "dark" ? "#333" : "#FFF",
        color: theme === "dark" ? "#FFF" : "#333",
        margin: "10px",
        padding: "10px",
      }}
    >
      Toggle Theme ({theme})
    </button>
  );
}

function DataFetcher() {
  const { theme } = useContext(ThemeContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div style={{ color: theme === "dark" ? "#ccc" : "#666" }}>
        Loading...
      </div>
    );
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <div>
      {data.map((item) => (
        <div
          key={item.id}
          style={{
            padding: "10px",
            margin: "10px 0",
            background: theme === "dark" ? "#333" : "#f0f0f0",
            borderRadius: "8px",
          }}
        >
          <h3 style={{ color: theme === "dark" ? "#88c0d0" : "#2d3440" }}>
            {item.title}
          </h3>
          <p style={{ color: theme === "dark" ? "#d8dee9" : "#4c566a" }}>
            {item.body}
          </p>
        </div>
      ))}
    </div>
  );
}

function Counter() {
  const { theme } = useContext(ThemeContext);
  const [count, setCount] = useState(0);

  return (
    <div style={{ margin: "20px 0" }}>
      <button
        onClick={() => setCount(count + 1)}
        style={{
          background: theme === "dark" ? "#4fa3f5" : "#1a73e8",
          color: "white",
          border: "none",
          padding: "8px 16px",
          borderRadius: "4px",
        }}
      >
        Increment
      </button>
      <span
        style={{
          marginLeft: "10px",
          color: theme === "dark" ? "#88c0d0" : "#1a73e8",
          fontSize: "1.2em",
        }}
      >
        Count: {count}
      </span>
    </div>
  );
}

function Child({ message, onButtonClick }) {
  // Receive data via props

  return (
    <>
      <h1>{message}</h1>
      <button onClick={() => onButtonClick("Data from Child")}>
        Send to Parent
      </button>
    </>
  );
}

function Parent() {
  const handleChildData = (data) => {
    alert("Data from child");
  };

  return <Child message="Hello from Parent!" onButtonClick={handleChildData} />;
}

function InputA({ value, onChange }) {
  return <input value={value} onChange={(e) => onChange(e.target.value)} />;
}

function InputB({ value }) {
  return <div>Received in B: {value}</div>;
}

function Wrapper() {
  const [sharedValue, setSharedValue] = useState("");
  return (
    <div>
      <InputA value={sharedValue} onChange={setSharedValue} />
      <InputB value={sharedValue} />
    </div>
  );
}
// useContext demo
const UserContext = createContext();

// 2. Parent Provider
function ParentForContext() {
  return (
    <UserContext.Provider value="JohnDoe111">
      <Grandchild />
    </UserContext.Provider>
  );
}

// 3. Deeply nested child
function Grandchild() {
  const user = useContext(UserContext);
  return <div>User: {user}</div>; // "JohnDoe"
}

// useContext demo

//redux demo

// ========== Main App ==========
export default function App() {
  return (
    <ThemeProvider>
      <ThemedButton />
      <Counter />
      <Parent />
      <Wrapper />
      <ParentForContext />
      {/*   <DataFetcher /> */}
    </ThemeProvider>
  );
}
