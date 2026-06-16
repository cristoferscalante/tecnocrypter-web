import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Eye, FileText, Mail, Calendar, Scale, Users, Globe, AlertTriangle, Gavel, BookOpen, Settings, UserCheck, MessageSquare, Ban, Zap, Server, MapPin } from "lucide-react"

export default function TermsPt() {
  return (
    <main className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Termos de Serviço
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Conheça os termos e condições que regem o uso do TecnoCrypter e de nossos serviços de cibersegurança.
        </p>
        <div className="flex items-center justify-center mt-6 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2" />
          <span>Última atualização: 10 de agosto de 2025</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Identidad del responsable y aceptación */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserCheck className="h-5 w-5 mr-2 text-primary" />
              1. Identidade do responsável e aceitação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Este site web, acessível em <strong>www.tecnocrypter.com</strong> (o "Site"), é operado por 
              <strong> v1tr0</strong>, identificada com NIT <strong>1083891483-9</strong>, com domicílio em 
              <strong>Manizales, Colômbia</strong>, e-mail de contato <strong>legal@tecnocrypter.com</strong>.
            </p>
            <p>
              Ao acessar, navegar ou usar o Site, você ("Usuário") declara que leu, compreendeu e aceitou 
              estes Termos de Serviço (os "Termos"), e se compromete a cumpri-los, bem como as leis e 
              regulamentações aplicáveis na Colômbia. Se não concordar, deve abster-se de usar o Site.
            </p>
          </CardContent>
        </Card>

        {/* Ámbito del Sitio y definiciones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-primary" />
              2. Âmbito do Site e definições
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">O Site oferece conteúdos e ferramentas focadas em cibersegurança, anonimato e proteção digital, incluindo:</p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>Artigos e publicações de blog.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>Ferramentas de verificação e análise de links suspeitos.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>Informações e contratação de produtos/serviços.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>Boletim informativo (Newsletter).</span>
              </li>
            </ul>
            <div className="bg-primary/10 p-4 rounded-lg">
              <p className="mb-2"><strong>Conteúdo:</strong> textos, imagens, gráficos, logotipos, vídeos, código e software do Site.</p>
              <p><strong>Serviços:</strong> funcionalidades oferecidas pelo TecnoCrypter através do Site, gratuitas ou pagas.</p>
            </div>
          </CardContent>
        </Card>

        {/* Modificaciones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2 text-primary" />
              3. Modificações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Podemos atualizar estes Termos ou o conteúdo do Site a qualquer momento. A versão em vigor 
              será publicada com a data de atualização. O uso contínuo após alterações implica aceitação das mesmas.
            </p>
          </CardContent>
        </Card>

        {/* Uso permitido y prohibido */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Scale className="h-5 w-5 mr-2 text-primary" />
              4. Uso permitido e proibido
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-green-600 mb-2">4.1 Uso permitido:</h4>
                <p>
                  O Usuário pode utilizar o Site e suas ferramentas de forma pessoal ou profissional legítima, 
                  para fins lícitos, e sem violar a segurança ou privacidade de terceiros.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-red-600 mb-2">4.2 Uso proibido:</h4>
                <p className="mb-3">Fica estritamente proibido:</p>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500">✗</span>
                    <span>Acessar ou tentar acessar sem autorização sistemas, contas, APIs ou dados.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500">✗</span>
                    <span>Distribuir malware, phishing, engenharia social ou qualquer atividade ilícita.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500">✗</span>
                    <span>Usar o verificador ou ferramentas para planejar, facilitar ou executar ataques.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500">✗</span>
                    <span>Realizar DDoS, automatizações massivas, scraping não autorizado ou exploração de vulnerabilidades.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500">✗</span>
                    <span>Coletar dados pessoais sem consentimento válido.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500">✗</span>
                    <span>Realizar engenharia reversa, contornar proteções ou descompilar software do Site.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500">✗</span>
                    <span>Publicar conteúdo ilegal, difamatório, discriminatório, violento ou que infrinja direitos de terceiros.</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-600 mb-2">4.3 Divulgação responsável:</h4>
                <p>
                  Se detectar uma vulnerabilidade, reporte-a para <strong>security@tecnocrypter.com</strong> antes de divulgá-la publicamente.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Registro y cuentas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary" />
              5. Registro e contas (se aplicável)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Caso seja necessária uma conta, o Usuário será responsável por:</p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>Fornecer dados verdadeiros.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>Manter a confidencialidade de suas credenciais.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>Toda atividade realizada sob sua conta.</span>
              </li>
            </ul>
            <p>O TecnoCrypter poderá suspender ou cancelar contas por descumprimento destes Termos.</p>
          </CardContent>
        </Card>

        {/* Boletín y comunicaciones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-primary" />
              6. Boletim informativo e comunicações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Ao se inscrever, o Usuário aceita receber comunicações eletrônicas, podendo cancelar a assinatura a qualquer momento.
            </p>
          </CardContent>
        </Card>

        {/* Propiedad intelectual e industrial */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lock className="h-5 w-5 mr-2 text-primary" />
              7. Propriedade intelectual e industrial
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Todos os conteúdos do Site são de propriedade do TecnoCrypter ou de terceiros autorizados, protegidos por leis de direitos autorais e marcas. Fica proibida sua reprodução ou uso não autorizado.
            </p>
          </CardContent>
        </Card>

        {/* Licencia limitada */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-primary" />
              8. Licença limitada
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Concedemos uma licença não exclusiva, revogável e intransferível para acessar e usar o Site para fins legítimos, sem transferir direitos de propriedade.
            </p>
          </CardContent>
        </Card>

        {/* Enlaces y contenido de terceros */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2 text-primary" />
              9. Links e conteúdo de terceiros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              O Site pode conter links externos. O TecnoCrypter não é responsável por seus conteúdos ou políticas.
            </p>
          </CardContent>
        </Card>

        {/* Herramientas de análisis y verificación */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-primary" />
              10. Ferramentas de análise e verificação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              As ferramentas são oferecidas "como estão" para fins informativos. Não garantem precisão total nem substituem auditorias profissionais. O Usuário é responsável por suas decisões.
            </p>
          </CardContent>
        </Card>

        {/* Disponibilidad y cambios */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Server className="h-5 w-5 mr-2 text-primary" />
              11. Disponibilidade e alterações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Podemos suspender ou modificar o Site para manutenção, segurança, melhorias ou motivos de força maior.
            </p>
          </CardContent>
        </Card>

        {/* Privacidad y cookies */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="h-5 w-5 mr-2 text-primary" />
              12. Privacidade e cookies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              O tratamento de dados é regido pela Política de Privacidade e pela Política de Cookies, disponíveis no Site.
            </p>
          </CardContent>
        </Card>

        {/* Restricciones para menores */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Ban className="h-5 w-5 mr-2 text-primary" />
              13. Restrições para menores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              O Site é direcionado a maiores de 18 anos, exceto com autorização e supervisão de um representante legal.
            </p>
          </CardContent>
        </Card>

        {/* Exoneración de responsabilidad */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-primary" />
              14. Isenção de responsabilidade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              O TecnoCrypter não garante disponibilidade contínua, ausência de erros ou vulnerabilidades, nem a precisão absoluta do conteúdo.
            </p>
          </CardContent>
        </Card>

        {/* Limitación de responsabilidad */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Gavel className="h-5 w-5 mr-2 text-primary" />
              15. Limitação de responsabilidade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Em nenhum caso seremos responsáveis por danos indiretos, perda de dados ou lucros cessantes decorrentes do uso do Site. Se houver responsabilidade, ela será limitada ao valor pago pelo serviço (ou COP $0 se for gratuito).
            </p>
          </CardContent>
        </Card>

        {/* Indemnidad */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-primary" />
              16. Indenização
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              O Usuário indenizará o TecnoCrypter por reivindicações decorrentes do seu uso indevido do Site.
            </p>
          </CardContent>
        </Card>

        {/* Fuerza mayor */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2 text-primary" />
              17. Força maior
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Não seremos responsáveis por falhas devido a eventos fora de nosso controle.
            </p>
          </CardContent>
        </Card>

        {/* Terminación */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Ban className="h-5 w-5 mr-2 text-primary" />
              18. Rescisão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Podemos restringir o acesso ao Site por descumprimento ou motivos de segurança.
            </p>
          </CardContent>
        </Card>

        {/* Legislación aplicable */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-primary" />
              19. Legislação aplicável
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Estes Termos são regidos pela legislação colombiana. Qualquer disputa será resolvida pelos juízes de 
              <strong> Manizales, Caldas</strong>.
            </p>
          </CardContent>
        </Card>

        {/* Contacto */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center text-primary">
              <Mail className="h-5 w-5 mr-2" />
              20. Contato
            </CardTitle>
            <CardDescription>
              Para consultas legais ou de segurança, entre em contato através dos seguintes meios.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium">TecnoCrypter – v1tr0</p>
                <p className="text-sm text-muted-foreground">Manizales, Colômbia</p>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="font-medium">Consultas legais:</p>
                  <p className="text-primary">legal@tecnocrypter.com</p>
                </div>
                <div>
                  <p className="font-medium">Relatórios de segurança:</p>
                  <p className="text-primary">security@tecnocrypter.com</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
