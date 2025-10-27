'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Mail, Calendar, User, ArrowLeft, Trash, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Link from 'next/link';

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function MessageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [message, setMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessage();
  }, [params.id]);

  const fetchMessage = async () => {
    try {
      const response = await fetch(`/api/admin/messages/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setMessage(data);
        
        // Marquer comme lu automatiquement
        if (!data.read) {
          await fetch(`/api/admin/messages/${params.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ read: true }),
          });
        }
      }
    } catch (error) {
      console.error('Error fetching message:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/messages/${params.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/admin/messages');
      } else {
        throw new Error('Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Erreur lors de la suppression du message');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Chargement...</div>
      </div>
    );
  }

  if (!message) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">Message introuvable</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/messages"
            className="btn bg-gray-600 hover:bg-gray-700 text-white flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Détail du message</h1>
        </div>
        <button
          onClick={handleDelete}
          className="btn bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
        >
          <Trash className="h-4 w-4" />
          Supprimer
        </button>
      </div>

      {/* Message content */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{message.subject}</h2>
            {message.read && (
              <div className="flex items-center gap-2 text-green-600 text-sm">
                <CheckCircle className="h-4 w-4" />
                Lu
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="flex items-center gap-3 text-gray-600">
              <User className="h-5 w-5" />
              <div>
                <p className="text-sm text-gray-500">Nom</p>
                <p className="font-medium text-gray-900">{message.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-600">
              <Mail className="h-5 w-5" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">
                  <a href={`mailto:${message.email}`} className="text-congo-600 hover:underline">
                    {message.email}
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-600">
              <Mail className="h-5 w-5" />
              <div>
                <p className="text-sm text-gray-500">Téléphone</p>
                <p className="font-medium text-gray-900">{message.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-600">
              <Calendar className="h-5 w-5" />
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium text-gray-900">
                  {format(new Date(message.createdAt), 'dd MMMM yyyy à HH:mm', { locale: fr })}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Message</h3>
          <div className="bg-gray-50 rounded-lg p-4 text-gray-700 whitespace-pre-wrap">
            {message.message}
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Répondre</h3>
          <div className="flex gap-3">
            <a
              href={`mailto:${message.email}?subject=Re: ${encodeURIComponent(message.subject)}`}
              className="btn btn-primary flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              Répondre par email
            </a>
            <a
              href={`tel:${message.phone}`}
              className="btn bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              Appeler
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
