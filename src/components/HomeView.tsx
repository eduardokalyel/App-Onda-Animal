import { useState } from "react";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { AnimalCard } from "./AnimalCard";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

interface HomeViewProps {
  onAnimalClick: (animal: any) => void;
}

export function HomeView({ onAnimalClick }: HomeViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [favorites, setFavorites] = useState<string[]>([]);

  // Mock data - em produção viria de uma API
  const animals = [
    {
      id: "1",
      name: "Buddy",
      type: "dog" as const,
      age: "2 anos",
      size: "medium" as const,
      location: "Porto Alegre",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop",
      description: "Cachorro muito carinhoso e brincalhão, adora crianças e outros pets. Precisa de uma família amorosa.",
      vaccinated: true,
      castrated: true,
      urgency: "high" as const
    },
    {
      id: "2",
      name: "Luna",
      type: "cat" as const,
      age: "1 ano",
      size: "small" as const,
      location: "Alvorado",
      image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=300&fit=crop",
      description: "Gatinha dócil e independente, ideal para apartamento. Gosta de carinho e de observar pela janela.",
      vaccinated: true,
      castrated: false,
      urgency: "medium" as const
    },
    {
      id: "3",
      name: "Rex",
      type: "dog" as const,
      age: "5 anos",
      size: "large" as const,
      location: "Porto Alegre",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
      description: "Cão adulto, muito tranquilo e obediente. Ótimo guardian e companheiro para toda a família.",
      vaccinated: true,
      castrated: true
    },
    {
      id: "4",
      name: "Mia",
      type: "cat" as const,
      age: "6 meses",
      size: "small" as const,
      location: "Canoas",
      image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop",
      description: "Filhote de gata, muito ativa e curiosa. Precisa de uma família que tenha tempo para brincar.",
      vaccinated: true,
      castrated: false,
      urgency: "high" as const
    },
    {
      id: "5",
      name: "Toby",
      type: "dog" as const,
      age: "3 anos",
      size: "small" as const,
      location: "Porto Alegre",
      image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=300&fit=crop",
      description: "Pequeno e corajoso, adora passear e conhecer novos lugares. Perfeito para quem tem estilo de vida ativo.",
      vaccinated: true,
      castrated: true
    }
  ];

  const filters = [
    { id: "all", label: "Todos", count: animals.length },
    { id: "dog", label: "Cães", count: animals.filter(a => a.type === 'dog').length },
    { id: "cat", label: "Gatos", count: animals.filter(a => a.type === 'cat').length },
    { id: "urgent", label: "Urgentes", count: animals.filter(a => a.urgency === 'high').length },
  ];

  const filteredAnimals = animals.filter(animal => {
    const matchesSearch = animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === "all" || 
                         selectedFilter === animal.type ||
                         (selectedFilter === "urgent" && animal.urgency === "high");
    
    return matchesSearch && matchesFilter;
  });

  const handleFavoriteClick = (animalId: string) => {
    setFavorites(prev => 
      prev.includes(animalId) 
        ? prev.filter(id => id !== animalId)
        : [...prev, animalId]
    );
  };

  return (
    <div className="px-4 py-6 bg-[rgba(9,9,9,0)]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#E3F4FF] to-[#F0F8FF] rounded-lg p-6 mb-6 border border-[#0077B6]/20">
        <h2 className="text-2xl font-bold text-[#212121] mb-2">
          Encontre seu novo melhor amigo! 🐾
        </h2>
        <p className="text-gray-700 mb-4">
          {animals.length} animais esperando por uma família amorosa na região Metropolitana!
        </p>
        <div className="flex gap-2">
          <Badge className="bg-red-100 text-red-800">
            {animals.filter(a => a.urgency === 'high').length} Urgentes
          </Badge>
          <Badge className="bg-[#0077B6] text-white">
            {animals.filter(a => !a.castrated).length} Para Castração
          </Badge>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 bg-[#F0F8FF] rounded-lg p-4 rounded-lg p-6 mb-6 border border-[#0077B6]/20">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Buscar por nome ou descrição..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-[#F0F8FF] rounded-lg p-6 mb-6 border border-[#0077B6]/20"
          />
        </div>

        <div className="flex items-center gap-2 mb-4">
          <SlidersHorizontal className="h-5 w-5 text-gray-600" />
          <div className="flex gap-2 flex-wrap">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter.id)}
                className={selectedFilter === filter.id ? "bg-[#0077B6] hover:bg-[#005A8C] text-white" : ""}
              >
                {filter.label} ({filter.count})
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Animals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAnimals.map((animal) => (
          <AnimalCard
            key={animal.id}
            animal={animal}
            onAdoptClick={onAnimalClick}
            onFavoriteClick={handleFavoriteClick}
            isFavorited={favorites.includes(animal.id)}
          />
        ))}
      </div>

      {filteredAnimals.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto mb-2" />
            <p>Nenhum animal encontrado</p>
            <p className="text-sm">Tente ajustar os filtros ou busca</p>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-12 bg-[#0077B6] text-white rounded-lg p-6 text-center">
        <h3 className="text-xl font-bold mb-2">Não encontrou o pet ideal?</h3>
        <p className="mb-4">Cadastre-se para receber notificações de novos animais!</p>
        <div className="flex gap-4 justify-center">
          <Button variant="outline" className="bg-white text-[#0077B6]">
            Quero ser notificado
          </Button>
          <Button variant="outline" className="bg-white text-[#0077B6]">
            Ver todos os pets
          </Button>
        </div>
      </div>
    </div>
  );
}