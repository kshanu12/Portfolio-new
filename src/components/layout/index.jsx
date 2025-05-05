// components/Layout.tsx
import ChatWidget from "../Items/chatBot";
import Header from "../Items/header";

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <main style={{ paddingTop:'6.5rem' }}>
                {children}
            </main>
            <ChatWidget/>
        </>
    );
}
