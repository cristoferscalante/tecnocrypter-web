import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Eye, FileText, Mail, Calendar, Target, Scale, Cookie, Users, Globe, Database, Clock, RefreshCw, CheckCircle, UserCheck, ClipboardCheck, AlertCircle } from "lucide-react"

export default function PrivacyEn() {
  return (
    <main className="min-h-screen py-12">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground">
            At TecnoCrypter we prioritize your privacy under a privacy-first model with end-to-end encryption.
          </p>
          <div className="flex items-center justify-center mt-4 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Last updated: August 10, 2025</span>
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
                TecnoCrypter ("TecnoCrypter"), in compliance with <strong>Law 1581 of 2012</strong>, <strong>Decree 1377 of 2013</strong>, 
                <strong>Decree 1074 of 2015</strong> and other applicable regulations on the processing of personal data, 
                hereby adopts this Personal Data Processing Policy.
              </p>
              <p>
                Our mission is to offer <strong>cybersecurity</strong> tools and content under a <strong>privacy-first</strong> model, 
                prioritizing <strong>user anonymity</strong>, <strong>minimal data usage</strong>, <strong>encrypted communications</strong> and, 
                in the case of transactions, preference for <strong>cryptocurrency payments</strong>.
              </p>
              <p>
                This policy applies to all processes, collaborators, and providers acting as data processors for TecnoCrypter, and covers interactions with:
              </p>
              <ul>
                <li>Users and visitors of www.tecnocrypter.com</li>
                <li>Newsletter subscribers</li>
                <li>Clients and prospects</li>
                <li>Providers and contractors</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Controller */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                1. Data Controller
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Controller:</strong> TecnoCrypter / v1tro – NIT 1083891483-9</p>
                <p><strong>Secure Email:</strong> legal@tecnocrypter.com</p>
                <p><strong>Website:</strong> www.tecnocrypter.com</p>
              </div>
            </CardContent>
          </Card>

          {/* Guiding Principles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                2. Guiding Principles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">At TecnoCrypter we process information in accordance with:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong>Data minimization:</strong> we only collect what is strictly necessary.
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong>Anonymity:</strong> whenever possible, we process data in a non-identifiable way.
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong>End-to-end encryption:</strong> to protect communications and transfers.
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong>No intrusive tracking:</strong> we do not use invasive tracking technologies without your consent.
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong>Private payments:</strong> we prioritize cryptocurrencies and methods that do not expose unnecessary financial data.
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data We Collect */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-5 w-5 mr-2 text-primary" />
                3. Data We Collect
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <strong>Minimal identification:</strong> name or alias, email address (you can use an encrypted one), and, if you choose, city or country.
                </div>
                <div>
                  <strong>Basic technical data:</strong> IP, device, browser, and language configuration.
                </div>
                <div>
                  <strong>Communications:</strong> messages sent via secure chat, forms, or encrypted emails.
                </div>
                <div>
                  <strong>Subscriptions:</strong> email and preferences (stored in encrypted form).
                </div>
                <div>
                  <strong>Transactions:</strong> payments processed preferably in cryptocurrencies. We do not store complete card information.
                </div>
                <div>
                  <strong>Security:</strong> analyzed URLs, threat indicators, and technical logs to prevent abuse.
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm">
                    <strong>Important:</strong> We do not request sensitive data unless legally required, in which case express authorization will be requested. 
                    Minors can only interact with the authorization of their legal representative.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Purposes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-primary" />
                4. Purposes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Operate the Site and its tools (verifier, contents, subscriptions).</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Manage support requests using encrypted channels.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Send newsletters and cybersecurity alerts if authorized.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Improve security and prevent fraud or attacks.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Comply with legal or contractual obligations.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Process payments in cryptocurrencies or high-privacy methods.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Analyze internal metrics in an aggregated and anonymous way.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Legal Basis and Consent */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Scale className="h-5 w-5 mr-2 text-primary" />
                5. Legal Basis and Consent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                The processing is carried out with your informed consent or in cases provided by law. 
                Authorization is obtained by electronic means, and proof thereof is kept.
              </p>
            </CardContent>
          </Card>

          {/* Cookies and Technologies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Cookie className="h-5 w-5 mr-2 text-primary" />
                6. Cookies and Technologies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We use necessary technical cookies and, only if you accept them, optional cookies for anonymous analytics. 
                We do not perform invasive profiling. See <strong>Cookie Policy</strong>.
              </p>
            </CardContent>
          </Card>

          {/* Rights of Data Subjects */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-5 w-5 mr-2 text-primary" />
                7. Rights of Data Subjects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">You have the right to:</p>
              <div className="grid md:grid-cols-2 gap-2">
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <span className="text-primary">✓</span>
                    <span>Access your data</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-primary">✓</span>
                    <span>Rectify or update them</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-primary">✓</span>
                    <span>Request deletion</span>
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <span className="text-primary">✓</span>
                    <span>Revoke consent</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-primary">✓</span>
                    <span>File complaints with the SIC</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                <p className="text-sm">
                  <strong>Exercise them by writing to:</strong> legal@tecnocrypter.com
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Processors and Transfers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2 text-primary" />
                8. Processors and Transfers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We only share data with providers that meet high security and encryption standards. 
                International transfers are conducted under secure protocols and end-to-end encryption.
              </p>
            </CardContent>
          </Card>

          {/* Information Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                9. Information Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">We implement:</p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>TLS/SSL and PGP encryption for communications.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Access controls and audit logs.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Infrastructure with redundancy and encrypted backups.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Minimal data retention.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Retention and Deletion */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                10. Retention and Deletion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Data is kept only as long as necessary for the authorized purposes. 
                Subsequently, it is securely deleted or anonymized.
              </p>
            </CardContent>
          </Card>

          {/* Link Verifier Use */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-primary" />
                11. Link Verifier Use
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Data processed by this tool is temporarily stored for analysis and security, 
                is not shared publicly, and is deleted after fulfilling its purpose.
              </p>
            </CardContent>
          </Card>

          {/* Changes to the Policy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <RefreshCw className="h-5 w-5 mr-2 text-primary" />
                12. Changes to the Policy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Any changes will be published on our Site and, if relevant, notified through available means.
              </p>
            </CardContent>
          </Card>

          {/* Validity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                13. Validity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                This Policy is effective as of <strong>August 10, 2025</strong> and will remain in force as long as 
                TecnoCrypter carries out personal data processing.
              </p>
            </CardContent>
          </Card>

          {/* Personal Data Authorization */}
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-600 dark:text-blue-400">
                <UserCheck className="h-5 w-5 mr-2" />
                Authorization for Personal Data Processing
              </CardTitle>
              <CardDescription>
                Express authorization form for processing personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border">
                <h4 className="font-semibold mb-4 flex items-center">
                  <ClipboardCheck className="h-4 w-4 mr-2 text-primary" />
                  Express Authorization
                </h4>
                <p className="mb-4 text-sm">
                  I authorize freely, previously, expressly, voluntarily, and in an informed manner <strong>TecnoCrypter</strong> 
                  to process my personal data for the following purposes, always prioritizing privacy, security, anonymity, and confidentiality:
                </p>
                
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">a)</span>
                      <span>Operate and maintain the Website and its functionalities, ensuring a secure environment.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">b)</span>
                      <span>Manage contact and technical support requests through encrypted channels.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">c)</span>
                      <span>Send newsletters about cybersecurity and digital anonymity, only if authorized.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">d)</span>
                      <span>Commercial communications through secure and encrypted channels.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">e)</span>
                      <span>Internal analytics with aggregated data and anonymization.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">f)</span>
                      <span>Prevent fraud and reinforce infrastructure security.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">g)</span>
                      <span>Manage events and training through private and secure channels.</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">h)</span>
                      <span>Comply with legal obligations under principles of minimum disclosure.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">i)</span>
                      <span>Manage contractual relations, including payments with cryptocurrencies.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">j)</span>
                      <span>Share data only with providers that meet high privacy standards.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">k)</span>
                      <span>International transfers with end-to-end encryption.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">l)</span>
                      <span>Update databases while minimizing data retention.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">m)</span>
                      <span>Internal studies to improve services, without invasive targeting.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">n)</span>
                      <span>Log communications for support, always encrypted.</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <h4 className="font-semibold mb-3 flex items-center text-yellow-700 dark:text-yellow-400">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Important Declarations
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-600">•</span>
                    <span>I understand that the use of sensitive data is optional and cannot imply discrimination.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-600">•</span>
                    <span>For minors, authorization of their legal representative will be required.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-600">•</span>
                    <span>I know my rights of access, update, rectification, deletion, revocation, and complaint before the SIC.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-600">•</span>
                    <span>I have read and accept the Privacy Policy published at www.tecnocrypter.com.</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                  <p className="text-sm font-medium">
                    <strong>Channel to exercise rights:</strong> legal@tecnocrypter.com
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border">
                <h4 className="font-semibold mb-3 text-gray-700 dark:text-gray-300">
                  Privacy Notice Summary
                </h4>
                <div className="text-sm space-y-2">
                  <p><strong>Controller:</strong> TecnoCrypter / v1tr0, NIT 1083891483-9</p>
                  <p><strong>Secure Email:</strong> legal@tecnocrypter.com</p>
                  <p><strong>Site:</strong> www.tecnocrypter.com</p>
                </div>
                <p className="text-sm mt-3">
                  At TecnoCrypter we treat your data with maximum security and respect for your anonymity. 
                  Data will be used to operate the site, manage encrypted communications, 
                  aggregate analytics, prevent fraud, fulfill legal compliance, and non-intrusive marketing 
                  (only if authorized).
                </p>
                <p className="text-sm mt-2">
                  Your rights include accessing, updating, rectifying, revoking, and deleting your data, 
                  as well as filing complaints with the Superintendence of Industry and Commerce.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <Mail className="h-5 w-5 mr-2" />
                Have questions about your privacy?
              </CardTitle>
              <CardDescription>
                Our team is available to resolve any doubts regarding the processing of your data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div>
                  <p className="font-medium">Legal contact email:</p>
                  <p className="text-primary">legal@tecnocrypter.com</p>
                </div>
                <div>
                  <p className="font-medium">General support:</p>
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
