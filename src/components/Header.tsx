import { Heart, Menu, User, Bell } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onMenuClick: () => void;
}

export function Header({ currentView, onViewChange, onMenuClick }: HeaderProps) {
  return (
    <header className="bg-white border-b-2 border-[#0077B6] sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onMenuClick}>
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="bg-[#0077B6] p-2 rounded-full">
              <Heart className="h-6 w-6 text-white fill-current" />
            </div>
            <h1 className="text-xl font-bold text-[#212121]">ONDA ANIMAL</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onViewChange('profile')}>
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}