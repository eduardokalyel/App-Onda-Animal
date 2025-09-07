import { useState } from "react";
import { Calendar, Clock, MapPin, User, Plus, CheckCircle, AlertCircle, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "./ui/dialog";

export function AppointmentsView() {
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [appointments, setAppointments] = useState([
    {
      id: "1",
      petName: "Buddy",
      petType: "Cão",
      ownerName: "Maria Silva",
      ownerPhone: "(51) 99999-9999",
      date: "2025-08-15",
      time: "14:00",
      location: "Clínica Veterinária Central",
      status: "confirmed" as const,
      notes: "Primeira castração, animal nervoso"
    },
    {
      id: "2",
      petName: "Luna",
      petType: "Gata",
      ownerName: "João Santos",
      ownerPhone: "(51) 88888-8888",
      date: "2025-08-18",
      time: "09:30",
      location: "Clínica Veterinária Norte",
      status: "pending" as const,
      notes: "Confirmar jejum de 12 horas"
    },
    {
      id: "3",
      petName: "Rex",
      petType: "Cão",
      ownerName: "Ana Costa",
      ownerPhone: "(51) 77777-7777",
      date: "2025-08-12",
      time: "10:00",
      location: "Clínica Veterinária Sul",
      status: "completed" as const,
      notes: "Castração realizada com sucesso"
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800">✓ Confirmado</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">⏳ Pendente</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800">✓ Concluído</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">✗ Cancelado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const upcomingAppointments = appointments.filter(apt => 
    new Date(apt.date) >= new Date() && apt.status !== 'completed' && apt.status !== 'cancelled'
  );

  const pastAppointments = appointments.filter(apt => 
    new Date(apt.date) < new Date() || apt.status === 'completed'
  );

  const handleNewAppointment = (formData: any) => {
    const newAppointment = {
      id: Date.now().toString(),
      ...formData,
      status: 'pending' as const
    };
    setAppointments([...appointments, newAppointment]);
    setShowNewAppointment(false);
  };

  return (
    <div className="px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-black">Agendamentos de Castração</h2>
          <p className="text-gray-600">Gerencie os agendamentos para castração dos animais</p>
        </div>
        <Dialog open={showNewAppointment} onOpenChange={setShowNewAppointment}>
          <DialogTrigger asChild>
            <Button className="bg-[#0077B6] hover:bg-[#005A8C] text-white">
              <Plus className="h-4 w-4 mr-2" />
              Novo Agendamento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Novo Agendamento de Castração</DialogTitle>
              <DialogDescription>
                Preencha os dados abaixo para agendar uma castração para o animal.
              </DialogDescription>
            </DialogHeader>
            <NewAppointmentForm onSubmit={handleNewAppointment} onCancel={() => setShowNewAppointment(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{upcomingAppointments.length}</div>
            <p className="text-sm text-gray-600">Próximos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {appointments.filter(a => a.status === 'completed').length}
            </div>
            <p className="text-sm text-gray-600">Concluídos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {appointments.filter(a => a.status === 'pending').length}
            </div>
            <p className="text-sm text-gray-600">Pendentes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-black">{appointments.length}</div>
            <p className="text-sm text-gray-600">Total</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Appointments */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-black mb-4">Próximos Agendamentos</h3>
        {upcomingAppointments.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-gray-500">
              <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Nenhum agendamento próximo</p>
              <Button 
                className="mt-4 bg-[#0077B6] hover:bg-[#005A8C] text-white"
                onClick={() => setShowNewAppointment(true)}
              >
                Criar Primeiro Agendamento
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        )}
      </div>

      {/* Past Appointments */}
      {pastAppointments.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-black mb-4">Histórico</h3>
          <div className="space-y-4">
            {pastAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AppointmentCard({ appointment }: { appointment: any }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800">✓ Confirmado</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">⏳ Pendente</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800">✓ Concluído</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">✗ Cancelado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className="border-l-4 border-l-[#0077B6]">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="font-bold text-black">{appointment.petName}</h4>
            <p className="text-sm text-gray-600">{appointment.petType}</p>
          </div>
          {getStatusBadge(appointment.status)}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-gray-500" />
              <span>{appointment.ownerName}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">📞</span>
              <span>{appointment.ownerPhone}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>{formatDate(appointment.date)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>{appointment.time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>{appointment.location}</span>
            </div>
          </div>
        </div>

        {appointment.notes && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Observações:</strong> {appointment.notes}
            </p>
          </div>
        )}

        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm">
            Editar
          </Button>
          {appointment.status === 'pending' && (
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="h-4 w-4 mr-1" />
              Confirmar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Moved inside AppointmentCard component

function NewAppointmentForm({ onSubmit, onCancel }: { onSubmit: (data: any) => void; onCancel: () => void }) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="petName">Nome do Pet</Label>
          <Input id="petName" name="petName" required />
        </div>
        <div>
          <Label htmlFor="petType">Tipo</Label>
          <Select name="petType" required>
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Cão">Cão</SelectItem>
              <SelectItem value="Gata">Gata</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="ownerName">Nome do Responsável</Label>
        <Input id="ownerName" name="ownerName" required />
      </div>

      <div>
        <Label htmlFor="ownerPhone">Telefone</Label>
        <Input id="ownerPhone" name="ownerPhone" placeholder="(00) 00000-0000" required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date">Data</Label>
          <Input id="date" name="date" type="date" required />
        </div>
        <div>
          <Label htmlFor="time">Horário</Label>
          <Input id="time" name="time" type="time" required />
        </div>
      </div>

      <div>
        <Label htmlFor="location">Local</Label>
        <Select name="location" required>
          <SelectTrigger>
            <SelectValue placeholder="Selecione a clínica" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Clínica Veterinária Central">Clínica Veterinária Central</SelectItem>
            <SelectItem value="Clínica Veterinária Norte">Clínica Veterinária Norte</SelectItem>
            <SelectItem value="Clínica Veterinária Sul">Clínica Veterinária Sul</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="notes">Observações</Label>
        <Textarea id="notes" name="notes" placeholder="Informações importantes sobre o animal..." />
      </div>

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-[#0077B6] hover:bg-[#005A8C] text-white">
          Agendar
        </Button>
      </div>
    </form>
  );
}