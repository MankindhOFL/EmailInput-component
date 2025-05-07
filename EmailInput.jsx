import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://your-supabase-url.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'your-anon-key'; // Replace with your Supabase anon key
const supabase = createClient(supabaseUrl, supabaseKey);

const EmailInput = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError(''); // Clear error on input change
    setSuccess(''); // Clear success message on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      try {
        const { data, error } = await supabase.from('emails').insert([{ email }]);
        if (error) {
          throw error;
        }
        setSuccess('Email successfully submitted!');
        setEmail(''); // Clear input after submission
      } catch (err) {
        console.error('Submission failed:', err);
        setError('Failed to submit email. Please try again.');
      }
    } else {
      console.log('Invalid email submitted:', email);
      setError('Please enter a valid email address.');
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={handleChange}
        placeholder="Enter your email"
        required
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default EmailInput;