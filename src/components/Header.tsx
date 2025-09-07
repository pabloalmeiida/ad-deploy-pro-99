import { Button } from "@/components/ui/enhanced-button"
import { Zap, Menu } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold gradient-text">
            AutoAds Pro
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Dashboard
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Campanhas
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Relatórios
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Configurações
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden md:inline-flex">
            Documentação
          </Button>
          <Button variant="automation">
            Criar Campanha
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}