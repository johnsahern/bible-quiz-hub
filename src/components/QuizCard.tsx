
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

interface QuizCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay?: string;
  route?: string;
}

const QuizCard = ({ icon, title, description, color, delay = "0s", route }: QuizCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (route) {
      navigate(route);
    }
  };

  return (
    <Card 
      className="group hover:scale-[1.02] transition-all duration-500 cursor-pointer border-0 shadow-lg hover:shadow-2xl bg-white/80 backdrop-blur-sm overflow-hidden relative"
      style={{ animationDelay: delay }}
      onClick={handleClick}
    >
      {/* Effet de brillance animé */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      
      <CardContent className="p-0 relative">
        <div className={`${color} p-8 text-white rounded-t-lg relative overflow-hidden`}>
          {/* Particules décoratives */}
          <div className="absolute top-2 right-2 opacity-20">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div className="absolute bottom-2 left-2 opacity-10">
            <div className="w-8 h-8 border-2 border-white rounded-full animate-spin"></div>
          </div>
          
          <div className="flex items-center justify-center w-20 h-20 bg-white/15 backdrop-blur-sm rounded-2xl mb-6 mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
            {icon}
          </div>
          <h3 className="text-2xl font-bold text-center mb-3 tracking-wide">{title}</h3>
        </div>
        
        <div className="p-8 bg-gradient-to-b from-white to-gray-50 rounded-b-lg">
          <p className="text-gray-600 text-center mb-6 leading-relaxed text-lg min-h-[60px] flex items-center justify-center">
            {description}
          </p>
          <Button className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-900 hover:to-black transition-all duration-300 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl group/btn">
            <span className="flex items-center justify-center">
              Commencer
              <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizCard;
