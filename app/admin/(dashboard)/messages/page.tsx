import { prisma } from '@/lib/prisma';
import { Mail, MailOpen, Eye, Trash } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

async function getMessages() {
  return await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export const dynamic = 'force-dynamic';

export default async function MessagesPage() {
  const messages = await getMessages();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Messages de Contact</h1>
        <p className="text-gray-600 mt-2">
          Gérer les messages reçus via le formulaire de contact
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Messages non lus</p>
              <p className="text-3xl font-bold text-gray-900">
                {messages.filter(m => !m.read).length}
              </p>
            </div>
            <div className="bg-orange-500 p-4 rounded-lg">
              <Mail className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total des messages</p>
              <p className="text-3xl font-bold text-gray-900">{messages.length}</p>
            </div>
            <div className="bg-congo-500 p-4 rounded-lg">
              <MailOpen className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="table-admin">
          <thead>
            <tr>
              <th>Statut</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Sujet</th>
              <th>Date</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <tr key={message.id} className={!message.read ? 'bg-blue-50' : ''}>
                <td>
                  {message.read ? (
                    <MailOpen className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Mail className="h-5 w-5 text-orange-500" />
                  )}
                </td>
                <td className="font-medium">{message.name}</td>
                <td className="text-sm text-gray-600">{message.email}</td>
                <td className="font-medium">{message.subject}</td>
                <td className="text-sm">
                  {format(new Date(message.createdAt), 'dd/MM/yyyy HH:mm', { locale: fr })}
                </td>
                <td className="max-w-md truncate text-sm text-gray-600">
                  {message.message}
                </td>
                <td>
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/messages/${message.id}`}
                      className="text-congo-600 hover:text-congo-700"
                      title="Voir le détail"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


