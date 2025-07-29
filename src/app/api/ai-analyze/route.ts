/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPEN_ROUTER_API,
})

export async function POST(req: NextRequest) {
   try { 
    const { assets, marketPrices } = await req.json()

    if (!assets || assets.length === 0) {
    return NextResponse.json({ message: "Data aset kosong." }, { status: 400 })
  }

    let formattedAssets = "Data aset tidak tersedia."
    if (Array.isArray(assets)) {
        formattedAssets = assets.map((a: any) => {
          const market =  marketPrices?.[a.id]
          return `- ${a.name}, Jumlah: ${a.amount}, Harga Beli: ${a.buyPrice}${market ? `, Harga Pasar Saat Ini: ${market}` : ''}`
        }).join("\n")
    }

    const prompt = `
        Kamu adalah asisten/penasihat tentang keuangan. Berdasarkan data aset berikut:
        ${formattedAssets}
        Berikan analisis, potensi keuntungan/rugi, dan saran investasi berdasarkan data aset di atas.
        jelaskan dalam bahasa indonesia dan untuk seluruh aset adalah dalam nilai rupiah.
        **Jangan gunakan notasi matematis atau LaTeX**, seperti \\text{}, \\boxed{}, simbol $ $, kurung siku [ ], atau simbol matematika lainnya.
        Tulis rumus atau perhitungan dengan cara biasa. Contoh: "Keuntungan = (Harga Jual - Harga Beli) x Jumlah Unit"
        Gunakan format angka standar Indonesia, misalnya: Rp 8.687,33

        Berikan hasil dalam format markdown, mudah dibaca oleh pengguna umum (non-teknis).
    `

    const completion = await openai.chat.completions.create({
    model: "deepseek/deepseek-r1-0528:free",
    stream: true,
    messages: [
            { role: "system", content: "Kamu adalah seorang analisis/penasihat keuangan cerdas" },
            { role: "user", content: prompt }
        ],
    });

    let fullText = ""
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of completion as any) {
          const content = chunk.choices?.[0]?.delta?.content
          if (content) {
            controller.enqueue(encoder.encode(content))
            fullText += content
          }
        }
        controller.close()
      },
    })

    const cleaned = fullText.replace(/<think>[\s\S]*?<\/think>/g, "")

    await prisma.analysis.create({
      data: {
        userId: "",
        content: cleaned,
        assets: JSON.stringify(assets),
      }
    })
    return new Response(stream, {
      headers: {
        // "Content-Type": "text/plain; charset=utf-8",
        "Content-Type": "text/event-stream",
      }
    })

   } catch (error) {
    console.error("AI Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}