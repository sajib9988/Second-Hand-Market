import { AppStore, makeStore } from "@/redux/store";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

export default function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!storeRef.current) {
      storeRef.current = makeStore();
    }
    setIsReady(true);
  }, []);

  const persistedStore = storeRef.current ? persistStore(storeRef.current) : null;

  if (!isReady || !persistedStore) {
    return null; // Or a loading indicator
  }

  return (
    <Provider store={storeRef.current!}> {/* Assert non-null here */}
      <PersistGate loading={null} persistor={persistedStore}>
        {children}
      </PersistGate>
    </Provider>
  );
}
