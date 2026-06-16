import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Eye, FileText, Mail, Calendar, Scale, Users, Globe, AlertTriangle, Gavel, BookOpen, Settings, UserCheck, MessageSquare, Ban, Zap, Server, HelpCircle, MapPin } from "lucide-react"

export default function TermsEn() {
  return (
    <main className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Terms of Service
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Understand the terms and conditions governing the use of TecnoCrypter and our cybersecurity services.
        </p>
        <div className="flex items-center justify-center mt-6 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2" />
          <span>Last updated: August 10, 2025</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Identity of the Controller and Acceptance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserCheck className="h-5 w-5 mr-2 text-primary" />
              1. Identity of the Controller and Acceptance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              This website, accessible at <strong>www.tecnocrypter.com</strong> (the "Site"), is operated by 
              <strong> v1tr0</strong>, identified with NIT <strong>1083891483-9</strong>, based in 
              <strong>Manizales, Colombia</strong>, contact email <strong>legal@tecnocrypter.com</strong>.
            </p>
            <p>
              By accessing, browsing, or using the Site, you ("User") declare that you have read, understood, and accepted 
              these Terms of Service (the "Terms"), and agree to comply with them, as well as the applicable laws and 
              regulations in Colombia. If you do not agree, you must refrain from using the Site.
            </p>
          </CardContent>
        </Card>

        {/* Scope of the Site and Definitions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-primary" />
              2. Scope of the Site and Definitions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">The Site offers content and tools focused on cybersecurity, anonymity, and digital protection, including:</p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>Articles and blog posts.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>Tools for verification and analysis of suspicious links.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>Information and purchasing of products/services.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>Newsletter.</span>
              </li>
            </ul>
            <div className="bg-primary/10 p-4 rounded-lg">
              <p className="mb-2"><strong>Content:</strong> texts, images, graphics, logos, videos, code, and software of the Site.</p>
              <p><strong>Services:</strong> features offered by TecnoCrypter through the Site, whether free or paid.</p>
            </div>
          </CardContent>
        </Card>

        {/* Modifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2 text-primary" />
              3. Modifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We may update these Terms or the content of the Site at any time. The current version 
              will be published with the update date. Continued use after changes implies acceptance of them.
            </p>
          </CardContent>
        </Card>

        {/* Permitted and Prohibited Use */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Scale className="h-5 w-5 mr-2 text-primary" />
              4. Permitted and Prohibited Use
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-green-600 mb-2">4.1 Permitted Use:</h4>
                <p>
                  The User may use the Site and its tools in a legitimate personal or professional capacity, 
                  for lawful purposes, and without violating the security or privacy of third parties.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-red-600 mb-2">4.2 Prohibited Use:</h4>
                <p className="mb-3">It is strictly prohibited to:</p>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500">✗</span>
                    <span>Access or attempt to access systems, accounts, APIs, or data without authorization.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500">✗</span>
                    <span>Distribute malware, phishing, social engineering, or engage in any unlawful activity.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500">✗</span>
                    <span>Use the verifier or tools to plan, facilitate, or execute attacks.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500">✗</span>
                    <span>Perform DDoS attacks, mass automation, unauthorized scraping, or exploit vulnerabilities.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500">✗</span>
                    <span>Collect personal data without valid consent.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500">✗</span>
                    <span>Reverse engineer, bypass protections, or decompile software of the Site.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500">✗</span>
                    <span>Publish illegal, defamatory, discriminatory, violent content, or content that infringes upon third-party rights.</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-600 mb-2">4.3 Responsible Disclosure:</h4>
                <p>
                  If you detect a vulnerability, report it to <strong>security@tecnocrypter.com</strong> before disclosing it publicly.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Registration and Accounts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary" />
              5. Registration and Accounts (if applicable)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">If an account is required, the User shall be responsible for:</p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>Providing truthful information.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>Maintaining the confidentiality of credentials.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>All activities performed under their account.</span>
              </li>
            </ul>
            <p>TecnoCrypter may suspend or terminate accounts for non-compliance with these Terms.</p>
          </CardContent>
        </Card>

        {/* Newsletter and Communications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-primary" />
              6. Newsletter and Communications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              By subscribing, the User agrees to receive electronic communications, with the option to unsubscribe at any time.
            </p>
          </CardContent>
        </Card>

        {/* Intellectual and Industrial Property */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lock className="h-5 w-5 mr-2 text-primary" />
              7. Intellectual and Industrial Property
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              All contents of the Site are the property of TecnoCrypter or authorized third parties, protected by 
              copyright and trademark laws. Unauthorized reproduction or use is prohibited.
            </p>
          </CardContent>
        </Card>

        {/* Limited License */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-primary" />
              8. Limited License
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We grant a non-exclusive, revocable, and non-transferable license to access and use the Site for 
              legitimate purposes, without transferring ownership rights.
            </p>
          </CardContent>
        </Card>

        {/* Third-Party Links and Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2 text-primary" />
              9. Third-Party Links and Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              The Site may contain external links. TecnoCrypter is not responsible for their content or policies.
            </p>
          </CardContent>
        </Card>

        {/* Analysis and Verification Tools */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-primary" />
              10. Analysis and Verification Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Tools are provided "as is" for informational purposes. They do not guarantee complete accuracy or replace 
              professional audits. The User is responsible for their own decisions.
            </p>
          </CardContent>
        </Card>

        {/* Availability and Changes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Server className="h-5 w-5 mr-2 text-primary" />
              11. Availability and Changes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We may suspend or modify the Site for maintenance, security, upgrades, or force majeure.
            </p>
          </CardContent>
        </Card>

        {/* Privacy and Cookies */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="h-5 w-5 mr-2 text-primary" />
              12. Privacy and Cookies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Data processing is governed by the <strong>Privacy Policy</strong> and the <strong>Cookie Policy</strong>, 
              available on the Site.
            </p>
          </CardContent>
        </Card>

        {/* Restrictions for Minors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Ban className="h-5 w-5 mr-2 text-primary" />
              13. Restrictions for Minors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              The Site is intended for users over 18 years of age, unless authorized and supervised by a legal representative.
            </p>
          </CardContent>
        </Card>

        {/* Disclaimer of Warranty */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-primary" />
              14. Disclaimer of Warranty
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              TecnoCrypter does not guarantee continuous availability, absence of errors or vulnerabilities, or the absolute 
              accuracy of the content.
            </p>
          </CardContent>
        </Card>

        {/* Limitation of Liability */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Gavel className="h-5 w-5 mr-2 text-primary" />
              15. Limitation of Liability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              In no event shall we be liable for indirect damages, loss of data, or income arising from the use 
              of the Site. If liability exists, it will be limited to the value paid for the service (or COP $0 if free).
            </p>
          </CardContent>
        </Card>

        {/* Indemnity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-primary" />
              16. Indemnity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              The User shall indemnify TecnoCrypter against claims arising from their improper use of the Site.
            </p>
          </CardContent>
        </Card>

        {/* Force Majeure */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2 text-primary" />
              17. Force Majeure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We will not be liable for failures due to events beyond our control.
            </p>
          </CardContent>
        </Card>

        {/* Termination */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Ban className="h-5 w-5 mr-2 text-primary" />
              18. Termination
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We may restrict access to the Site for non-compliance or security reasons.
            </p>
          </CardContent>
        </Card>

        {/* Applicable Law */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-primary" />
              19. Applicable Law
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              These Terms are governed by Colombian law. Any dispute shall be resolved by the judges of 
              <strong> Manizales, Caldas</strong>.
            </p>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center text-primary">
              <Mail className="h-5 w-5 mr-2" />
              20. Contact
            </CardTitle>
            <CardDescription>
              For legal or security inquiries, please contact us through the following channels.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium">TecnoCrypter – v1tr0</p>
                <p className="text-sm text-muted-foreground">Manizales, Colombia</p>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="font-medium">Legal inquiries:</p>
                  <p className="text-primary">legal@tecnocrypter.com</p>
                </div>
                <div>
                  <p className="font-medium">Security reports:</p>
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
