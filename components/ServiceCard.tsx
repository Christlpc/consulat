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
    <Link
      href={href}
      className="group block h-full bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl p-8 transition-all duration-300 hover:shadow-lg hover:border-congo-300"
    >
      <div className="flex flex-col items-center text-center h-full">
        <div className="mb-6 flex-shrink-0">
          <Icon className="h-12 w-12 text-gray-800 group-hover:text-congo-600 transition-colors duration-300" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight flex-shrink-0">{title}</h3>
        <p className="text-gray-600 text-base leading-relaxed mb-4 flex-1">{description}</p>
        <div className="inline-flex items-center gap-2 text-congo-600 font-medium text-sm group-hover:gap-3 transition-all duration-200 flex-shrink-0 mt-auto">
          En savoir plus
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}


