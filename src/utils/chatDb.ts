export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface Conversation {
  id: string;
  title: string;
  date: string;
  messages: ChatMessage[];
}

const STORAGE_KEY_PREFIX = 'yupana_chats_';

export function getConversations(moduleKey: string): Conversation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PREFIX + moduleKey);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error('Error reading conversations from localStorage', error);
    return [];
  }
}

export function saveConversation(moduleKey: string, conversation: Conversation): Conversation[] {
  try {
    const current = getConversations(moduleKey);
    const existingIndex = current.findIndex(c => c.id === conversation.id);
    
    if (existingIndex > -1) {
      current[existingIndex] = conversation;
    } else {
      current.unshift(conversation);
    }
    
    localStorage.setItem(STORAGE_KEY_PREFIX + moduleKey, JSON.stringify(current));
    return current;
  } catch (error) {
    console.error('Error saving conversation to localStorage', error);
    return [];
  }
}

export function deleteConversation(moduleKey: string, id: string): Conversation[] {
  try {
    const current = getConversations(moduleKey);
    const updated = current.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEY_PREFIX + moduleKey, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Error deleting conversation from localStorage', error);
    return [];
  }
}
