import { ArrowRight, Database, Zap, Target, CheckCircle } from "lucide-react"

export function WorkflowVisualization() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Como Funciona a Automação</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Veja como transformamos seu processo manual em uma automação inteligente
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
            
            {/* Step 1 */}
            <div className="workflow-node p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">1. Preencha o Formulário</h3>
              <p className="text-sm text-muted-foreground">
                Configure os parâmetros da campanha em nossa interface intuitiva
              </p>
            </div>
            
            <div className="hidden md:flex justify-center">
              <ArrowRight className="w-8 h-8 text-automation-orange" />
            </div>
            
            {/* Step 2 */}
            <div className="workflow-node p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">2. Webhook n8n</h3>
              <p className="text-sm text-muted-foreground">
                Dados são enviados automaticamente para o workflow de automação
              </p>
            </div>
            
            <div className="hidden md:flex justify-center">
              <ArrowRight className="w-8 h-8 text-automation-orange" />
            </div>
            
            {/* Step 3 */}
            <div className="workflow-node p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">3. API META</h3>
              <p className="text-sm text-muted-foreground">
                Backend processa e cria as campanhas via API oficial do META
              </p>
            </div>
            
            <div className="hidden md:flex justify-center">
              <ArrowRight className="w-8 h-8 text-automation-orange" />
            </div>
            
            {/* Step 4 */}
            <div className="workflow-node p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">4. Campanhas Ativas</h3>
              <p className="text-sm text-muted-foreground">
                Suas campanhas estão no ar e gerando resultados automaticamente
              </p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-automation-orange/10 border border-automation-orange/20 rounded-full">
              <Zap className="w-5 h-5 text-automation-orange" />
              <span className="text-automation-orange font-semibold">
                De horas para segundos - Automatização completa
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}