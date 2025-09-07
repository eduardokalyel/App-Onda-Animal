import { useState } from "react";
import { Heart, DollarSign, Users, Target, CreditCard, QrCode, Smartphone, X, CheckCircle, Copy } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function DonationsView() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [donationType, setDonationType] = useState("single");
  const [showPixModal, setShowPixModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [pixCopied, setPixCopied] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [showCampaignPaymentModal, setShowCampaignPaymentModal] = useState(false);

  const predefinedAmounts = [10, 25, 50, 100, 200, 500];

  // Mock data para estatísticas
  const donationStats = {
    monthlyGoal: 5000,
    currentMonth: 3200,
    totalDonors: 124,
    averageDonation: 75
  };

  const campaigns = [
    {
      id: 1,
      title: "Castração de Emergência - Agosto",
      description: "Meta para realizar 20 castrações em animais resgatados",
      target: 2000,
      current: 1450,
      daysLeft: 8,
      priority: "high"
    },
    {
      id: 2,
      title: "Medicamentos para Tratamento",
      description: "Antibióticos e anti-inflamatórios para animais em recuperação",
      target: 800,
      current: 620,
      daysLeft: 15,
      priority: "medium"
    },
    {
      id: 3,
      title: "Ração para Lares Temporários",
      description: "Alimentação para 30 animais em lares provisórios",
      target: 1500,
      current: 890,
      daysLeft: 22,
      priority: "low"
    }
  ];

  const recentDonations = [
    { name: "Maria S.", amount: 100, time: "2 horas atrás", type: "Pix" },
    { name: "João P.", amount: 50, time: "5 horas atrás", type: "Cartão" },
    { name: "Ana C.", amount: 200, time: "1 dia atrás", type: "Pix" },
    { name: "Carlos M.", amount: 75, time: "1 dia atrás", type: "Cartão" },
  ];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const getFinalAmount = () => {
    return selectedAmount || parseFloat(customAmount) || 0;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const handlePixPayment = () => {
    setShowPixModal(true);
  };

  const handleCardPayment = () => {
    setShowCardModal(true);
  };

  const copyPixCode = () => {
    const pixCode = "00020126580014BR.GOV.BCB.PIX013636843698-4444-4444-8888-12345678901052040000530398654071000.005802BR5917ONDA ANIMAL6009Xangri-la62090505123456304B2CA";
    navigator.clipboard.writeText(pixCode);
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 3000);
  };

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de processamento do pagamento
    alert("Pagamento processado com sucesso! Obrigado pela sua doação!");
    setShowCardModal(false);
    setShowCampaignPaymentModal(false);
  };

  const handleCampaignDonation = (campaign: any) => {
    setSelectedCampaign(campaign);
    setShowCampaignPaymentModal(true);
  };

  const handleCampaignPixPayment = () => {
    setShowCampaignPaymentModal(false);
    setShowPixModal(true);
  };

  const handleCampaignCardPayment = () => {
    setShowCampaignPaymentModal(false);
    setShowCardModal(true);
  };

  return (
    <div className="px-4 py-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="bg-[#0077B6] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="h-8 w-8 text-white fill-current" />
        </div>
        <h2 className="text-2xl font-bold text-black mb-2">Ajude a ONDA ANIMAL</h2>
        <p className="text-gray-600">
          Sua doação salva vidas e ajuda animais a encontrarem um lar amoroso
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 text-[#0077B6] mx-auto mb-2" />
            <div className="text-2xl font-bold text-black">R$ {donationStats.currentMonth.toLocaleString()}</div>
            <p className="text-sm text-gray-600">de R$ {donationStats.monthlyGoal.toLocaleString()} este mês</p>
            <Progress 
              value={(donationStats.currentMonth / donationStats.monthlyGoal) * 100} 
              className="mt-2"
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-black">{donationStats.totalDonors}</div>
            <p className="text-sm text-gray-600">doadores este mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-black">R$ {donationStats.averageDonation}</div>
            <p className="text-sm text-gray-600">doação média</p>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-black mb-4">Campanhas Ativas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="border-l-4 border-l-[#0077B6]">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-sm">{campaign.title}</CardTitle>
                  <Badge className={`${getPriorityColor(campaign.priority)} text-white text-xs`}>
                    {campaign.daysLeft} dias
                  </Badge>
                </div>
                <p className="text-xs text-gray-600">{campaign.description}</p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>R$ {campaign.current.toLocaleString()}</span>
                      <span>R$ {campaign.target.toLocaleString()}</span>
                    </div>
                    <Progress value={(campaign.current / campaign.target) * 100} />
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full bg-[#0077B6] hover:bg-[#005A8C] text-white"
                    onClick={() => handleCampaignDonation(campaign)}
                  >
                    Doar para esta campanha
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Donation Form */}
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Fazer uma Doação</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={donationType} onValueChange={setDonationType} className="mb-6">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="single">Doação Única</TabsTrigger>
                <TabsTrigger value="monthly">Doação Mensal</TabsTrigger>
              </TabsList>
              
              <TabsContent value="single" className="space-y-4">
                <div>
                  <Label>Escolha o valor:</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {predefinedAmounts.map((amount) => (
                      <Button
                        key={amount}
                        variant={selectedAmount === amount ? "default" : "outline"}
                        onClick={() => handleAmountSelect(amount)}
                        className={selectedAmount === amount ? "bg-[#0077B6] hover:bg-[#005A8C] text-white" : ""}
                      >
                        R$ {amount}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="custom-amount">Ou digite um valor personalizado:</Label>
                  <Input
                    id="custom-amount"
                    type="number"
                    placeholder="Ex: 150"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    min="1"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="monthly" className="space-y-4">
                <div className="bg-[#E3F4FF] p-4 rounded-lg border border-[#0077B6]/20">
                  <p className="text-sm text-gray-700">
                    💛 <strong>Doação Mensal:</strong> Ajude de forma contínua! 
                    Você pode cancelar a qualquer momento.
                  </p>
                </div>
                <div>
                  <Label>Valor mensal:</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {[20, 50, 100].map((amount) => (
                      <Button
                        key={amount}
                        variant={selectedAmount === amount ? "default" : "outline"}
                        onClick={() => handleAmountSelect(amount)}
                        className={selectedAmount === amount ? "bg-[#0077B6] hover:bg-[#005A8C] text-white" : ""}
                      >
                        R$ {amount}/mês
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {getFinalAmount() > 0 && (
              <div className="border-t pt-4">
                <h4 className="font-bold mb-4">
                  Valor a doar: R$ {getFinalAmount().toFixed(2)}
                  {donationType === 'monthly' ? '/mês' : ''}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    onClick={handlePixPayment}
                    className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700"
                  >
                    <QrCode className="h-5 w-5" />
                    Pagar com Pix
                  </Button>
                  <Button 
                    onClick={handleCardPayment}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
                  >
                    <CreditCard className="h-5 w-5" />
                    Cartão de Crédito
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Donations */}
      <div className="mt-8">
        <h3 className="text-lg font-bold text-black mb-4">Doações Recentes</h3>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              {recentDonations.map((donation, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#E3F4FF] p-2 rounded-full">
                      <Heart className="h-4 w-4 text-[#0077B6]" />
                    </div>
                    <div>
                      <p className="font-medium">{donation.name}</p>
                      <p className="text-sm text-gray-600">{donation.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">R$ {donation.amount}</p>
                    <p className="text-xs text-gray-500">{donation.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Impact Message */}
      <div className="mt-8 bg-[#0077B6] text-white rounded-lg p-6 text-center">
        <h3 className="text-xl font-bold mb-2 text-white">Seu impacto faz a diferença!</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <div className="text-3xl font-bold text-white drop-shadow-lg">156</div>
            <p className="text-sm font-medium text-white/95">Animais castrados</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-white drop-shadow-lg">89</div>
            <p className="text-sm font-medium text-white/95">Adoções realizadas</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-white drop-shadow-lg">234</div>
            <p className="text-sm font-medium text-white/95">Animais salvos</p>
          </div>
        </div>
      </div>

      {/* PIX Payment Modal */}
      <Dialog open={showPixModal} onOpenChange={setShowPixModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Pagamento via PIX</DialogTitle>
            <DialogDescription className="text-center">
              Faça sua doação através do PIX de forma rápida e segura
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0077B6] mb-2">
                {selectedCampaign ? (
                  `R$ ${(selectedCampaign.target - selectedCampaign.current).toFixed(2)}`
                ) : (
                  `R$ ${getFinalAmount().toFixed(2)}${donationType === 'monthly' ? '/mês' : ''}`
                )}
              </div>
              <p className="text-sm text-gray-600">
                {selectedCampaign ? selectedCampaign.title : 'ONDA ANIMAL'}
              </p>
            </div>

            {/* QR Code fictício */}
            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                <div className="w-48 h-48 bg-black flex items-center justify-center">
                  <div className="grid grid-cols-8 gap-1">
                    {Array.from({ length: 64 }, (_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 ${
                          Math.random() > 0.5 ? 'bg-white' : 'bg-black'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-center text-gray-600">
                Escaneie o QR Code com o app do seu banco ou copie o código PIX
              </p>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 mb-2">Código PIX:</p>
                <p className="text-xs font-mono break-all bg-white p-2 rounded border">
                  00020126580014BR.GOV.BCB.PIX013636843698-4444-4444-8888-12345678901052040000530398654071000.005802BR5917ONDA ANIMAL6009Xangri-la62090505123456304B2CA
                </p>
              </div>

              <Button 
                onClick={copyPixCode}
                className="w-full bg-[#0077B6] hover:bg-[#005A8C] text-white"
                disabled={pixCopied}
              >
                {pixCopied ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Código Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copiar Código PIX
                  </>
                )}
              </Button>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-sm text-green-800">
                  💚 Após o pagamento, o comprovante será enviado automaticamente por email.
                  Sua doação ajudará diretamente os animais da ONDA ANIMAL!
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Credit Card Payment Modal */}
      <Dialog open={showCardModal} onOpenChange={setShowCardModal}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center">Pagamento com Cartão</DialogTitle>
            <DialogDescription className="text-center">
              Preencha os dados do seu cartão de crédito para finalizar a doação
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0077B6] mb-2">
                {selectedCampaign ? (
                  `R$ ${(selectedCampaign.target - selectedCampaign.current).toFixed(2)}`
                ) : (
                  `R$ ${getFinalAmount().toFixed(2)}${donationType === 'monthly' ? '/mês' : ''}`
                )}
              </div>
              <p className="text-sm text-gray-600">
                {selectedCampaign ? selectedCampaign.title : 'ONDA ANIMAL'}
              </p>
            </div>

            <form onSubmit={handleCardSubmit} className="space-y-4">
              <div>
                <Label htmlFor="cardNumber">Número do Cartão</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  required
                  onChange={(e) => {
                    // Formatação automática do número do cartão
                    let value = e.target.value.replace(/\s/g, '');
                    let formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
                    e.target.value = formattedValue;
                  }}
                />
              </div>

              <div>
                <Label htmlFor="cardName">Nome no Cartão</Label>
                <Input
                  id="cardName"
                  placeholder="Seu nome completo"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Validade</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/AA"
                    maxLength={5}
                    required
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, '');
                      if (value.length >= 2) {
                        value = value.substring(0, 2) + '/' + value.substring(2, 4);
                      }
                      e.target.value = value;
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    maxLength={4}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="installments">Parcelamento</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCampaign ? (
                      <>
                        <SelectItem value="1">1x de R$ {(selectedCampaign.target - selectedCampaign.current).toFixed(2)} sem juros</SelectItem>
                        <SelectItem value="2">2x de R$ {((selectedCampaign.target - selectedCampaign.current) / 2).toFixed(2)} sem juros</SelectItem>
                        <SelectItem value="3">3x de R$ {((selectedCampaign.target - selectedCampaign.current) / 3).toFixed(2)} sem juros</SelectItem>
                        <SelectItem value="4">4x de R$ {((selectedCampaign.target - selectedCampaign.current) / 4).toFixed(2)} sem juros</SelectItem>
                        <SelectItem value="5">5x de R$ {((selectedCampaign.target - selectedCampaign.current) / 5).toFixed(2)} sem juros</SelectItem>
                        <SelectItem value="6">6x de R$ {((selectedCampaign.target - selectedCampaign.current) / 6).toFixed(2)} sem juros</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="1">1x de R$ {getFinalAmount().toFixed(2)} sem juros</SelectItem>
                        <SelectItem value="2">2x de R$ {(getFinalAmount() / 2).toFixed(2)} sem juros</SelectItem>
                        <SelectItem value="3">3x de R$ {(getFinalAmount() / 3).toFixed(2)} sem juros</SelectItem>
                        <SelectItem value="4">4x de R$ {(getFinalAmount() / 4).toFixed(2)} sem juros</SelectItem>
                        <SelectItem value="5">5x de R$ {(getFinalAmount() / 5).toFixed(2)} sem juros</SelectItem>
                        <SelectItem value="6">6x de R$ {(getFinalAmount() / 6).toFixed(2)} sem juros</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  🔒 Seus dados estão protegidos com criptografia SSL. 
                  Esta é uma simulação - nenhum valor será cobrado.
                </p>
              </div>

              <div className="flex gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowCardModal(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit"
                  className="flex-1 bg-[#0077B6] hover:bg-[#005A8C] text-white"
                >
                  Finalizar Pagamento
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Campaign Payment Selection Modal */}
      <Dialog open={showCampaignPaymentModal} onOpenChange={setShowCampaignPaymentModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Doar para Campanha</DialogTitle>
            <DialogDescription className="text-center">
              Escolha a forma de pagamento para contribuir com esta campanha específica
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {selectedCampaign && (
              <>
                <div className="text-center">
                  <h3 className="font-bold text-lg text-[#0077B6] mb-2">
                    {selectedCampaign.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {selectedCampaign.description}
                  </p>
                  <div className="bg-[#F5F5DC] p-4 rounded-lg border border-[#0077B6]/20">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Meta:</span>
                      <span className="font-bold">R$ {selectedCampaign.target.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Arrecadado:</span>
                      <span className="font-bold">R$ {selectedCampaign.current.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm">Faltam:</span>
                      <span className="font-bold text-red-600">
                        R$ {(selectedCampaign.target - selectedCampaign.current).toLocaleString()}
                      </span>
                    </div>
                    <Progress 
                      value={(selectedCampaign.current / selectedCampaign.target) * 100} 
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>{Math.round((selectedCampaign.current / selectedCampaign.target) * 100)}% concluído</span>
                      <span>{selectedCampaign.daysLeft} dias restantes</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-center text-sm text-gray-600">
                    Escolha a forma de pagamento:
                  </p>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <Button 
                      onClick={handleCampaignPixPayment}
                      className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 py-4"
                    >
                      <QrCode className="h-5 w-5" />
                      Pagar com PIX
                    </Button>
                    <Button 
                      onClick={handleCampaignCardPayment}
                      className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 py-4"
                    >
                      <CreditCard className="h-5 w-5" />
                      Cartão de Crédito
                    </Button>
                  </div>

                  <div className="bg-[#E3F4FF] p-4 rounded-lg border border-[#0077B6]/20">
                    <p className="text-sm text-[#0077B6] text-center">
                      💙 Sua doação será destinada exclusivamente para esta campanha!
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}