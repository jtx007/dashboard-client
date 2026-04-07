import { Navbar } from "./navbar"

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="p-4">

            <Navbar />

            {children}

        </div>
    )
}

export default Layout