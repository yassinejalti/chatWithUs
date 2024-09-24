import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect, useState, useRef } from 'react';

interface RouteParams {
    id:number,
    name: string;
    age: number;
    gender:string,
    description: string;
}

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
    {
        isReceived: true,
        datetime: 1695541020,
        content: "Just working on a project.",
    },
    {
        isReceived: false,
        datetime: 1695541080,
        content: "That sounds interesting! What kind of project?",
    },
    {
        isReceived: true,
        datetime: 1695541140,
        content: "It's a chat application using React Native.",
    },
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
    {
        isReceived: true,
        datetime: 1695541020,
        content: "Just working on a project.",
    },
    {
        isReceived: false,
        datetime: 1695541080,
        content: "That sounds interesting! What kind of project?",
    },
    {
        isReceived: true,
        datetime: 1695541140,
        content: "It's a chat application using React Native.",
    },
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
    {
        isReceived: true,
        datetime: 1695541020,
        content: "Just working on a project.",
    },
    {
        isReceived: false,
        datetime: 1695541080,
        content: "That sounds interesting! What kind of project?",
    },
    {
        isReceived: true,
        datetime: 1695541140,
        content: "It's a chat application using React Native.",
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

    const route = useRoute();
    const [inputText, setInputText] = useState('');
    const { id, name, age, gender, description } = route.params as RouteParams;

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