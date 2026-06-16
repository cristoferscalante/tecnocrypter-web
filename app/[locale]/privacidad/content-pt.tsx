import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Eye, FileText, Mail, Calendar, Target, Scale, Cookie, Users, Globe, Database, Clock, RefreshCw, CheckCircle, UserCheck, ClipboardCheck, AlertCircle } from "lucide-react"

export default function PrivacyPt() {
  return (
    <main className="min-h-screen py-12">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Política de Privacidade</h1>
          <p className="text-xl text-muted-foreground">
            Na TecnoCrypter priorizamos sua privacidade sob um modelo privacy-first com criptografia de ponta a ponta.
          </p>
          <div className="flex items-center justify-center mt-4 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Última atualização: 10 de agosto de 2025</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introdução */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                Introdução
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                TecnoCrypter ("TecnoCrypter"), em conformidade com a <strong>Lei 1581 de 2012</strong>, o <strong>Decreto 1377 de 2013</strong>, 
                o <strong>Decreto 1074 de 2015</strong> e outras regulamentações aplicáveis sobre processamento de dados pessoais, 
                adota por meio deste esta Política de Processamento de Dados Pessoais.
              </p>
              <p>
                Nossa missão é oferecer ferramentas e conteúdos de <strong>cibersegurança</strong> sob um modelo <strong>privacy-first</strong>, 
                priorizando o <strong>anonimato do usuário</strong>, o <strong>mínimo uso de dados</strong>, as <strong>comunicações criptografadas</strong> e, 
                em caso de transações, a preferência por <strong>pagos com criptomoedas</strong>.
              </p>
              <p>
                Esta política se aplica a todos os processos, colaboradores e fornecedores que atuam como operadores de dados da TecnoCrypter, e cobre interações com:
              </p>
              <ul>
                <li>Usuários e visitantes de www.tecnocrypter.com</li>
                <li>Assinantes do boletim informativo</li>
                <li>Clientes e potenciais clientes</li>
                <li>Fornecedores e prestadores de serviço</li>
              </ul>
            </CardContent>
          </Card>

          {/* Responsável pelo Tratamento */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                1. Responsável pelo Tratamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Responsável:</strong> TecnoCrypter / v1tro – NIT 1083891483-9</p>
                <p><strong>E-mail seguro:</strong> legal@tecnocrypter.com</p>
                <p><strong>Sitio web:</strong> www.tecnocrypter.com</p>
              </div>
            </CardContent>
          </Card>

          {/* Princípios Orientadores */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                2. Princípios Orientadores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Na TecnoCrypter tratamos as informações em conformidade com:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong>Minimização de dados:</strong> apenas coletamos o que é estritamente necessário.
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong>Anonimato:</strong> sempre que possível, processamos dados de forma não identificável.
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong>Criptografia de ponta a ponta:</strong> para proteger comunicações e transferências.
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong>Sem rastreamento invasivo:</strong> não usamos tecnologias de rastreamento invasivas sem o seu consentimento.
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong>Pagamentos privados:</strong> priorizamos criptomoedas e métodos que não exponham dados financeiros desnecessários.
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dados que Coletamos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-5 w-5 mr-2 text-primary" />
                3. Dados que Coletamos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <strong>Identificação mínima:</strong> nome ou pseudônimo, endereço de e-mail (você pode usar um criptografado) e, se desejar, cidade ou país.
                </div>
                <div>
                  <strong>Dados técnicos básicos:</strong> IP, dispositivo, navegador e configuração de idioma.
                </div>
                <div>
                  <strong>Comunicações:</strong> mensagens enviadas via chat seguro, formulários ou e-mails criptografados.
                </div>
                <div>
                  <strong>Assinaturas:</strong> e-mail e preferências (armazenados de forma criptografada).
                </div>
                <div>
                  <strong>Transações:</strong> pagamentos processados preferencialmente em criptomoedas. Não armazenamos informações completas de cartões.
                </div>
                <div>
                  <strong>Segurança:</strong> URLs analisadas, indicadores de ameaças e registros técnicos para prevenir abusos.
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm">
                    <strong>Importante:</strong> Não solicitamos dados sensíveis, a menos que exigido por lei, caso em que será solicitada autorização expressa. 
                    Menores de idade só podem interagir com autorização de seu representante legal.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Finalidades */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-primary" />
                4. Finalidades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Operar o Site e suas ferramentas (verificador, conteúdos, assinaturas).</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Gerenciar solicitações de suporte usando canais criptografados.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Enviar boletins informativos e alertas de cibersegurança, se autorizado.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Melhorar a segurança e prevenir fraudes ou ataques.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Cumprir obrigações legais ou contratuais.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Processar pagamentos em criptomoedas ou métodos de alta privacidade.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Analisar métricas internas de forma agregada e anônima.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Base Legal e Consentimento */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Scale className="h-5 w-5 mr-2 text-primary" />
                5. Base Legal e Consentimento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                O processamento é realizado com o seu consentimento informado ou nos casos previstos em lei. 
                A autorização é obtida por meios eletrônicos, e prova da mesma é mantida.
              </p>
            </CardContent>
          </Card>

          {/* Cookies e Tecnologias */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Cookie className="h-5 w-5 mr-2 text-primary" />
                6. Cookies e Tecnologias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Usamos cookies técnicos necessários e, apenas se aceitar, cookies opcionais para análises anônimas. 
                Não realizamos perfilamento invasivo. Veja a <strong>Política de Cookies</strong>.
              </p>
            </CardContent>
          </Card>

          {/* Direitos dos Titulares dos Dados */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-5 w-5 mr-2 text-primary" />
                7. Direitos dos Titulares dos Dados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Você tem o direito de:</p>
              <div className="grid md:grid-cols-2 gap-2">
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <span className="text-primary">✓</span>
                    <span>Acessar seus dados</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-primary">✓</span>
                    <span>Retificá-los ou atualizá-los</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-primary">✓</span>
                    <span>Solicitar exclusão</span>
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <span className="text-primary">✓</span>
                    <span>Revogar consentimento</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-primary">✓</span>
                    <span>Registrar reclamações na SIC</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                <p className="text-sm">
                  <strong>Exerça-os escrevendo para:</strong> legal@tecnocrypter.com
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Operadores e Transferências */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2 text-primary" />
                8. Operadores e Transferências
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Apenas compartilhamos dados com fornecedores que atendem a altos padrões de segurança e criptografia. 
                Transferências internacionais são conduzidas sob protocolos seguros e criptografia de ponta a ponta.
              </p>
            </CardContent>
          </Card>

          {/* Segurança da Informação */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                9. Segurança da Informação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Implementamos:</p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Criptografia TLS/SSL e PGP para comunicações.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Controles de acesso e registros de auditoria.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Infraestrutura com redundância e backups criptografados.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Retenção mínima de dados.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Retenção e Exclusão */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                10. Retenção e Exclusão
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Os dados são mantidos apenas pelo tempo necessário para as finalidades autorizadas. 
                Posteriormente, são excluídos ou anonimizados com segurança.
              </p>
            </CardContent>
          </Card>

          {/* Uso do Verificador de Links */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-primary" />
                11. Uso do Verificador de Links
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Os dados processados por esta ferramenta são armazenados temporariamente para análise e segurança, 
                não são compartilhados publicamente e são excluídos após o cumprimento de sua finalidade.
              </p>
            </CardContent>
          </Card>

          {/* Alterações na Política */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <RefreshCw className="h-5 w-5 mr-2 text-primary" />
                12. Alterações na Política
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Quaisquer alterações serão publicadas em nosso Site e, se relevantes, notificadas por meios disponíveis.
              </p>
            </CardContent>
          </Card>

          {/* Vigência */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                13. Vigência
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Esta Política entra em vigor em <strong>10 de agosto de 2025</strong> e permanecerá em vigor enquanto 
                a TecnoCrypter realizar o processamento de dados pessoais.
              </p>
            </CardContent>
          </Card>

          {/* Autorização de dados pessoais */}
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-600 dark:text-blue-400">
                <UserCheck className="h-5 w-5 mr-2" />
                Autorização para Processamento de Dados Pessoais
              </CardTitle>
              <CardDescription>
                Formulário de autorização expressa para o tratamento de informações pessoais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border">
                <h4 className="font-semibold mb-4 flex items-center">
                  <ClipboardCheck className="h-4 w-4 mr-2 text-primary" />
                  Autorização expressa
                </h4>
                <p className="mb-4 text-sm">
                  Autorizo de maneira livre, prévia, expressa, voluntária e informada a <strong>TecnoCrypter</strong> 
                  a realizar o processamento dos meus dados pessoais com as seguintes finalidades, sempre priorizando a privacidade, segurança, anonimato e confidencialidade:
                </p>
                
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">a)</span>
                      <span>Operar e manter o Site Web e suas funcionalidades, garantindo um ambiente seguro.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">b)</span>
                      <span>Gerenciar solicitações de contato e suporte técnico através de canais criptografados.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">c)</span>
                      <span>Enviar boletins informativos sobre cibersegurança e anonimato digital, apenas se autorizado.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">d)</span>
                      <span>Comunicações comerciais por canais seguros e criptografados.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">e)</span>
                      <span>Análise interna com dados agregados e anonimização.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">f)</span>
                      <span>Prevenir fraudes e reforçar a segurança da infraestrutura.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">g)</span>
                      <span>Gerenciar eventos e treinamentos por canais privados e seguros.</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">h)</span>
                      <span>Cumprir obrigações legais sob princípios de mínima divulgação.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">i)</span>
                      <span>Gerenciar relações contratuais, incluindo pagamentos com criptomoedas.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">j)</span>
                      <span>Compartilhar dados apenas com fornecedores que cumprem altos padrões de privacidade.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">k)</span>
                      <span>Transferências internacionais com criptografia de ponta a ponta.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">l)</span>
                      <span>Atualizar bases de dados minimizando a retenção de dados.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">m)</span>
                      <span>Estudos internos para melhorar serviços, sem segmentação invasiva.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">n)</span>
                      <span>Registrar comunicações para suporte, sempre criptografadas.</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <h4 className="font-semibold mb-3 flex items-center text-yellow-700 dark:text-yellow-400">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Declarações importantes
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-600">•</span>
                    <span>Entendo que o uso de dados sensíveis é opcional e não pode implicar discriminação.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-600">•</span>
                    <span>Para menores de idade, será necessária autorização do representante legal.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-600">•</span>
                    <span>Conheço meus direitos de acesso, atualização, retificação, supressão, revogação e reclamação perante a SIC.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-600">•</span>
                    <span>Li e aceito a Política de Privacidade publicada em www.tecnocrypter.com.</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                  <p className="text-sm font-medium">
                    <strong>Canal para exercer direitos:</strong> legal@tecnocrypter.com
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border">
                <h4 className="font-semibold mb-3 text-gray-700 dark:text-gray-300">
                  Resumo do aviso de privacidade
                </h4>
                <div className="text-sm space-y-2">
                  <p><strong>Responsável:</strong> TecnoCrypter / v1tr0, NIT 1083891483-9</p>
                  <p><strong>E-mail seguro:</strong> legal@tecnocrypter.com</p>
                  <p><strong>Site:</strong> www.tecnocrypter.com</p>
                </div>
                <p className="text-sm mt-3">
                  Na TecnoCrypter tratamos seus dados com máxima segurança e respeito pelo seu anonimato. 
                  Os dados serão usados para operar o site, gerenciar comunicações criptografadas, 
                  analítica agregada, prevenção de fraudes, conformidade legal e marketing não intrusivo 
                  (apenas se autorizado).
                </p>
                <p className="text-sm mt-2">
                  Seus direitos incluem acessar, atualizar, retificar, revogar e excluir seus dados, 
                  bem como registrar reclamações junto à Superintendência de Indústria e Comércio.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contato */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <Mail className="h-5 w-5 mr-2" />
                Tem dúvidas sobre a sua privacidade?
              </CardTitle>
              <CardDescription>
                Nossa equipe está disponível para esclarecer qualquer dúvida sobre o processamento de seus dados.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div>
                  <p className="font-medium">E-mail de contato legal:</p>
                  <p className="text-primary">legal@tecnocrypter.com</p>
                </div>
                <div>
                  <p className="font-medium">Suporte geral:</p>
                  <p className="text-primary">info@tecnocrypter.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
