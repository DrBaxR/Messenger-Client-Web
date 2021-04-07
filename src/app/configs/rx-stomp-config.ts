import { InjectableRxStompConfig } from '@stomp/ng2-stompjs';

export let rxStompConfig: InjectableRxStompConfig = {
    brokerURL: 'ws://localhost:8080/messenger',

    heartbeatIncoming: 0, 
    heartbeatOutgoing: 20000, 

    reconnectDelay: 200,
};