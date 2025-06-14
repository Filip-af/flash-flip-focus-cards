
import { NavLink } from "react-router-dom";
import { BookOpenText } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-background">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <NavLink to="/" className="flex items-center justify-center gap-2">
          <BookOpenText className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Flashcardify</span>
        </NavLink>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <NavLink
            to="/add"
            className={({ isActive }) =>
              `text-sm font-medium hover:underline underline-offset-4 ${isActive ? 'text-primary' : 'text-muted-foreground'}`
            }
          >
            Add Cards
          </NavLink>
          <NavLink
            to="/review"
            className={({ isActive }) =>
              `text-sm font-medium hover:underline underline-offset-4 ${isActive ? 'text-primary' : 'text-muted-foreground'}`
            }
          >
            Review
          </NavLink>
        </nav>
      </header>
      <main className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
