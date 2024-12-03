import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  color: string;
}

export function FeatureCard({ title, subtitle, description, image, color }: FeatureCardProps) {
  const colorVariants = {
    orange: 'from-orange-500 to-orange-600',
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${colorVariants[color as keyof typeof colorVariants]} opacity-60`} />
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
        <h4 className="text-lg text-gray-300 mb-3">{subtitle}</h4>
        <p className="text-gray-400 mb-6">{description}</p>
        
        <button className="inline-flex items-center text-white hover:text-gray-300 transition-colors duration-200">
          <span className="mr-2">Learn More</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}