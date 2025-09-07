import { X, Home, Heart, Calendar, DollarSign, MessageCircle, BarChart3, HelpCircle, Settings, LogOut } from "lucide-react";
import { Button } from "./ui/button";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: string;
  onViewChange: (view: string) => void;
  userType: 'adopter' | 'volunteer' | 'admin';
}

export function SideMenu({ isOpen, onClose, currentView, onViewChange, userType }: SideMenuProps) {
  const menuItems = [
    { id: 'home', label: 'Início', icon: Home, show: true },
    { id: 'favorites', label: 'Favoritos', icon: Heart, show: true },
    { id: 'appointments', label: 'Agendamentos', icon: Calendar, show: true },
    { id: 'donations', label: 'Doações', icon: DollarSign, show: true },
    { id: 'messages', label: 'Mensagens', icon: MessageCircle, show: true },
    { id: 'reports', label: 'Relatórios', icon: BarChart3, show: userType === 'admin' || userType === 'volunteer' },
    { id: 'guide', label: 'Guia do Adotante', icon: HelpCircle, show: true },
    { id: 'settings', label: 'Configurações', icon: Settings, show: true },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay transparente */}
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={onClose}
      />
      
      {/* Menu lateral */}
      <div className="absolute left-0 top-0 h-full w-80 bg-white border-r-2 border-[#0077B6] shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="bg-[#0077B6] p-2 rounded-full">
              <Heart className="h-5 w-5 text-white fill-current" />
            </div>
                  <span className="font-bold text-[#212121]">ONDA ANIMAL</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="p-4">
          <div className="space-y-2">
            {menuItems.filter(item => item.show).map((item) => (
              <Button
                key={item.id}
                variant={currentView === item.id ? "secondary" : "ghost"}
                className={`w-full justify-start ${
                  currentView === item.id 
                    ? 'bg-[#F5F5DC] text-[#212121] border-l-4 border-[#0077B6]' 
                    : 'hover:bg-[#ECEFF1]'
                }`}
                onClick={() => {
                  onViewChange(item.id);
                  onClose();
                }}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </Button>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t">
            <Button variant="ghost" className="w-full justify-start text-red-600 hover:bg-red-50">
              <LogOut className="h-5 w-5 mr-3" />
              Sair
            </Button>
          </div>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-[#F5F5DC] p-3 rounded-lg border border-[#ECEFF1]">
            <p className="text-xs text-[#212121] mb-2">
              🌊 Ajude a ONDA ANIMAL a continuar salvando vidas!
            </p>
            <Button 
              size="sm" 
              className="w-full bg-[#0077B6] hover:bg-[#005A8C] text-white"
              onClick={() => {
                onViewChange('donations');
                onClose();
              }}
            >
              Fazer Doação
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}