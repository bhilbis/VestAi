import { Activity, ArrowDownRight, ArrowUpRight, BarChart3, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export const StatsCards = ({ totalValue, totalProfit, profitPercentage }: { totalValue: number, totalProfit: number, profitPercentage: number }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <CardContent className="p-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium mb-1">Total Value</p>
              <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
            </div>
            <div className="p-3 bg-white/20 rounded-full">
              <Wallet className="w-6 h-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className={`p-6 ${totalProfit >= 0 ? 'bg-gradient-to-r from-blue-500 to-cyan-600' : 'bg-gradient-to-r from-red-500 to-pink-600'} text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}>
        <CardContent className="p-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium mb-1">Profit/Loss</p>
              <p className="text-2xl font-bold">{formatCurrency(totalProfit)}</p>
            </div>
            <div className="p-3 bg-white/20 rounded-full">
              {totalProfit >= 0 ? 
                <TrendingUp className="w-6 h-6 text-green-500" /> : 
                <TrendingDown className="w-6 h-6 text-red-500" />
              }
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="p-6 bg-gradient-to-r from-purple-500 to-violet-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <CardContent className="p-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium mb-1">ROI</p>
              <p className="text-2xl font-bold">{profitPercentage.toFixed(2)}%</p>
            </div>
            <div className="p-3 bg-white/20 rounded-full">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};