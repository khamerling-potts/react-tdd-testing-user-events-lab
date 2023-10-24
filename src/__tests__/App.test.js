import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import App from "../App";
import userEvent from "@testing-library/user-event";

// Portfolio Elements
test("displays a top-level heading with the text `Hi, I'm _______`", () => {
  render(<App />);

  const topLevelHeading = screen.getByRole("heading", {
    name: /hi, i'm/i,
    exact: false,
    level: 1,
  });

  expect(topLevelHeading).toBeInTheDocument();
});

test("displays an image of yourself", () => {
  render(<App />);

  const image = screen.getByAltText("My profile pic");

  expect(image).toHaveAttribute("src", "https://via.placeholder.com/350");
});

test("displays second-level heading with the text `About Me`", () => {
  render(<App />);

  const secondLevelHeading = screen.getByRole("heading", {
    name: /about me/i,
    level: 2,
  });

  expect(secondLevelHeading).toBeInTheDocument();
});

test("displays a paragraph for your biography", () => {
  render(<App />);

  const bio = screen.getByText(/lorem ipsum/i);

  expect(bio).toBeInTheDocument();
});

test("displays the correct links", () => {
  render(<App />);

  const githubLink = screen.getByRole("link", {
    name: /github/i,
  });
  const linkedinLink = screen.getByRole("link", {
    name: /linkedin/i,
  });

  expect(githubLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://github.com")
  );

  expect(linkedinLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://linkedin.com")
  );
});

// Newsletter Form - Initial State
test("the form includes text inputs for name and email address", () => {
  render(<App />);
  const emailInput = screen.queryByPlaceholderText("email address");
  const nameInput = screen.queryByPlaceholderText("your name");
  expect(emailInput).toBeInTheDocument();
  expect(nameInput).toBeInTheDocument();
});

test("the form includes three checkboxes to select areas of interest", () => {
  render(<App />);
  const checkboxes = screen.getAllByRole("checkbox");
  expect(checkboxes.length).toBe(3);
});

test("the checkboxes are initially unchecked", () => {
  render(<App />);
  const checkboxes = screen.getAllByRole("checkbox");
  checkboxes.forEach((checkbox) => expect(checkbox).not.toBeChecked);
});

// Newsletter Form - Adding Responses
test("the page shows information the user types into the name and email address form fields", () => {
  render(<App />);
  const emailInput = screen.queryByPlaceholderText("email address");
  const nameInput = screen.queryByPlaceholderText("your name");

  userEvent.type(emailInput, "me@email.com");
  userEvent.type(nameInput, "Kyra");

  expect(emailInput).toHaveValue("me@email.com");
  expect(nameInput).toHaveValue("Kyra");
});

test("checked status of checkboxes changes when user clicks them", () => {
  render(<App />);
  const checkboxes = screen.getAllByRole("checkbox");

  checkboxes.forEach((checkbox) => expect(checkbox).not.toBeChecked);

  checkboxes.forEach((checkbox) => {
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});

test("a message is displayed when the user clicks the Submit button", () => {
  render(<App />);
  const submit = screen.getByRole("button", {
    name: /sign up for newsletter/i,
  });
  userEvent.click(submit);
  expect(screen.queryByText(/thank you for signing up/i)).toBeInTheDocument();
});
