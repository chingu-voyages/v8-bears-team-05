import io from 'socket.io-client';

const socket = io('/boardandeditor', { transports: ['websocket', 'polling'] });

export default socket;
