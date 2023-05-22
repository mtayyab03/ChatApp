import React, { useEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { firebase } from "../../config";

const Home = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const messagesData = snapshot.docs.map((doc) => {
          const firebaseData = doc.data();
          const data = {
            _id: doc.id,
            text: firebaseData.text,
            createdAt: firebaseData.createdAt?.toDate() || new Date(),
            user: {
              _id: firebaseData.user._id,
              name: firebaseData.user.name,
            },
          };
          return data;
        });
        setMessages(messagesData);
      });

    return () => unsubscribe();
  }, []);

  const handleSendMessage = async (messages) => {
    const newMessage = messages[0];
    const user = firebase.auth().currentUser;

    await firebase
      .firestore()
      .collection("messages")
      .add({
        text: newMessage.text,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        user: {
          _id: user.uid,
          name: user.displayName,
        },
      });
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSendMessage}
      user={{
        _id: firebase.auth().currentUser.uid,
        name: firebase.auth().currentUser.displayName,
      }}
    />
  );
};

export default Home;
