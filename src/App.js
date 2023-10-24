import { useState } from "react";

function App() {
  const [interests, setInterests] = useState({
    python: false,
    javascript: false,
    "c++": false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  function handleInterestChange(e) {
    const interest = e.target.id;
    setInterests({ ...interests, [interest]: e.target.checked });
  }
  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitted(true);
  }
  return (
    <main>
      <h1>Hi, I'm (your name)</h1>
      <img alt="My profile pic" src="https://via.placeholder.com/350" />
      <h2>About Me</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>

      <div>
        <a href="https://github.com">GitHub</a>
        <a href="https://linkedin.com">LinkedIn</a>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="your name"></input>
        <input type="text" placeholder="email address"></input>
        <input
          type="checkbox"
          id="python"
          checked={interests.python}
          onChange={handleInterestChange}
        ></input>
        <label htmlFor="python">Python</label>
        <input
          type="checkbox"
          id="javascript"
          checked={interests.javascript}
          onChange={handleInterestChange}
        ></input>
        <label htmlFor="javascript">JavaScript</label>
        <input
          type="checkbox"
          id="c++"
          checked={interests["c++"]}
          onChange={handleInterestChange}
        ></input>
        <label htmlFor="c++">C++</label>
        <button type="submit">Sign up for newsletter</button>
      </form>
      {isSubmitted ? (
        <p>
          Thank you for signing up! Your interests are:{" "}
          {Object.keys(interests)
            .filter((interest) => interests[interest])
            .join(", ")}
        </p>
      ) : null}
    </main>
  );
}

export default App;
