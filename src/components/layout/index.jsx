// components/Layout.tsx
import ChatWidget from "../chatBot";
import Header from "../header";

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
