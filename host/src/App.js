import {
  createBrowserRouter,
} from "react-router-dom";
import Parent from './Parent';
import Child from './Child';

export const router = createBrowserRouter([
  {
    path: "iframe",
    element: <Child/>
  },
  {
    path: "/",
    element: <Parent/>,
  }
]);

