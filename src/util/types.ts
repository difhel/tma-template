export type TelegramInitData = {
    queryId: string,
    hash: string,
    authDate: number,
    canSendAfter?: number
    user?: {
        id: number,
        isBot?: boolean,
        firstName: string,
        lastName?: string,
        username?: string,
        languageCode?: string,
        isPremium?: boolean,
        allowsWriteToPm?: boolean,
        photoUrl?: string,
    }
};

export type ReactState<K> = {
    value: K,
    setter: React.Dispatch<React.SetStateAction<K>>
};

export type CounterState = number;

export type GlobalState = {
    counter?: ReactState<CounterState>;
};
