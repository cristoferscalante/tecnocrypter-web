// Utilidad para mapear categorías a nombres legibles
export const categoryNames: Record<string, string> = {
  'web-development': 'Desarrollo Web',
  'security-training': 'Capacitación en Seguridad',
  'ai-training': 'Capacitación en IA',
  'cybersecurity': 'Ciberseguridad Empresarial',
  'incident-response': 'Respuesta a Incidentes',
  'todos': 'Todos'
}

// Información de proveedores
export const vendorInfo: Record<string, { 
  name: string
  url: string
  description: string
  logo?: string 
}> = {
  'V1tr0': {
    name: 'V1tr0',
    url: 'https://www.v1tr0.com/',
    description: 'Empresa líder en desarrollo de aplicaciones web seguras y soluciones digitales innovadoras con más de 5 años de experiencia.',
    logo: '/vendors/v1tr0-logo.png'
  },
  'TecnoCrypter': {
    name: 'TecnoCrypter',
    url: 'https://tecnocrypter.com',
    description: 'Expertos en ciberseguridad, capacitación y servicios de protección digital empresarial. Certificados y reconocidos internacionalmente.',
    logo: '/vendors/tecnocrypter-logo.png'
  }
}

// Función helper para obtener el nombre legible de una categoría
export function getCategoryName(categoryId: string): string {
  return categoryNames[categoryId] || categoryId
}

// Función helper para obtener información de un proveedor
export function getVendorInfo(vendorId: string) {
  return vendorInfo[vendorId] || {
    name: vendorId,
    url: '#',
    description: 'Proveedor de servicios profesionales.',
  }
}
