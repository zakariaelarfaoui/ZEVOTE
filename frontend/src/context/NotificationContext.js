import { createContext, useReducer } from "react";
import Notification from "../components/Notification/Notification";
import { NotificationWrapper } from "../components/Notification/Notification.styles";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "ADD_NOTIFICATION":
        return [...state, {...action.payload}];
            
      default:
        return state;
    }
  },
    [
  //   { type: "success", message: "test success" },
  //   { type: "warning", message: "test warning" },
  //   { type: "error", message: "test error" },
  ]
  )
  return (
    <NotificationContext.Provider value={{}}>
      <NotificationWrapper>
        {state.map((notification, index) => (
          <Notification key={index + 1} {...notification} />
        ) )}
      </NotificationWrapper>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
