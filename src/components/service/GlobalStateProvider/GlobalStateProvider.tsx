import { memo } from "react";
import { AppContext, useInitGlobalState } from "./context";

interface GlobalStateProviderProps {
    children: React.ReactNode;
}

export const GlobalStateProvider = memo(({children}: GlobalStateProviderProps) => {
    const initialState = useInitGlobalState();
    return <AppContext.Provider value={initialState}>{children}</AppContext.Provider>;
});
