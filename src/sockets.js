import io from 'socket.io-client';

const socket = io('http://localhost:7000/boardandeditor', { transports: ['websocket', 'polling'] });

export default socket;
