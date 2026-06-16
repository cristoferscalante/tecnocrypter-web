import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Eye, FileText, Mail, Calendar, Target, Scale, Cookie, Users, Globe, Database, Clock, RefreshCw, CheckCircle, UserCheck, ClipboardCheck, AlertCircle } from "lucide-react"

export default function PrivacyFr() {
  return (
    <main className="min-h-screen py-12">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Politique de Confidentialité</h1>
          <p className="text-xl text-muted-foreground">
            Chez TecnoCrypter, nous donnons la priorité à votre vie privée dans le cadre d'un modèle privacy-first avec chiffrement de bout en bout.
          </p>
          <div className="flex items-center justify-center mt-4 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Dernière mise à jour : 10 août 2025</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                TecnoCrypter ("TecnoCrypter"), conformément à la <strong>loi 1581 de 2012</strong>, au <strong>décret 1377 de 2013</strong>, 
                au <strong>décret 1074 de 2015</strong> et aux autres réglementations applicables sur le traitement des données personnelles, 
                adopte par la présente cette Politique de Traitement des Données Personnelles.
              </p>
              <p>
                Notre mission est d'offrir des outils et du contenu de <strong>cybersécurité</strong> sous un modèle <strong>privacy-first</strong>, 
                en privilégiant l'<strong>anonymat de l'utilisateur</strong>, l'<strong>utilisation minimale de données</strong>, les <strong>communications chiffrées</strong> et, 
                en cas de transactions, la préférence pour les <strong>paiements en crypto-monnaies</strong>.
              </p>
              <p>
                Cette politique s'applique à tous les processus, collaborateurs et prestataires agissant en tant que sous-traitants de données pour TecnoCrypter, et couvre les interactions avec :
              </p>
              <ul>
                <li>Les utilisateurs et visiteurs de www.tecnocrypter.com</li>
                <li>Les abonnés à la newsletter</li>
                <li>Les clients et prospects</li>
                <li>Les fournisseurs et sous-traitants</li>
              </ul>
            </CardContent>
          </Card>

          {/* Responsable du Traitement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                1. Responsable du Traitement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Responsable :</strong> TecnoCrypter / v1tro – NIT 1083891483-9</p>
                <p><strong>Courriel sécurisé :</strong> legal@tecnocrypter.com</p>
                <p><strong>Site Web :</strong> www.tecnocrypter.com</p>
              </div>
            </CardContent>
          </Card>

          {/* Principes Directeurs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                2. Principes Directeurs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Chez TecnoCrypter, nous traitons les informations conformément à :</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong>Minimisation des données :</strong> nous ne collectons que ce qui est strictement nécessaire.
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong>Anonymat :</strong> chaque fois que possible, nous traitons les données de manière non identifiable.
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong>Chiffrement de bout en bout :</strong> pour protéger les communications et les transferts.
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong>Pas de suivi intrusif :</strong> nous n'utilisons pas de technologies de suivi invasives sans votre consentement.
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong>Paiements privés :</strong> nous privilégions les crypto-monnaies et les méthodes qui n'exposent pas de données financières inutiles.
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Données que Nous Collectons */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-5 w-5 mr-2 text-primary" />
                3. Données que Nous Collectons
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <strong>Identification minimale :</strong> nom ou alias, adresse courriel (vous pouvez en utiliser une chiffrée) et, si vous le souhaitez, ville ou pays.
                </div>
                <div>
                  <strong>Données techniques de base :</strong> IP, appareil, navigateur et configuration de la langue.
                </div>
                <div>
                  <strong>Communications :</strong> messages envoyés via le chat sécurisé, formulaires ou courriels chiffrés.
                </div>
                <div>
                  <strong>Abonnements :</strong> courriel et préférences (stockés sous forme chiffrée).
                </div>
                <div>
                  <strong>Transactions :</strong> paiements traités de préférence en crypto-monnaies. Nous ne stockons pas les informations complètes de cartes.
                </div>
                <div>
                  <strong>Sécurité :</strong> URLs analysées, indicateurs de menaces et journaux techniques pour prévenir les abus.
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm">
                    <strong>Important :</strong> Nous ne demandons pas de données sensibles, sauf obligation légale, auquel cas une autorisation expresse sera demandée. 
                    Les mineurs ne peuvent interagir qu'avec l'autorisation de leur représentant légal.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Finalités */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-primary" />
                4. Finalités
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Exploiter le Site et ses outils (vérificateur, contenus, abonnements).</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Gérer les demandes d'assistance via des canaux chiffrés.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Envoyer des newsletters et des alertes de cybersécurité si autorisé.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Améliorer la sécurité et prévenir les fraudes ou les attaques.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Respecter les obligations légales ou contractuelles.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Traiter les paiements en crypto-monnaies ou par des méthodes hautement confidentielles.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Analyser les mesures internes de manière agrégée et anonyme.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Base Légale et Consentement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Scale className="h-5 w-5 mr-2 text-primary" />
                5. Base Légale et Consentement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Le traitement est effectué avec votre consentement éclairé ou dans les cas prévus par la loi. 
                L'autorisation est obtenue par des moyens électroniques, et une preuve en est conservée.
              </p>
            </CardContent>
          </Card>

          {/* Cookies et Technologies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Cookie className="h-5 w-5 mr-2 text-primary" />
                6. Cookies et Technologies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Nous utilisons les cookies techniques nécessaires et, uniquement si vous les acceptez, des cookies facultatifs pour des analyses anonymes. 
                Nous ne pratiquons pas de profilage invasif. Voir la <strong>Politique relative aux Cookies</strong>.
              </p>
            </CardContent>
          </Card>

          {/* Droits des Personnes Concernées */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-5 w-5 mr-2 text-primary" />
                7. Droits des Personnes Concernées
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Vous avez le droit de :</p>
              <div className="grid md:grid-cols-2 gap-2">
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <span className="text-primary">✓</span>
                    <span>Accéder à vos données</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-primary">✓</span>
                    <span>Les rectifier ou les mettre à jour</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-primary">✓</span>
                    <span>Demander leur suppression</span>
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <span className="text-primary">✓</span>
                    <span>Révoquer l'autorisation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-primary">✓</span>
                    <span>Déposer des plaintes auprès de la SIC</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                <p className="text-sm">
                  <strong>Exercez-les en écrivant à :</strong> legal@tecnocrypter.com
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Sous-traitants et Transferts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2 text-primary" />
                8. Sous-traitants et Transferts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Nous ne partageons les données qu'avec des prestataires répondant à des normes de sécurité et de chiffrement élevées. 
                Les transferts internationaux sont effectués dans le cadre de protocoles sécurisés et avec un chiffrement de bout en bout.
              </p>
            </CardContent>
          </Card>

          {/* Sécurité des Informations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                9. Sécurité des Informations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Nous mettons en œuvre :</p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Le chiffrement TLS/SSL et PGP pour les communications.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Des contrôles d'accès et des registres d'audit.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Une infrastructure avec redondance et sauvegardes chiffrées.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Une conservation minimale des données.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Conservation et Suppression */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                10. Conservation et Suppression
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Les données ne sont conservées que le temps nécessaire aux finalités autorisées. 
                Ensuite, elles sont supprimées ou anonymisées de manière sécurisée.
              </p>
            </CardContent>
          </Card>

          {/* Utilisation du Vérificateur de Liens */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-primary" />
                11. Utilisation du Vérificateur de Liens
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Les données traitées par cet outil sont temporairement stockées à des fins d'analyse et de sécurité, 
                ne sont pas partagées publiquement et sont supprimées après avoir rempli leur fonction.
              </p>
            </CardContent>
          </Card>

          {/* Modifications de la Politique */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <RefreshCw className="h-5 w-5 mr-2 text-primary" />
                12. Modifications de la Politique
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Toute modification sera publiée sur notre Site et, si elle est pertinente, notifiée par les moyens disponibles.
              </p>
            </CardContent>
          </Card>

          {/* Vigente */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                13. Entrée en Vigueur
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Cette Politique est en vigueur à compter du <strong>10 août 2025</strong> et le restera tant que 
                TecnoCrypter effectuera le traitement des données personnelles.
              </p>
            </CardContent>
          </Card>

          {/* Autorisation relative aux données personnelles */}
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-600 dark:text-blue-400">
                <UserCheck className="h-5 w-5 mr-2" />
                Autorisation pour le traitement des données personnelles
              </CardTitle>
              <CardDescription>
                Formulaire d'autorisation expresse pour le traitement d'informations personnelles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border">
                <h4 className="font-semibold mb-4 flex items-center">
                  <ClipboardCheck className="h-4 w-4 mr-2 text-primary" />
                  Autorisation expresse
                </h4>
                <p className="mb-4 text-sm">
                  J'autorise de manière libre, préalable, expresse, volontaire et éclairée <strong>TecnoCrypter</strong> 
                  à traiter mes données personnelles aux fins suivantes, en accordant toujours la priorité à la vie privée, à la sécurité, à l'anonymat et à la confidentialité :
                </p>
                
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">a)</span>
                      <span>Exploiter et maintenir le Site Web et ses fonctionnalités, garantissant un environnement sécurisé.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">b)</span>
                      <span>Gérer les demandes de contact et d'assistance technique via des canaux chiffrés.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">c)</span>
                      <span>Envoyer des newsletters sur la cybersécurité et l'anonymat numérique, uniquement si vous y êtes autorisé.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">d)</span>
                      <span>Communications commerciales via des canaux sécurisés et chiffrés.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">e)</span>
                      <span>Analyses internes avec des données agrégées et anonymisées.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">f)</span>
                      <span>Prévenir la fraude et renforcer la sécurité de l'infrastructure.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">g)</span>
                      <span>Gérer les événements et les formations par des canaux privés et sécurisés.</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">h)</span>
                      <span>Respecter les obligations légales en vertu des principes de divulgation minimale.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">i)</span>
                      <span>Gérer les relations contractuelles, y compris les paiements en crypto-monnaies.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">j)</span>
                      <span>Partager les données uniquement avec des prestataires répondant à des normes de confidentialité élevées.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">k)</span>
                      <span>Transferts internationaux avec chiffrement de bout en bout.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">l)</span>
                      <span>Mettre à jour les bases de données tout en minimisant la conservation des données.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">m)</span>
                      <span>Études internes pour améliorer les services, sans ciblage invasif.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">n)</span>
                      <span>Enregistrer les communications pour l'assistance, toujours de façon chiffrée.</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <h4 className="font-semibold mb-3 flex items-center text-yellow-700 dark:text-yellow-400">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Déclarations importantes
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-600">•</span>
                    <span>Je comprends que l'utilisation de données sensibles est facultative et ne peut impliquer de discrimination.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-600">•</span>
                    <span>Pour les mineurs, l'autorisation de leur représentant légal sera requise.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-600">•</span>
                    <span>Je connais mes droits d'accès, de mise à jour, de rectification, de suppression, de révocation et de plainte auprès de la SIC.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-600">•</span>
                    <span>J'ai lu et j'accepte la Politique de Confidentialité publiée sur www.tecnocrypter.com.</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                  <p className="text-sm font-medium">
                    <strong>Canal pour exercer ses droits :</strong> legal@tecnocrypter.com
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border">
                <h4 className="font-semibold mb-3 text-gray-700 dark:text-gray-300">
                  Résumé de l'avis de confidentialité
                </h4>
                <div className="text-sm space-y-2">
                  <p><strong>Responsable :</strong> TecnoCrypter / v1tr0, NIT 1083891483-9</p>
                  <p><strong>Courriel sécurisé :</strong> legal@tecnocrypter.com</p>
                  <p><strong>Site :</strong> www.tecnocrypter.com</p>
                </div>
                <p className="text-sm mt-3">
                  Chez TecnoCrypter, nous traitons vos données avec la plus grande sécurité et dans le respect de votre anonymat. 
                  Les données seront utilisées pour exploiter le site, gérer les communications chiffrées, 
                  effectuer des analyses globales, prévenir la fraude, respecter les obligations légales et pour le marketing non intrusif 
                  (uniquement si autorisé).
                </p>
                <p className="text-sm mt-2">
                  Vos droits comprennent l'accès, la mise à jour, la rectification, la révocation et la suppression de vos données, 
                  ainsi que le dépôt de plaintes auprès de la Surintendance de l'Industrie et du Commerce.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <Mail className="h-5 w-5 mr-2" />
                Vous avez des questions sur votre vie privée ?
              </CardTitle>
              <CardDescription>
                Notre équipe est disponible pour résoudre tout doute concernant le traitement de vos données.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div>
                  <p className="font-medium">Courriel de contact légal :</p>
                  <p className="text-primary">legal@tecnocrypter.com</p>
                </div>
                <div>
                  <p className="font-medium">Support général :</p>
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
