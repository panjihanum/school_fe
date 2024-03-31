import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSocket } from 'src/hooks/useSocket';
import { getSocketResponse } from 'src/services/socket';
import ChatBubble from './ChatBubble';

interface Message {
    id: string;
    senderId: string;
    message: string;
    forumId: string;
    createdAt: Date;
    messageType: string;
}

interface ForumPartialProps {
    senderId: string;
    forumId: string;
}

function ForumPartial({ senderId, forumId }: ForumPartialProps): JSX.Element {
    const { socketResponse, sendData } = useSocket(forumId, senderId);
    const [messageInput, setMessageInput] = useState<string>("");
    const [messageList, setMessageList] = useState<Message[]>([]);

    const addMessageToList = (val: Message) => {
        if (val.forumId === "") return;
        setMessageList(prevMessages => [...prevMessages, val]);
        fetchMessage();
    }

    const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (messageInput !== "") {
            sendData({
                message: messageInput
            });
            addMessageToList({
                id: "",
                message: messageInput,
                senderId: senderId,
                createdAt: new Date(),
                messageType: "CLIENT",
                forumId: ""
            });
            setMessageInput("");
        }
    }

    const fetchMessage = () => {
        getSocketResponse(forumId)
            .then((res: Message[]) => {
                setMessageList([...res]);
            }).catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        fetchMessage();
    }, []);

    useEffect(() => {
        addMessageToList(socketResponse as any);
    }, [socketResponse]);

    return (
        <Container>
            <Grid
                container
                gap={3}
                flexDirection={'column'}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Grid item sx={{ width: '100%', bgcolor: '#ffffff', paddingX: '0rem', borderRadius: 6 }}>
                    <Box
                        className="chat-box"
                        sx={{
                            width: '100%',
                            paddingY: '2rem',
                            borderRadius: 4,
                            height: '60vh',
                            overflow: 'auto'
                        }}
                    >
                        {
                            messageList.map((message) => {
                                if (message.messageType === 'CLIENT') {
                                    console.log(message);
                                    return (
                                        <ChatBubble
                                            key={message.id}
                                            isSender={message.senderId === senderId}
                                            username={message.senderId}
                                            message={message.message}
                                        />
                                    )
                                }
                                return null;
                            })
                        }
                    </Box>
                    <Grid
                        container
                        alignItems={"center"}
                        width={"100%"}
                        sx={{
                            paddingY: '0.5rem',
                            borderTop: '2px solid #99b1c5',
                        }}
                    >
                        <Grid item xs={11}>
                            <form onSubmit={sendMessage}>
                                <TextField
                                    variant="standard"
                                    placeholder='Type your message'
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    fullWidth
                                    InputProps={{
                                        disableUnderline: true,
                                        sx: {
                                            paddingX: '0.5rem'
                                        }
                                    }}
                                />
                            </form>
                        </Grid>
                        <Grid item xs={1}>
                            <Button
                                onClick={(e) => sendMessage(e as any)}
                            >
                                Send
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default ForumPartial;
