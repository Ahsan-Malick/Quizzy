import { useState } from 'react'
import { Button } from "./Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Brain, Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Create Quiz', href: '/create' },
    { name: 'My Quizzes', href: '/my-quizzes' },
    { name: 'Explore', href: '/explore' },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Brain className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-foreground">QuizAI</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <img
                    src="/placeholder.svg?height=32&width=32"
                    alt="User avatar"
                    className="h-8 w-8 rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open mobile menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-border">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <img
                  src="/placeholder.svg?height=40&width=40"
                  alt="User avatar"
                  className="h-10 w-10 rounded-full"
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-foreground">User Name</div>
                <div className="text-sm font-medium text-muted-foreground">user@example.com</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <Button variant="ghost" className="block px-4 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent w-full text-left">
                Profile
              </Button>
              <Button variant="ghost" className="block px-4 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent w-full text-left">
                Settings
              </Button>
              <Button variant="ghost" className="block px-4 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent w-full text-left">
                Sign out
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}