import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  iconBgColor?: string;
}

export default function ServiceCard({
  title,
  description,
  icon: Icon,
  href,
  iconBgColor = 'bg-congo-100',
}: ServiceCardProps) {
  return (
    <div className="card group hover:scale-[1.02] transition-all duration-300">
      <div className="p-6">
        <div className={`inline-flex p-3 rounded-lg ${iconBgColor} mb-4`}>
          <Icon className="h-6 w-6 text-congo-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-congo-600 font-medium hover:gap-3 transition-all duration-200"
        >
          Commencer la démarche
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}


