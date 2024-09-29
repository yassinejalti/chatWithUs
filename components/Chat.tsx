import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect, useState, useRef } from 'react';

// websocket context
import { useWebSocket } from '../contexts/webSocketContext';

// store
import { useSelector } from 'react-redux';

const messages = [
    {
        isReceived: true,
        datetime: 1695540900,
        content: "Hello! How are you?",
    },
    {
        isReceived: false,
        datetime: 1695540960,
        content: "I'm good, thanks! How about you?",
    },
];

function Message({ isReceived, datetime, content }:any) {
    const formattedDate = new Date(datetime * 1000).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <View style={[styles.container, isReceived ? styles.received : styles.sent]}>
            <Text style={styles.content}>{content}</Text>
            <Text style={styles.timestamp}>{formattedDate}</Text>
        </View>
    );
}

export default function Chat(){
    const navigation = useNavigation<any>();
    const scrollViewRef = useRef<ScrollView>(null);
    const { ws } = useWebSocket();
    const [inputText, setInputText] = useState('');
    let currentState = useSelector((state:any)=>state.general).general;
    currentState = JSON.stringify(currentState);
    currentState = JSON.parse(currentState);

    // route params
    const route = useRoute<any>();
    const { internal_client_ID, name, age, gender, description } = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chat with '+name,
        });
    }, [navigation]);

    const handleSend = () => {
        if (inputText.trim()) {
            setInputText('');
            console.log('Message sent:', inputText);
            //
            //
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView 
            style={{ flex: 1 }}
            ref={scrollViewRef}
            contentContainerStyle={{ paddingBottom: 50 }}
            onContentSizeChange={() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }}
            >
                <View style={{ padding: 10 }}>
                    {messages.map((msg, index) => (
                        <Message key={index} {...msg} />
                    ))}
                </View>
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type your message..."
                    value={inputText}
                    onChangeText={setInputText}
                    onSubmitEditing={handleSend}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        maxWidth: '80%',
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    received: {
        backgroundColor: '#E1FFC7',
        alignSelf: 'flex-start',
    },
    sent: {
        backgroundColor: '#C7D3FF',
        alignSelf: 'flex-end',
    },
    content: {
        fontSize: 16,
    },
    timestamp: {
        fontSize: 12,
        color: '#888',
        marginTop: 5,
        textAlign: 'right',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        backgroundColor: '#F9F9F9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    input: {
        flex: 1,
        height: 45,
        padding: 10,
        marginRight: 10,
        borderColor: '#CED4DA',
        borderWidth: 1,
        borderRadius: 25,
        backgroundColor: '#FFFFFF',
    },
    sendButton: {
        backgroundColor: '#191970',
        paddingVertical: 12,
        borderRadius:25,
        paddingHorizontal: 20,

    },
    sendButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },    
});