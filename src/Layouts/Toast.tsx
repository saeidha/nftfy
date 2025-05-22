import React, { createContext, useState, useContext, ReactNode } from "react";
import ReactDOM from "react-dom";
import logo from "../assets/images/logo.png";

interface Notification {
  isDark: boolean;
  id: number;
  message: string;
  type: "success" | "warn" | "error" | "i" | "s" | "w" | "e";
}

interface NotificationContextType {
  showNotification: (
    message: string,
    type: "success" | "warn" | "error" | "i" | "s" | "w" | "e",
    isDark?: boolean,
    duration?: number
  ) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

let notificationId = 0;

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = (
    message: string,
    type: "success" | "warn" | "error" | "i" | "s" | "w" | "e",
    isDark: boolean = false,
    duration: number = 5000
  ) => {
    const id = ++notificationId;
    setNotification({ id, message, type, isDark });
    setTimeout(() => {
      setNotification(null);
    }, duration);
  };

  const CloseToast = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {ReactDOM.createPortal(
        notification && (
          <div className="fixed top-20 right-5 z-[9999] flex flex-col space-y-3">
            <div
              key={notification.id}
              className={`shadow-2xl bg-white dark:bg-black h-12 rounded-3xl flex gap-x-2 items-center`}
              onClick={CloseToast}
            >
              <img src={logo} alt="logo" className="w-12" />
              <span
                className={`py-4 mr-2 ${
                  notification.type === "success" || notification.type === "s"
                    ? "text-green-700"
                    : notification.type === "error" || notification.type === "e"
                    ? "text-red-700"
                    : notification.type === "warn" || notification.type === "w"
                    ? "text-yellow-600"
                    : "text-black"
                }`}
              >
                {notification.message}
              </span>
            </div>
          </div>
        ),
        document.body
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
