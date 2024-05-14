// JSX
// ㄴ Javascript XML

import { RouterProvider } from "react-router-dom";
//import BookList from "./components/BookList";
import router from "./router";
//import MyComponent from "./components/MyComponent";

function App() {
  return (
    //<BookList />
    <RouterProvider router={router}/>
  );
}
//const MyCompoment = () =>{
  
//};

export default App;
