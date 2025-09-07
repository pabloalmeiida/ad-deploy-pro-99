import { Button } from "@/components/ui/enhanced-button"
import { ArrowRight, Zap, Target, TrendingUp } from "lucide-react"

export function HeroSection() {
  return (
    <section className="hero-section py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-automation-orange/10 border border-automation-orange/20 rounded-full">
              <Zap className="w-4 h-4 text-automation-orange" />
              <span className="text-sm text-automation-orange font-medium">Automação Inteligente</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Automatize seus anúncios{" "}
            <span className="gradient-text">
              META
            </span>{" "}
            em segundos
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Pare de subir 50 criativos manualmente. Nossa plataforma conecta diretamente 
            com a API do META e automatiza todo o processo para gestores de tráfego.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button variant="hero" size="hero" className="group">
              Começar Agora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="hero" className="border-white/20 text-white hover:bg-white/10">
              Ver Demonstração
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="automation-card p-6 rounded-xl text-white">
              <div className="w-12 h-12 bg-automation-orange/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Target className="w-6 h-6 text-automation-orange" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Setup Rápido</h3>
              <p className="text-gray-400">
                Configure uma vez e automatize centenas de campanhas
              </p>
            </div>
            
            <div className="automation-card p-6 rounded-xl text-white">
              <div className="w-12 h-12 bg-automation-orange/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Zap className="w-6 h-6 text-automation-orange" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Integração Nativa</h3>
              <p className="text-gray-400">
                Conectado diretamente com a API oficial do META
              </p>
            </div>
            
            <div className="automation-card p-6 rounded-xl text-white">
              <div className="w-12 h-12 bg-automation-orange/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="w-6 h-6 text-automation-orange" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Resultados Comprovados</h3>
              <p className="text-gray-400">
                Economize 80% do tempo na criação de campanhas
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}