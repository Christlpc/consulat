'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, X, Clock, Package, Printer } from 'lucide-react';

interface ApplicationActionsProps {
  applicationId: string;
  applicationType: string;
  currentStatus: string;
  onStatusUpdate?: () => void;
}

export default function ApplicationActions({
  applicationId,
  applicationType,
  currentStatus,
  onStatusUpdate,
}: ApplicationActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [statusNote, setStatusNote] = useState('');

  const handleStatusUpdate = async (newStatus: string, note?: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/admin/applications/${applicationType}/${applicationId}/status`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status: newStatus,
            statusNote: note || null,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour');
      }

      setShowRejectModal(false);
      setShowApproveModal(false);
      setStatusNote('');
      
      if (onStatusUpdate) {
        onStatusUpdate();
      }
      
      router.refresh();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Erreur lors de la mise à jour du statut');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-wrap gap-3">
      {currentStatus === 'PENDING' && (
        <>
          <button
            onClick={() => setShowApproveModal(true)}
            className="btn btn-success flex items-center gap-2"
            disabled={loading}
          >
            <Check className="h-4 w-4" />
            Approuver
          </button>
          <button
            onClick={() => handleStatusUpdate('IN_REVIEW')}
            className="btn bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            disabled={loading}
          >
            <Clock className="h-4 w-4" />
            Mettre en examen
          </button>
        </>
      )}

      {currentStatus === 'IN_REVIEW' && (
        <>
          <button
            onClick={() => setShowApproveModal(true)}
            className="btn btn-success flex items-center gap-2"
            disabled={loading}
          >
            <Check className="h-4 w-4" />
            Approuver
          </button>
          <button
            onClick={() => setShowRejectModal(true)}
            className="btn bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
            disabled={loading}
          >
            <X className="h-4 w-4" />
            Rejeter
          </button>
        </>
      )}

      {currentStatus === 'PENDING' && (
        <button
          onClick={() => setShowRejectModal(true)}
          className="btn bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
          disabled={loading}
        >
          <X className="h-4 w-4" />
          Rejeter
        </button>
      )}

      {currentStatus === 'APPROVED' && (
        <button
          onClick={() => handleStatusUpdate('READY')}
          className="btn bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
          disabled={loading}
        >
          <Package className="h-4 w-4" />
          Marquer comme prêt
        </button>
      )}

      {(currentStatus === 'APPROVED' || currentStatus === 'READY') && (
        <button
          onClick={handlePrint}
          className="btn bg-gray-600 hover:bg-gray-700 text-white flex items-center gap-2"
        >
          <Printer className="h-4 w-4" />
          Imprimer le document
        </button>
      )}

      {/* Modal d'approbation */}
      {showApproveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Approuver la demande
            </h3>
            <p className="text-gray-600 mb-4">
              Voulez-vous approuver cette demande ? Une notification sera envoyée au demandeur.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Note (optionnel)
              </label>
              <textarea
                value={statusNote}
                onChange={(e) => setStatusNote(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Ajoutez une note pour le demandeur..."
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowApproveModal(false);
                  setStatusNote('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Annuler
              </button>
              <button
                onClick={() => handleStatusUpdate('APPROVED', statusNote)}
                className="flex-1 btn btn-success"
                disabled={loading}
              >
                {loading ? 'Approbation...' : 'Confirmer l\'approbation'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de rejet */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Rejeter la demande
            </h3>
            <p className="text-gray-600 mb-4">
              Veuillez indiquer le motif du rejet. Cette information sera communiquée au demandeur.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Motif du rejet *
              </label>
              <textarea
                value={statusNote}
                onChange={(e) => setStatusNote(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Documents incomplets, informations erronées, etc."
                required
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setStatusNote('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  if (!statusNote.trim()) {
                    alert('Veuillez indiquer un motif de rejet');
                    return;
                  }
                  handleStatusUpdate('REJECTED', statusNote);
                }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                disabled={loading}
              >
                {loading ? 'Rejet...' : 'Confirmer le rejet'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

