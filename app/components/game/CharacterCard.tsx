import { ChevronRight } from "lucide-react";
import { motion } from 'framer-motion';
import { JSX } from "react";

type Props = {
	title: string;
	description: string;
	icon: ({ className }: { className: string }) => JSX.Element;
	isBrother: boolean;
	onClick: () => void;
}

const CharacterCard = ({ title, description, icon: Icon, isBrother, onClick }: Props) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
            className="group cursor-pointer"
            onClick={onClick}
        >
            <div className={`relative overflow-hidden rounded-3xl border-2 border-transparent 
                bg-white shadow-lg transition-all duration-500 ease-out
                ${isBrother ? 'hover:border-emerald-200 hover:shadow-emerald-100/50' : 'hover:border-amber-200 hover:shadow-amber-100/50'}
                hover:shadow-2xl`}
            >
                <div className={`absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100
                    ${isBrother ? 'bg-linear-to-br from-emerald-50 to-emerald-100/50' : 'bg-linear-to-br from-amber-50 to-amber-100/50'}`} />
                
                <div className="relative p-8 md:p-10">
                    <div className={`mb-6 inline-flex p-5 rounded-2xl transition-all duration-500 group-hover:scale-110 transform
                        ${isBrother ? 'bg-emerald-50 group-hover:bg-emerald-100' : 'bg-amber-50 group-hover:bg-amber-100'}`}
                    >
                        <Icon className={`w-12 h-12 transition-transform duration-500 ${isBrother ? 'text-emerald-600' : 'text-amber-600'}`} />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {title}
                    </h3>
                    
                    <p className="text-gray-500 text-base leading-relaxed mb-6">
                        {description}
                    </p>
                    
                    <div className={`flex items-center gap-2 font-medium
                        opacity-0 group-hover:opacity-100 transition-all duration-300
                        transform -translate-x-2.5 group-hover:translate-x-0
                        ${isBrother ? 'text-emerald-600' : 'text-amber-600'}`}
                    >
                        <span>Select</span>
                        <ChevronRight className="w-5 h-5" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CharacterCard