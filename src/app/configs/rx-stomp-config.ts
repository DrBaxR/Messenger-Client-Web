import { InjectableRxStompConfig } from '@stomp/ng2-stompjs';

export let rxStompConfig: InjectableRxStompConfig = {
    brokerURL: 'wss://messenger-server-pkfomy4bva-lm.a.run.app/messenger',

    heartbeatIncoming: 0, 
    heartbeatOutgoing: 20000, 

    reconnectDelay: 200,
};