import { Heart, MapPin, Calendar, Info } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface AnimalCardProps {
  animal: {
    id: string;
    name: string;
    type: 'dog' | 'cat';
    age: string;
    size: 'small' | 'medium' | 'large';
    location: string;
    image: string;
    description: string;
    vaccinated: boolean;
    castrated: boolean;
    urgency?: 'high' | 'medium' | 'low';
  };
  onAdoptClick: (animal: any) => void;
  onFavoriteClick: (animalId: string) => void;
  isFavorited: boolean;
}

export function AnimalCard({ animal, onAdoptClick, onFavoriteClick, isFavorited }: AnimalCardProps) {
  const getUrgencyColor = (urgency?: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-400';
    }
  };

  const getSizeLabel = (size: string) => {
    switch (size) {
      case 'small': return 'Pequeno';
      case 'medium': return 'Médio';
      case 'large': return 'Grande';
      default: return size;
    }
  };

  return (
    <Card className="overflow-hidden border-2 hover:border-[#4CAF50] transition-colors">
      <div className="relative">
        <ImageWithFallback 
          src={animal.image}
          alt={animal.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {animal.urgency && (
            <Badge className={`${getUrgencyColor(animal.urgency)} text-white border-none`}>
              {animal.urgency === 'high' ? 'Urgente' : 
               animal.urgency === 'medium' ? 'Prioridade' : 'Disponível'}
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className={`absolute top-3 right-3 ${isFavorited ? 'text-red-500' : 'text-white'} hover:text-red-500`}
          onClick={() => onFavoriteClick(animal.id)}
        >
          <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
        </Button>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-black">{animal.name}</h3>
          <Badge variant="outline" className="ml-2">
            {animal.type === 'dog' ? '🐕' : '🐱'} {getSizeLabel(animal.size)}
          </Badge>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {animal.age}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {animal.location}
          </div>
        </div>

        <p className="text-sm text-gray-700 mb-3 line-clamp-2">{animal.description}</p>

        <div className="flex gap-2 mb-3">
          {animal.vaccinated && (
            <Badge className="bg-green-100 text-green-800 text-xs">
              💉 Vacinado
            </Badge>
          )}
          {animal.castrated && (
            <Badge className="bg-blue-100 text-blue-800 text-xs">
              ✂️ Castrado
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={() => onAdoptClick(animal)}
        >
          <Info className="h-4 w-4 mr-1" />
          Ver Mais
        </Button>
        <Button 
          className="flex-1 bg-[#0077B6] hover:bg-[#005A8C] text-white"
          onClick={() => onAdoptClick(animal)}
        >
          <Heart className="h-4 w-4 mr-1" />
          Adotar
        </Button>
      </CardFooter>
    </Card>
  );
}