// components/Layout.tsx
import Header from "../header";

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <main style={{ paddingTop:'6.5rem' }}>
                {children}
            </main>
        </>
    );
}
