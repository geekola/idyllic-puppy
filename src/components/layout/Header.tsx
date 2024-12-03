import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogIn, LogOut, Plus, User, HelpCircle } from 'lucide-react';
import { Logo } from '../common/Logo';
import { ThemeToggle } from '../common/ThemeToggle';
import { useAuth } from '../../hooks/useAuth';
import { UnifiedAuthButton } from '../auth/UnifiedAuthButton';

const publicNavigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
];

const authenticatedNavigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'FAQ', href: '/faq', icon: HelpCircle },
  { name: 'Profile', href: '/profile', icon: User }
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navigation = user ? authenticatedNavigation : publicNavigation;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Logo className="h-8 w-auto" />
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors ${
                  location.pathname === item.href
                    ? 'border-primary text-primary dark:text-white'
                    : 'border-transparent text-gray-500 dark:text-gray-300 hover:text-primary dark:hover:text-white'
                }`}
              >
                {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                {item.name}
              </Link>
            ))}

            {user && (
              <Link
                to="/campaigns/new"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-highlight transition-colors duration-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Campaign
              </Link>
            )}

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-highlight transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-highlight transition-colors duration-200"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">
                {isMenuOpen ? 'Close main menu' : 'Open main menu'}
              </span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden transition-all duration-200 ease-in-out ${
            isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
          id="mobile-menu"
        >
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center pl-3 pr-4 py-2 text-base font-medium border-l-4 transition-colors ${
                  location.pathname === item.href
                    ? 'border-primary text-primary dark:text-white bg-primary/10'
                    : 'border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                {item.name}
              </Link>
            ))}

            {user && (
              <Link
                to="/campaigns/new"
                className="flex items-center pl-3 pr-4 py-2 text-base font-medium border-l-4 border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Campaign
              </Link>
            )}

            {user ? (
              <button
                onClick={() => {
                  handleSignOut();
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center pl-3 pr-4 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowAuthModal(true);
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center pl-3 pr-4 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      {showAuthModal && !user && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setShowAuthModal(false)} />
            <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
              <UnifiedAuthButton onSuccess={() => setShowAuthModal(false)} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}