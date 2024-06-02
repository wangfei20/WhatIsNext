import React, { createContext,useState, useContext, useEffect } from 'react';

function Greeting(props) {
    useEffect(()=>{
        console.log("update greetings");
    },{})
    console.log("greetings",this);
    return <h1>Hello, {props.name}!</h1>;
    
  }


const AuthContext = createContext();

// AuthProvider component to wrap around your app
const AuthProvider = function({ children }) {
    
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState("initial");
 
  const toggleAuth = () => {
    setIsAuthenticated(prevState => !prevState);
    setLoading("Loaded")
  };

  
  return (
    <div className="auth">
    <AuthContext.Provider value={{ isAuthenticated, toggleAuth }}>
      {children}
    </AuthContext.Provider>
    </div>
  );
};

// Child component that consumes the authentication status
const ChildComponent = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState("initial");
   
    const toggleAuth = () => {
      setIsAuthenticated(prevState => !prevState);
      setLoading("Loaded")
    };
    return (
    <div>
        <Greeting name={isAuthenticated ? "fei" : "unknown"}/>
      <p>User is {isAuthenticated ? 'authenticated' : 'not authenticated'}</p>
      <button onClick={toggleAuth}>
        {
            isAuthenticated ? 'Logout' : 'Login'
            
        }
      </button>
    </div>
  );
};

const ChildComponent2 = ({isAuthenticated}) => {
  console.log("ChildComponent2");
  useEffect(()=>{
    console.log("c2 willmount");
    return (a)=>{
      console.log("c2 cleanup",a);
    }
  },[])
  return (
    <div>
      <p>User is {isAuthenticated ? 'authenticated' : 'not authenticated'}</p>
      Child 2
    </div>
  );
};


const Layout = ({children}) => {
  console.log("Layout");
  //const { isAuthenticated, toggleAuth } = useContext(AuthContext)
  return (
    <AuthProvider>
    <div className="lau">
      <ChildComponent />
     
    </div>
    </AuthProvider>
  );
};
export default Layout

// export default function App({ Component, pageProps }) {
  
//   console.log("App");
//     return <Layout1>
//         <ChildComponent />
//       </Layout1 >
    
      
//   }
  