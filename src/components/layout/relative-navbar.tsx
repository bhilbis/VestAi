/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Plus,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { assetTypes, NavbarItems } from '@/app/api/data';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  position: 'left' | 'right' | 'bottom';
  onPositionChange: (position: 'left' | 'right' | 'bottom') => void;
  userData: any;
  onOpenMessages: () => void;
  activeMessage?: boolean; 
}

export function Navbar({ position, onPositionChange, onOpenMessages, userData, activeMessage }: NavbarProps) {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isVertical = position === 'left' || position === 'right';

  const containerClasses = {
    left: 'fixed left-4 top-1/2 -translate-y-1/2 flex-col h-auto',
    right: 'fixed right-4 top-1/2 -translate-y-1/2 flex-col h-auto',
    bottom: 'fixed bottom-4 left-1/2 -translate-x-1/2 flex-row w-auto',
  };

  const handleAddAsset = async (assetType: string) => {
    try {
      const newAssetData = {
        name: `New ${assetType}`,
        type: assetType,
        category: assetType,
        color: assetTypes.find(t => t.id === assetType)?.color || 'bg-gray-500',
        amount: 0,
        buyPrice: 0,
        coinId: null
      };

      const response = await fetch('/api/assets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAssetData),
      });

      if (!response.ok) {
        throw new Error('Failed to create asset');
      }

      const createdAsset = await response.json();
      
      // Trigger event untuk update UI
      window.dispatchEvent(new CustomEvent('portfolioUpdate', { 
        detail: { action: 'add', asset: createdAsset } 
      }));
      
      // Optional: Show success message
      console.log('Asset berhasil ditambahkan:', createdAsset);
      
    } catch (error) {
      console.error('Error adding asset:', error);
      // Optional: Show error message to user
    }
  };

  const isActive = (item: any) => {
    if (item.title === "Messages") return activeMessage;
    if (item.url) return pathname.startsWith(item.url);
    return false;
  };

  return (
    <TooltipProvider>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`${containerClasses[position]} flex z-50`}
      >
      <div className={`
        backdrop-blur-xl bg-white/20 dark:bg-black/20 
        border border-white/20 rounded-2xl p-3 shadow-2xl
        ${isVertical ? 'flex-col' : 'flex-row'} flex gap-2
      `}>
        {NavbarItems.map((item) => (
          <div key={`${item.title}-${item.url ?? "no-url"}`} className="relative">
            {item.title === "Assets" ? (
              <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    whileHover={{ y: -4, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      relative p-3 rounded-xl transition-all duration-300
                      ${location.pathname === item.url 
                        ? 'bg-white/30 dark:bg-white/20 text-primary shadow-lg' 
                        : 'hover:bg-white/20 text-muted-foreground hover:text-foreground'
                      }
                      group flex items-center gap-2
                    `}
                  >
                    <item.icon size={20} />
                    {!isVertical && (
                      <>
                        <span className="text-sm">{item.title}</span>
                        <ChevronDown size={14} />
                      </>
                    )}
                    
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 -z-10"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  side={position === 'bottom' ? 'top' : 'right'} 
                  className="backdrop-blur-xl bg-white/90 dark:bg-black/90 border-white/20"
                >
                  <div className="p-2">
                    <p className="px-2 py-1 text-xs text-muted-foreground">Tambah Asset</p>
                    {assetTypes.map((asset) => (
                      <DropdownMenuItem
                        key={asset.id}
                        onClick={() => handleAddAsset(asset.id)}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <div className={`w-3 h-3 rounded-full ${asset.color}`} />
                        <Plus size={14} />
                        {asset.label}
                      </DropdownMenuItem>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : item.url ? (
              <Link href={item.url}>
                <motion.span
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    relative p-3 rounded-xl transition-all duration-300
                    ${pathname.startsWith(item.url) 
                      ? 'bg-white/30 dark:bg-white/20 text-primary shadow-lg' 
                      : 'hover:bg-white/20 text-muted-foreground hover:text-foreground'
                    }
                    group flex items-center gap-2
                  `}
                >
                  <item.icon size={20} />
                  {!isVertical && <span className="text-sm">{item.title}</span>}
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 -z-10"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.span>
              </Link>
            ) : (
              <motion.button
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  onOpenMessages();
                }}
                className={`
                  relative p-3 rounded-xl transition-all duration-300
                  ${isActive(item)
                    ? "bg-white/30 dark:bg-white/20 text-primary shadow-lg"
                    : "hover:bg-white/20 text-muted-foreground hover:text-foreground"
                  } 
                  group flex items-center gap-2
                `}
              >
                <item.icon size={20} />
                {!isVertical && <span className="text-sm">{item.title}</span>}
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 -z-10"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            )}
          </div>
        ))}
        
        <div className={`${isVertical ? 'w-full h-px' : 'w-px h-full'} bg-white/20`} />
        
        <div className={`${isVertical ? 'flex-col' : 'flex-row'} flex gap-2`}>
          <motion.div
            whileHover={{ y: -4, scale: 1.1 }}
            className="relative group"
          >
            <Avatar className="h-10 w-10 border-2 border-white/20">
              <AvatarImage src={userData?.user?.image || ""} />
              <AvatarFallback>{userData?.user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </motion.div>
        </div>
        
        {/* Position controls */}
        <div className={`${isVertical ? 'flex-col' : 'flex-row'} flex gap-1 mt-2 pt-2 border-t border-gray-300 dark:border-white/20`}>
          {['left', 'bottom', 'right'].map((pos) => (
            <Tooltip key={pos}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onPositionChange(pos as any)}
                  aria-label={`Move navbar to ${pos}`}
                  title={`Move navbar to ${pos}`}
                  className={`
                    w-6 h-6 rounded border transition-all
                    ${position === pos 
                      ? 'bg-black/30 dark:bg-white/30 border-black/40 dark:border-white/40' 
                      : 'bg-dark/10 dark:bg-white/10 border-black/20 dark:border-white/20 hover:bg-dark/20 dark:hover:bg-white/20'
                    }
                  `}
                />
              </TooltipTrigger>
              <TooltipContent side={isVertical ? 'right' : 'top'}>
                <p>Move navbar to {pos}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </motion.div>
    </TooltipProvider>
  );
}