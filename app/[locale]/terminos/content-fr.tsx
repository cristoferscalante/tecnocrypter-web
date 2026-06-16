import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Eye, FileText, Mail, Calendar, Scale, Users, Globe, AlertTriangle, Gavel, BookOpen, Settings, UserCheck, MessageSquare, Ban, Zap, Server, MapPin } from "lucide-react"

export default function TermsFr() {
  return (
    <main className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Conditions de Service
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Prenez connaissance des conditions générales qui régissent l'utilisation de TecnoCrypter et de nos services de cybersécurité.
        </p>
        <div className="flex items-center justify-center mt-6 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2" />
          <span>Dernière mise à jour : 10 août 2025</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Identidad del responsable y aceptación */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserCheck className="h-5 w-5 mr-2 text-primary" />
              1. Identité du responsable et acceptation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Ce site web, accessible à l'adresse <strong>www.tecnocrypter.com</strong> (le "Site"), est exploité par 
              <strong> v1tr0</strong>, identifiée par le NIT <strong>1083891483-9</strong>, domiciliée à 
              <strong>Manizales, Colombie</strong>, e-mail de contact <strong>legal@tecnocrypter.com</strong>.
            </p>
            <p>
              En accédant, naviguant ou utilisant le Site, vous ("Utilisateur") déclarez avoir lu, compris et accepté 
              ces Conditions de Service (les "Conditions"), et vous vous engagez à les respecter ainsi que les lois et 
              réglementations applicables en Colombie. Si vous n'êtes pas d'accord, vous devez vous abstenir d'utiliser le Site.
            </p>
          </CardContent>
        </Card>

        {/* Ámbito del Sitio y definiciones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-primary" />
              2. Portée du Site et définitions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Le Site propose des contenus et des outils axés sur la cybersécurité, l'anonymat et la protection numérique, notamment :</p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>Articles et publications de blog.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>Outils de vérification et d'analyse de liens suspects.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>Informations et achat de produits/services.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>Lettre d'information (Newsletter).</span>
              </li>
            </ul>
            <div className="bg-primary/10 p-4 rounded-lg">
              <p className="mb-2"><strong>Contenu :</strong> textes, images, graphiques, logos, vidéos, code et logiciels du Site.</p>
              <p><strong>Services :</strong> fonctionnalités offertes par TecnoCrypter via le Site, gratuites ou payantes.</p>
            </div>
          </CardContent>
        </Card>

        {/* Modificaciones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2 text-primary" />
              3. Modifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Nous pouvons mettre à jour ces Conditions ou le contenu du Site à tout moment. La version en vigueur 
              sera publiée avec la date de mise à jour. L'utilisation continue après modification implique l'acceptation de celles-ci.
            </p>
          </CardContent>
        </Card>

        {/* Uso permitido y prohibido */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Scale className="h-5 w-5 mr-2 text-primary" />
              4. Utilisation autorisée et interdite
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-green-600 mb-2">4.1 Utilisation autorisée :</h4>
                <p>
                  L'Utilisateur peut utiliser le Site et ses outils à titre personnel ou professionnel légitime, 
                  à des fins licites et sans porter atteinte à la sécurité ou à la vie privée de tiers.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-red-600 mb-2">4.2 Utilisation interdite :</h4>
                <p className="mb-3">Il est strictement interdit de :</p>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500">✗</span>
                    <span>Accéder ou tenter d'accéder sans autorisation à des systèmes, comptes, API ou données.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500">✗</span>
                    <span>Distribuer des logiciels malveillants (malwares), du phishing, de l'ingénierie sociale ou toute activité illicite.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500">✗</span>
                    <span>Utiliser le vérificateur ou les outils pour planifier, faciliter ou exécuter des attaques.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500">✗</span>
                    <span>Effectuer des attaques DDoS, des automatisations massives, du scraping non autorisé ou l'exploitation de vulnérabilités.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500">✗</span>
                    <span>Collecter des données personnelles sans consentement valide.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500">✗</span>
                    <span>Effectuer de l'ingénierie inverse, contourner des protections ou décompiler des logiciels du Site.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500">✗</span>
                    <span>Publier du contenu illégal, diffamatoire, discriminatoire, violent ou portant atteinte aux droits de tiers.</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-600 mb-2">4.3 Divulgación responsable :</h4>
                <p>
                  Si vous détectez une vulnérabilité, veuillez la signaler à <strong>security@tecnocrypter.com</strong> avant de la divulguer publiquement.
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
              5. Inscription et comptes (le cas échéant)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">En cas de besoin d'un compte, l'Utilisateur sera responsable de :</p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>Fournir des données exactes.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>Préserver la confidentialité de ses identifiants.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>Toute activité effectuée sous son compte.</span>
              </li>
            </ul>
            <p>TecnoCrypter pourra suspendre ou résilier des comptes en cas de non-respect de ces Conditions.</p>
          </CardContent>
        </Card>

        {/* Boletín y comunicaciones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-primary" />
              6. Lettre d'information et communications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              En vous abonnant, l'Utilisateur accepte de recevoir des communications électroniques, avec la possibilité de se désabonner à tout moment.
            </p>
          </CardContent>
        </Card>

        {/* Propiedad intelectual e industrial */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lock className="h-5 w-5 mr-2 text-primary" />
              7. Propriété intellectuelle et industrielle
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Tous les contenus du Site sont la propriété de TecnoCrypter ou de tiers autorisés, protégés par les lois sur le droit d'auteur et les marques. Toute reproduction ou utilisation non autorisée est interdite.
            </p>
          </CardContent>
        </Card>

        {/* Licencia limitada */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-primary" />
              8. Licence limitée
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Nous accordons une licence non exclusive, révocable et incessible pour accéder et utiliser le Site à des fins légitimes, sans transfert de droits de propriété.
            </p>
          </CardContent>
        </Card>

        {/* Enlaces y contenido de terceros */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2 text-primary" />
              9. Liens et contenus de tiers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Le Site peut contenir des liens externes. TecnoCrypter n'est pas responsable de leurs contenus ni de leurs politiques.
            </p>
          </CardContent>
        </Card>

        {/* Herramientas de análisis y verificación */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-primary" />
              10. Outils d'analyse et de vérification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Les outils sont proposés "tels quels" à des fins d'information. Ils ne garantissent pas une exactitude totale et ne remplacent pas des audits professionnels. L'Utilisateur est responsable de ses décisions.
            </p>
          </CardContent>
        </Card>

        {/* Disponibilidad y cambios */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Server className="h-5 w-5 mr-2 text-primary" />
              11. Disponibilité et modifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Nous pouvons suspendre ou modifier le Site pour maintenance, sécurité, améliorations ou cas de force majeure.
            </p>
          </CardContent>
        </Card>

        {/* Privacidad y cookies */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="h-5 w-5 mr-2 text-primary" />
              12. Confidentialité et cookies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Le traitement des données est régi par la Politique de Confidentialité et la Politique relative aux Cookies disponibles sur le Site.
            </p>
          </CardContent>
        </Card>

        {/* Restricciones para menores */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Ban className="h-5 w-5 mr-2 text-primary" />
              13. Restrictions pour les mineurs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Le Site est destiné aux personnes de plus de 18 ans, sauf autorisation et supervision d'un représentant légal.
            </p>
          </CardContent>
        </Card>

        {/* Exoneración de responsabilidad */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-primary" />
              14. Exclusion de responsabilité
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              TecnoCrypter ne garantit pas une disponibilité continue, l'absence d'erreurs ou de vulnérabilités, ni l'exactitude absolue du contenu.
            </p>
          </CardContent>
        </Card>

        {/* Limitación de responsabilidad */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Gavel className="h-5 w-5 mr-2 text-primary" />
              15. Limitation de responsabilité
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              En aucun cas nous ne serons responsables des dommages indirects, pertes de données ou de revenus résultant de l'utilisation du Site. Si une responsabilité était engagée, elle serait limitée à la valeur payée pour le service (ou 0 COP s'il est gratuit).
            </p>
          </CardContent>
        </Card>

        {/* Indemnidad */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-primary" />
              16. Indemnisation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              L'Utilisateur indemnisera TecnoCrypter en cas de réclamations découlant de son utilisation inappropriée du Site.
            </p>
          </CardContent>
        </Card>

        {/* Fuerza mayor */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2 text-primary" />
              17. Force majeure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Nous ne serons pas responsables des défaillances dues à des événements indépendants de notre volonté.
            </p>
          </CardContent>
        </Card>

        {/* Terminación */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Ban className="h-5 w-5 mr-2 text-primary" />
              18. Résiliation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Nous pouvons restreindre l'accès au Site en cas de non-respect ou pour des raisons de sécurité.
            </p>
          </CardContent>
        </Card>

        {/* Legislación aplicable */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-primary" />
              19. Législation applicable
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Ces Conditions sont régies par la législation colombienne. Tout litige sera résolu par les tribunaux de 
              <strong> Manizales, Caldas</strong>.
            </p>
          </CardContent>
        </Card>

        {/* Contacto */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center text-primary">
              <Mail className="h-5 w-5 mr-2" />
              20. Contact
            </CardTitle>
            <CardDescription>
              Pour toute question juridique ou de sécurité, contactez-nous par les moyens suivants.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium">TecnoCrypter – v1tr0</p>
                <p className="text-sm text-muted-foreground">Manizales, Colombie</p>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="font-medium">Questions juridiques :</p>
                  <p className="text-primary">legal@tecnocrypter.com</p>
                </div>
                <div>
                  <p className="font-medium">Signalements de sécurité :</p>
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
