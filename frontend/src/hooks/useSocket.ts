import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000';

interface UseSocketOptions {
  onNewFeed?: (feed: any) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

export const useSocket = (options?: UseSocketOptions) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Implement singleton socket connection
    if (!socketRef.current) {
      socketRef.current = io(SOCKET_URL, {
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 20000,
      });
    }

    const socket = socketRef.current;

    const handleConnect = () => {
      console.log('Socket connected:', socket.id);
      options?.onConnect?.();
    };

    const handleDisconnect = (reason: string) => {
      console.log('Socket disconnected:', reason);
      options?.onDisconnect?.();
    };

    const handleNewFeed = (feed: any) => {
      console.log('New feed received via socket:', feed);
      options?.onNewFeed?.(feed);
    };

    // Attach listeners
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    
    // Prevent duplicate socket events by carefully adding and removing them
    if (options?.onNewFeed) {
      socket.on('new-feed', handleNewFeed);
    }

    // Cleanup function
    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      
      if (options?.onNewFeed) {
        socket.off('new-feed', handleNewFeed);
      }

      // We only disconnect when the component unmounts fully, 
      // but typically we might want to keep the socket alive or disconnect properly.
      // Since this is used in Next.js, we should clean up if the layout/page unmounts.
      // socket.disconnect(); 
    };
  }, [options]);

  return socketRef.current;
};
