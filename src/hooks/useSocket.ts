import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = (tenantId?: string) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io();

    if (tenantId) {
      socketRef.current.emit('join-tenant', tenantId);
    }

    return () => {
      socketRef.current?.disconnect();
    };
  }, [tenantId]);

  return socketRef.current;
};
