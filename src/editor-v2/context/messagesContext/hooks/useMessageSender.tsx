import {useContext} from 'react';

import {PostMessageContext} from '../messagesContext';

export const useMessageSender = () => {
    const {sendMessage} = useContext(PostMessageContext);
    return sendMessage;
};

export default useMessageSender;
