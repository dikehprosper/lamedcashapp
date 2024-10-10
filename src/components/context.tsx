import { createContext } from 'react';

// Define the type for your context value
type ThemeContextType = string | undefined;

// Create the context with a default value
const MyContext = createContext<ThemeContextType>(undefined); // Using 'undefined' for strict type checking

export default MyContext;
