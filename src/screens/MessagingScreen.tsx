import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, TextField, Button, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getMessages, sendMessage } from '../services/messagingService';

const MessagingScreen = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (user && selectedUser) {
      loadMessages();
    }
  }, [user, selectedUser]);

  const loadMessages = async () => {
    const chatMessages = await getMessages(user.uid, selectedUser.uid);
    setMessages(chatMessages);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedUser) {
      await sendMessage(user.uid, selectedUser.uid, newMessage);
      setNewMessage('');
      loadMessages();
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Messages
      </Typography>

      {selectedUser ? (
        <>
          <Typography variant="h6">Chat with {selectedUser.username}</Typography>
          <List>
            {messages.map((message, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={message.text}
                  secondary={`${message.senderName} - ${new Date(message.timestamp).toLocaleString()}`}
                />
              </ListItem>
            ))}
          </List>
          <Box sx={{ display: 'flex', mt: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type a message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button variant="contained" onClick={handleSendMessage} sx={{ ml: 1 }}>
              Send
            </Button>
          </Box>
        </>
      ) : (
        <Typography>Select a user to start chatting</Typography>
      )}
    </Container>
  );
};

export default MessagingScreen;