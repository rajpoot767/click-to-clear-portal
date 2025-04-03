
import React from "react";
import { toast } from "sonner";
import { CheckCircle, AlertCircle, Info, XCircle } from "lucide-react";

type NotificationType = "success" | "error" | "info" | "warning";

interface NotificationOptions {
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const NotificationSystem = {
  show: (
    title: string,
    type: NotificationType = "info",
    options?: NotificationOptions
  ) => {
    const { description, duration = 5000, action } = options || {};
    
    const Icon = {
      success: CheckCircle,
      error: XCircle,
      warning: AlertCircle,
      info: Info
    }[type];
    
    toast(title, {
      description,
      duration,
      icon: <Icon className={`
        ${type === 'success' ? 'text-green-500' : ''}
        ${type === 'error' ? 'text-red-500' : ''}
        ${type === 'warning' ? 'text-amber-500' : ''}
        ${type === 'info' ? 'text-blue-500' : ''}
      `} />,
      action: action ? {
        label: action.label,
        onClick: action.onClick
      } : undefined,
    });
  },
  
  success: (title: string, options?: NotificationOptions) => {
    NotificationSystem.show(title, "success", options);
  },
  
  error: (title: string, options?: NotificationOptions) => {
    NotificationSystem.show(title, "error", options);
  },
  
  warning: (title: string, options?: NotificationOptions) => {
    NotificationSystem.show(title, "warning", options);
  },
  
  info: (title: string, options?: NotificationOptions) => {
    NotificationSystem.show(title, "info", options);
  },
};

export default NotificationSystem;
