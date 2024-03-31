import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const useSocket = (forumId: string, senderId: string) => {
    const [socket, setSocket] = useState();
    const [socketResponse, setSocketResponse] = useState({
        forumId: "",
        message: "",
        senderId: "",
        messageType: "",
        createdAt: ""
    });
    const [isConnected, setConnected] = useState(false);

    const sendData = useCallback((payload: any) => {
        const emit = (socket as any).emit;
        emit("send_message", {
            forumId: forumId,
            message: payload.message,
            senderId: senderId,
            messageType: "CLIENT"
        });
    }, [socket, forumId]);

    useEffect(() => {
        const socketBaseUrl = process.env.REACT_APP_FORUM_SOCKET_URL ?? "";
        const s: any = io(socketBaseUrl, {
            query: `senderId=${senderId}&forumId=${forumId}` as any
        });
        setSocket(s);
        s.on("connect", () => {
            setConnected(true);
        });
        s.on("connect_error", (error: any) => {
            console.error("SOCKET CONNECTION ERROR", error);
        });
        s.on("read_message", (res: any) => {
            setSocketResponse({
                forumId: res.forumId,
                message: res.message,
                senderId: res.senderId,
                messageType: res.messageType,
                createdAt: res.createdAt
            });
        });

        return () => {
            s.disconnect();
        };
    }, [forumId, senderId]);

    return { isConnected, socketResponse, sendData };
}