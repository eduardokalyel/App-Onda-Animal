import { useState } from "react";
import { Header } from "./components/Header";
import { SideMenu } from "./components/SideMenu";
import { HomeView } from "./components/HomeView";
import { AppointmentsView } from "./components/AppointmentsView";
import { DonationsView } from "./components/DonationsView";
import { Heart, Calendar, Users, BarChart3, MessageCircle, HelpCircle, Settings, User, Home } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";

export default function App() {
  const [currentView, setCurrentView] = useState("home");
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  // Mock user type - em produção viria da autenticação
  const userType = "admin"; // 'adopter', 'volunteer', 'admin'

  const handleMenuClick = () => {
    setSideMenuOpen(true);
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view);
  };

  const handleAnimalClick = (animal: any) => {
    setSelectedAnimal(animal);
    setCurrentView("animal-detail");
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "home":
        return <HomeView onAnimalClick={handleAnimalClick} />;
      case "favorites":
        return <FavoritesView />;
      case "appointments":
        return <AppointmentsView />;
      case "donations":
        return <DonationsView />;
      case "messages":
        return <MessagesView />;
      case "reports":
        return <ReportsView />;
      case "guide":
        return <GuideView />;
      case "settings":
        return <SettingsView />;
      case "profile":
        return <ProfileView />;
      case "animal-detail":
        return <AnimalDetailView animal={selectedAnimal} onBack={() => setCurrentView("home")} />;
      default:
        return <HomeView onAnimalClick={handleAnimalClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        currentView={currentView}
        onViewChange={handleViewChange}
        onMenuClick={handleMenuClick}
      />
      
      <SideMenu
        isOpen={sideMenuOpen}
        onClose={() => setSideMenuOpen(false)}
        currentView={currentView}
        onViewChange={handleViewChange}
        userType={userType}
      />

      <main className="pb-20 lg:pb-0">
        {renderCurrentView()}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#0077B6] lg:hidden">
        <div className="grid grid-cols-5 gap-1 p-2">
          <BottomNavButton
            icon={<Home className="h-5 w-5" />}
            label="Início"
            active={currentView === "home"}
            onClick={() => handleViewChange("home")}
          />
          <BottomNavButton
            icon={<Heart className="h-5 w-5" />}
            label="Favoritos"
            active={currentView === "favorites"}
            onClick={() => handleViewChange("favorites")}
          />
          <BottomNavButton
            icon={<Calendar className="h-5 w-5" />}
            label="Agenda"
            active={currentView === "appointments"}
            onClick={() => handleViewChange("appointments")}
          />
          <BottomNavButton
            icon={<MessageCircle className="h-5 w-5" />}
            label="Chat"
            active={currentView === "messages"}
            onClick={() => handleViewChange("messages")}
            badge="3"
          />
          <BottomNavButton
            icon={<Settings className="h-5 w-5" />}
            label="Mais"
            active={false}
            onClick={handleMenuClick}
          />
        </div>
      </div>
    </div>
  );
}

function BottomNavButton({ icon, label, active, onClick, badge }: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  badge?: string;
}) {
  return (
    <Button
      variant="ghost"
      className={`flex flex-col items-center gap-1 h-auto py-2 px-1 relative ${
        active ? "text-[#0077B6]" : "text-gray-600"
      }`}
      onClick={onClick}
    >
      {icon}
      <span className="text-xs">{label}</span>
      {badge && (
        <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center p-0">
          {badge}
        </Badge>
      )}
    </Button>
  );
}

// Placeholder components for other views
function FavoritesView() {
  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold text-black mb-4">Meus Favoritos</h2>
      <div className="text-center py-12 text-gray-500">
        <Heart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <p>Você ainda não favoritou nenhum animal</p>
        <p className="text-sm">Toque no ❤️ nos cards para favoritar</p>
      </div>
    </div>
  );
}

function MessagesView() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "5551999119352"; // Número formatado para WhatsApp
    const message = "Olá! Vim através do app ONDA ANIMAL e gostaria de conversar sobre adoção.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold text-black mb-4">Mensagens</h2>
      <div className="space-y-4">
        <Card 
          className="cursor-pointer hover:border-[#0077B6] transition-colors"
          onClick={handleWhatsAppClick}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="bg-[#0077B6] p-2 rounded-full">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold">Luciana - ONDA ANIMAL</h4>
                  <span className="text-xs text-gray-500">2h</span>
                </div>
                <p className="text-sm text-gray-700">Olá! Obrigada pelo interesse no Buddy. Quando gostaria de conhecê-lo?</p>
                <Badge className="bg-[#F5F5DC] text-[#0077B6] mt-2">Nova mensagem</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ReportsView() {
  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold text-black mb-4">Relatórios de Castração</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-8 w-8 text-[#4CAF50] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#212121]">47</div>
            <p className="text-sm text-gray-600">Castrações em Agosto</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-[#0077B6] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#212121]">156</div>
            <p className="text-sm text-gray-600">Total no ano</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 text-[#0077B6] mx-auto mb-2" />
            <div className="text-2xl font-bold text-black">12</div>
            <p className="text-sm text-gray-600">Agendadas</p>
          </CardContent>
        </Card>
      </div>
      <p className="text-gray-600">Relatórios detalhados disponíveis em breve...</p>
    </div>
  );
}

function GuideView() {
  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold text-black mb-4">Guia do Adotante Responsável</h2>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">🏠 Preparando sua casa</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Remova objetos perigosos e tóxicos</li>
              <li>Prepare um cantinho aconchegante para o pet</li>
              <li>Tenha comedouros, bebedouros e brinquedos</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">⏰ Adaptação leva tempo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">
              É normal que o animal leve algumas semanas para se adaptar. 
              Tenha paciência e muito amor durante este período.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">🎯 Comportamentos naturais</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li><strong>Cães:</strong> Latem, cavam, correm, roem - é natural!</li>
              <li><strong>Gatos:</strong> Arranham, sobem em lugares altos, são independentes</li>
              <li>Estes comportamentos podem ser direcionados com carinho e paciência</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SettingsView() {
  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold text-black mb-4">Configurações</h2>
      <div className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold mb-2">Notificações</h3>
            <p className="text-sm text-gray-600">Gerencie suas preferências de notificação</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold mb-2">Privacidade</h3>
            <p className="text-sm text-gray-600">Controle suas informações pessoais</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ProfileView() {
  return (
    <div className="px-4 py-6">
      <div className="text-center mb-6">
        <div className="bg-[#0077B6] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="h-10 w-10 text-white" />
        </div>
        <h2 className="text-xl font-bold text-[#212121]">Meu Perfil</h2>
        <p className="text-gray-600">Adotante desde agosto de 2025</p>
      </div>
      
      <div className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold mb-2">Informações Pessoais</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Nome:</strong> João da Silva</p>
              <p><strong>Email:</strong> joao@email.com</p>
              <p><strong>Telefone:</strong> (51) 99999-9999</p>
              <p><strong>Cidade:</strong> Xangri-lá, RS</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold mb-2">Histórico</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-[#4CAF50]">2</div>
                <p className="text-xs text-gray-600">Adoções</p>
              </div>
              <div>
                <div className="text-lg font-bold text-[#0077B6]">5</div>
                <p className="text-xs text-gray-600">Favoritos</p>
              </div>
              <div>
                <div className="text-lg font-bold text-[#0077B6]">R$ 350</div>
                <p className="text-xs text-gray-600">Doações</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AnimalDetailView({ animal, onBack }: { animal: any; onBack: () => void }) {
  if (!animal) return null;

  return (
    <div className="px-4 py-6">
      <Button variant="outline" onClick={onBack} className="mb-4">
        ← Voltar
      </Button>
      
      <div className="max-w-2xl mx-auto">
        <img 
          src={animal.image} 
          alt={animal.name}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-black mb-4">{animal.name}</h2>
            <p className="text-gray-700 mb-6">{animal.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-bold mb-2">Características</h3>
                <ul className="text-sm space-y-1">
                  <li>Tipo: {animal.type === 'dog' ? 'Cachorro' : 'Gato'}</li>
                  <li>Idade: {animal.age}</li>
                  <li>Porte: {animal.size}</li>
                  <li>Local: {animal.location}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">Saúde</h3>
                <div className="space-y-2">
                  <Badge className={animal.vaccinated ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    {animal.vaccinated ? "✓ Vacinado" : "⚠ Não vacinado"}
                  </Badge>
                  <Badge className={animal.castrated ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                    {animal.castrated ? "✓ Castrado" : "⚠ Não castrado"}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button className="flex-1 bg-[#0077B6] hover:bg-[#005A8C] text-white">
                <Heart className="h-4 w-4 mr-2" />
                Quero Adotar
              </Button>
              <Button variant="outline" className="flex-1 border-[#0077B6] text-[#0077B6] hover:bg-[#F5F5DC]">
                <MessageCircle className="h-4 w-4 mr-2" />
                Enviar Mensagem
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}