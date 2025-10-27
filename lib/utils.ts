export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    IN_REVIEW: 'bg-blue-100 text-blue-800',
    APPROVED: 'bg-green-100 text-green-800',
    READY: 'bg-purple-100 text-purple-800',
    REJECTED: 'bg-red-100 text-red-800',
    COMPLETED: 'bg-gray-100 text-gray-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    PENDING: 'En attente',
    IN_REVIEW: 'En examen',
    APPROVED: 'Approuvé',
    READY: 'Prêt',
    REJECTED: 'Rejeté',
    COMPLETED: 'Complété',
    DRAFT: 'Brouillon',
    PUBLISHED: 'Publié',
    ARCHIVED: 'Archivé',
  };
  return labels[status] || status;
}


