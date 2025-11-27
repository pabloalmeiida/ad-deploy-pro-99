import { useState } from "react"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CurrencyInput } from "@/components/ui/currency-input"
import { useToast } from "@/hooks/use-toast"
import { Send, Zap, Target, Users, DollarSign, Link2, Building, Loader2, Check, User } from "lucide-react"

interface CampaignData {
  objetivo_campanha: string
  objetivo_conversao: string
  tipo_orcamento: string
  verba_diaria: string
  posicionamento: string
  link_drive_criativos: string
  link_documento_legendas: string
  link_redirecionamento: string
  nome_cliente: string
  perfil: string
  funil: string
}

interface WebhookData {
  row_number?: number
  Cliente: string
  "Conta de Anúncios": string
  "Pixel ID": string
  "Page ID": string
  "Instagram ID": string
  Perfil: string
  Funil: string
}

type Stage = 1 | 2 | 3

const objetivosCampanha = [
  { value: "reconhecimento", label: "Reconhecimento" },
  { value: "trafego", label: "Tráfego" },
  { value: "engajamento", label: "Engajamento" },
  { value: "cadastro", label: "Cadastro" },
  { value: "vendas", label: "Vendas" }
]

const objetivosConversao = [
  { value: "direct", label: "Direct" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "video-view", label: "Video-View" },
  { value: "engajamento-post", label: "Engajamento no Post" },
  { value: "visitas-instagram", label: "Visitas no Instagram" },
  { value: "compras", label: "Compras" },
  { value: "lead", label: "Lead" },
  { value: "formulario-nativo", label: "Formulário Nativo" }
]

const tiposOrcamento = [
  { value: "abo", label: "ABO" },
  { value: "cbo", label: "CBO" }
]

const posicionamentos = [
  { value: "automatico", label: "Automático" },
  { value: "feed", label: "Feed" },
  { value: "stories", label: "Stories/Reels" }
]

const clientes = [
  { value: "aba-acessivel", label: "Aba Acessível" },
  { value: "carv-group", label: "Carv Group" },
  { value: "cristina-florentino", label: "Cristina Florentino" },
  { value: "gisele-luvizuto", label: "Gisele Luvizuto" },
  { value: "giulia-molinari", label: "Giulia Molinari" },
  { value: "guilherme-david", label: "Guilherme David" },
  { value: "isabela-dandaro", label: "Isabela Dandaro" },
  { value: "paula-eskinazi", label: "Paula Eskinazi" },
  { value: "stella-santini", label: "Stella Santini" }
]

export function CampaignForm() {
  const { toast } = useToast()
  const [formData, setFormData] = useState<CampaignData>({
    objetivo_campanha: "",
    objetivo_conversao: "",
    tipo_orcamento: "",
    verba_diaria: "",
    posicionamento: "",
    link_drive_criativos: "",
    link_documento_legendas: "",
    link_redirecionamento: "",
    nome_cliente: "",
    perfil: "",
    funil: ""
  })

  const [currentStage, setCurrentStage] = useState<Stage>(1)
  const [webhookData, setWebhookData] = useState<WebhookData[]>([])
  const [selectedWebhookData, setSelectedWebhookData] = useState<WebhookData | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  // Get unique profiles and funnels from webhook data
  const availableProfiles = [...new Set(webhookData.map(item => item.Perfil))]
  const availableFunnels = [...new Set(webhookData.map(item => item.Funil))]

  const handleClienteChange = async (value: string) => {
    updateField('nome_cliente', value)
    
    if (value && currentStage === 1) {
      setIsSubmitting(true)
      
      try {
        const clienteLabel = clientes.find(c => c.value === value)?.label || value
        const response = await fetch('https://webhook-heavy.servidordainfotrafego.com.br/webhook/saas-first-stage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ nome_cliente: clienteLabel })
        })
        
        const responseData: WebhookData[] = await response.json()
        setWebhookData(responseData)
        setCurrentStage(2)
        
      } catch (error) {
        toast({
          title: "Erro ao carregar dados",
          description: "Tente selecionar o cliente novamente.",
          variant: "destructive"
        })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handlePerfilFunilChange = async (updatedFormData?: CampaignData) => {
    const dataToUse = updatedFormData || formData
    if (dataToUse.perfil && dataToUse.funil && currentStage === 2) {
      setIsSubmitting(true)
      
      try {
        const payload = {
          nome_cliente: clientes.find(c => c.value === dataToUse.nome_cliente)?.label || dataToUse.nome_cliente,
          perfil: dataToUse.perfil,
          funil: dataToUse.funil
        }
        
        const response = await fetch('https://webhook-heavy.servidordainfotrafego.com.br/webhook/saas-second-stage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json',
          },
          body: JSON.stringify(payload)
        })
        
        const responseData: WebhookData[] = await response.json()
        if (responseData.length > 0) {
          setSelectedWebhookData(responseData[0])
          setCurrentStage(3)
        }
        
      } catch (error) {
        toast({
          title: "Erro ao processar dados",
          description: "Tente novamente.",
          variant: "destructive"
        })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (currentStage !== 3) return
    
    // Validate required fields for final stage
    let requiredFields = ['objetivo_campanha', 'objetivo_conversao', 'tipo_orcamento', 'posicionamento', 'verba_diaria', 'link_drive_criativos', 'link_documento_legendas']
    
    // Add link_redirecionamento as required if objetivo_conversao is compras or lead
    if (formData.objetivo_conversao === 'compras' || formData.objetivo_conversao === 'lead') {
      requiredFields.push('link_redirecionamento')
    }
    
    const missingFields = requiredFields.filter(field => !formData[field as keyof CampaignData])
    
    if (missingFields.length > 0) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)
    setIsSuccess(false)
    
    // Show loading toast
    toast({
      title: "Aguarde enquanto os criativos estão sendo enviados para o Meta Ads",
      description: "Processando...",
    })
    
    // Prepare final payload with all data
    const finalPayload = {
      objetivo_campanha: objetivosCampanha.find(o => o.value === formData.objetivo_campanha)?.label || formData.objetivo_campanha,
      objetivo_conversao: objetivosConversao.find(o => o.value === formData.objetivo_conversao)?.label || formData.objetivo_conversao,
      tipo_orcamento: tiposOrcamento.find(t => t.value === formData.tipo_orcamento)?.label || formData.tipo_orcamento,
      posicionamento: posicionamentos.find(p => p.value === formData.posicionamento)?.label || formData.posicionamento,
      verba_diaria: formData.verba_diaria,
      link_drive_criativos: formData.link_drive_criativos,
      link_documento_legendas: formData.link_documento_legendas,
      link_redirecionamento: formData.link_redirecionamento,
      conta_anuncios: selectedWebhookData?.["Conta de Anúncios"] || "",
      pixel_id: selectedWebhookData?.["Pixel ID"] || "",
      page_id: selectedWebhookData?.["Page ID"] || "",
      instagram_id: selectedWebhookData?.["Instagram ID"] || ""
    }
    
    // Determine webhook URL based on posicionamento
    let webhookUrl = 'https://webhook-heavy.servidordainfotrafego.com.br/webhook/saas' // default (automatico)
    
    if (formData.posicionamento === 'feed') {
      webhookUrl = 'https://webhook-heavy.servidordainfotrafego.com.br/webhook/saas'
    } else if (formData.posicionamento === 'stories') {
      webhookUrl = 'https://webhook-heavy.servidordainfotrafego.com.br/webhook/saas'
    }
    
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json',
        },
        body: JSON.stringify(finalPayload)
      })
      
      const responseData = await response.json()
      
      // Check for success response
      if (responseData.success === "200") {
        setIsSuccess(true)
        toast({
          title: "Criativos enviados com sucesso",
          description: "Os criativos foram processados e enviados para o Meta Ads.",
        })
        
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            objetivo_campanha: "",
            objetivo_conversao: "",
            tipo_orcamento: "",
            verba_diaria: "",
            posicionamento: "",
            link_drive_criativos: "",
            link_documento_legendas: "",
            link_redirecionamento: "",
            nome_cliente: "",
            perfil: "",
            funil: ""
          })
          setCurrentStage(1)
          setWebhookData([])
          setSelectedWebhookData(null)
          setIsSuccess(false)
        }, 3000)
      } else {
        toast({
          title: "Erro no processamento",
          description: "Ocorreu um erro ao processar os criativos.",
          variant: "destructive"
        })
      }
      
    } catch (error) {
      toast({
        title: "Erro ao enviar campanha",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateField = (field: keyof CampaignData, value: string) => {
    const updatedData = { ...formData, [field]: value }
    setFormData(updatedData)
    
    // Check if perfil and funil are both filled to trigger stage 2 webhook
    if ((field === 'perfil' || field === 'funil') && currentStage === 2) {
      if (updatedData.perfil && updatedData.funil) {
        setTimeout(() => handlePerfilFunilChange(updatedData), 100)
      }
    }
  }

  return (
    <Card className="automation-card border-border/50">
      <CardHeader className="text-center">
        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <CardTitle className="text-2xl gradient-text">Criar Nova Campanha</CardTitle>
        <CardDescription className="text-muted-foreground">
          Preencha os dados abaixo para automatizar a criação da sua campanha no <strong>Meta Ads</strong>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Nome do cliente - Primeiro campo */}
            <div className="space-y-2">
              <Label htmlFor="nome_cliente" className="flex items-center gap-2">
                <Building className="w-4 h-4 text-automation-blue" />
                Nome do Cliente *
              </Label>
              <Select 
                value={formData.nome_cliente} 
                onValueChange={handleClienteChange}
                disabled={currentStage > 1}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clientes.map((cliente) => (
                    <SelectItem key={cliente.value} value={cliente.value}>
                      {cliente.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Perfil - Etapa 2 */}
            {currentStage >= 2 && (
              <div className="space-y-2">
                <Label htmlFor="perfil" className="flex items-center gap-2">
                  <User className="w-4 h-4 text-automation-blue" />
                  Perfil *
                </Label>
                <Select 
                  value={formData.perfil} 
                  onValueChange={(value) => updateField('perfil', value)}
                  disabled={currentStage > 2}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o perfil" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableProfiles.map((perfil, index) => (
                      <SelectItem key={index} value={perfil}>
                        {perfil}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Funil - Etapa 2 */}
            {currentStage >= 2 && (
              <div className="space-y-2">
                <Label htmlFor="funil" className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-automation-blue" />
                  Funil *
                </Label>
                <Select 
                  value={formData.funil} 
                  onValueChange={(value) => updateField('funil', value)}
                  disabled={currentStage > 2}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o funil" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableFunnels.map((funil, index) => (
                      <SelectItem key={index} value={funil}>
                        {funil}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Objetivo de campanha */}
            <div className="space-y-2">
              <Label htmlFor="objetivo_campanha" className="flex items-center gap-2">
                <Target className="w-4 h-4 text-automation-blue" />
                Objetivo de Campanha *
              </Label>
              <Select 
                value={formData.objetivo_campanha} 
                onValueChange={(value) => updateField('objetivo_campanha', value)}
                disabled={currentStage < 3}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o objetivo" />
                </SelectTrigger>
                <SelectContent>
                  {objetivosCampanha.map((objetivo) => (
                    <SelectItem key={objetivo.value} value={objetivo.value}>
                      {objetivo.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Objetivo de conversão */}
            <div className="space-y-2">
              <Label htmlFor="objetivo_conversao" className="flex items-center gap-2">
                <Users className="w-4 h-4 text-automation-blue" />
                Objetivo de Conversão *
              </Label>
              <Select 
                value={formData.objetivo_conversao} 
                onValueChange={(value) => updateField('objetivo_conversao', value)}
                disabled={currentStage < 3}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o objetivo de conversão" />
                </SelectTrigger>
                <SelectContent>
                  {objetivosConversao.map((objetivo) => (
                    <SelectItem key={objetivo.value} value={objetivo.value}>
                      {objetivo.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tipo de orçamento */}
            <div className="space-y-2">
              <Label htmlFor="tipo_orcamento" className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-automation-blue" />
                Tipo de Orçamento *
              </Label>
              <Select 
                value={formData.tipo_orcamento} 
                onValueChange={(value) => updateField('tipo_orcamento', value)}
                disabled={currentStage < 3}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {tiposOrcamento.map((tipo) => (
                    <SelectItem key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Posicionamento */}
            <div className="space-y-2">
              <Label htmlFor="posicionamento" className="flex items-center gap-2">
                <Target className="w-4 h-4 text-automation-blue" />
                Posicionamento *
              </Label>
              <Select 
                value={formData.posicionamento} 
                onValueChange={(value) => updateField('posicionamento', value)}
                disabled={currentStage < 3}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o posicionamento" />
                </SelectTrigger>
                <SelectContent>
                  {posicionamentos.map((posicionamento) => (
                    <SelectItem key={posicionamento.value} value={posicionamento.value}>
                      {posicionamento.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Verba diária */}
            <div className="space-y-2">
              <Label htmlFor="verba_diaria" className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-automation-blue" />
                Verba Diária *
              </Label>
              <CurrencyInput
                value={formData.verba_diaria}
                onChange={(value) => updateField('verba_diaria', value)}
                placeholder="R$ 0,00"
                disabled={currentStage < 3}
              />
            </div>
          </div>

          {/* Link do drive com criativos */}
          <div className="space-y-2">
            <Label htmlFor="link_drive_criativos" className="flex items-center gap-2">
              <Link2 className="w-4 h-4 text-automation-blue" />
              {formData.posicionamento === 'feed' 
                ? 'Link do Drive com Criativos para Feed *'
                : formData.posicionamento === 'stories' 
                ? 'Link do Drive com Criativos para Stories *' 
                : 'Link do Drive com Criativos *'
              }
            </Label>
            <Input
              type="url"
              value={formData.link_drive_criativos}
              onChange={(e) => updateField('link_drive_criativos', e.target.value)}
              placeholder="https://drive.google.com/..."
              className="w-full"
              disabled={currentStage < 3}
            />
          </div>

          {/* Link do documento com legendas */}
          <div className="space-y-2">
            <Label htmlFor="link_documento_legendas" className="flex items-center gap-2">
              <Link2 className="w-4 h-4 text-automation-blue" />
              Link do Documento com Legendas *
            </Label>
            <Input
              type="url"
              value={formData.link_documento_legendas}
              onChange={(e) => updateField('link_documento_legendas', e.target.value)}
              placeholder="https://docs.google.com/..."
              className="w-full"
              disabled={currentStage < 3}
            />
          </div>

          {/* Link de redirecionamento - Only show for Compras or Lead */}
          {(formData.objetivo_conversao === 'compras' || formData.objetivo_conversao === 'lead') && (
            <div className="space-y-2">
              <Label htmlFor="link_redirecionamento" className="flex items-center gap-2">
                <Link2 className="w-4 h-4 text-automation-blue" />
                Link de Redirecionamento *
              </Label>
              <Input
                type="url"
                value={formData.link_redirecionamento}
                onChange={(e) => updateField('link_redirecionamento', e.target.value)}
                placeholder="https://exemplo.com"
                className="w-full"
                disabled={currentStage < 3}
              />
            </div>
          )}

          <div className="pt-4">
            <Button 
              type="submit" 
              variant="automation" 
              size="lg" 
              disabled={isSubmitting || isSuccess || currentStage < 3}
              className="w-full"
            >
              {isSuccess ? (
                <>
                  <Check className="w-5 h-5" />
                  CRIATIVOS ENVIADOS
                </>
              ) : isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {currentStage === 1 && "CARREGANDO DADOS DO CLIENTE..."}
                  {currentStage === 2 && "CARREGANDO CONFIGURAÇÕES..."}
                  {currentStage === 3 && "ENVIANDO PARA O META ADS..."}
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  {currentStage < 3 ? "PREENCHA TODOS OS CAMPOS" : "SUBIR CRIATIVOS"}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
