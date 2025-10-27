import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import Sidebar from '@/components/admin/Sidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Ne pas vérifier la session sur la page de login
  const session = await getServerSession(authOptions);

  // Rediriger vers login uniquement si pas de session
  // et que ce n'est pas déjà la page de login
  if (!session) {
    return redirect('/admin/login');
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 ml-64">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}


