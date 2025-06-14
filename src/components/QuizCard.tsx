
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

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
      className="group hover:scale-105 transition-all duration-300 cursor-pointer border-0 shadow-lg hover:shadow-xl"
      style={{ animationDelay: delay }}
      onClick={handleClick}
    >
      <CardContent className="p-0">
        <div className={`${color} p-6 text-white rounded-t-lg`}>
          <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-center mb-2">{title}</h3>
        </div>
        <div className="p-6 bg-white rounded-b-lg">
          <p className="text-gray-600 text-center mb-4">{description}</p>
          <Button className="w-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors">
            Commencer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizCard;
