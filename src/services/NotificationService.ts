
import { toast } from 'sonner';

// Types for our notification system
export type NotificationType = 'breaking' | 'recommendation' | 'update' | 'alert';
export type NotificationPriority = 'low' | 'medium' | 'high';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  read: boolean;
  timestamp: Date;
  category?: string;
  url?: string;
}

// Helper to generate a unique ID
const generateId = () => `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// In-memory storage for notifications (in a real app, this would be in a database)
let notifications: Notification[] = [];

// Mock user interests (in a real app, this would come from user preferences/DB)
const userInterests = ['Business', 'Finance', 'Technology'];

export const NotificationService = {
  // Get all notifications
  getAll: () => {
    return [...notifications];
  },
  
  // Get unread notifications
  getUnread: () => {
    return notifications.filter(n => !n.read);
  },
  
  // Add a new notification
  add: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      id: generateId(),
      timestamp: new Date(),
      read: false,
      ...notification
    };
    
    notifications = [newNotification, ...notifications];
    
    // Show a toast notification if it's high priority
    if (newNotification.priority === 'high') {
      toast(newNotification.title, {
        description: newNotification.message,
        action: {
          label: 'View',
          onClick: () => {
            if (newNotification.url) {
              window.location.href = newNotification.url;
            }
          }
        }
      });
    }
    
    return newNotification;
  },
  
  // Mark a notification as read
  markAsRead: (id: string) => {
    notifications = notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
  },
  
  // Mark all notifications as read
  markAllAsRead: () => {
    notifications = notifications.map(notification => ({ ...notification, read: true }));
  },
  
  // Remove a notification
  remove: (id: string) => {
    notifications = notifications.filter(notification => notification.id !== id);
  },
  
  // Check if a notification matches user interests
  matchesUserInterests: (category: string) => {
    return userInterests.some(interest => 
      interest.toLowerCase() === category.toLowerCase()
    );
  },
  
  // Create a recommendation notification
  createRecommendation: (title: string, category: string, url: string) => {
    // Only create recommendation if it matches user interests
    if (NotificationService.matchesUserInterests(category)) {
      return NotificationService.add({
        title: `Recommended: ${title}`,
        message: `New ${category} article we think you'll like based on your interests.`,
        type: 'recommendation',
        priority: 'medium',
        category,
        url
      });
    }
    return null;
  },
  
  // Create a breaking news notification
  createBreakingNews: (title: string, category: string, url: string) => {
    return NotificationService.add({
      title: `BREAKING: ${title}`,
      message: `Breaking news in ${category}.`,
      type: 'breaking',
      priority: 'high',
      category,
      url
    });
  }
};

// Initialize with some sample notifications
setTimeout(() => {
  NotificationService.add({
    title: 'Welcome to personalized notifications',
    message: 'You will now receive updates based on your interests.',
    type: 'update',
    priority: 'medium'
  });
  
  if (NotificationService.matchesUserInterests('Technology')) {
    NotificationService.add({
      title: 'New Tech Report Available',
      message: 'The latest technology market analysis has been published.',
      type: 'recommendation',
      priority: 'medium',
      category: 'Technology',
      url: '/category/technology'
    });
  }
}, 1000);

export default NotificationService;
