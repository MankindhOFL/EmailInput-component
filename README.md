# EmailInput Component

The `EmailInput` component is a React component designed to collect email addresses and store them in a Supabase database. It includes validation for email input, displays success or error messages, and integrates seamlessly with Supabase for database operations.

---

## Features

- **Email Validation**: Ensures the entered email is in a valid format.
- **Supabase Integration**: Inserts email addresses into a Supabase database table.
- **Error Handling**: Displays error messages for invalid email formats or failed submissions.
- **Success Feedback**: Displays a success message when the email is successfully submitted.
- **Fully Tested**: Includes unit tests for rendering, validation, and database interactions.

---

## File Structure

### `EmailInput.jsx`

The main component file that contains the logic for:
- Handling user input.
- Validating email addresses.
- Submitting data to Supabase.
- Displaying success and error messages.

### `EmailInput.test.jsx`

The test file for the `EmailInput` component. It includes:
- Tests for rendering the component.
- Tests for email validation and error messages.
- Tests for successful email submission and input clearing.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MankindhOFL/EmailInput-component.git
   cd EmailInput-component