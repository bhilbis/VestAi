/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { TrackerForm } from "@/components/tracker/Form"
import { TrackerTable } from "@/components/tracker/Table"
import { AIResponse } from "@/components/tracker/AIResponse"
import { StatsCards } from "@/components/tracker/Stats"

export default function TrackerPage() {
  const [assets, setAssets] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/assets")
    .then(res => res.json())
    .then(data => setAssets(data))
  }, [])

  const handleRemoveAsset = async (id: string) => {
    const confirmed = confirm("Apakah Anda yakin ingin menghapus aset ini?");
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/assets/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Gagal menghapus aset:", error);
        alert(`Gagal menghapus: ${error.error}`);
        return;
      }

      setAssets(prev => prev.filter(asset => asset.id !== id));
    } catch (error) {
      console.error("Terjadi kesalahan saat menghapus aset:", error);
      alert("Terjadi kesalahan saat menghapus aset.");
    }
  };

  return (
    <div className="space-y-8 w-full">
      <StatsCards 
        totalValue={assets.reduce((sum, asset) => sum + (asset.value || 0), 0)}
        totalProfit={assets.reduce((sum, asset) => sum + (asset.profit || 0), 0)}
        profitPercentage={assets.length > 0 ? (assets.reduce((sum, asset) => sum + (asset.profit || 0), 0) / assets.reduce((sum, asset) => sum + (asset.value || 0), 0)) * 100 : 0}
      />
      
      <TrackerForm onAdd={(a) => {
        setAssets((prev) => {
          const exists = prev.some(item => item.id === a.id)
          return exists ? prev : [...prev, a]
        })
      }} />
      
      <TrackerTable 
        data={assets}
        onRemove={handleRemoveAsset}
      />
      
      <AIResponse assets={assets} />
    </div>
  )
}