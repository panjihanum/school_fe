import { useCallback, useEffect, useState } from "react";
// @ts-ignore
import io from "socket.io-client";

export const useSocket = (forumId: string, senderId: string) => {
    const [socket, setSocket] = useState<any>();
    const [socketResponse, setSocketResponse] = useState({
        forumId: "",
        message: "",
        senderId: "",
        messageType: "",
        createdAt: ""
    });

    useEffect(() => {
        const socketBaseUrl = process.env.REACT_APP_FORUM_SOCKET_URL ?? "";
        const s = io(socketBaseUrl, {
            query: `senderId=${senderId}&forumId=${forumId}` as any
        });
        setSocket(s);

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
            if (socket) {
                socket.disconnect();
            }
        };
    }, [forumId, senderId]);

    const sendData = useCallback((payload: any) => {
        if (socket && socket.connected) {
            socket.emit("send_message", {
                forumId: forumId,
                message: payload.message,
                senderId: senderId,
                messageType: "CLIENT"
            });
        }
    }, [socket, forumId, senderId]);

    return { isConnected: socket ? socket.connected : false, socketResponse, sendData };
}
