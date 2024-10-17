const backendUrl = "https://react-fullstack-projects.onrender.com";
export const url = process.env.NODE_ENV === 'development' 
? `http://localhost:5000` 
: `${backendUrl}`;