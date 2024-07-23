import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { CounterState, GlobalState, TelegramInitData } from '../../../util/types';

export const AppContext = createContext(undefined as unknown as GlobalState);

export const useInitGlobalState = () => {
    const [counter, setCounter] = useState<CounterState>(0);
    return useMemo(() => {
        return {
            counter: {
                value: counter,
                setter: setCounter,
            },
        } satisfies Required<GlobalState> as Required<GlobalState>;
    }, [counter]);
}

export const useGlobalState = () => useContext(AppContext);

export const useCounter = () => {
    const context = useContext(AppContext);
    const { value, setter } = context.counter!;

    const click = useCallback(() => setter(value => value + 1), [setter]);

    return {
        clicks: value,
        click,
    };
};

export const useInitData = () => {
    return useMemo(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const initData = (window as any).Telegram?.WebApp?.initDataUnsafe;
        return {
            queryId: initData.query_id,
            hash: initData.hash,
            authDate: Number(initData.auth_date),
            canSendAfter: initData.can_send_after !== undefined ? Number(initData.can_send_after) : undefined,
            user: initData.user ? {
                id: initData.user?.id,
                isBot: initData.user?.is_bot,
                firstName: initData.user?.first_name,
                lastName: initData.user?.last_name,
                username: initData.user?.username,
                languageCode: initData.user?.language_code,
                isPremium: initData.user?.is_premium,
                allowsWriteToPm: initData.user?.allows_write_to_pm,
                photoUrl: initData.user?.photo_url,
            } : undefined,
        } satisfies TelegramInitData as TelegramInitData;
    }, [])
}
